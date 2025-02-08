import React from 'react'
import './Header.css'
import Image from '../../assets/StartUFC-logo-simples.png'
import Logo from '../../assets/StartUFC-logo.png'
import Button from '../Button/Button'
import { useState } from 'react';

const Header = () => {
  const [isDisabled, setIsDisabled] = useState(false);
    const handleClick = () => {
      alert('Botão clicado!');
    };

  return (
    <header>
      <div className='header'>
        <div className="header-content">
          <div className='header-start'>
            <img src={ Logo } alt="" className='header-logo'/>
            <div className='text-initial'>
              <p>Impulsionando ideias, conectando</p>
              <p>futuros: onde a proatividade</p>
              <p>encontra o empreendedorismo</p>
          </div>
          </div>
         
          <img src={ Image } alt="" className='header-img'/>
          
        </div>
    
        <Button className='button-register' text="Cadastre-se agora" onClick={handleClick} color="green" />

      </div>
    </header>
  )
}

export default Header
