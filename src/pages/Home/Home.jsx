import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Description from '../../components/Description/Description'
import About from '../../components/About/About'
import Info from '../../components/Info/Info'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div>
      <Header/>
      <Description/>
      <About/>
      <Info/>
      <Footer/>
    </div>

  )
}

export default Home
