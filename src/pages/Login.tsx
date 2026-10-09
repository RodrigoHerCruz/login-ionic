import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonInput,
  IonPage,
} from '@ionic/react';
import './Login.css';

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="login-content">
        <main className="login-shell">
          <div className="login-brand" aria-hidden="true">✦</div>
          <p className="login-eyebrow">TU ESPACIO, TU COMUNIDAD</p>
          <h1>Lo que pasa,<br />empieza aquí.</h1>
          <p className="login-intro">
            Inicia sesión para continuar y mantenerte conectado.
          </p>

          <IonCard className="login-card">
            <IonCardContent>
              <h2>Iniciar sesión</h2>
              <p className="login-card-subtitle">Qué bueno tenerte de vuelta.</p>

              <div className="login-fields">
                <IonInput
                  className="login-input"
                  label="Correo electrónico"
                  labelPlacement="floating"
                  type="email"
                  placeholder="nombre@ejemplo.com"
                  autocomplete="email"
                />
                <IonInput
                  className="login-input"
                  label="Contraseña"
                  labelPlacement="floating"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  autocomplete="current-password"
                />
              </div>

              <IonButton className="login-submit" expand="block">
                Iniciar sesión
              </IonButton>
              <p className="login-footer">Simple. Seguro. Siempre conectado.</p>
            </IonCardContent>
          </IonCard>
          <p className="login-copyright">© 2026 · Hecho para conectar</p>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Login;