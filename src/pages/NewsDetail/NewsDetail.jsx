import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewsDetail.css";
import Button from "../../components/Button/Button";
import Navbar2 from "../../components/Navbar2/Navbar2";
import Footer from "../../components/Footer/Footer";

const NewsDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    axios.get(`https://localhost:44367/api/news/${id}`)
      .then(response => {
        console.log(response.data); 
        setNews(response.data);  
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao carregar a notícia:", error);
        setError("Erro ao carregar a notícia.");
        setLoading(false);
      });
  }, [id]);  

  if (loading) return <div>Carregando notícia...</div>;  
  if (error) return <div>{error}</div>;  
  return (
    <section className="details">
      <Navbar2 />
      <div className="news-detail">
        <h1>{news?.title}</h1> 
        <p className="created-at-news">Criado em: {new Date(news.createdAt).toLocaleDateString()}</p>
        <div className="image-public">
            <img 
                src={`https://localhost:44367/api/images/${news.imgId}`}
                alt={news.title} 
                className="news-image" 
            />
        </div>
        <p>{news?.text}</p>
        <div className="btn-more">
          <Button text="Veja mais" color="green" onClick={() => navigate("/news")} />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default NewsDetail;
