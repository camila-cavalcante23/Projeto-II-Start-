import React from "react";
import "./Apoiadores.css";  
import Footer from "../../components/Footer/Footer";
import Navbar2 from "../../components/Navbar2/Navbar2";

const Apoiadores = () => {
    return (
        
        <div>
            <Navbar2/>
            <div className="geralparceiros">
            <h1 className="titulo-parceiros">Conheça Nossos Parceiros</h1>

          <div>
          <p className=" titulo2" > Sebrae: </p><br />
          <p className="conteudo1"> O SEBRAE (Serviço Brasileiro de Apoio às Micro e 
            Pequenas Empresas) é uma instituição de apoio 
            ao empreendedorismo no Brasil. Ele oferece consultoria, 
            capacitação e acesso a crédito para ajudar micro e 
            pequenas empresas a crescerem e se desenvolverem. 
            Além disso, o SEBRAE atua fortemente na promoção da 
            cultura empreendedora, oferecendo suporte técnico e 
            ferramentas para startups, ajudando-as a se estruturar e 
            atingir o mercado de forma mais eficiente.
          </p>

        
          </div>  
      
          </div> 
          <Footer />   
        </div>
    );
};

export default Apoiadores;
