import { Navigate, Route, useNavigate } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Splash from './pages/Splash';
import About from './pages/About';
import { useEffect, useRef } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { exchangeNativeCode } from './services/NativeAuth';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();


const NativeAuthRedirectHandler: React.FC = () => {
  const navigate = useNavigate();
  const processedCodes = useRef(new Set<string>());

  useEffect(() => {
    let active = true;


    const handleUrl = async (url?: string) => {
      console.log('[Ionic OAuth] URL recibida:', url);

      if (!active || !url) return;

      let parsedUrl: URL;

      try {
        parsedUrl = new URL(url);
      } catch (error) {
        console.error('[Ionic OAuth] URL inválida:', error);
        return;
      }

      console.log('[Ionic OAuth] URL analizada:', {
        protocol: parsedUrl.protocol,
        hostname: parsedUrl.hostname,
        pathname: parsedUrl.pathname,
        hasCode: parsedUrl.searchParams.has('code'),
      });

      if (
        parsedUrl.protocol !== 'loginionic:' ||
        parsedUrl.hostname !== 'auth' ||
        parsedUrl.pathname !== '/callback'
      ) {
        console.warn('[Ionic OAuth] El enlace no coincide con el callback esperado.');
        return;
      }

      const code = parsedUrl.searchParams.get('code');

      if (!code || processedCodes.current.has(code)) {
        console.warn('[Ionic OAuth] Código ausente o ya procesado.');
        return;
      }

      processedCodes.current.add(code);

      try {
        console.log('[Ionic OAuth] Intercambiando código por token...');
        await exchangeNativeCode(code);
        console.log('[Ionic OAuth] Inicio de sesión completado.');

        if (active) navigate('/login?login=success', { replace: true });
      } catch (error) {
        console.error('[Ionic OAuth] Error al intercambiar el código:', error);

        if (active) navigate('/login?login=error', { replace: true });
      }
    };

    console.log('[Ionic OAuth] Registrando listener de enlaces...');

    const listener = CapacitorApp.addListener(
      'appUrlOpen',
      ({ url }) => {
        console.log('[Ionic OAuth] Evento appUrlOpen:', url);
        void handleUrl(url);
      }
    );

    // También contempla que Android abra la app directamente con el enlace.
    void CapacitorApp.getLaunchUrl()
      .then((launch) => {
        console.log(
          '[Ionic OAuth] URL de lanzamiento:',
          launch?.url ?? 'Sin URL de lanzamiento'
        );

        if (launch?.url) {
          void handleUrl(launch.url);
        }
      })
      .catch((error) => {
        console.error(
          '[Ionic OAuth] Error al obtener la URL de lanzamiento:',
          error
        );
      });
      
    return () => {
      active = false;
      void listener.then((handle) => handle.remove());
    };
  }, [navigate]);

  return null;
};



const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <NativeAuthRedirectHandler />

      <IonRouterOutlet>
        <Route path="/splash" element={<Splash />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<Navigate to="/splash" replace />}
        />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;