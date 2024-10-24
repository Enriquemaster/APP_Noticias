import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import OrbitingCircles from '@/components/ui/orbiting-circles';
import './Home.css';
import FlickeringGrid from '@/components/ui/flickering-grid';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Categorias: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const history = useHistory();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    history.push(`/news?category=${category}`);
  };

  const getIconColor = () => (darkMode ? 'white' : 'black');

  const Icons = {
    newsImage1: () => (
      <div
        style={{ textAlign: 'center', cursor: 'pointer' }}
        onClick={() => handleCategorySelect('Technology')}
      >
        <i
          className="bi bi-pc-display-horizontal"
          style={{ fontSize: '50px', color: getIconColor() }}
        ></i>
        <p style={{ color: getIconColor() }}>Tecnología</p>
      </div>
    ),
    newsImage2: () => (
      <div
        style={{ textAlign: 'center', cursor: 'pointer' }}
        onClick={() => handleCategorySelect('Business')}
      >
        <i
          className="bi bi-cash-coin"
          style={{ fontSize: '50px', color: getIconColor() }}
        ></i>
        <p style={{ color: getIconColor() }}>Negocios</p>
      </div>
    ),
    newsImage3: () => (
      <div
        style={{ textAlign: 'center', cursor: 'pointer' }}
        onClick={() => handleCategorySelect('Health')}
      >
        <i
          className="bi bi-heart-pulse-fill"
          style={{ fontSize: '50px', color: getIconColor() }}
        ></i>
        <p style={{ color: getIconColor() }}>Salud</p>
      </div>
    ),
    newsImage4: () => (
      <div
        style={{ textAlign: 'center', cursor: 'pointer' }}
        onClick={() => handleCategorySelect('Sports')}
      >
        <i
          className="bi bi-dribbble"
          style={{ fontSize: '50px', color: getIconColor() }}
        ></i>
        <p style={{ color: getIconColor() }}>Deportes</p>
      </div>
    ),
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='text-black'>Categorías</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Texto y animaciones centrales */}
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
            Noticias
          </span>

          {/* Renderizar las animaciones inmediatamente */}
          <>
            <OrbitingCircles className="size-[30px] border-none bg-transparent" duration={20} delay={20} radius={80}>
              <Icons.newsImage1 />
            </OrbitingCircles>
            <OrbitingCircles className="size-[30px] border-none bg-transparent" duration={20} delay={10} radius={80}>
              <Icons.newsImage2 />
            </OrbitingCircles>
            <OrbitingCircles className="size-[50px] border-none bg-transparent" radius={190} duration={20} reverse>
              <Icons.newsImage3 />
            </OrbitingCircles>
            <OrbitingCircles className="size-[50px] border-none bg-transparent" radius={190} duration={20} delay={20} reverse>
              <Icons.newsImage4 />
            </OrbitingCircles>
          </>
        </div>

        {/* Fondo dinámico */}
        <div className="relative z-10 h-1/2 w-full overflow-hidden">
          <FlickeringGrid
            className="z-0 absolute inset-0  h-1/2 w-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.5}
            flickerChance={0.1}
            height={800}
            width={800}
          />
          {/* Card informativo */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle className="text-4xl font-bold text-black dark:text-white text-center titulo">
                  Consulta las categorías
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Mantente informado con las últimas novedades sobre {selectedCategory || 'tu categoría favorita'}. Haz clic en la categoría que deseas consultar para obtener noticias relevantes del momento.
              </IonCardContent>
            </IonCard>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Categorias;
