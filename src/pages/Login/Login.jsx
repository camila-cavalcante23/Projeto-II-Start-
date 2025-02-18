import React from 'react';
import './login.css'; // Importe o arquivo CSS

const App = () => {
  return (
    <div className="container">
      <div className="side_bar">
        <div></div>
        <div></div>
        <label style={{ color: 'white' }}>Bem Vindo</label>
        <img className='img_logo' src="src/assets/StartUFC-logo-verde.png" alt="Logo" />
        <label style={{ color: 'white' }}>Não tem conta na Start?</label>
        <button className='button_btn_register'>Cadastre-se</button>
        <div></div>
      </div>
      <div className="login_info">
        <h1 className='titlelog' style={{ textAlign: 'center' }}>Faça Login</h1>
        <label className='email'>Email:</label>
        <input type="email" placeholder="Ex: antonio@gmail.com" tabIndex="1" />
        <br />
        <label className='senha'>Senha:</label>
        <input type="password" tabIndex="2" />
        <br />
        <a tabIndex="4" href="URL" className="esqueceu_senha">
          Esqueceu a senha?
        </a>
        <br />
        <button className='button_enter' tabIndex="3">Entrar</button>
      </div>
    </div>
  );
};

export default App;