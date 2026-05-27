export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { team1, team2 } = req.body;
  if (!team1 || !team2) { res.status(400).json({ error: 'Missing teams' }); return; }

  const prompt = `You are an expert football analyst for the 2026 FIFA World Cup. Analyze this match:
${team1.name} (FIFA ${team1.rank}, strength: ${team1.strength}/100) vs ${team2.name} (FIFA ${team2.rank}, strength: ${team2.strength}/100)
Respond ONLY with valid JSON:
{"team1_win_prob":NUMBER,"team2_win_prob":NUMBER,"draw_prob":NUMBER,"predicted_winner":"NAME or Draw","confidence":"Low|Medium|High","summary":"2-3 sentence exciting analysis","key_factors":[{"label":"factor","value":"short value","team":"team1|team2|neutral"},{"label":"factor","value":"short value","team":"team1|team2|neutral"},{"label":"factor","value":"short value","team":"team1|team2|neutral"},{"label":"factor","value":"short value","team":"team1|team2|neutral"}]}
Probabilities must sum to 100. Be realistic and insightful.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    if (data.error) { res.status(500).json({ error: data.error.message }); return; }
    const text = data.content[0].text.replace(/```json|```/g, '').trim();
    const pred = JSON.parse(text);
    res.status(200).json(pred);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
