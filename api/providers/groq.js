// =============================================================
// GROQ PROVIDER — ESM
// Calls Groq's OpenAI-compatible API (free tier: 14,400 req/day)
// Model: llama-3.1-8b-instant (fast, capable, free)
// =============================================================

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'llama-3.1-8b-instant';

/**
 * @param {string} systemPrompt
 * @param {Array<{role: string, content: string}>} messages
 * @returns {Promise<string>} AI reply text
 */
export async function callGroq(systemPrompt, messages) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY is not set');

  const model = process.env.AI_MODEL || DEFAULT_MODEL;

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      max_tokens: 250,
      temperature: 0.5,
      stream: false
    }),
    signal: AbortSignal.timeout(3500)
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error('Groq returned an empty response');
  return content.trim();
}
