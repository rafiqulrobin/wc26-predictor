export default async function handler(req, res) {
  try {
    const { searchParams } = new URL(req.url, 'https://livewc26.com');
    const t1 = (searchParams.get('t1') || 'Team 1').substring(0, 14);
    const t2 = (searchParams.get('t2') || 'Team 2').substring(0, 14);
    const s1 = searchParams.get('s1') || '0';
    const s2 = searchParams.get('s2') || '0';

    // Generate SVG — Facebook actually supports SVG via some crawlers
    // But we'll use a proper PNG via htmlcsstoimage free API
    const htmlContent = `<html><head><style>*{margin:0;padding:0;box-sizing:border-box}body{width:1200px;height:630px;background:#07080d;font-family:Arial Black,Arial,sans-serif;display:flex;flex-direction:column;padding:48px 64px}.top{display:flex;justify-content:space-between;align-items:center;margin-bottom:28px}.logo{font-size:44px;font-weight:900;color:#fff}.logo b{color:#f0c040}.tag{background:rgba(240,192,64,0.12);border:1px solid rgba(240,192,64,0.3);border-radius:50px;padding:10px 24px;font-size:13px;color:#f0c040;letter-spacing:2px}.card{flex:1;background:#0f1018;border:1px solid rgba(240,192,64,0.25);border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center}.row{display:flex;align-items:center;justify-content:center;width:100%;gap:0}.team{flex:1;text-align:center;font-size:34px;font-weight:900;color:#fff}.scores{display:flex;align-items:center;gap:16px;padding:0 40px}.s{font-size:120px;font-weight:900;color:#f0c040;line-height:1}.d{font-size:64px;color:#333}.lbl{font-size:13px;color:#7a7a8a;letter-spacing:3px;margin-top:6px}.cta{margin-top:20px;background:rgba(240,192,64,0.08);border:1px solid rgba(240,192,64,0.2);border-radius:12px;padding:10px 28px;font-size:17px;color:#f0c040}.bot{display:flex;justify-content:space-between;margin-top:20px;font-size:17px;color:#444}</style></head><body><div class="top"><div class="logo">LIVE<b>WC26</b></div><div class="tag">MY WC26 PREDICTION</div></div><div class="card"><div class="row"><div class="team">${t1}</div><div style="display:flex;flex-direction:column;align-items:center;padding:0 32px"><div class="scores"><span class="s">${s1}</span><span class="d">—</span><span class="s">${s2}</span></div><div class="lbl">MY PREDICTION</div></div><div class="team">${t2}</div></div><div class="cta">Make your prediction → livewc26.com</div></div><div class="bot"><span>livewc26.com</span><span>#WorldCup2026</span></div></body></html>`;

    // Use hcti.io (htmlcsstoimage) - free tier allows 50 images/month
    // OR use a simpler approach: serve SVG that Facebook can render
    
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#07080d"/>
  <ellipse cx="150" cy="150" rx="350" ry="250" fill="#f0c040" opacity="0.06"/>
  <rect x="16" y="16" width="1168" height="598" rx="16" fill="none" stroke="#f0c040" stroke-opacity="0.25" stroke-width="1.5"/>
  
  <text x="72" y="96" font-family="Arial Black,Arial" font-weight="900" font-size="46" fill="#ffffff">LIVE</text>
  <text x="238" y="96" font-family="Arial Black,Arial" font-weight="900" font-size="46" fill="#f0c040">WC26</text>
  
  <rect x="820" y="62" width="332" height="48" rx="24" fill="rgba(240,192,64,0.12)" stroke="#f0c040" stroke-opacity="0.3" stroke-width="1"/>
  <text x="986" y="91" text-anchor="middle" font-family="Arial" font-size="13" fill="#f0c040" letter-spacing="2">MY WC26 PREDICTION</text>
  
  <rect x="80" y="140" width="1040" height="348" rx="20" fill="#0f1018" stroke="#f0c040" stroke-opacity="0.2" stroke-width="1"/>
  
  <text x="290" y="340" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="44" fill="#ffffff">${t1}</text>
  <text x="910" y="340" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="44" fill="#ffffff">${t2}</text>
  
  <text x="520" y="360" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="130" fill="#f0c040">${s1}</text>
  <text x="600" y="330" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="64" fill="#333344">—</text>
  <text x="680" y="360" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="130" fill="#f0c040">${s2}</text>
  
  <text x="600" y="450" text-anchor="middle" font-family="Arial" font-size="14" fill="#7a7a8a" letter-spacing="3">MY PREDICTION</text>
  
  <rect x="220" y="500" width="760" height="48" rx="12" fill="rgba(240,192,64,0.08)" stroke="#f0c040" stroke-opacity="0.2" stroke-width="1"/>
  <text x="600" y="530" text-anchor="middle" font-family="Arial" font-size="19" fill="#f0c040">Make your own prediction at livewc26.com</text>
  
  <text x="72" y="600" font-family="Arial" font-size="17" fill="#444455">livewc26.com</text>
  <text x="1128" y="600" text-anchor="end" font-family="Arial" font-size="15" fill="#444455">#WorldCup2026</text>
</svg>`;

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(svg);

  } catch (e) {
    res.redirect(302, 'https://livewc26.com/og-image.png');
  }
}
