import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import LocalNews from '../components/LocalNews';
import './Home.css';

const News: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Recuperar el estado del tema desde localStorage al cargar el componente
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
    setIsReady(true); // Marca que la página está lista para renderizar el contenido
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle className='flex justify-center items-center'>
          Noticias
        </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isReady && <LocalNews />}
      </IonContent>
    </IonPage>
  );
};

export default News;
