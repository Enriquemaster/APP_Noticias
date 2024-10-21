import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToggle, IonLabel, IonCard, IonCardContent } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import TypingAnimation from '@/components/ui/typing-animation';
import Newspapper from '../assets/images/newspapper1.jpg'; 
import LocalNews from '../components/LocalNews';
import './Home.css';

const News: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleThemeToggle = (e: CustomEvent) => {
    setDarkMode(e.detail.checked);
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
    
           <IonCard className="max-w-md">
              <IonCardContent>
          {isReady && (
            <TypingAnimation
              className="titulo text-4xl font-bold text-white dark:text-white"
              text="Noticias Relevantes"
            />
          )}
          </IonCardContent>
            </IonCard>
            <LocalNews />
      </IonContent>
    </IonPage>
  );
};

export default News;
