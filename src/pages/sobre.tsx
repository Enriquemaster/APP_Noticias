import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { NeonGradientCard } from "@/components/ui/neon-gradient-card"; // Importas NeonGradientCard
import RetroGrid from "@/components/ui/retro-grid"; // Animación de fondo
import './Home.css';

const Sobre: React.FC = () => {
  const history = useHistory();
  const [darkMode, setDarkMode] = useState(false);
  const [isRetroGridActive, setIsRetroGridActive] = useState(false); // Estado para controlar RetroGrid

  // Recuperar el estado del tema al cargar el componente
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  // Aplicar el tema oscuro cuando darkMode cambia
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // useEffect para activar/desactivar RetroGrid
  useEffect(() => {
    // Activar la animación RetroGrid cuando se carga la página
    setIsRetroGridActive(true);

    // Detener la animación cuando el componente se desmonte
    return () => {
      setIsRetroGridActive(false);
    };
  }, []);

  const handleStart = () => {
    history.push('/home');
  };

  return (
    <IonPage>
      <IonHeader style={{ backgroundColor: darkMode ? '#1F1F1F' : '#F0F0F0' }}> {/* Cambia el color del IonHeader */}
        <IonToolbar style={{ backgroundColor: darkMode ? '#000000' : '#FFFFFF' }}>
          <IonTitle className=''>Categorias</IonTitle> 
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding bg-gray-100 flex flex-col items-center justify-center h-auto w-full">
        {/* Solo mostrar RetroGrid si está activo */}
        {isRetroGridActive && <RetroGrid />} 

        <div className="relative z-10 flex flex-col items-center text-center titulo">
          <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#FFD700] via-[#FFC300] to-[#000000] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
            Hecho por:
          </span>
          <p className="text-black dark:text-white text-center mt-2">
            <span className="font-bold">Alumno:</span><br />
            José Enrique Caamal Kuk<br /><br />
            <span className="font-bold">Nombre de la materia:</span><br />
            Programación de Aplicaciones Híbridas<br /><br />
            <span className="font-bold">Actividad:</span><br />
            U3. ADA3. App de Noticias Personalizable<br /><br />
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
      </IonContent>
    </IonPage>
  );
};

export default Sobre;
