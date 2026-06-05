const { createCanvas } = require('canvas');

module.exports = async function handler(req, res) {
  try {
    const t1 = (req.query.t1 || 'Team 1').substring(0, 14);
    const t2 = (req.query.t2 || 'Team 2').substring(0, 14);
    const s1 = req.query.s1 || '0';
    const s2 = req.query.s2 || '0';

    const width = 1200;
    const height = 630;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#07080d';
    ctx.fillRect(0, 0, width, height);

    // Glow effect
    const grd = ctx.createRadialGradient(150, 150, 0, 150, 150, 400);
    grd.addColorStop(0, 'rgba(240,192,64,0.10)');
    grd.addColorStop(1, 'rgba(240,192,64,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    // Border
    ctx.strokeStyle = 'rgba(240,192,64,0.25)';
    ctx.lineWidth = 1.5;
    roundRect(ctx, 16, 16, width - 32, height - 32, 16);
    ctx.stroke();

    // Logo
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('LIVE', 72, 96);
    ctx.fillStyle = '#f0c040';
    ctx.fillText('WC26', 170, 96);

    // Tag pill
    ctx.fillStyle = 'rgba(240,192,64,0.12)';
    roundRect(ctx, 820, 60, 332, 48, 24);
    ctx.fill();
    ctx.strokeStyle = 'rgba(240,192,64,0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#f0c040';
    ctx.font = '13px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('MY WC26 PREDICTION', 986, 89);

    // Divider
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(72, 116);
    ctx.lineTo(1128, 116);
    ctx.stroke();

    // Main card
    ctx.fillStyle = '#0f1018';
    roundRect(ctx, 80, 140, 1040, 348, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(240,192,64,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Team 1
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(t1, 290, 340);

    // Score 1
    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 130px Arial';
    ctx.fillText(s1, 490, 370);

    // Dash
    ctx.fillStyle = '#333344';
    ctx.font = 'bold 70px Arial';
    ctx.fillText('—', 600, 340);

    // Score 2
    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 130px Arial';
    ctx.fillText(s2, 710, 370);

    // Team 2
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px Arial';
    ctx.fillText(t2, 910, 340);

    // MY PREDICTION label
    ctx.fillStyle = '#7a7a8a';
    ctx.font = '14px Arial';
    ctx.fillText('MY PREDICTION', 600, 450);

    // CTA bar
    ctx.fillStyle = 'rgba(240,192,64,0.08)';
    roundRect(ctx, 220, 500, 760, 48, 12);
    ctx.fill();
    ctx.strokeStyle = 'rgba(240,192,64,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#f0c040';
    ctx.font = '19px Arial';
    ctx.fillText('Make your own prediction at livewc26.com', 600, 530);

    // Bottom
    ctx.fillStyle = '#444455';
    ctx.font = '17px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('livewc26.com', 72, 600);
    ctx.textAlign = 'right';
    ctx.fillText('#WorldCup2026', 1128, 600);

    const buffer = canvas.toBuffer('image/png');
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(buffer);

  } catch (e) {
    res.redirect(302, 'https://livewc26.com/og-image.png');
  }
};

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
