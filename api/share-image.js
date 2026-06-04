export default async function handler(req, res) {
  const { t1, t2, s1, s2, f1, f2 } = req.query || Object.fromEntries(new URL(req.url, 'https://livewc26.com').searchParams);

  const team1 = t1 || 'Team 1';
  const team2 = t2 || 'Team 2';
  const score1 = s1 || '0';
  const score2 = s2 || '0';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
<rect width="1200" height="630" fill="#07080d"/>
<ellipse cx="200" cy="200" rx="400" ry="300" fill="#f0c040" opacity="0.05"/>
<rect x="16" y="16" width="1168" height="598" rx="16" fill="none" stroke="#f0c040" stroke-opacity="0.25" stroke-width="1.5"/>

<text x="72" y="96" font-family="Arial Black, Arial" font-weight="900" font-size="46" fill="#ffffff">LIVE</text>
<text x="238" y="96" font-family="Arial Black, Arial" font-weight="900" font-size="46" fill="#f0c040">WC26</text>

<rect x="820" y="68" width="320" height="44" rx="22" fill="rgba(240,192,64,0.1)" stroke="#f0c040" stroke-opacity="0.25" stroke-width="1"/>
<text x="980" y="95" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#f0c040" letter-spacing="2">MY WC26 PREDICTION</text>

<line x1="72" y1="116" x2="1128" y2="116" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1"/>

<rect x="120" y="160" width="960" height="320" rx="20" fill="#0f1018" stroke="#f0c040" stroke-opacity="0.2" stroke-width="1"/>

<text x="316" y="300" text-anchor="middle" font-family="Arial Black, Arial" font-weight="900" font-size="48" fill="#ffffff">${team1.substring(0,10)}</text>

<text x="600" y="260" text-anchor="middle" font-family="Arial Black, Arial" font-weight="900" font-size="120" fill="#f0c040" dominant-baseline="central">${score1}</text>
<text x="600" y="340" text-anchor="middle" font-family="Arial Black, Arial" font-weight="900" font-size="48" fill="#444455">—</text>
<text x="600" y="420" text-anchor="middle" font-family="Arial Black, Arial" font-weight="900" font-size="120" fill="#f0c040" dominant-baseline="central">${score2}</text>

<text x="884" y="300" text-anchor="middle" font-family="Arial Black, Arial" font-weight="900" font-size="48" fill="#ffffff">${team2.substring(0,10)}</text>

<text x="316" y="440" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#7a7a8a">vs</text>
<text x="884" y="440" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#7a7a8a">vs</text>

<rect x="200" y="500" width="800" height="48" rx="10" fill="rgba(240,192,64,0.08)" stroke="#f0c040" stroke-opacity="0.2" stroke-width="1"/>
<text x="600" y="530" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#f0c040">Make your own prediction → livewc26.com</text>

<text x="72" y="595" font-family="Arial, sans-serif" font-size="18" fill="#444455">livewc26.com</text>
<text x="1128" y="595" text-anchor="end" font-family="Arial, sans-serif" font-size="16" fill="#444455">#WorldCup2026</text>
</svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(svg);
}
