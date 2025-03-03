import React, { useState, useEffect } from 'react';
import './NewsForm.css';
import Navbar2 from '../../components/Navbar2/Navbar2';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const NewsForm = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [createdAt, setCreatedAt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Se estiver editando, buscar os dados da notícia pelo ID
      axios.get(`https://localhost:44367/api/news/${id}`)
        .then(response => {
          const news = response.data;
          setTitle(news.title);
          setText(news.text);
          setCreatedAt(news.createdAt); // Não editar essa data
        })
        .catch(error => {
          console.error('Erro ao carregar notícia', error);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    if (image) {
      formData.append('image', image);
    }

    const url = isEditing
      ? `https://localhost:44367/api/news/${id}`
      : 'https://localhost:44367/api/news';

    const method = isEditing ? 'put' : 'post';

    axios({
      method,
      url,
      data: formData,
    })
      .then(response => {
        navigate('/news'); // Redireciona após a criação/edição
      })
      .catch(error => {
        console.error('Erro ao enviar formulário', error);
      });
  };

  return (
    <div className='.news-form'>
      <Navbar2 />
      <div className="container-news-form">
        <h1 className="news-title">{isEditing ? 'Editar Notícia' : 'Criar Notícia'}</h1>

        <form onSubmit={handleSubmit} className='form-group'>
          <label>Título:</label>
          <input className='input-title'
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />

          <label>Conteúdo:</label>
          <textarea className='textarea-content'
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            required 
          />

          <label>Imagem:</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setImage(e.target.files[0])} 
            required 
          />

          <button 
            className="create-news-button"
            type="submit"> {isEditing ? 'Atualizar Notícia' : 'Criar Notícia'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;
