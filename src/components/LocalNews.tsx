import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FlickeringGrid from "@/components/ui/flickering-grid";
import { useLocation } from 'react-router-dom';

const LocalNews: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const articlesPerPage = 2; 
  const apiKey = '9cf52eb37f554d9bbd4651be306478ce'; 
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category') || 'Mérida'; // Cambia 'Mérida' si no se pasa ninguna categoría

  const fetchLocalNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${category}&apiKey=${apiKey}`);
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching local news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocalNews();
  }, [category]); // Cambia la dependencia para que se llame cada vez que la categoría cambie

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
        <div className="relative z-10 h-screen w-full overflow-hidden h-full w-full">
          <FlickeringGrid
              className="z-0 absolute inset-0 size-full h-full w-full"
              squareSize={4}
              gridGap={6}
              color="#6B7280"
              maxOpacity={0.5}
              flickerChance={0.1}
              height={1000}
              width={1000}
            />
          <div className="flex flex-wrap justify-around p-2 text-white">
            {currentArticles.map((article, index) => (
              <IonCard key={`${article.url}-${index}`} className="m-2 text-white" style={{ width: 'auto', height: 'auto' }}>
                <IonCardContent className="p-6 bg-background rounded-lg shadow-md text-muted-foreground">
                  <h2 className="text-lg font-bold">{article.title}</h2>
                  <p className="text-md">{article.description || "Aquí va el texto de la noticia"}</p>
                  <IonButton expand="full" href={article.url} target="_blank" className="mt-4 text-black">
                    Leer más
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ))}
          </div>

          <div className="pagination-buttons mt-4 flex justify-center items-center">
               <IonButton onClick={handlePreviousPage} disabled={currentPage === 1}>
                 Anterior
               </IonButton>
               <IonButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                 Siguiente
               </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LocalNews;
