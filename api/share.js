export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const t1 = (searchParams.get('t1') || 'Team 1').substring(0, 14);
  const t2 = (searchParams.get('t2') || 'Team 2').substring(0, 14);
  const s1 = searchParams.get('s1') || '0';
  const s2 = searchParams.get('s2') || '0';
  const f1 = searchParams.get('f1') || '';
  const f2 = searchParams.get('f2') || '';

  const title = `${f1} ${t1} ${s1}–${s2} ${t2} ${f2} — My WC26 Prediction`;
  const desc = `I predicted ${t1} ${s1}-${s2} ${t2} in World Cup 2026! Can you beat my score? livewc26.com`;
  const imgUrl = `https://wc26-og.vercel.app/api/og?t1=${encodeURIComponent(t1)}&t2=${encodeURIComponent(t2)}&s1=${s1}&s2=${s2}`;
  const pageUrl = `https://livewc26.com/api/share?t1=${encodeURIComponent(t1)}&t2=${encodeURIComponent(t2)}&s1=${s1}&s2=${s2}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${imgUrl}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/png">
<meta property="og:url" content="${pageUrl}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="LiveWC26">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${imgUrl}">
</head>
<body style="background:#07080d;color:#eeecea;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;flex-direction:column;gap:16px;">
<div style="font-size:32px;font-weight:900;">LIVE<span style="color:#f0c040;">WC26</span></div>
<p style="color:#7a7a8a;">${t1} ${s1}–${s2} ${t2}</p>
<script>setTimeout(()=>{window.location.href='https://livewc26.com/?tab=game'},200);</script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache',
      'X-Robots-Tag': 'noindex',
    }
  });
}
