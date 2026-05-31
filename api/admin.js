export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  // Admin auth check
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    res.status(401).json({ error: 'Unauthorized' }); return;
  }

  const { match_id, team1, team2, flag1, flag2, score1, score2, analysis } = req.body;
  if (!match_id || !team1 || !team2 || score1 === undefined || score2 === undefined) {
    res.status(400).json({ error: 'Missing required fields' }); return;
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

  try {
    // 1. Get all predictions for this match
    const predRes = await fetch(`${SUPABASE_URL}/rest/v1/predictions?match_id=eq.${match_id}&select=*`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    const predictions = await predRes.json();

    // 2. Calculate points for each prediction
    const pointsUpdates = [];
    for (const pred of predictions) {
      let points = 0;
      const correctResult =
        (score1 > score2 && pred.pred_score1 > pred.pred_score2) ||
        (score1 < score2 && pred.pred_score1 < pred.pred_score2) ||
        (score1 === score2 && pred.pred_score1 === pred.pred_score2);

      if (correctResult) points += 5;
      if (pred.pred_score1 === score1) points += 2;
      if (pred.pred_score2 === score2) points += 2;
      if (pred.pred_score1 === score1 && pred.pred_score2 === score2) points += 1;

      // Update prediction with actual score and points
      await fetch(`${SUPABASE_URL}/rest/v1/predictions?id=eq.${pred.id}`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ actual_score1: score1, actual_score2: score2, points })
      });

      // Update subscriber total points
      const subRes = await fetch(`${SUPABASE_URL}/rest/v1/subscribers?email=eq.${pred.email}&select=total_points`, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
      });
      const subs = await subRes.json();
      if (subs.length > 0) {
        const newTotal = (subs[0].total_points || 0) + points;
        await fetch(`${SUPABASE_URL}/rest/v1/subscribers?email=eq.${pred.email}`, {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ total_points: newTotal })
        });
      }
      pointsUpdates.push({ email: pred.email, points });
    }

    // 3. Get all subscribers for email
    const subsRes = await fetch(`${SUPABASE_URL}/rest/v1/subscribers?select=email,username`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    const subscribers = await subsRes.json();

    // 4. Send emails via send-email endpoint
    const baseUrl = process.env.SITE_URL || 'https://livewc26.com';
    const emailRes = await fetch(`${baseUrl}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ADMIN_SECRET}`
      },
      body: JSON.stringify({
        subscribers,
        match: { team1, team2, flag1: flag1 || '🏳', flag2: flag2 || '🏳' },
        result: { score1, score2, analysis },
        predictions
      })
    });
    const emailResult = await emailRes.json();

    res.status(200).json({
      success: true,
      predictions_updated: predictions.length,
      points_awarded: pointsUpdates,
      emails_sent: emailResult.sent,
      emails_failed: emailResult.failed
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
