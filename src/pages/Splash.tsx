import { IonContent, IonPage } from '@ionic/react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Splash: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    // Ionic keeps previous pages mounted; only redirect while Splash is active.
    if (pathname !== '/splash') return;

    const timer = setTimeout(() => {
        navigate('/about', { replace: true });
    }, 2000);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(navTimer);
    };
  }, [navigate, pathname]);

  const statusLabel =
    progress < 40
      ? 'Inicializando entorno...'
      : progress < 85
        ? 'Sincronizando módulos de Pulse...'
        : 'Listo para continuar';

  const pillars = [
    { code: '01', title: 'Colaboración', subtitle: 'Equipos en tiempo real' },
    { code: '02', title: 'Productividad', subtitle: 'Flujos sin fricción' },
    { code: '03', title: 'Interacción', subtitle: 'Experiencia móvil' },
  ];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': '#0b0b0b', '--color': '#ffffff' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 16px',
            }}
          >
            <IonTitle
              style={{
                fontSize: '13px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontWeight: '500',
                padding: 0,
              }}
            >
              workme
            </IonTitle>
            <span
              style={{
                background: '#141414',
                border: '1px solid #222222',
                borderRadius: '999px',
                padding: '4px 10px',
                fontSize: '10px',
                color: '#888888',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              2026 • Grupo A
            </span>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        className="ion-padding"
        style={{
          '--background': '#0b0b0b',
          color: '#ffffff',
        }}
      >
        <style>{`
          @keyframes splashFadeUp {
            from {
              opacity: 0;
              transform: translateY(14px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes splashPulseRing {
            0% {
              transform: scale(0.92);
              opacity: 0.55;
            }
            70% {
              transform: scale(1.38);
              opacity: 0;
            }
            100% {
              transform: scale(1.38);
              opacity: 0;
            }
          }

          @keyframes splashWaveDash {
            0% {
              stroke-dashoffset: 120;
            }
            50% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: -120;
            }
          }

          @keyframes splashDotBlink {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.35;
              transform: scale(0.85);
            }
          }

          .splash-wrapper {
            min-height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            background: radial-gradient(
              circle at 50% 26%,
              rgba(244, 244, 240, 0.055) 0%,
              rgba(11, 11, 11, 0) 64%
            );
          }

          .splash-hero {
            margin: auto 0;
            padding: 16px 0 24px 0;
            animation: splashFadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
          }

          .splash-emblem-wrap {
            position: relative;
            width: 84px;
            height: 84px;
            margin-bottom: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .splash-ring {
            position: absolute;
            inset: 0;
            border-radius: 24px;
            border: 1px solid rgba(244, 244, 240, 0.22);
            animation: splashPulseRing 2.6s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
          }

          .splash-ring-delayed {
            animation-delay: 1.3s;
          }

          .splash-emblem-box {
            position: relative;
            z-index: 2;
            width: 84px;
            height: 84px;
            border-radius: 24px;
            background: linear-gradient(145deg, #181818 0%, #101010 100%);
            border: 1px solid #262626;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 16px 36px rgba(0, 0, 0, 0.65);
          }

          .splash-wave-path {
            stroke-dasharray: 120;
            animation: splashWaveDash 2.8s ease-in-out infinite;
          }

          .splash-pillars-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-top: 28px;
          }

          @media (max-width: 380px) {
            .splash-pillars-grid {
              grid-template-columns: 1fr;
            }
          }

          .splash-pillar-card {
            background: #141414;
            border: 1px solid #222222;
            border-radius: 16px;
            padding: 14px 12px;
            transition: border-color 0.25s ease, transform 0.25s ease;
          }

          .splash-pillar-card:hover {
            border-color: #333333;
            transform: translateY(-2px);
          }
        `}</style>

        <div className="splash-wrapper">
          {/* Bloque Central Hero */}
          <div className="splash-hero">
            {/* Emblema animado de Pulse */}
            <div className="splash-emblem-wrap" aria-hidden="true">
              <div className="splash-ring" />
              <div className="splash-ring splash-ring-delayed" />
              <div className="splash-emblem-box">
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 24H14L18.5 13L24.5 35L30 19L34 24H42"
                    stroke="#2a2a2a"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    className="splash-wave-path"
                    d="M6 24H14L18.5 13L24.5 35L30 19L34 24H42"
                    stroke="#f4f4f0"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Etiqueta Superior */}
            <IonText
              color="medium"
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                color: '#888888',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#f4f4f0',
                  display: 'inline-block',
                  animation: 'splashDotBlink 1.8s ease-in-out infinite',
                }}
              />
              DISEÑO DE INTERFACES MÓVILES
            </IonText>

            {/* Título Principal con el estilo tipográfico del proyecto */}
            <h1
              style={{
                fontSize: '46px',
                fontWeight: '800',
                lineHeight: '1.06',
                margin: '0 0 6px 0',
                letterSpacing: '-1.5px',
              }}
            >
              <span style={{ color: '#ffffff' }}>Pulse</span>
              <br />
              <span style={{ color: '#666666' }}>by Workme.</span>
            </h1>

            {/* Descripción */}
            <p
              style={{
                color: '#888888',
                fontSize: '14px',
                marginTop: '16px',
                lineHeight: '1.55',
                maxWidth: '460px',
              }}
            >
              Una experiencia concebida para potenciar la{' '}
              <strong style={{ color: '#cccccc' }}>colaboración</strong>, la{' '}
              <strong style={{ color: '#cccccc' }}>productividad</strong> y la{' '}
              <strong style={{ color: '#cccccc' }}>interacción</strong> en
              equipos de alto rendimiento.
            </p>

            {/* Tarjetas de Pilares Temáticos */}
            <div className="splash-pillars-grid">
              {pillars.map((pillar) => (
                <div key={pillar.code} className="splash-pillar-card">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '10px',
                        color: '#555555',
                        fontWeight: '600',
                        letterSpacing: '1px',
                      }}
                    >
                      {pillar.code}
                    </span>
                    <span
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: '#333333',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      color: '#ffffff',
                      fontWeight: '700',
                      fontSize: '13px',
                      marginBottom: '2px',
                    }}
                  >
                    {pillar.title}
                  </div>
                  <div
                    style={{
                      color: '#777777',
                      fontSize: '11px',
                      lineHeight: '1.35',
                    }}
                  >
                    {pillar.subtitle}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bloque Inferior de Carga y Navegación */}
          <div>
            {/* Barra de progreso minimalista */}
            <div
              style={{
                background: '#141414',
                border: '1px solid #222222',
                borderRadius: '16px',
                padding: '14px 16px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    color: '#999999',
                    letterSpacing: '0.5px',
                  }}
                >
                  {statusLabel}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#f4f4f0',
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '0.5px',
                  }}
                >
                  {Math.round(progress)}%
                </span>
              </div>

              <div
                style={{
                  width: '100%',
                  height: '4px',
                  background: '#222222',
                  borderRadius: '999px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: '#f4f4f0',
                    borderRadius: '999px',
                    transition: 'width 0.08s linear',
                  }}
                />
              </div>
            </div>

            {/* Botón de acceso directo siguiendo el estilo de About.tsx */}
            <div style={{ marginBottom: '16px' }}>
              <IonButton
                expand="block"
                shape="round"
                style={{
                  '--background': '#f4f4f0',
                  '--color': '#000000',
                  fontWeight: '600',
                  fontSize: '15px',
                  height: '50px',
                  textTransform: 'none',
                }}
                onClick={() => navigate('/about')}
              >
                Explorar proyecto
                <IonIcon
                  icon={arrowForwardOutline}
                  slot="end"
                  style={{ color: '#000000' }}
                />
              </IonButton>
            </div>

            {/* Numeración inferior sincronizada con About (02 / 03) */}
            <div style={{ textAlign: 'center', paddingBottom: '10px' }}>
              <span
                style={{
                  fontSize: '11px',
                  color: '#444444',
                  letterSpacing: '1px',
                }}
              >
                01 / 03
              </span>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Splash;
