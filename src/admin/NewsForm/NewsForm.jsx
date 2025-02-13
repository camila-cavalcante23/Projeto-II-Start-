import React, { useState } from 'react';
import './NewsForm.css'
import Navbar2 from '../../components/Navbar2/Navbar2';
import { IoImagesOutline } from "react-icons/io5";
import Button from '../../components/Button/Button'
// import axios from 'axios';

function NewsForm() {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [imagem, setImagem] = useState(null);

  const handleClick = () => {
    alert('Botão clicado!');
  }

  const enviarNoticia = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('conteudo', conteudo);
    if (imagem) formData.append('imagem', imagem);

    try {
      const resposta = await axios.post('http://localhost:5000/api/news', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Notícia criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar a notícia', error);
      alert('Erro ao criar a notícia');
    }
  };

  return (
    <div className='news-form'>
      <Navbar2/>
      <div className='news-form-content'>
        <h2>Criar Notícia</h2>
        <form onSubmit={enviarNoticia}>
          <div className='input-title'>
            {/* <label>Título:</label> */}
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              placeholder="Título da notícia"
            />
          </div>
          <div className='textarea-content'>
            {/* <label>Conteúdo:</label> */}
            <textarea
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              required
              placeholder="Conteúdo da notícia"
            />
          </div>
          <div className='uploud-img'>
            <IoImagesOutline />
            <label className='add-img'>Imagem:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImagem(e.target.files[0])}
            />
          </div>
          <Button text="Criar Notícia" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default NewsForm;
