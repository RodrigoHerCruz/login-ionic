import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { arrowForwardOutline, closeOutline, informationCircleOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: 'Rodrigo Hernández',
      role: 'Desarrollo de Software',
      number: '01',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      studentId: '092310539 ',
      phone: '992 114 3574',
    },
    {
      name: 'Erick Solorzano',
      role: 'Desarrollo de Software',
      number: '02',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      studentId: '092310006 ',
      phone: '919 145 3938',
      // email:'',
    },
    {
      name: 'Gabriela Rodríguez',
      role: 'Diseño de Interfaces',
      number: '03',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      studentId: '092210230 ',
      phone: '919 166 1412',
    },
    {
      name: 'Anenqui Pintado',
      role: 'Scrum Master',
      number: '04',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      studentId: '092310417',
      phone: '919 120 3274',
    },
    {
      name: 'Mario Morales',
      role: 'Tester',
      number: '05',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      studentId: '092210894 ',
      phone: '967 677 0569',
    },
  ];
  const [selectedMember, setSelectedMember] = useState<(typeof teamMembers)[number] | null>(null);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': '#0b0b0b', '--color': '#ffffff' }}>
          <IonTitle style={{ fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '500' }}>
            workme
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{
        '--background': '#0b0b0b',
        'color': '#ffffff'
      }}>

        <style>{`
          .dark-card {
            background: #141414 !important;
            border: 1px solid #222222 !important;
            border-radius: 16px !important;
            box-shadow: none !important;
            margin: 0 0 12px 0 !important;
          }
          .team-card-button { cursor: pointer; }
          .team-card-button:focus-visible { outline: 2px solid #f4f4f0; outline-offset: 3px; }
          .member-modal::part(content) {
            --background: #141414;
            color: #fff;
            width: min(680px, calc(100% - 32px));
            height: auto;
            max-height: min(560px, calc(100% - 40px));
            margin: auto;
            border: 1px solid #292929;
            border-radius: 20px;
          }
          .member-modal-layout {
            display: grid;
            grid-template-columns: 1fr 220px;
            gap: 28px;
            align-items: center;
            padding: 32px;
          }
          @media (max-width: 560px) {
            .member-modal-layout { grid-template-columns: 1fr; padding: 28px 22px; gap: 22px; }
            .member-modal-photo { grid-row: 1; width: 120px !important; height: 120px !important; }
          }
        `}</style>

        {/* Sección de Encabezado Estilo Minimalista Oscuro */}
        <div style={{ padding: '10px 0 24px 0' }}>
          <IonText color="medium" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <IonIcon icon={informationCircleOutline} style={{ fontSize: '14px' }} /> ACERCA DEL PROYECTO
          </IonText>
          
          <h1 style={{ fontSize: '42px', fontWeight: '800', lineHeight: '1.1', margin: '0 0 4px 0', letterSpacing: '-1px' }}>
            <span style={{ color: '#ffffff' }}>El equipo</span><br />
            <span style={{ color: '#666666' }}>detrás de Pulse.</span>
          </h1>

          <p style={{ color: '#888888', fontSize: '14px', marginTop: '16px', lineHeight: '1.5' }}>
            Una propuesta para la materia de <strong style={{ color: '#cccccc' }}>Diseño de interfaces móviles</strong>, inspirada en Workme para explorar colaboración, productividad e interacción.
          </p>
        </div>

        {/* Lista de Integrantes estilo Tarjetas Negras */}
        <div style={{ marginBottom: '24px' }}>
          {teamMembers.map((member, index) => (
            <IonCard key={index} className="dark-card team-card-button" button onClick={() => setSelectedMember(member)} aria-label={`Ver información de ${member.name}`}>
              <IonCardContent style={{ padding: '12px 16px' }}>
                <IonItem lines="none" style={{ '--background': 'transparent', '--padding-start': '0', '--padding-end': '0', '--inner-padding-end': '0' }}>
                  <IonAvatar slot="start" style={{ width: '42px', height: '42px', marginRight: '14px' }}>
                    <IonImg src={member.avatar} alt={member.name} />
                  </IonAvatar>
                  <IonLabel>
                    <h2 style={{ color: '#ffffff', fontWeight: '700', fontSize: '15px' }}>{member.name}</h2>
                    <p style={{ color: '#777777', fontSize: '12px', marginTop: '2px' }}>{member.role}</p>
                  </IonLabel>
                  <span slot="end" style={{ color: '#555555', fontSize: '12px', fontWeight: '500' }}>{member.number}</span>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </div>

        <IonModal
          isOpen={selectedMember !== null}
          onDidDismiss={() => setSelectedMember(null)}
          className="member-modal"
          aria-labelledby="member-modal-title"
        >
          {selectedMember && (
            <div className="member-modal-layout">
              <div>
                <IonButton
                  fill="clear"
                  aria-label="Cerrar modal"
                  onClick={() => setSelectedMember(null)}
                  style={{ position: 'absolute', top: '12px', right: '12px', '--color': '#aaa' }}
                >
                  <IonIcon icon={closeOutline} slot="icon-only" />
                </IonButton>
                <span style={{ color: '#888', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Integrante del equipo</span>
                <h2 id="member-modal-title" style={{ margin: '10px 0 4px', fontSize: '28px', fontWeight: 750 }}>{selectedMember.name}</h2>
                <p style={{ color: '#aaa', margin: '0 0 24px' }}>{selectedMember.role}</p>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div><span style={{ color: '#777', fontSize: '11px', textTransform: 'uppercase' }}>Matrícula</span><p style={{ margin: '4px 0 0' }}>{selectedMember.studentId || 'Por agregar'}</p></div>
                  <div><span style={{ color: '#777', fontSize: '11px', textTransform: 'uppercase' }}>Teléfono</span><p style={{ margin: '4px 0 0' }}>{selectedMember.phone || 'Por agregar'}</p></div>
                  {/* <div><span style={{ color: '#777', fontSize: '11px', textTransform: 'uppercase' }}>Correo Electrónico</span><p style={{ margin: '4px 0 0' }}>{selectedMember.email || 'Por agregar'}</p></div> */}
                </div>
              </div>
              <IonImg className="member-modal-photo" src={selectedMember.avatar} alt={`Foto de ${selectedMember.name}`} style={{ width: '220px', height: '260px', objectFit: 'cover', borderRadius: '16px', background: '#222' }} />
            </div>
          )}
        </IonModal>

        {/* Datos Académicos en Bloque Inferior */}
        <div style={{ borderTop: '1px solid #222222', borderBottom: '1px solid #222222', padding: '16px 0', marginBottom: '24px', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '10px', color: '#666666', textTransform: 'uppercase', letterSpacing: '1px' }}>Materia</span>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '600', color: '#cccccc' }}>Desarrollo de Apps Móviles</p>
          </div>
          <div>
            <span style={{ fontSize: '10px', color: '#666666', textTransform: 'uppercase', letterSpacing: '1px' }}>Periodo</span>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: '600', color: '#cccccc' }}>2026 - Grupo A</p>
          </div>
        </div>

        {/* Botón Estilo Claro Minimalista */}
        <div style={{ marginBottom: '20px' }}>
          <IonButton
            expand="block"
            shape="round"
            style={{
              '--background': '#f4f4f0',
              '--color': '#000000',
              'fontWeight': '600',
              'fontSize': '15px',
              'height': '50px',
              'textTransform': 'none'
            }}
            onClick={() => navigate('/login')}
          >
            Continuar al acceso
            <IonIcon icon={arrowForwardOutline} slot="end" style={{ color: '#000000' }} />
          </IonButton>
        </div>

        {/* Numeración inferior */}
        <div style={{ textAlign: 'center', paddingBottom: '10px' }}>
          <span style={{ fontSize: '11px', color: '#444444', letterSpacing: '1px' }}>02 / 03</span>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default About;
