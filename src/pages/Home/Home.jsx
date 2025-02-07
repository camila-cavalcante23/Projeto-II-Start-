import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Description from '../../components/Description/Description'
import About from '../../components/About/About'
import Info from '../../components/Info/Info'
import News from '../../components/News/News'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header />
      <Description />
      <About />
      <Info />
      <News /> {/* Renderizando o componente News */}
      <Footer/>
  
    </div>
  );
};

export default Home
