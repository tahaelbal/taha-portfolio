# Portfolio

## Local development

1. Install dependencies:
   - `npm install`
2. Create a `.env` file based on `.env.example` and add your Gemini API key.
3. Start frontend + backend together:
   - `npm run dev`

The chat widget sends requests to the Express backend, which keeps the Gemini API key on the server and streams the response back to the client.
