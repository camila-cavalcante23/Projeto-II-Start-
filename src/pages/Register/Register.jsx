import React from 'react';
import { Link } from "react-router-dom"
import './register.css'; // Importe o arquivo CSS

const register = () => {
  return (
    <div className="container_register">
      <div className="side_bar_register">
        <div></div>
        <div></div>
        <label id='ti1' style={{ color: 'white' }}>Bem Vindo</label>
        <img className='img_logo' src="src/assets/StartUFC-logo-verde.png" alt="Logo" />
        <label style={{ color: 'white' }}>Ja tem conta na Start?</label>
        <a href="/login" className='button_btn_login'>Logar</a>
        
        <div></div>
      </div>
      <div className="register_info">
        <h1 className='title' style={{ textAlign: 'center' }}>Crie sua conta</h1>
        <label className='email'>Nome Completo:</label>
        <input type="email" tabIndex="1" />
        <br />
        <label className='email'>CPF:</label>
        <input type="email" tabIndex="1" />
        <br />
        <label className='email'>Email:</label>
        <input type="email" placeholder="Ex: antonio@gmail.com"  tabIndex="1" />
        <br />
        <label className='email'>Telefone:</label>
        <input type="email" placeholder="Ex: (88) 99657 - 5242" tabIndex="1" />
        <br />
        <label className='senha'>Senha:</label>
        <input type="password" tabIndex="2" />
        <br />
        <button className='button_create_account' tabIndex="3">Criar Conta</button>
        <div className="button_group"> {/* Container para os botões */}
          <button className='button_user' tabIndex="3">Usuário Padrão</button>
          <button className='button_administrator' tabIndex="4">Administrador</button> {/* Novo botão */}
        </div>
      </div>
    </div>
  );
};

export default register;