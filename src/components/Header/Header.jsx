import React from 'react'
import './Header.css'
import Image from '../../assets/16.png'

const Header = () => {
  return (
    <header>
      <div className='header'>
        <div className="header-content">
          <div className='text'>
            <h1 className='color-1'>Start</h1>
            <h1 className='color-2'>UFC</h1>
            <div className='text-initial'>
              <p>Impulsionando ideias, conectando</p>
              <p>futuros: onde a proatividade</p>
              <p>encontra o empreendedorismo</p>
          </div>
          </div>
         
          <img src={ Image } alt="" className='header-img'/>
          
        </div>
        
        <button type="button" className='button-register'>Cadastre-se agora</button>

      </div>
    </header>
  )
}

export default Header
