import React from 'react';
import './News.css';
import Img1 from '../../assets/imagem news.png';
import Img2 from '../../assets/imagem news1.png';
import Img3 from '../../assets/imagem news2.png';

function News() {
  return (
    <section className='News'>
      <h1 className='News-us'>Notícias</h1>
      <div className='News-content'>
        <img src={Img1} alt="Notícia 1" className='img1' />
        <div className='text-News-1'>
          <p>Lorem ipsum dolor sit amet. Id expedita galisum et
            deleniti sint aut officia consequuntur. Qui voluptatem
            internos rem quia quas et rerum tenetur in rerum.</p>
        </div>
      </div>
      <div className='News-content'>
        <img src={Img2} alt="Notícia 2" className='img2' />
        <div className='text-News-2'>
          <p>Outro texto relacionado à imagem 2 pode ser adicionado aqui.</p>
        </div>
      </div>
      <div className='News-content'>
        <img src={Img3} alt="Notícia 3" className='img3' />
        <div className='text-News-3'>
          <p>Outro texto relacionado à imagem 3 pode ser adicionado aqui.</p>
        </div>
      </div>
    </section>
  );
}

export default News;
