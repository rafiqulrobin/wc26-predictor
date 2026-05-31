export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  // Simple admin auth
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    res.status(401).json({ error: 'Unauthorized' }); return;
  }

  const { subscribers, match, result, predictions } = req.body;
  if (!subscribers || !match || !result) {
    res.status(400).json({ error: 'Missing data' }); return;
  }

  const results = [];

  for (const sub of subscribers) {
    // Find this subscriber's prediction
    const pred = predictions?.find(p => p.email === sub.email);
    
    // Calculate points
    let points = 0;
    let pointsBreakdown = '';
    
    if (pred) {
      const correctResult = 
        (result.score1 > result.score2 && pred.pred_score1 > pred.pred_score2) ||
        (result.score1 < result.score2 && pred.pred_score1 < pred.pred_score2) ||
        (result.score1 === result.score2 && pred.pred_score1 === pred.pred_score2);
      
      if (correctResult) points += 5;
      if (pred.pred_score1 === result.score1) points += 2;
      if (pred.pred_score2 === result.score2) points += 2;
      if (pred.pred_score1 === result.score1 && pred.pred_score2 === result.score2) points += 1;
      
      pointsBreakdown = `
        <div style="background:#1a1a24;border-radius:10px;padding:16px;margin:16px 0;">
          <p style="color:#7a7a8a;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">YOUR PREDICTION</p>
          <p style="color:#f0c040;font-size:20px;font-weight:700;margin-bottom:12px;">${match.team1} ${pred.pred_score1} — ${pred.pred_score2} ${match.team2}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${correctResult ? '<span style="background:rgba(62,207,142,0.15);color:#3ecf8e;padding:4px 10px;border-radius:100px;font-size:12px;">✓ Result correct +5pts</span>' : '<span style="background:rgba(240,96,96,0.1);color:#f09595;padding:4px 10px;border-radius:100px;font-size:12px;">✗ Result wrong</span>'}
            ${pred.pred_score1 === result.score1 ? '<span style="background:rgba(62,207,142,0.15);color:#3ecf8e;padding:4px 10px;border-radius:100px;font-size:12px;">✓ Goal 1 correct +2pts</span>' : ''}
            ${pred.pred_score2 === result.score2 ? '<span style="background:rgba(62,207,142,0.15);color:#3ecf8e;padding:4px 10px;border-radius:100px;font-size:12px;">✓ Goal 2 correct +2pts</span>' : ''}
            ${pred.pred_score1 === result.score1 && pred.pred_score2 === result.score2 ? '<span style="background:rgba(240,192,64,0.15);color:#f0c040;padding:4px 10px;border-radius:100px;font-size:12px;">⭐ Perfect score +1pt</span>' : ''}
          </div>
          <p style="color:#f0c040;font-size:24px;font-weight:700;margin-top:12px;">+${points} points earned!</p>
        </div>
      `;
    }

    const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#07080d;font-family:'DM Sans',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    
    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <p style="font-size:24px;font-weight:900;letter-spacing:0.04em;color:#eeecea;margin:0;">LIVE<span style="color:#f0c040;">WC26</span></p>
      <p style="color:#7a7a8a;font-size:13px;margin-top:4px;">World Cup 2026 · Match Result</p>
    </div>

    <!-- Match Result -->
    <div style="background:#0f1018;border:1px solid rgba(240,192,64,0.3);border-radius:16px;padding:28px;text-align:center;margin-bottom:20px;">
      <p style="color:#7a7a8a;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px;">FULL TIME</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:20px;">
        <div style="text-align:center;">
          <p style="font-size:32px;margin:0;">${match.flag1}</p>
          <p style="color:#eeecea;font-size:15px;font-weight:500;margin:6px 0 0;">${match.team1}</p>
        </div>
        <div style="text-align:center;">
          <p style="font-family:Georgia,serif;font-size:48px;font-weight:900;color:#f0c040;margin:0;line-height:1;">${result.score1} — ${result.score2}</p>
        </div>
        <div style="text-align:center;">
          <p style="font-size:32px;margin:0;">${match.flag2}</p>
          <p style="color:#eeecea;font-size:15px;font-weight:500;margin:6px 0 0;">${match.team2}</p>
        </div>
      </div>
      <div style="margin-top:16px;padding:10px 20px;background:rgba(240,192,64,0.1);border-radius:100px;display:inline-block;">
        <p style="color:#f0c040;font-size:14px;font-weight:500;margin:0;">
          ${result.score1 > result.score2 ? `🏆 ${match.team1} wins!` : result.score1 < result.score2 ? `🏆 ${match.team2} wins!` : '🤝 Draw!'}
        </p>
      </div>
    </div>

    <!-- Your Prediction -->
    ${pred ? pointsBreakdown : `
      <div style="background:#0f1018;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:16px;margin-bottom:20px;text-align:center;">
        <p style="color:#7a7a8a;font-size:14px;margin:0;">You didn't predict this match — <a href="https://livewc26.com" style="color:#f0c040;">predict the next one!</a></p>
      </div>
    `}

    <!-- AI Analysis -->
    <div style="background:#0f1018;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;margin-bottom:20px;">
      <p style="color:#7a7a8a;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">AI MATCH ANALYSIS</p>
      <p style="color:#eeecea;font-size:14px;line-height:1.7;margin:0;">${result.analysis || `${match.team1} vs ${match.team2} delivered an exciting match at the World Cup 2026. The final score of ${result.score1}-${result.score2} reflected the balance of play throughout the 90 minutes.`}</p>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:24px;">
      <a href="https://livewc26.com" style="background:#f0c040;color:#07080d;padding:14px 32px;border-radius:12px;font-weight:700;font-size:16px;text-decoration:none;display:inline-block;">Predict Next Match →</a>
    </div>

    <!-- VPN -->
    <div style="background:#0f1018;border:1px solid rgba(240,192,64,0.15);border-radius:12px;padding:16px;text-align:center;margin-bottom:24px;">
      <p style="color:#eeecea;font-size:14px;margin:0 0 8px;">📺 Watching the World Cup? Stream every match free with VPN</p>
      <a href="https://nordvpn.com" style="color:#f0c040;font-size:13px;text-decoration:none;">Get NordVPN — 63% off →</a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;border-top:1px solid rgba(255,255,255,0.06);padding-top:20px;">
      <p style="color:#444455;font-size:12px;margin:0;">livewc26.com · World Cup 2026 Predictor</p>
      <p style="color:#444455;font-size:12px;margin:4px 0 0;">You're receiving this because you subscribed at livewc26.com</p>
    </div>

  </div>
</body>
</html>`;

    try {
      const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY
        },
        body: JSON.stringify({
          sender: { name: 'LiveWC26', email: 'noreply@livewc26.com' },
          to: [{ email: sub.email, name: sub.username }],
          subject: `⚽ ${match.team1} ${result.score1}–${result.score2} ${match.team2} | Match Result`,
          htmlContent: emailHtml
        })
      });
      
      if (emailRes.ok) {
        results.push({ email: sub.email, status: 'sent', points });
      } else {
        const err = await emailRes.json();
        results.push({ email: sub.email, status: 'failed', error: err.message });
      }
    } catch (e) {
      results.push({ email: sub.email, status: 'error', error: e.message });
    }
  }

  res.status(200).json({ success: true, sent: results.filter(r => r.status === 'sent').length, failed: results.filter(r => r.status !== 'sent').length, results });
}
