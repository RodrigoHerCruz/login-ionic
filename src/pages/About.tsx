import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const teamMembers = [
  'Hernandez Cruz Rodrigo Jordan',
  'Pintado Venegas Anenqui Yolatl',
  'Rodríguez Ovando Gabriela',
  'Solórzano López Erick',
  'Morales Castellanos Juan Mario',
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .slice(-2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <IonPage>
      <IonContent className="about-content">
        <main className="about-shell">
          <header className="about-heading">
            <span className="about-eyebrow">QUIÉNES SOMOS</span>
            <h1>Acerca de nosotros</h1>
            <p>
              Una idea, un equipo y muchas ganas de crear. Esta aplicación fue
              desarrollada para la materia de Desarrollo de Aplicaciones Móviles.
            </p>
          </header>

          <section className="team-section" aria-labelledby="team-title">
            <div className="section-heading">
              <h2 id="team-title">El equipo</h2>
              <span>05 integrantes</span>
            </div>

            <div className="team-grid">
              {teamMembers.map((name, index) => (
                <IonCard className="team-card" key={name}>
                  <IonCardContent>
                    <div
                      className={`member-avatar avatar-${index + 1}`}
                      aria-hidden="true"
                    >
                      {getInitials(name)}
                    </div>
                    <h3>{name}</h3>
                    <p>Desarrollo de Software</p>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          </section>

          <IonCard className="course-card">
            <IonCardContent>
              <span className="about-eyebrow">EL PROYECTO</span>
              <h2>Desarrollo de Aplicaciones Móviles</h2>
              <div className="course-details">
                <p><span>Profesor</span>Armando</p>
                <p><span>Universidad</span>Universidad Tecnológica de la Selva</p>
              </div>
            </IonCardContent>
          </IonCard>

          <IonButton
            className="about-continue"
            expand="block"
            onClick={() => navigate('/login')}
          >
            Continuar al inicio de sesión
          </IonButton>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default About;
