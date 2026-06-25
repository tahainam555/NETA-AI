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
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public email address displayed on the website |

All `NEXT_PUBLIC_*` values are intentionally visible in the browser. Redeploy the frontend after changing them.

### Backend environment variables

Add these to the Vercel project whose Root Directory is `backend`:

| Variable | Value |
| --- | --- |
| `FRONTEND_URL` | Deployed frontend origin; multiple allowed origins may be comma-separated |
| `RESEND_SERVER_TOKEN` | Resend API key |
| `CONTACT_FROM_NAME` | Optional display name for backend emails, e.g. `NETA AI` |
| `CONTACT_FROM_EMAIL` | Sender on a domain verified in Resend, e.g. `send@netaai.studio` or `NETA AI <send@netaai.studio>` |
| `CONTACT_TO_EMAIL` | Inbox that receives contact and subscriber notifications |
| `N8N_WEBHOOK_URL` | Private production URL copied from the n8n Webhook node |
| `OLLAMA_ENABLED` | Keep `false` on Vercel unless Ollama is publicly reachable |

Do not put `RESEND_SERVER_TOKEN` or `N8N_WEBHOOK_URL` in the frontend project.

## Connecting the Automation Audit to n8n

Create a Webhook node in n8n configured for `POST`, activate the workflow, and copy its **Production URL** into the backend variable `N8N_WEBHOOK_URL`. The backend validates the request payload before forwarding it, so the private webhook is not shipped to browsers and n8n does not need browser CORS configuration.

End the workflow with a Respond to Webhook node returning JSON similar to:

```json
{
  "success": true,
  "message": "Your automation audit request has been received. NETA AI will contact you soon."
}
```

The backend also exposes `POST /api/local-recommendation`. It uses deterministic rules by default. To optionally try a local Ollama instance, set `OLLAMA_ENABLED=true`, `OLLAMA_BASE_URL`, and `OLLAMA_MODEL` in the backend; any Ollama failure automatically falls back to the rules. A cloud Vercel function usually cannot reach Ollama running on a private computer, so leave it disabled in production unless Ollama is network-accessible.

## Automation layer

This repo now includes two automation paths:

1. Contact form automation inside the backend:
   - Visitor submits the contact form.
   - Backend validates the payload.
   - Backend emails the NETA AI team.
   - Backend automatically replies to the visitor.

2. Automation audit flow through n8n:
   - Visitor completes the floating Automation Audit Assistant.
   - Frontend sends the lead to the backend.
   - Backend validates the payload and forwards the lead to n8n.
   - n8n emails the NETA AI team.
   - n8n automatically replies to the visitor if an email was provided.
   - n8n responds to the backend with the recommendation summary.

The ready-to-import n8n workflow is here:

```txt
automation/n8n/neta-ai-audit-automation.json
```

### Deploying n8n on DigitalOcean

The DigitalOcean deployment files are in:

```txt
automation/digitalocean/
```

They run:

- n8n
- PostgreSQL for persistent workflow data
- Caddy for automatic HTTPS

Recommended setup:

1. Create a DigitalOcean Droplet.
   - Ubuntu 24.04 LTS
   - Basic shared CPU is fine to start
   - 1 GB RAM minimum, 2 GB preferred

2. Point a domain/subdomain to the Droplet IP.

   Example DNS record:

   ```txt
   Type: A
   Name: automation
   Value: your_droplet_ip
   ```

   This gives you:

   ```txt
   https://automation.netaai.studio
   ```

3. SSH into the Droplet.

   ```bash
   ssh root@your_droplet_ip
   ```

4. Install Docker.

   ```bash
   apt update
   apt install -y ca-certificates curl
   install -m 0755 -d /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
   chmod a+r /etc/apt/keyrings/docker.asc
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" > /etc/apt/sources.list.d/docker.list
   apt update
   apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

5. Upload or clone this repository on the Droplet.

   ```bash
   git clone https://github.com/tahainam555/NETA-AI.git
   cd NETA-AI/automation/digitalocean
   ```

6. Create the n8n environment file.

   ```bash
   cp .env.example .env
   nano .env
   ```

   Set these values:

   ```env
   POSTGRES_USER=n8n
   POSTGRES_PASSWORD=use_a_long_random_password
   POSTGRES_DB=n8n
   N8N_HOST=automation.yourdomain.com
   N8N_ENCRYPTION_KEY=use_a_long_random_32_plus_character_secret
   GENERIC_TIMEZONE=Asia/Karachi
   RESEND_SERVER_TOKEN=your_resend_api_key
   CONTACT_FROM_EMAIL=NETA AI <hello@your-verified-domain.com>
   CONTACT_TO_EMAIL=neta.ai.pk@gmail.com
   ```

   Important: keep `N8N_ENCRYPTION_KEY` forever. If you change it later, saved credentials may stop decrypting.

7. Start n8n.

   ```bash
   docker compose up -d
   docker compose logs -f n8n
   ```

8. Open n8n.

   ```txt
   https://automation.yourdomain.com
   ```

9. Import the workflow.

   In n8n:

   - Go to Workflows.
   - Import from file.
   - Upload `automation/n8n/neta-ai-audit-automation.json`.
   - Open the workflow.
   - Activate it.

10. Copy the production webhook URL from the n8n Webhook node.

    It should look like:

    ```txt
    https://automation.yourdomain.com/webhook/neta-ai-audit
    ```

11. Put that URL into the backend environment variable:

    ```env
    N8N_WEBHOOK_URL=https://automation.yourdomain.com/webhook/neta-ai-audit
    ```

12. Redeploy the backend after changing `N8N_WEBHOOK_URL`.

### Required Resend setup

For emails to work reliably:

1. Verify your sending domain in Resend.
2. Use a sender from that verified domain:

   ```env
   CONTACT_FROM_EMAIL=NETA AI <hello@yourdomain.com>
   ```

3. Put the same Resend key in:
   - backend Vercel env as `RESEND_SERVER_TOKEN`
   - DigitalOcean n8n `.env` as `RESEND_SERVER_TOKEN`

### Testing the automation

Test these flows after deployment:

1. Contact form:
   - Submit the contact form.
   - Confirm `CONTACT_TO_EMAIL` receives the internal notification.
   - Confirm the user email receives the auto-reply.

2. Automation audit widget:
   - Complete the chatbot flow.
   - Submit name, business, email, and/or WhatsApp.
   - Confirm n8n execution succeeds.
   - Confirm the NETA AI team receives the audit email.
   - Confirm the user receives the auto-reply if they provided an email.

3. Backend health check:

   ```txt
   https://your-backend-domain.vercel.app/
   ```

   Expected response:

   

   ```json
   {
     "ok": true,
     "service": "NETA AI API",
     "message": "Backend is running."
   }
   ```
