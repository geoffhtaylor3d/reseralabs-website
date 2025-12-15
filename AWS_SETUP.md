# AWS Setup for ReseraLabs Website

## 1. Create S3 Bucket

```bash
aws s3 mb s3://reseralabs-website --region us-east-1
```

Keep **"Block all public access"** enabled (default) - CloudFront will access the bucket via OAC.

## 2. Create CloudFront Distribution with Origin Access Control

1. Go to **CloudFront → Create Distribution**

2. **Origin settings:**
   - Origin domain: Select your S3 bucket (`reseralabs-website.s3.us-east-1.amazonaws.com`)
   - Origin access: **Origin access control settings (recommended)**
   - Click **Create new OAC**:
     - Name: `reseralabs-website-oac`
     - Signing behavior: Sign requests (recommended)
     - Origin type: S3
   - Click **Create**

3. **Default cache behavior:**
   - Viewer protocol policy: **Redirect HTTP to HTTPS**
   - Allowed HTTP methods: GET, HEAD
   - Cache policy: CachingOptimized

4. **Settings:**
   - Default root object: `index.html`

5. Click **Create Distribution**

6. **Copy the S3 bucket policy** - CloudFront will show a banner saying "The S3 bucket policy needs to be updated". Click **Copy policy**.

## 3. Update S3 Bucket Policy

1. Go to **S3 → reseralabs-website → Permissions → Bucket policy**
2. Paste the policy copied from CloudFront (looks like this):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::reseralabs-website/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
                }
            }
        }
    ]
}
```

## 4. Configure Error Pages for SPA Routing

1. Go to **CloudFront → Your distribution → Error pages**
2. Create custom error responses:

| HTTP Error Code | Response Page Path | HTTP Response Code |
|-----------------|-------------------|-------------------|
| 403 | `/index.html` | 200 |
| 404 | `/index.html` | 200 |

## 5. CloudFront Function for URL Rewriting

CloudFront Functions run at edge locations and handle URL rewriting for clean URLs (e.g., `/investors` → `/investors/index.html`).

### Create the Function

1. Go to **CloudFront → Functions → Create function**
2. Name: `reseralabs-url-rewrite`
3. Click **Create function**
4. Replace the function code with:

```javascript
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    } else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }

    return request;
}
```

5. Click **Save changes**
6. Go to the **Publish** tab and click **Publish function**

### Associate with CloudFront Distribution

1. Go to **CloudFront → Distributions → Your distribution**
2. Go to the **Behaviors** tab
3. Select the default behavior (`*`) and click **Edit**
4. Scroll to **Function associations**
5. For **Viewer request**, select:
   - Function type: **CloudFront Functions**
   - Function ARN/Name: `reseralabs-url-rewrite`
6. Click **Save changes**

> **Note:** This is a CloudFront Function (runs at edge, <1ms latency), not a Lambda@Edge function. It handles all requests without file extensions by appending `/index.html`, enabling clean URLs for static site routing.

## 6. Create IAM Role for GitHub Actions (OIDC)

### Create OIDC Identity Provider

1. Go to **IAM → Identity Providers → Add Provider**
2. Provider type: **OpenID Connect**
3. Provider URL: `https://token.actions.githubusercontent.com`
4. Audience: `sts.amazonaws.com`
5. Click **Add provider**

### Create IAM Role

1. Go to **IAM → Roles → Create Role**
2. Trusted entity type: **Web Identity**
3. Identity provider: `token.actions.githubusercontent.com`
4. Audience: `sts.amazonaws.com`
5. Click **Next**

6. Skip adding policies for now, click **Next**

7. Role name: `github-reseralabs-deploy`

8. Click **Create role**

9. Open the role and edit the **Trust policy**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_ORG/reseralabs-website:*"
        }
      }
    }
  ]
}
```

10. Add an **inline policy** named `deploy-policy`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::reseralabs-website",
        "arn:aws:s3:::reseralabs-website/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
    }
  ]
}
```

## 6. Configure GitHub Repository

Go to your repo **Settings → Secrets and variables → Actions**

### Secrets

| Name | Value |
|------|-------|
| `AWS_ROLE_ARN` | `arn:aws:iam::YOUR_ACCOUNT_ID:role/github-reseralabs-deploy` |

### Variables

