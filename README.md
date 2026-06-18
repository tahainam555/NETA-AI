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

## Connecting the Automation Audit to n8n

Create a production Webhook node in n8n that accepts `POST` requests and returns JSON with `success: true`. Add that production URL to the frontend Vercel project as `NEXT_PUBLIC_N8N_WEBHOOK_URL`, then redeploy. The widget submits the lead, audit answers, recommendation, and source label directly to that webhook.

The backend also exposes `POST /api/local-recommendation`. It uses deterministic rules by default. To optionally try a local Ollama instance, set `OLLAMA_ENABLED=true`, `OLLAMA_BASE_URL`, and `OLLAMA_MODEL` in the backend; any Ollama failure automatically falls back to the rules. A cloud Vercel function usually cannot reach Ollama running on a private computer, so leave it disabled in production unless Ollama is network-accessible.
