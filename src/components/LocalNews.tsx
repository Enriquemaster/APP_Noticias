import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Newspapper from '../assets/images/newspapper1.jpg';
import TypingAnimation from '@/components/ui/typing-animation';
import Animated from '@/components/ui/animated-shiny-text';
import Rotate from '@/components/ui/word-rotate';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { MagicCard } from '@/components/ui/magic-card';
import BoxReveal from "@/components/ui/box-reveal";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import ShinyButton from "@/components/ui/shiny-button";
import { cn } from "@/lib/utils";


const LocalNews: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const articlesPerPage = 2; 
  const apiKey = '9cf52eb37f554d9bbd4651be306478ce'; 
  const city = 'Mérida'; 
  const [darkMode, setDarkMode] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const fetchLocalNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${city}&apiKey=${apiKey}`);
      console.log(response.data); // Agrega esto para ver la respuesta completa
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching local news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleThemeToggle = (e: CustomEvent) => {
    setDarkMode(e.detail.checked);
  };

  useEffect(() => {
    fetchLocalNews();
  }, [city, apiKey]);

  if (loading) return <p>Cargando...</p>;

  // Calcular el índice de los artículos a mostrar en la página actual
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  
  // Funciones de paginación
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-center text-xl font-bold">Noticias Locales</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>


      


      {/* Contenedor principal con FlickeringGrid como fondo */}
    <div className="relative h-screen w-full overflow-hidden">

{/* FlickeringGrid como fondo */}
<FlickeringGrid
  className="z-0 absolute inset-0 h-full w-full"
  squareSize={4}
  gridGap={6}
  color="#6B7280"
  maxOpacity={0.5}
  flickerChance={0.1}
/>



      <div className="flex justify-center items-center">
  <Rotate
    className="text-4xl font-bold text-black dark:text-white text-center titulo"
    words={["Noticias", "Merida"]}/>
</div>




<div className="flex flex-wrap justify-around p-2 text-white">
  {currentArticles.map((article, index) => (
    <IonCard key={`${article.url}-${index}`} className="m-2 text-white" style={{ width: 'auto', height: 'auto' }}>
      <IonCardContent className="p-6 bg-background rounded-lg shadow-md text-muted-foreground">
        {isReady && (
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <Animated className="">
              {article.title}
            </Animated>
          </BoxReveal>
        )}
        
                  <div className="">
                    <div className="p-4rounded-lg">
                    <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                      <p className="text-lg text-muted-foreground">{article.description || "Aquí va el texto de la noticia"}</p>
                      </BoxReveal>
                    </div>
                    
                  </div>
                  {/* Botón Leer más */}
                  <IonButton expand="full" href={article.url} target="_blank" className="mt-4 text-black">
                    Leer más
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ))}
          </div>

          

          <div className="pagination-buttons mt-4 flex justify-center items-center">
               <RainbowButton className='mx-2' onClick={handlePreviousPage} disabled={currentPage === 1}>
                 Anterior
                </RainbowButton>
                <RainbowButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                 Siguiente
                </RainbowButton>
                </div>
                </div>
     

      </IonContent>
    </IonPage>
  );
};

export default LocalNews;
