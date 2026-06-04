import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const t1 = searchParams.get('t1') || 'Team 1';
  const t2 = searchParams.get('t2') || 'Team 2';
  const s1 = searchParams.get('s1') || '0';
  const s2 = searchParams.get('s2') || '0';
  const f1 = searchParams.get('f1') || '🏳';
  const f2 = searchParams.get('f2') || '🏳';

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          background: '#07080d',
          display: 'flex',
          flexDirection: 'column',
          padding: '0',
          fontFamily: 'Arial Black, Arial, sans-serif',
          position: 'relative',
        },
        children: [
          // Border
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute', inset: '16px',
                border: '1.5px solid rgba(240,192,64,0.3)',
                borderRadius: '16px',
              }
            }
          },
          // Glow
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute', top: '-80px', left: '-80px',
                width: '500px', height: '400px',
                background: 'radial-gradient(circle, rgba(240,192,64,0.08) 0%, transparent 70%)',
                borderRadius: '50%',
              }
            }
          },
          // Content
          {
            type: 'div',
            props: {
              style: {
                display: 'flex', flexDirection: 'column',
                padding: '48px 64px', height: '100%',
              },
              children: [
                // Logo + Tag
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', alignItems: 'center', gap: '0px' },
                          children: [
                            { type: 'span', props: { style: { fontSize: '40px', fontWeight: '900', color: '#ffffff', letterSpacing: '1px' }, children: 'LIVE' } },
                            { type: 'span', props: { style: { fontSize: '40px', fontWeight: '900', color: '#f0c040', letterSpacing: '1px' }, children: 'WC26' } },
                          ]
                        }
                      },
                      {
                        type: 'div',
                        props: {
                          style: { background: 'rgba(240,192,64,0.1)', border: '1px solid rgba(240,192,64,0.25)', borderRadius: '100px', padding: '8px 20px', fontSize: '14px', color: '#f0c040', letterSpacing: '2px' },
                          children: 'MY WC26 PREDICTION'
                        }
                      }
                    ]
                  }
                },
                // Main prediction card
                {
                  type: 'div',
                  props: {
                    style: {
                      flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: '#0f1018', border: '1px solid rgba(240,192,64,0.25)',
                      borderRadius: '20px', padding: '40px 48px', gap: '0px',
                    },
                    children: [
                      // Team 1
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1' },
                          children: [
                            { type: 'div', props: { style: { fontSize: '80px', lineHeight: '1', marginBottom: '12px' }, children: f1 } },
                            { type: 'div', props: { style: { fontSize: '28px', fontWeight: '700', color: '#eeecea', marginBottom: '4px' }, children: t1 } },
                          ]
                        }
                      },
                      // Score
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 40px' },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: { display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '8px' },
                                children: [
                                  { type: 'span', props: { style: { fontSize: '96px', fontWeight: '900', color: '#f0c040', lineHeight: '1' }, children: s1 } },
                                  { type: 'span', props: { style: { fontSize: '64px', fontWeight: '900', color: '#444455' }, children: '—' } },
                                  { type: 'span', props: { style: { fontSize: '96px', fontWeight: '900', color: '#f0c040', lineHeight: '1' }, children: s2 } },
                                ]
                              }
                            },
                            { type: 'div', props: { style: { fontSize: '14px', color: '#7a7a8a', letterSpacing: '2px' }, children: 'MY PREDICTION' } },
                          ]
                        }
                      },
                      // Team 2
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1' },
                          children: [
                            { type: 'div', props: { style: { fontSize: '80px', lineHeight: '1', marginBottom: '12px' }, children: f2 } },
                            { type: 'div', props: { style: { fontSize: '28px', fontWeight: '700', color: '#eeecea', marginBottom: '4px' }, children: t2 } },
                          ]
                        }
                      },
                    ]
                  }
                },
                // Bottom
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' },
                    children: [
                      { type: 'div', props: { style: { fontSize: '20px', color: '#555566' }, children: 'Make your own prediction → livewc26.com' } },
                      { type: 'div', props: { style: { fontSize: '18px', color: '#555566' }, children: '#WorldCup2026' } },
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      width: 1200,
      height: 630,
    }
  );
}
