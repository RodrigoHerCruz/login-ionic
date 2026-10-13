import { IonContent, IonIcon, IonPage, useIonViewWillEnter } from '@ionic/react';
import { arrowBackOutline, arrowForwardOutline, checkmarkOutline, logInOutline, sparklesOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);
  useIonViewWillEnter(() => setEntered(false));
  return (
    <IonPage>
      <IonContent fullscreen className="pulse-login">
        <div className="login-shell">
          <header className="login-brand"><span className="pulse-mark" aria-hidden="true">➤</span>workme</header>
          <main className="login-main">
            <button className="login-back" aria-label="Volver al inicio" onClick={() => navigate('/about')}><IonIcon icon={arrowBackOutline} /></button>
            <p className="login-eyebrow"><IonIcon icon={logInOutline} /> ACCESO DE USUARIO</p>
            <h1 className="login-title">Entra a<span>la</span><span>conversación.</span></h1>
            <p className="login-description">Autentícate de forma rápida usando tu cuenta de X.</p>
            <div className="login-actions">
              <div className="login-provider">
                <span className="x-avatar" aria-hidden="true">X</span>
                <div><strong>Continuar con X</strong><small>Inicio de sesión seguro</small></div>
                <IonIcon icon={arrowForwardOutline} aria-hidden="true" />
              </div>
              <button className="login-submit" onClick={() => setEntered(true)} disabled={entered}>
                <span className="x-badge" aria-hidden="true">X</span>{entered ? 'Has entrado a la demo' : 'Iniciar sesión con X'}
              </button>
            </div>
            {entered && <p className="login-success" role="status"><IonIcon icon={checkmarkOutline} />Acceso a la demo completado. OAuth de X aún no está conectado.</p>}
            <div className="login-note"><IonIcon icon={sparklesOutline} /><p>Esta versión es una demostración de la experiencia móvil.</p></div>
            <button className="login-home" onClick={() => navigate('/about')}>Volver al inicio</button>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Login;
