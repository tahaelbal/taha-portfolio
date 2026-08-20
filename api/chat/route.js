const SYSTEM_PROMPT = `You are Taha El Bal's personal portfolio assistant.

Your role is to help visitors quickly understand Taha's professional profile, projects, technical expertise, education, experience, services, and availability.

ABOUT TAHA:
Taha El Bal is a Full Stack Developer and an aspiring AI & Data Engineer. He builds modern, scalable web applications and intelligent solutions, combining strong frontend, backend, data, and AI skills.

YOUR COMMUNICATION STYLE:
- Professional, confident, and friendly.
- Clear and natural, like a professional developer speaking with a potential client or recruiter.
- Keep answers concise but useful.
- Use simple language and avoid unnecessary technical jargon.
- When appropriate, use short bullet points to make information easier to read.
- Respond in the same language as the visitor (English, French, or Arabic).

WHAT YOU CAN DISCUSS:
- Taha's professional profile
- Full Stack development
- Frontend and backend development
- AI and Data Engineering
- Computer vision and machine learning
- Taha's projects and technical achievements
- Technologies and tools he uses
- Education and academic background
- Services he can provide
- Professional interests
- Availability for projects, internships, or collaborations
- How visitors can contact him, when contact information is available in the portfolio

PROJECT QUESTIONS:
When a visitor asks about a project, explain:
1. What the project is.
2. Its main purpose.
3. The technologies used.
4. The problem it solves.
5. The main technical contribution of Taha.

RECRUITERS AND CLIENTS:
If a recruiter asks about Taha's profile, highlight relevant skills, projects, education, and engineering/AI orientation.

If a potential client asks about a project or service, explain how Taha's skills could be relevant to their needs without making unrealistic promises.

ACCURACY:
- Only use information available in the portfolio context.
- Never invent projects, companies, clients, certifications, technologies, years of experience, achievements, contact details, or personal information.
- Never invent prices or guarantees.
- If you do not know the answer, say:
  "I don't have that information available in Taha's portfolio."
- Do not pretend to know information that is not provided.

CONTACT:
If someone wants to contact or hire Taha, direct them to the contact section of the portfolio when available.

IMPORTANT:
You represent Taha's professional portfolio.
Always keep the conversation professional, helpful, concise, and accurate.`;
const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const FALLBACK_MODELS = ["gemini-3.6-flash", "gemini-2.5-flash", "gemini-1.5-flash"];

function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return "messages must be a non-empty array.";
  }

  for (const message of messages) {
    if (
      typeof message !== "object" ||
      message === null ||
      !["user", "assistant", "system"].includes(message.role) ||
      typeof message.content !== "string"
    ) {
      return "Each message must be an object with a valid role and string content.";
    }
  }

  return null;
}

function jsonError(status, message) {
  return { status, body: { error: message } };
}

function parseBody(req) {
  if (!req || req.body == null) {
    return {};
  }

  if (typeof req.body === "string") {
    return JSON.parse(req.body);
  }

  return req.body;
}

function toGeminiContents(messages) {
  return messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));
}

function extractGeminiText(payload) {
  const parts = payload?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) {
    return "";
  }

  return parts
    .map((part) => (typeof part?.text === "string" ? part.text : ""))
    .join("")
    .trim();
}

function writeSseText(res, text) {
  const chunkSize = 90;
  for (let start = 0; start < text.length; start += chunkSize) {
    const delta = text.slice(start, start + chunkSize);
    if (delta) {
      res.write(`data: ${JSON.stringify({ delta })}\n\n`);
    }
  }

  res.write("data: [DONE]\n\n");
  res.end();
}

async function requestGemini({ model, apiKey, messages }) {
  const geminiUrl = `${GEMINI_BASE_URL}/${encodeURIComponent(model)}:generateContent`;
  return fetch(geminiUrl, {
    method: "POST",
    headers: {
      "x-goog-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      generationConfig: {
        temperature: 0.3,
      },
      contents: toGeminiContents(messages),
    }),
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    const error = jsonError(405, "Method not allowed. Use POST.");
    res.status(error.status).json(error.body);
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    const error = jsonError(500, "Missing GEMINI_API_KEY (or GOOGLE_API_KEY) environment variable.");
    res.status(error.status).json(error.body);
    return;
  }

  let body;
  try {
    body = parseBody(req);
  } catch {
    const error = jsonError(400, "Invalid JSON body.");
    res.status(error.status).json(error.body);
    return;
  }

  const validationError = validateMessages(body.messages);
  if (validationError) {
    const error = jsonError(400, validationError);
    res.status(error.status).json(error.body);
    return;
  }

  try {
    const preferredModel = process.env.GEMINI_MODEL || FALLBACK_MODELS[0];
    const modelQueue = [preferredModel, ...FALLBACK_MODELS.filter((model) => model !== preferredModel)];

    let geminiPayload;
    let lastErrorText = "";
    let lastStatus = 500;

    for (const model of modelQueue) {
      const geminiResponse = await requestGemini({ model, apiKey, messages: body.messages });

      if (geminiResponse.ok) {
        geminiPayload = await geminiResponse.json();
        break;
      }

      lastStatus = geminiResponse.status || 500;
      lastErrorText = await geminiResponse.text();
      if (lastStatus !== 404) {
        break;
      }
    }

    if (!geminiPayload) {
      const error = jsonError(lastStatus, lastErrorText || "Gemini request failed.");
      res.status(error.status).json(error.body);
      return;
    }

    const answer = extractGeminiText(geminiPayload);

    if (!answer) {
      const error = jsonError(502, "Gemini returned an empty response.");
      res.status(error.status).json(error.body);
      return;
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    writeSseText(res, answer);
  } catch (error) {
    const message = error?.message || "Unexpected server error.";
    const status = res.headersSent ? 200 : 500;

    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
      res.end();
      return;
    }

    const payload = jsonError(status, message);
    res.status(payload.status).json(payload.body);
  }
}