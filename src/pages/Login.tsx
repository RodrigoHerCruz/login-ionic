import { IonContent, IonIcon, IonPage } from '@ionic/react';
import {
  arrowBackOutline,
  arrowForwardOutline,
  logInOutline,
  sparklesOutline,
  checkmarkOutline,
} from 'ionicons/icons';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { startXLogin } from '../services/NativeAuth';
import './Login.css';




const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const params = new URLSearchParams(location.search);
  const loginSuccess = params.get('login') === 'success';
  const loginFailed = params.get('login') === 'error';

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      await startXLogin();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'No se pudo iniciar sesión con X.',
      );
    } finally {
      setLoading(false);
    }
  };

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
              <button
                className="login-submit"
                onClick={handleLogin}
                disabled={loading || loginSuccess}
              >
                <span className="x-badge" aria-hidden="true">X</span>
                {loading
                  ? 'Abriendo X...'
                  : loginSuccess
                    ? 'Sesión iniciada'
                    : 'Iniciar sesión con X'}
              </button>
            </div>
              {loginSuccess && (
                <p className="login-success" role="status">
                  <IonIcon icon={checkmarkOutline} />
                  Inicio de sesión con X completado.
                </p>
              )}

              {loginFailed && (
                <p className="login-success" role="alert">
                  No se pudo completar el inicio de sesión. Inténtalo nuevamente.
                </p>
              )}

              {errorMessage && (
                <p className="login-success" role="alert">
                  {errorMessage}
                </p>
              )}
            <div className="login-note"><IonIcon icon={sparklesOutline} /><p>Esta versión es una demostración de la experiencia móvil.</p></div>
            <button className="login-home" onClick={() => navigate('/about')}>Volver al inicio</button>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Login;
