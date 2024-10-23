import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToggle, IonLabel, IonButton, IonCard, IonCardContent } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import Globe from '@/components/ui/globe';
import { useHistory } from 'react-router-dom'; 
import News from '../components/LocalNews';
import './Home.css';
import '../theme/variables.css';

const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const history = useHistory(); 

  // Recuperar el estado del tema al cargar el componente
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
    setIsReady(true); // Marca que la página está lista para renderizar el contenido
  }, []);

  // Aplicar el tema oscuro cuando darkMode cambia
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleThemeToggle = (e: CustomEvent) => {
    const isChecked = e.detail.checked;
    setDarkMode(isChecked);
    localStorage.setItem('darkMode', JSON.stringify(isChecked)); // Almacena el estado del tema
  };

  const navigateToNews = () => {
    history.push('/categorias');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonLabel>Modo oscuro</IonLabel>
            <IonToggle checked={darkMode} onIonChange={handleThemeToggle} />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isReady && (
          <div className="relative flex h-[1100px] w-full flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl">
            <span className="pointer-events-none p-4 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
              Noticias
            </span>
            <IonCard className="max-w-11/12 h-2/5 px-8">
              <IonCardContent>
                <p className="text-center text-lg mb-4 px-4 text-justify">
                  Bienvenido. Aquí encontrarás las últimas novedades de todo el mundo, desde política hasta deportes, entretenimiento y más. ¡Mantente informado y descubre lo que está sucediendo!
                </p>
              </IonCardContent>
            </IonCard>

            <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-40 pb-40 pt-8 md:pb-60 md:shadow-xl">
              <Globe className="top-2" />
              <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
            </div>
            <IonButton onClick={navigateToNews} className="mt-4">
              Ver Noticias
            </IonButton>

            <div className="flex justify-center space-x-4 mt-4">
              <IonCard className="max-w-md w-2/5 h-full">
                <IonCardContent>
                  <h1>Descubre y explora</h1>
                  <p className="text-center text-md text-justify">
                    Al hacer clic en "Ver Noticias", podrás explorar una amplia variedad de artículos que abarcan las últimas tendencias y eventos importantes.
                  </p>
                </IonCardContent>
              </IonCard>

              <IonCard className="max-w-md w-2/5 h-full">
                <IonCardContent>
                  <h1>Mantente informado</h1>
                  <p className="text-center text-md text-justify">
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
