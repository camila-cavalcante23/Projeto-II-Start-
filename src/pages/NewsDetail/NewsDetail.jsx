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

  const role = localStorage.getItem('role');

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
  
  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja deletar esta notícia?")) {
      axios
        .delete(`https://localhost:44367/api/news/${id}`)
        .then(() => {
          alert("Notícia deletada com sucesso!");
          navigate("/news");
        })
        .catch((error) => {
          console.error("Erro ao deletar a notícia:", error);
          alert("Erro ao deletar a notícia.");
        });
    }
  };

  if (loading) return <div>Carregando notícia...</div>;  
  if (error) return <div>{error}</div>;  

  return (
    <section className="details">
      <Navbar2 />
      <div className="news-detail">
        <h1>{news?.title}</h1> 
        <p className="created-at-news">Criado em: {new Date(news.createdAt).toLocaleDateString()}</p>
        {role === "Admin" && (
          <div className="buttons-edit-del">
            <Button text="Editar" className="button-edit" color="blue" onClick={() => navigate(`/edit-news/${id}`)} />
            <Button text="Deletar" className="button-delete" color="red" onClick={handleDelete} />
          </div>
        )}
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
