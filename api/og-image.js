export const config = { runtime: 'edge' };

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const t1 = (searchParams.get('t1') || 'Team 1').substring(0, 14);
    const t2 = (searchParams.get('t2') || 'Team 2').substring(0, 14);
    const s1 = searchParams.get('s1') || '0';
    const s2 = searchParams.get('s2') || '0';
    const f1 = searchParams.get('f1') || '⚽';
    const f2 = searchParams.get('f2') || '⚽';

    const { ImageResponse } = await import('https://esm.sh/@vercel/og@0.6.2');

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
            padding: '48px 64px',
            fontFamily: 'sans-serif',
          },
          children: [
            // Top bar
            {
              type: 'div',
              props: {
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: { display: 'flex' },
                      children: [
                        { type: 'span', props: { style: { fontSize: '44px', fontWeight: '900', color: '#ffffff' }, children: 'LIVE' } },
                        { type: 'span', props: { style: { fontSize: '44px', fontWeight: '900', color: '#f0c040' }, children: 'WC26' } },
                      ]
                    }
                  },
                  {
                    type: 'div',
                    props: {
                      style: { background: 'rgba(240,192,64,0.12)', border: '1px solid rgba(240,192,64,0.3)', borderRadius: '100px', padding: '10px 24px', fontSize: '13px', color: '#f0c040', letterSpacing: '2px' },
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
                  {
                    type: 'div',
                    props: {
                      style: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' },
                      children: [
                        // Team 1
                        {
                          type: 'div',
                          props: {
                            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1', gap: '10px' },
                            children: [
                              { type: 'div', props: { style: { fontSize: '72px', lineHeight: '1' }, children: f1 } },
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
                                  style: { display: 'flex', alignItems: 'center', gap: '16px' },
                                  children: [
                                    { type: 'span', props: { style: { fontSize: '110px', fontWeight: '900', color: '#f0c040', lineHeight: '1' }, children: s1 } },
                                    { type: 'span', props: { style: { fontSize: '64px', fontWeight: '900', color: '#333344' }, children: '—' } },
                                    { type: 'span', props: { style: { fontSize: '110px', fontWeight: '900', color: '#f0c040', lineHeight: '1' }, children: s2 } },
                                  ]
                                }
                              },
                              { type: 'div', props: { style: { fontSize: '13px', color: '#7a7a8a', letterSpacing: '3px', marginTop: '6px' }, children: 'MY PREDICTION' } },
                            ]
                          }
                        },
                        // Team 2
                        {
                          type: 'div',
                          props: {
                            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1', gap: '10px' },
                            children: [
                              { type: 'div', props: { style: { fontSize: '72px', lineHeight: '1' }, children: f2 } },
                              { type: 'div', props: { style: { fontSize: '30px', fontWeight: '700', color: '#ffffff', textAlign: 'center' }, children: t2 } },
                            ]
                          }
                        },
                      ]
                    }
                  },
                  {
                    type: 'div',
                    props: {
                      style: { marginTop: '20px', background: 'rgba(240,192,64,0.08)', border: '1px solid rgba(240,192,64,0.2)', borderRadius: '12px', padding: '10px 28px', fontSize: '18px', color: '#f0c040' },
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
                  { type: 'div', props: { style: { fontSize: '17px', color: '#444455' }, children: 'livewc26.com' } },
                  { type: 'div', props: { style: { fontSize: '15px', color: '#444455' }, children: '#WorldCup2026' } },
                ]
              }
            }
          ]
        }
      },
      { width: 1200, height: 630 }
    );
  } catch (e) {
    return Response.redirect('https://livewc26.com/og-image.png', 302);
  }
}
