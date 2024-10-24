import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { NeonGradientCard } from "@/components/ui/neon-gradient-card"; // Importas NeonGradientCard
import { cn } from "@/lib/utils";

const Sobre: React.FC = () => {
  const history = useHistory();

  const handleStart1 = () => {
    history.push('/sobre');
  };

  const handleStart = () => {
    history.push('/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Creditos</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding bg-gray-100 flex flex-col items-center justify-center relative h-auto w-full">
        {/* Encapsulamos todo dentro del NeonGradientCard */}
        <NeonGradientCard>
          {/* Contenido de bienvenida */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Hecho por Jose Enrique Caamal Kuk</h1>
            <p className="text-black dark:text-white text-center mt-2">
              <span className="font-bold">Alumno:</span><br />
              José Enrique Caamal Kuk<br /><br />

              <span className="font-bold">Nombre de la materia:</span><br />
              Programación de Aplicaciones Híbridas<br /><br />

              <span className="font-bold">Actividad:</span><br />
              U3. ADA3. App de Noticias Personalizable (Geolocalización)<br /><br />

              <span className="font-bold">Docente:</span><br />
              Luis Gilberto Tec Cetz<br /><br />

              <span className="font-bold">Semestre y Grupo:</span><br />
              9ª<br /><br />

              <span className="font-bold">Fecha de entrega:</span><br />
              24 de octubre de 2024<br />
            </p>

            <IonButton expand="full" onClick={handleStart} color="primary" className="mt-4">
              Regresar
            </IonButton>
          </div>
        </NeonGradientCard>
      </IonContent>
    </IonPage>
  );
};

export default Sobre;
