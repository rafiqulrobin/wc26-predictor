import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

export const config = { runtime: 'nodejs' };

export default async function handler(req, res) {
  try {
    const { searchParams } = new URL(req.url, 'https://livewc26.com');
    const t1 = searchParams.get('t1') || 'Team 1';
    const t2 = searchParams.get('t2') || 'Team 2';
    const s1 = searchParams.get('s1') || '0';
    const s2 = searchParams.get('s2') || '0';
    const f1 = searchParams.get('f1') || '⚽';
    const f2 = searchParams.get('f2') || '⚽';

    const svg = await satori(
      {
        type: 'div',
        props: {
          style: {
            width: '1200px',
            height: '630px',
            background: 'linear-gradient(135deg, #07080d 0%, #0f1018 100%)',
            display: 'flex',
            flexDirection: 'column',
            padding: '48px 64px',
            fontFamily: 'sans-serif',
            position: 'relative',
          },
          children: [
            // Top bar
            {
              type: 'div',
              props: {
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: { display: 'flex', gap: '0px' },
                      children: [
                        { type: 'span', props: { style: { fontSize: '44px', fontWeight: '900', color: '#ffffff' }, children: 'LIVE' } },
                        { type: 'span', props: { style: { fontSize: '44px', fontWeight: '900', color: '#f0c040' }, children: 'WC26' } },
                      ]
                    }
                  },
                  {
                    type: 'div',
                    props: {
                      style: { background: 'rgba(240,192,64,0.12)', border: '1px solid rgba(240,192,64,0.3)', borderRadius: '100px', padding: '10px 24px', fontSize: '15px', color: '#f0c040', letterSpacing: '2px' },
                      children: 'MY WC26 PREDICTION'
                    }
                  }
                ]
              }
            },
            // Main card
            {
              type: 'div',
              props: {
                style: {
                  flex: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#0f1018',
                  border: '1px solid rgba(240,192,64,0.25)',
                  borderRadius: '20px',
                  padding: '32px',
                },
                children: [
                  // Teams + Score row
                  {
                    type: 'div',
                    props: {
                      style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0px', width: '100%' },
                      children: [
                        // Team 1
                        {
                          type: 'div',
                          props: {
                            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1' },
                            children: [
                              { type: 'div', props: { style: { fontSize: '72px', lineHeight: '1', marginBottom: '12px' }, children: f1 } },
                              { type: 'div', props: { style: { fontSize: '30px', fontWeight: '700', color: '#ffffff', textAlign: 'center' }, children: t1 } },
                            ]
                          }
                        },
                        // Score
                        {
                          type: 'div',
                          props: {
                            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 32px' },
                            children: [
                              {
                                type: 'div',
                                props: {
                                  style: { display: 'flex', alignItems: 'center', gap: '20px' },
                                  children: [
                                    { type: 'span', props: { style: { fontSize: '108px', fontWeight: '900', color: '#f0c040', lineHeight: '1' }, children: s1 } },
                                    { type: 'span', props: { style: { fontSize: '72px', fontWeight: '900', color: '#333344' }, children: '—' } },
                                    { type: 'span', props: { style: { fontSize: '108px', fontWeight: '900', color: '#f0c040', lineHeight: '1' }, children: s2 } },
                                  ]
                                }
                              },
                              { type: 'div', props: { style: { fontSize: '14px', color: '#7a7a8a', letterSpacing: '3px', marginTop: '8px' }, children: 'MY PREDICTION' } },
                            ]
                          }
                        },
                        // Team 2
                        {
                          type: 'div',
                          props: {
                            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1' },
                            children: [
                              { type: 'div', props: { style: { fontSize: '72px', lineHeight: '1', marginBottom: '12px' }, children: f2 } },
                              { type: 'div', props: { style: { fontSize: '30px', fontWeight: '700', color: '#ffffff', textAlign: 'center' }, children: t2 } },
                            ]
                          }
                        },
                      ]
                    }
                  },
                  // CTA
                  {
                    type: 'div',
                    props: {
                      style: { marginTop: '24px', background: 'rgba(240,192,64,0.08)', border: '1px solid rgba(240,192,64,0.2)', borderRadius: '12px', padding: '12px 32px', fontSize: '18px', color: '#f0c040' },
                      children: 'Make your own prediction → livewc26.com'
                    }
                  }
                ]
              }
            },
            // Bottom
            {
              type: 'div',
              props: {
                style: { display: 'flex', justifyContent: 'space-between', marginTop: '20px' },
                children: [
                  { type: 'div', props: { style: { fontSize: '18px', color: '#444455' }, children: 'livewc26.com' } },
                  { type: 'div', props: { style: { fontSize: '16px', color: '#444455' }, children: '#WorldCup2026' } },
                ]
              }
            }
          ]
        }
      },
      {
        width: 1200,
        height: 630,
        fonts: [],
      }
    );

    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
    const png = resvg.render().asPng();

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).send(Buffer.from(png));

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
