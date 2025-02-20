// src/pages/NewsList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewsList.css';
import Button from '../../components/Button/Button'


const NewsList = () => {

  const navigate = useNavigate();

  const [newsList, setNewsList] = useState([]); 
  const [loading, setLoading] = useState(true);  


  useEffect(() => {
    
    axios.get('http://localhost:5000/api/news')
      .then(response => {
        setNewsList(response.data); 
        setLoading(false);  
      })
      .catch(error => {
        console.error('Erro ao carregar as notícias', error);
        setLoading(false);  
      });
  }, []);
  
  if (loading) {
    return <div className="loading">Carregando notícias...</div>;
  }

  if (newsList.length === 0) {
    return <div className="no-news">Nenhuma notícia encontrada.</div>;
  }

  const displayedNews = newsList.slice(0, 4);

  return (
    <section id='news-id'>
      <div className="news-list">
        <h1 className='title-n'>Últimas Notícias</h1>
        <ul className='list-content'>
          {displayedNews.map((news) => (
            <li key={news.id}>
              <Link to={`/noticia/${news.id}`}>
                <img src={news.imagem} alt={news.titulo} className="news-image" />
                <h3>{news.titulo}</h3>
                <p className="meta">{new Date(news.dataCriacao).toLocaleDateString()}</p>
                <p>{news.conteudo.substring(0, 100)}...</p> 
              </Link> 
            </li>
          ))}
        </ul>
        <div className='btn-right'>
          <Button text="Mais notícias" color="green" onClick={() => navigate('/noticias')} />
        </div>
      </div>
    </section>
  );
};

export default NewsList;

