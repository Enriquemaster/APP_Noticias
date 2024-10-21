import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToggle, IonLabel } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import OrbitingCircles from '@/components/ui/orbiting-circles';
import './Home.css';
import News from '../assets/images/Newspaper.gif';
const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleThemeToggle = (e: CustomEvent) => {
    setDarkMode(e.detail.checked);
  };
  const Icons = {
    gitHub: () => (
      <img src={News} alt="Imagen de Noticias" width="50" height="50" />
    ),
    notion: () => (
      <img src={News} alt="Imagen de Noticias" width="50" height="50" />
    ),
    googleDrive: () => (
      <img src={News} alt="Imagen de Noticias" width="50" height="50" />
    ),
    newsImage: () => (
      <img src={News} alt="Imagen de Noticias" width="50" height="50" />
    ),
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>  
            <IonLabel>Modo oscuro</IonLabel>
            <IonToggle
             checked={darkMode}
             onIonChange={handleThemeToggle}
              />  
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
            News
          </span>

          {/* Inner Circles */}
          <OrbitingCircles className="size-[30px] border-none bg-transparent" duration={20} delay={20} radius={80}>
            <Icons.notion />
          </OrbitingCircles>
          <OrbitingCircles className="size-[30px] border-none bg-transparent" duration={20} delay={10} radius={80}>
            <Icons.gitHub />
          </OrbitingCircles>

          {/* Outer Circles (reverse) */}
          <OrbitingCircles className="size-[50px] border-none bg-transparent" radius={190} duration={20} reverse>
            <Icons.googleDrive />
          </OrbitingCircles>
          <OrbitingCircles className="size-[50px] border-none bg-transparent" radius={190} duration={20} delay={20} reverse>
            <Icons.gitHub />
          </OrbitingCircles>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
