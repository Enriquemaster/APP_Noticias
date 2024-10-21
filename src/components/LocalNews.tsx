import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Newspapper from '../assets/images/newspapper1.jpg';
import TypingAnimation from '@/components/ui/typing-animation';
import Animated from '@/components/ui/animated-shiny-text';
import { ArrowRightIcon } from "@radix-ui/react-icons";
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
        <div
          style={{
            backgroundImage: `url(${Newspapper})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: '20px',
          }}
        >
          <div className="flex flex-wrap justify-around p-2 text-white">
            {currentArticles.map((article, index) => (
              <IonCard key={`${article.url}-${index}`} className="m-2 text-white" style={{ width: 'auto', height: 'auto' }}>
                <IonCardContent className="p-6 bg-background rounded-lg shadow-md text-muted-foreground">
                {isReady && (
        <Animated className="">
        {article.title}
      </Animated>
          )}



                  <div className="">
                    <div className="p-4rounded-lg">
                      <p className="text-lg text-muted-foreground">{article.description || "Aquí va el texto de la noticia"}</p>
                    </div>
                  </div>
                  {/* Botón Leer más */}
                  <IonButton expand="full" color="primary" href={article.url} target="_blank" className="mt-4">
                    Leer más
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ))}
          </div>

          {/* Botones de Paginación */}
          <div className="pagination-buttons mt-4">
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
