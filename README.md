# YouTube-transcriber

A simple web app that accepts a YouTube link, pulls the title and transcript, and uses an LLM to summarize the content into highlights. The current build ships with stubbed data so you can verify the UI end-to-end before adding API keys.

## Features
- Paste a YouTube URL and click **Extract**.
- Backend stub that returns a placeholder title, a short answer, and sample categorized highlights.
- Ready-to-wire hooks for a transcript API (e.g., YouTube Transcript) and an LLM (e.g., OpenAI, Anthropic).

## Getting started
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
- **Transcript fetching**: Replace the placeholder transcript in `server.js` inside the `/api/process` route with an actual call to your preferred transcript provider.
- **LLM processing**: After you fetch the transcript, send it to your LLM of choice and format the response as `{ title, answer, highlights }` so the frontend renders it automatically.

## Minimal wiring guide (non-technical)
1. Create or grab API keys for a transcript service and an LLM.
2. In `server.js`, look for the TODO-style placeholder variables (`mockTranscriptSnippet`, `derivedTitle`, `exampleHighlights`). Swap them for real values from your APIs.
3. Restart the server (`npm start`) and refresh the browser.

## File overview
- `server.js` — Express server that serves static files and exposes a stub `/api/process` endpoint.
- `public/index.html` — UI with the input form and results layout.
- `public/app.js` — Form handling and rendering logic for results/highlights.
- `public/style.css` — Minimal styling for a clean, single-page experience.

## Notes
- The app intentionally ships without API calls so you can deploy and test the interface immediately.
- Avoid committing API keys; use environment variables when you connect real services.
