import { IonContent, IonIcon, IonPage } from '@ionic/react';
import { logoTwitter } from 'ionicons/icons';
import './Login.css';

const Login: React.FC = () => (
  <IonPage>
    <IonContent className="twitter-login-content">
      <main className="twitter-login" aria-labelledby="login-title">
        <h1 id="login-title">Iniciar sesión</h1>
        <div className="twitter-login-providers">
          <button className="twitter-login-button" type="button">
            <IonIcon className="twitter-login-logo" icon={logoTwitter} aria-hidden="true" />
            <span>Ingresar con Twitter</span>
          </button>
        </div>
        <div className="twitter-login-divider"><span>o</span></div>
        <form className="twitter-login-form" onSubmit={(event) => event.preventDefault()}>
          <input className="twitter-login-input" type="email" aria-label="Correo electrónico" name="email" autoComplete="username" autoCapitalize="none" spellCheck={false} placeholder="Correo electrónico" required />
          <input className="twitter-login-input" type="password" aria-label="Contraseña" name="password" autoComplete="current-password" placeholder="Contraseña" required />
          <button className="twitter-login-button twitter-login-next" type="submit">Siguiente</button>
          <button className="twitter-login-button twitter-login-forgot" type="button">¿Olvidaste tu contraseña?</button>
        </form>
        <p className="twitter-login-signup">¿No tienes una cuenta? <button type="button">Regístrate</button></p>
      </main>
    </IonContent>
  </IonPage>
);

export default Login;
