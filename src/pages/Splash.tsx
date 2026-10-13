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
        clearTimeout(timer);
    };
  }, [navigate, pathname]);

  return (
    <IonPage>
      <IonContent className="ion-text-center">
        <h1>Mi aplicación</h1>
        <p>Cargando...</p>
      </IonContent>
    </IonPage>
  );
};

export default Splash;
