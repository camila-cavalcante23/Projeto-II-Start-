import React from 'react';
import './News.css';
import Img1 from '../../assets/imagem news.png';
import Img2 from '../../assets/imagem news1.png';
import Img3 from '../../assets/imagem news2.png';

function News() {
  return (
    <section className='News'>
      <h1 className='News-us'>Notícias</h1>
      <div className='tudo'>
      <div className='News-content'>
        <img src={Img1} alt="Notícia 1" className='img1' />
        <div className='text-News-1'>
          <p> Feliz Dia do Engenheiro Ambiental! 🌍💚

Hoje celebramos os profissionais que unem ciência e tecnologia para proteger o meio ambiente e garantir um futuro sustentável. 🌱🏗️

Seu trabalho é essencial na preservação dos recursos naturais, no combate às mudanças climáticas e na construção de um mundo mais equilibrado. 🌎♻️

Parabéns a todos os engenheiros ambientais! </p>
        </div>
      </div>
      <div className='News-content'>
        <img src={Img2} alt="Notícia 2" className='img2' />
        <div className='text-News-2'>
          <p>Nos bastidores da sessão de fotos em homenagem ao Dia do Engenheiro Ambiental! Nossos universitários, futuros engenheiros, representando com orgulho a profissão que transforma o mundo. </p>
        </div>
      </div>
      <div className='News-content'>
        <img src={Img3} alt="Notícia 3" className='img3' />
        <div className='text-News-3'>
          <p>A StartUFC está de roupa nova! Nossa identidade visual foi modernizada para refletir o que somos: um ecossistema de inovação, criatividade e transformação. 🚀</p>
        </div>
      </div>
      </div>
    </section>
  );
}

export default News;
