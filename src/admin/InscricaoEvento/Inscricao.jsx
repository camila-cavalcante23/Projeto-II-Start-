import React from 'react';
import { Link } from "react-router-dom";
import "./Inscricao.css";  
import Footer from "../../components/Footer/Footer";
import Navbar2 from "../../components/Navbar2/Navbar2";

const Inscricao = () => {
    
    

    return ( 
        <div>

            <Navbar2/>

            <div className="container1">
        
            <div className="formContainer">
                <h2 className="formTitle">Inscreva-se</h2>
                <form>
                    <label>Nome Completo:</label>
                    <input type="text" placeholder="Digite seu nome" required />

                    <label>CPF:</label>
                    <input type="text" placeholder="Digite seu CPF" required />

                    <label>Telefone:</label>
                    <input type="text" placeholder="Ex: (88) 99657 - 5242" required />

                    <button type="submit" className="confirmButton">Confirmar</button>
                </form>
            </div>
        </div>
            <Footer/>
        </div>
    );
};
  
export default Inscricao;
