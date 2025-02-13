import React, { useEffect, useState } from 'react';
// import axios from 'axios';

function Noticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:5000/api/news')
      .then((resposta) => {
        setNoticias(resposta.data);
      })
      .catch((erro) => {
        console.error('Erro ao buscar notícias', erro);
      });
  }, []);

  return (
    <div>
      <h2>Notícias</h2>
      <ul>
        {noticias.map((noticia) => (
          <li key={noticia._id}>
            <h3>{noticia.titulo}</h3>
            <p>{noticia.conteudo}</p>
            {noticia.imagem && <img src={`http://localhost:5000/uploads/${noticia.imagem}`} alt="Imagem da notícia" />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Noticias
