import React from 'react';
import './register.css';
import Navbar2 from '../../components/Navbar2/Navbar2';

const register = () => {
  return (
    <div>

      <Navbar2/>
    <div className="container-register">
      <div className="side-bar-register">
        <div></div>
        <div></div>
        <p id='ti1' style={{ color: 'white' }}>Bem Vindo</p>
        <img className='img-logo' src="src/assets/StartUFC-logo-verde.png" alt="Logo" />
        <p style={{ color: 'white' }}>Ja tem conta na Start?</p>
        <a href="/login" className='button-btn-login'>Logar</a>
        
        <div></div>
      </div>
      <div className="register-info">
        <h1 className="register-title">Crie sua conta</h1>
        <form>
          <label htmlFor="full-name" className="register-full-name-label">Nome Completo:</label> {/* htmlFor para acessibilidade */}
          <input type="text" className="register-full-name-input" tabIndex="1" required /> {/* Tipo "text" e "required" */}
          <br />

          <label htmlFor="tax-number" className="register-tax-number-label">CPF:</label>
          <input type="text" className="register-tax-number-input" tabIndex="1" required /> {/* Tipo "text" e "required" */}
          <br />

          <label htmlFor="email" className="register-email-label">Email:</label>
          <input type="email" className="register-email-input" placeholder="Ex: antonio@gmail.com" tabIndex="1" required /> {/* Tipo "email" e "required" */}
          <br />

          <label htmlFor="phone" className="register-phone-label">Telefone:</label>
          <input type="tel" className="register-phone-input" placeholder="Ex: (88) 99657 - 5242" tabIndex="1" required /> {/* Tipo "tel" e "required" */}
          <br />

          <label htmlFor="password" className="register-password-label">Senha:</label>
          <input type="password" className="register-password-input" tabIndex="2" required /> {/* Tipo "password" e "required" */}
          <br />

          <button type="submit" className="create-account-button" tabIndex="3">Criar Conta</button> {/* Botão de submit */}
        </form>
        </div>
      </div>
      </div>
  );
};

export default register;