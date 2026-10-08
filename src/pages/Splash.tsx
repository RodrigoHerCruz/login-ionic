import { IonContent, IonPage } from '@ionic/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Splash: React.FC = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
        navigate("/about")
    }, 2000);

    return () => {
        clearTimeout(timer);
    };
  }, [navigate]);

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