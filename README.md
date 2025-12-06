# ReseraLabs Website

Coming soon page for [ReseraLabs](https://reseralabs.com).

## Tech Stack

- **Framework**: SvelteKit with TypeScript
- **Styling**: Tailwind CSS v4
- **Build**: Vite + Bun
- **Hosting**: AWS S3 + CloudFront
- **CI/CD**: GitHub Actions

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
