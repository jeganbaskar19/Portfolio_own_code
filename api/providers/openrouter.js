// =============================================================
// OPENROUTER PROVIDER — ESM
// Calls OpenRouter free models (mistralai/mistral-7b-instruct:free)
// =============================================================

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'mistralai/mistral-7b-instruct:free';

/**
 * @param {string} systemPrompt
 * @param {Array<{role: string, content: string}>} messages
 * @returns {Promise<string>} AI reply text
 */
export async function callOpenRouter(systemPrompt, messages) {
  const apiKey = process.env.openrouterkey || process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY is not set');

  const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://www.jeganbaskar.in',
      'X-Title': 'Jegan Portfolio AI'
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      max_tokens: 400,
      temperature: 0.5
    }),
    signal: AbortSignal.timeout(3500)
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error('OpenRouter returned an empty response');
  return content.trim();
}
