import React from 'react';
import './login.css'; // Importe o arquivo CSS
import Navbar2 from "../../components/Navbar2/Navbar2";

const login = () => {
  return (

    <div>
      
      <Navbar2/>
    
    <div className="container-login">
      
      <div className="side-bar-login">
        
      
        <div></div>
        <div></div>
        <p style={{ color: 'white' }}>Bem Vindo</p>
        <img className='img-logo' src="src/assets/StartUFC-logo-verde.png" alt="Logo" />
        <a style={{ color: 'white' }}>Não tem conta na Start?</a>
        <a href="/register" className='button_btn_register'>Cadastra-se</a>
        <div></div>
      </div>
      <div className="login-info">
        <h1 className="login-title">Faça Login</h1>
        <form> {/* Adicione o formulário */}
          <label htmlFor="email" className="login-email-label">Email:</label>
          <input type="email" className="login-email-input" placeholder="Ex: antonio@gmail.com" tabIndex="1" required />
          <br />
          <label htmlFor="password" className="login-password-label">Senha:</label>
          <input type="password" className="login-password-input" tabIndex="2" required />
          <br />
          <a tabIndex="4" href="URL" className="reset-password">Esqueceu a senha?</a>
          <br />
          <button type="submit" className="button-enter" tabIndex="3">Entrar</button> {/* Botão de submit */}
        </form>
      </div>

  
    </div>
    </div>

  );
};

export default login;

