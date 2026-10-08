    import { IonPage, IonContent, IonInput, IonButton } from '@ionic/react';

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <h1>Iniciar sesión</h1>

        <IonInput 
            label = "Correo"
            labelPlacement = "floating"
            type = "email"
            placeholder = "correo@ejemplo.com"
        />

        <IonInput 
            label = "Contraseña"
            labelPlacement = "floating"
            type = "password"
            placeholder = "Contraseña"
        />

        <IonButton>
            Iniciar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;