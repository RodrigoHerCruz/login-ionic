import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonImg,
  IonPage,
  IonText,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <IonPage>
      <IonContent className="ion-padding">

        <h1>Acerca de nosotros</h1>

        <IonText>
          <p>
            Aplicación desarrollada para la materia de Desarrollo
            de Aplicaciones Móviles.
          </p>
        </IonText>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Integrantes</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>

            <IonAvatar>
              <IonImg
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
                alt="Integrante"
              />
            </IonAvatar>

            <h2>Rodrigo Hernández</h2>

            <p>Desarrollo de Software</p>

          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Datos de la materia</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p><strong>Materia:</strong> Desarrollo de Aplicaciones Móviles</p>
            <p><strong>Profesor:</strong> Armando</p>
            <p><strong>Universidad:</strong> Universidad Tecnológica de la Selva</p>
          </IonCardContent>
        </IonCard>

        <IonButton
          expand="block"
          onClick={() => navigate('/login')}
        >
          Continuar
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default About;