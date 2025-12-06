# ReseraLabs Website

Coming soon page for [ReseraLabs](https://reseralabs.com).

## Tech Stack

- **Framework**: SvelteKit with TypeScript
- **Styling**: Tailwind CSS v4
- **Build**: Vite + Bun
- **Hosting**: AWS S3 + CloudFront
- **CI/CD**: GitHub Actions

## Enterprise Architecture

```mermaid
flowchart TB
    subgraph Internet
        User([User])
    end

    subgraph AWS["AWS Cloud"]
        subgraph Edge["Edge Layer"]
            CF[CloudFront CDN]
            R53[Route 53 DNS]
        end

        subgraph Storage["Storage Layer"]
            S3[(S3 Bucket)]
        end

        subgraph Compute["Compute Layer"]
            Lambda1[Lambda: Subscribe]
            Lambda2[Lambda: Contact]
        end

        subgraph Messaging["Messaging Layer"]
            SES[Simple Email Service]
        end
    end

    subgraph External["External Services"]
        EO[EmailOctopus API]
    end

    User -->|HTTPS| R53
    R53 -->|reseralabs.com| CF
    CF -->|OAC| S3
    User -->|Subscribe API| Lambda1
    User -->|Contact API| Lambda2
    Lambda1 -->|Add Contact| EO
    Lambda2 -->|Send Email| SES
    SES -->|Deliver| User
```

The infrastructure is fully serverless on AWS:

- **Route 53** handles DNS for the `reseralabs.com` domain
- **CloudFront** serves as the CDN, providing global edge caching and HTTPS termination
- **S3** stores the static site assets, accessed via Origin Access Control (OAC) - the bucket is not public
- **Lambda** functions handle form submissions:
  - **Subscribe** - adds contacts to EmailOctopus mailing list with industry segmentation
  - **Contact** - sends inquiry emails via SES to the team
- **SES** delivers transactional emails from the contact form
- **EmailOctopus** manages the mailing list and email campaigns

## Software Architecture

```mermaid
flowchart LR
    subgraph Client["Browser"]
        SPA[SvelteKit SPA]
    end

    subgraph Build["Build Pipeline"]
        direction TB
        GH[GitHub Actions]
        Bun[Bun + Vite]
        Static[Static Adapter]
    end

    subgraph Backend["AWS Lambda"]
        SubFn[Subscribe Function]
        ConFn[Contact Function]
    end

    subgraph APIs["External APIs"]
        EO[EmailOctopus]
        SES[AWS SES]
    end

    SPA -->|Form Submit| SubFn
    SPA -->|Contact Form| ConFn
    SubFn -->|REST| EO
    ConFn -->|SDK| SES

    GH -->|Build| Bun
    Bun -->|Generate| Static
    Static -->|Deploy| S3[(S3)]
```

The application follows a static-first architecture:

- **SvelteKit** with the static adapter pre-renders all pages at build time
- **Bun** is used as the package manager and runtime for fast builds
- **Vite** handles bundling, hot module replacement, and optimizations
- **GitHub Actions** automates the CI/CD pipeline:
  1. Syncs EmailOctopus field configuration from API
  2. Commits config back to repo if changed
  3. Builds the static site
  4. Deploys to S3 via OIDC authentication (no stored credentials)
  5. Invalidates CloudFront cache
- **Scheduled Sync** - A separate workflow runs daily at 6am UTC to check for EmailOctopus config changes. If changes are detected, it commits and pushes, which triggers a deploy
- **Lambda Function URLs** provide simple HTTPS endpoints without API Gateway overhead
- Form submissions are proxied through Lambda to keep API keys secure

## Application Structure

```mermaid
flowchart TB
    subgraph Pages["Routes"]
        Home["/"]
        Privacy["/privacy"]
        Terms["/terms"]
        Investors["/investors"]
        ThankYou["/thank-you"]
        ContactSuccess["/contact-success"]
    end

    subgraph Components["Components"]
        Dropdown[Dropdown.svelte]
        Modal1[Signup Modal]
        Modal2[Contact Modal]
    end

    subgraph Config["Configuration"]
        EOConfig[emailoctopus-config.json]
    end

    Home --> Modal1
    Home --> Modal2
    Modal1 --> Dropdown
    Modal2 --> Dropdown
    Dropdown --> EOConfig
```

The SvelteKit app is organized as follows:

- **Routes** - Each page is a separate route with its own `+page.svelte`
- **Components** - Reusable UI components like the custom `Dropdown` for form selects
- **Modals** - Signup and Contact forms share the same dropdown configuration
- **Configuration** - EmailOctopus field definitions (org types, industries) are synced from the API at build time and shared across forms. If the config changes, it's automatically committed back to the repo

## Environment Variables

### Local Development (`.env`)

| Variable | Description |
|----------|-------------|
| `EMAILOCTOPUS_API_KEY` | API key for EmailOctopus (used by sync script) |
| `EMAILOCTOPUS_LIST_ID` | EmailOctopus mailing list ID |
| `VITE_SUBSCRIBE_API_URL` | Lambda Function URL for email subscription |
| `VITE_CONTACT_API_URL` | Lambda Function URL for contact form |

### GitHub Actions

#### Secrets

| Secret | Description |
|--------|-------------|
| `AWS_ROLE_ARN` | IAM role ARN for OIDC authentication |
| `EMAILOCTOPUS_API_KEY` | API key for EmailOctopus |
| `EMAILOCTOPUS_LIST_ID` | EmailOctopus mailing list ID |

#### Variables

| Variable | Description |
|----------|-------------|
| `AWS_REGION` | AWS region (e.g., `us-east-1`) |
| `S3_BUCKET_NAME` | S3 bucket for static site hosting |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID for cache invalidation |
| `SUBSCRIBE_API_URL` | Lambda Function URL for email subscription |
| `CONTACT_API_URL` | Lambda Function URL for contact form |

## Development

```sh
bun install
bun run dev
```

## Build

```sh
bun run build
```

## Deployment

Push to `main` triggers automatic deployment via GitHub Actions.

See [AWS_SETUP.md](./AWS_SETUP.md) for infrastructure setup.
