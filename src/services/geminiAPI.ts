const GEMINI_API_KEY = 'yAIzaSyDrdQ7ss9zqtQZaAEU2nQsi04hTYmUUqfM';
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function fetchGeminiAdvice(weather: string, temperature: number) {
  const prompt = `
Cuaca hari ini adalah ${weather} dengan suhu sekitar ${temperature}°C.
Buatkan rekomendasi perawatan tanaman berdasarkan kondisi ini.
Gunakan format per-point dan berikan penjelasan singkat tiap poin.
`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  return result?.candidates?.[0]?.content?.parts?.[0]?.text || "Tidak ada rekomendasi.";
}
