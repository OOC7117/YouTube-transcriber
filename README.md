# YouTube-transcriber

A simple web app that accepts a YouTube link, pulls the title and transcript, and uses an LLM to summarize the content into highlights. The current build ships with stubbed data so you can verify the UI end-to-end before adding API keys.

## Instant use on GitHub Pages
The app now runs entirely in the browser with demo data, so you (or anyone visiting your public repo) can try it immediately via GitHub Pages.

1. Push to the `main` branch.
2. In your repository settings, open **Pages** → **Source** and select **Deploy from a branch** with the `/ (root)` folder of `main`.
3. Wait for the deploy to finish, then visit `https://<your-user>.github.io/YouTube-transcriber/` to use the demo without installing anything.

### What happens on Pages?
- All API responses are generated in `public/app.js` using placeholder data, so the UI works without a server.
- The "Extract" and "Extract transcript" buttons simulate latency and return sample results.
- Asset links are relative, so they work when the site is served from `/<repo-name>/`.

## Features
- Paste a YouTube URL and click **Extract**.
- Built-in demo responses (no server required) that return a placeholder title, a short answer, and sample categorized highlights.
- Ready-to-wire hooks for a transcript API (e.g., YouTube Transcript) and an LLM (e.g., OpenAI, Anthropic).

## Getting started locally (optional)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the app:
   ```bash
   npm start
   ```
3. Open your browser at http://localhost:3000 and try a YouTube link. You will see placeholder results until APIs are connected.

## Where to add real APIs
- **Client-only:** Swap the `getDemoSummary` and `getDemoTranscript` helpers in `public/app.js` for calls to your hosted APIs. Return an object shaped like `{ title, answer, highlights }` for summaries and `{ transcript }` for transcript requests.
- **Node server (optional):** If you prefer using the included Express server, replace the placeholder values in `server.js` inside the `/api/process` route and wire `/api/transcript` to a real transcript provider.

## Minimal wiring guide (non-technical)
1. Create or grab API keys for a transcript service and an LLM.
2. In `public/app.js`, replace the `getDemoSummary` and `getDemoTranscript` helpers with real API calls that return data in the same shape.
3. If you need a backend instead, update the placeholder variables in `server.js`, run `npm start`, and point `fetch` calls to your own hosted endpoint.

## File overview
- `server.js` — Express server that serves static files and exposes a stub `/api/process` endpoint.
- `public/index.html` — UI with the input form and results layout.
- `public/app.js` — Form handling and rendering logic for results/highlights.
- `public/style.css` — Minimal styling for a clean, single-page experience.

## Notes
- The app intentionally ships without API calls so you can deploy and test the interface immediately.
- Avoid committing API keys; use environment variables when you connect real services.
