import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewsList.css';
import Button from '../../components/Button/Button';

const NewsList = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://localhost:44367/api/news')
      .then(response => {
        setNewsList(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar as notícias', error);
        setLoading(false);
      });
  }, []);

  return (
    <section id='news-id'>
      <div className="news-list">
        <h1 className='title-n'>Últimas Notícias</h1>

        {loading ? (
          <div className="loading">Carregando notícias...</div>
        ) : newsList.length === 0 ? (
          <div className="no-news">Nenhuma notícia encontrada.</div>
        ) : (
          <>
            <ul className='list-content'>
              {newsList.slice(0, 4).map((news) => (
                <li key={news.id}>
                  <Link to={`/news-detail/${news.id}`}>
                    <img 
                      src={`https://localhost:44367/api/images/${news.imgId}`}
                      alt={news.title} 
                      className="news-image" 
                    />
                    <h3>{news.title}</h3>
                    <p>{news.text ? `${news.text.substring(0, 200)}...` : 'Conteúdo não disponível'}</p>
                    <p className="created-at">Criado em: {new Date(news.createdAt).toLocaleDateString()}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className='btn-right'>
              <Button text="Mais notícias" color="green" onClick={() => navigate('/news')} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default NewsList;