| Name | Value |
|------|-------|
| `AWS_REGION` | `us-east-1` |
| `S3_BUCKET_NAME` | `reseralabs-website` |
| `CLOUDFRONT_DISTRIBUTION_ID` | `E1234567890ABC` |

## 7. Lambda for Email Subscription

### Create the Lambda Function

1. Go to **Lambda → Create function**
2. Function name: `reseralabs-subscribe`
3. Runtime: **Node.js 20.x**
4. Architecture: **arm64** (cheaper)
5. Click **Create function**

6. In the **Code** tab, copy the contents of `lambda/subscribe.js` from this repo

7. Go to **Configuration → Environment variables**, add:
   - `EMAILOCTOPUS_API_KEY`: Your EmailOctopus API key
   - `EMAILOCTOPUS_LIST_ID`: `59f2d2e0-d1f5-11f0-815f-b747998a6f06`

8. Go to **Configuration → General configuration**, set timeout to **10 seconds**

### Create Function URL (simpler than API Gateway)

1. Go to **Configuration → Function URL**
2. Click **Create function URL**
3. Auth type: **NONE**
4. **Leave CORS unconfigured** (empty) - the Lambda code handles CORS headers
5. Click **Save**

Copy the **Function URL** (e.g., `https://abc123.lambda-url.us-east-1.on.aws/`)

### Add to GitHub Variables

| Name | Value |
|------|-------|
| `SUBSCRIBE_API_URL` | Your Lambda Function URL |
| `CONTACT_API_URL` | Your Contact Lambda Function URL |

## 8. Lambda for Contact Form (SES)

### Verify Domain in SES

1. Go to **SES → Verified identities → Create identity**
2. Choose **Domain** and enter `reseralabs.com`
3. If using Route 53, check **"Use Route 53"** to auto-create DKIM records
4. Click **Create identity**

This allows sending from any `@reseralabs.com` address (e.g., `noreply@`, `contact@`).

> **Note:** If your SES account is in sandbox mode, you can only send to verified email addresses. Request production access for sending to any email.

### Create the Lambda Function

1. Go to **Lambda → Create function**
2. Function name: `reseralabs-contact`
3. Runtime: **Node.js 20.x**
4. Architecture: **arm64**
5. Click **Create function**

6. In the **Code** tab, copy the contents of `lambda/contact.js` from this repo

7. Go to **Configuration → Environment variables**, add:
   - `FROM_EMAIL`: `noreply@reseralabs.com` (must be SES verified)

8. Go to **Configuration → General configuration**, set timeout to **10 seconds**

### Add SES Permissions to Lambda

1. Go to **Configuration → Permissions**
2. Click on the execution role
3. Add an **inline policy**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ses:SendEmail",
      "Resource": "*"
    }
  ]
}
```

### Create Function URL

1. Go to **Configuration → Function URL**
2. Click **Create function URL**
3. Auth type: **NONE**
4. **Leave CORS unconfigured** (empty) - the Lambda code handles CORS headers
5. Click **Save**

Copy the **Function URL** and add it to GitHub Variables as `CONTACT_API_URL`.

## 9. Custom Domain (Optional)

1. **Request ACM certificate** in **us-east-1**:
   - Go to ACM → Request certificate
   - Add domains: `reseralabs.com` and `www.reseralabs.com`
   - Validate via DNS

2. **Update CloudFront distribution:**
   - Alternate domain names: Add `reseralabs.com` and `www.reseralabs.com`
   - Custom SSL certificate: Select your ACM certificate

3. **Update DNS** (in your domain registrar):
   - `reseralabs.com` → ALIAS/ANAME to `dxxxxx.cloudfront.net`
   - `www.reseralabs.com` → CNAME to `dxxxxx.cloudfront.net`

## Quick Reference

```bash
# Manual deploy
bun run build
aws s3 sync build/ s3://reseralabs-website --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## Checklist

- [ ] S3 bucket created (Block Public Access ON)
- [ ] CloudFront distribution with OAC
- [ ] S3 bucket policy updated for CloudFront
- [ ] CloudFront error pages configured (403/404 → index.html)
- [ ] GitHub OIDC provider created in IAM
- [ ] IAM role with trust policy and deploy permissions
- [ ] GitHub secrets/variables configured
- [ ] (Optional) Custom domain with ACM certificate
- [ ] SES email verified for contact form
- [ ] Contact Lambda function created with SES permissions
