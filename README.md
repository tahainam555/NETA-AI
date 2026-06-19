# NETA AI

The application is split into two independent Next.js projects:

- `frontend/` — the website and browser-side forms
- `backend/` — the contact and newsletter API routes

## Local development

Install dependencies from the repository root with `npm install`, then run each project in a separate terminal:

```bash
npm run dev:frontend
npm run dev:backend
```

The backend defaults to port `3001`; copy each project's `.env.example` to `.env.local`. Set `NEXT_PUBLIC_API_URL=http://localhost:3001` in the frontend.

## Deploying to Vercel

Create two Vercel projects from this repository:

1. Set the frontend project's Root Directory to `frontend` and add the variables from `frontend/.env.example`.
2. Set the backend project's Root Directory to `backend` and add the variables from `backend/.env.example`.
3. Set backend `FRONTEND_URL` to the deployed frontend origin, for example `https://neta-ai.vercel.app`.
4. Set frontend `NEXT_PUBLIC_API_URL` to the deployed backend origin, for example `https://neta-ai-api.vercel.app`, then redeploy the frontend.

Do not commit `.env` or `.env.local` files. Vercel environment variables are configured in Project Settings → Environment Variables.

### Frontend environment variables

Add these to the Vercel project whose Root Directory is `frontend`:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Deployed backend origin, e.g. `https://neta-ai-api.vercel.app` (no trailing slash) |
| `NEXT_PUBLIC_SITE_URL` | Deployed frontend origin, e.g. `https://neta-ai.vercel.app` (no trailing slash) |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v3 site key; authorize the frontend domain in Google |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public email address displayed on the website |

All `NEXT_PUBLIC_*` values are intentionally visible in the browser. Redeploy the frontend after changing them.

### Backend environment variables

Add these to the Vercel project whose Root Directory is `backend`:

| Variable | Value |
| --- | --- |
| `FRONTEND_URL` | Deployed frontend origin; multiple allowed origins may be comma-separated |
| `RECAPTCHA_SECRET_KEY` | Secret paired with the frontend reCAPTCHA site key |
| `RESEND_SERVER_TOKEN` | Resend API key |
| `CONTACT_FROM_EMAIL` | Sender on a domain verified in Resend, e.g. `NETA AI <hello@yourdomain.com>` |
| `CONTACT_TO_EMAIL` | Inbox that receives contact and subscriber notifications |
| `N8N_WEBHOOK_URL` | Private production URL copied from the n8n Webhook node |
| `OLLAMA_ENABLED` | Keep `false` on Vercel unless Ollama is publicly reachable |

Do not put `RESEND_SERVER_TOKEN`, `RECAPTCHA_SECRET_KEY`, or `N8N_WEBHOOK_URL` in the frontend project.

## Connecting the Automation Audit to n8n

Create a Webhook node in n8n configured for `POST`, activate the workflow, and copy its **Production URL** into the backend variable `N8N_WEBHOOK_URL`. The backend validates reCAPTCHA and the request payload before forwarding it, so the private webhook is not shipped to browsers and n8n does not need browser CORS configuration.

End the workflow with a Respond to Webhook node returning JSON similar to:

```json
{
  "success": true,
  "message": "Your automation audit request has been received. NETA AI will contact you soon."
}
```

The backend also exposes `POST /api/local-recommendation`. It uses deterministic rules by default. To optionally try a local Ollama instance, set `OLLAMA_ENABLED=true`, `OLLAMA_BASE_URL`, and `OLLAMA_MODEL` in the backend; any Ollama failure automatically falls back to the rules. A cloud Vercel function usually cannot reach Ollama running on a private computer, so leave it disabled in production unless Ollama is network-accessible.
