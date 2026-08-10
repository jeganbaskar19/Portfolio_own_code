// =============================================================
// GOOGLE GEMINI PROVIDER
// Calls Gemini 1.5 Flash REST API (free tier: 1,500 req/day)
// Used as secondary fallback when Groq is unavailable.
// =============================================================

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * @param {string} systemPrompt
 * @param {Array<{role: string, content: string}>} messages
 * @returns {Promise<string>} AI reply text
 */
async function callGemini(systemPrompt, messages) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  // Gemini uses 'user'/'model' roles (not 'assistant')
  const geminiMessages = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: geminiMessages,
      generationConfig: {
        maxOutputTokens: 400,
        temperature: 0.5
      }
    }),
    signal: AbortSignal.timeout(12000)
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) throw new Error('Gemini returned an empty response');
  return content.trim();
}

module.exports = { callGemini };
