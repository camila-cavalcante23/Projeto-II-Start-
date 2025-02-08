import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Description from '../../components/Description/Description'
import Info from '../../components/Info/Info'
import News from '../../components/News/News'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import Germinar from '../Germinar/Germinar'
import QuemSomos from '../QuemSomos/QuemSomos'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Description />
      <QuemSomos />
      <Info />
      <News />
      <Germinar />
      <Footer />
    </div>
  );
};

export default Home
