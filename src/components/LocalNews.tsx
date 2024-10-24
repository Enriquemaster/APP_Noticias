import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonImg
} from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FlickeringGrid from "@/components/ui/flickering-grid";
import Shiny from "@/components/ui/shiny-button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useLocation } from 'react-router-dom';
import BoxReveal from "@/components/ui/box-reveal";

const LocalNews: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const articlesPerPage = 2; 
  const apiKey = 'ce86fb8c42d3465aa59fe58ac1cf46ec'; 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category') || 'Mérida'; // Cambia 'Mérida' si no se pasa ninguna categoría

  const [isAnimationActive, setIsAnimationActive] = useState(false);

  const fetchLocalNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${category}&language=es&apiKey=${apiKey}`);
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching local news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocalNews();
  }, [category]);

  
  useEffect(() => {
    setIsAnimationActive(true);

    return () => {
      setIsAnimationActive(false); 
    };
  }, []); 

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
          <IonTitle className="text-center text-xl font-bold text-black">Noticias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

      <div className="min-h-screen w-full">
          <FlickeringGrid
            className="z-0 absolute inset-0 size-full h-full w-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.5}
            flickerChance={0.1}
            height={1150}
            width={1150}
          />
       

          <div className="flex flex-wrap justify-around p-2 text-white">
            {currentArticles.map((article, index) => (
              <IonCard key={`${article.url}-${index}`} className="m-2 text-white" style={{ width: 'auto', height: 'auto' }}>
                <IonCardContent className="p-6 bg-background rounded-lg shadow-md text-muted-foreground">
                <BoxReveal boxColor={"#5046e6"} duration={0.7}>
                        <h2 className="text-lg font-bold">{article.title}</h2>
                </BoxReveal>
                        <p className="text-md">{article.description || "Aquí va el texto de la noticia"}</p>
                </IonCardContent>
                {article.urlToImage && (
                  <IonImg src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover rounded-lg" />
                )}

                <IonCardContent className="bg-blue flex justify-center items-center">
                  <IonButton expand="full" href={article.url} className="mt-4 bg-yellow-500 text-white">
                    Leer más
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ))}
          </div>

          <div className="pagination-buttons mt-4 mx-8 flex justify-center items-center">
            <RainbowButton className="mx-4" onClick={handlePreviousPage} disabled={currentPage === 1}>
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
