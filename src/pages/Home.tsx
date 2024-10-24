import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToggle, IonLabel, IonButton, IonCard, IonCardContent, IonButtons } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; 
import { RainbowButton } from "@/components/ui/rainbow-button";
import './Home.css';
import '../theme/variables.css';
import Globe from '../assets/videos/globe.mp4';

const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const history = useHistory(); 

  const handleStart1 = () => {
    history.push('/sobre');
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleThemeToggle = (e: CustomEvent) => {
    const isChecked = e.detail.checked;
    setDarkMode(isChecked);
    localStorage.setItem('darkMode', JSON.stringify(isChecked)); 
  };

  const navigateToNews = () => {
    history.push('/categorias');
  };

  return (
    <IonPage>
      <IonHeader style={{ backgroundColor: darkMode ? '#1F1F1F' : '#F0F0F0' }}> 
        <IonToolbar style={{ backgroundColor: darkMode ? '#000000' : '#FFFFFF' }}>
          <IonTitle>Bienvenido</IonTitle> 
          <IonButtons slot="end">
            <IonButton onClick={handleStart1}>Sobre...</IonButton>
            <IonLabel>🌓</IonLabel>
            <IonToggle checked={darkMode} onIonChange={handleThemeToggle} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isReady && (
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-lg md:shadow-xl">
            <span className="pointer-events-none mt-12 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
              Noticias
            </span>
            
            {/* Sección del video más grande en vista de PC */}
            <div className="relative flex items-center justify-center overflow-hidden rounded-lg border bg-background h-64 md:h-96 lg:h-[60vh] xl:h-[70vh]">
              <video 
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src={Globe} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>

            {/* Texto que se mostrará sobre el video */}
            <div className="flex justify-center px-4 mt-4">
              <IonCard className="max-w-full bg-white rounded-lg shadow-lg">
                <IonCardContent>
                  <p className="text-center text-lg text-justify">
                    Bienvenido. Aquí encontrarás las últimas novedades de todo el mundo, desde política hasta deportes, entretenimiento y más. ¡Mantente informado y descubre lo que está sucediendo!
                  </p>
                </IonCardContent>
              </IonCard>
            </div>

            {/* Botón más pequeño */}
            <div className="flex justify-center mt-2">
              <RainbowButton onClick={navigateToNews} className="mt-4 px-4 py-2 text-sm">
                Ver Noticias
              </RainbowButton>
            </div>

            <div className="flex justify-center">
              <IonCard className="max-w-md">
                <IonCardContent>
                  <h1>Descubre y explora</h1>
                  <p className="text-center text-sm text-justify">
                    Al hacer clic en "Ver Noticias", podrás explorar una amplia variedad de artículos que abarcan las últimas tendencias y eventos importantes.
                  </p>
                </IonCardContent>
              </IonCard>

              <IonCard className="max-w-md">
                <IonCardContent>
                  <h1>Mantente informado</h1>
                  <p className="text-center text-sm text-justify">
                    No te pierdas las actualizaciones en tiempo real y la cobertura de las noticias más impactantes. ¡Esté siempre al tanto de lo que está sucediendo en el mundo!
                  </p>
                </IonCardContent>
              </IonCard>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
