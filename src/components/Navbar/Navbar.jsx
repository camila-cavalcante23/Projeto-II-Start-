import React, { useState } from 'react'
import './Navbar.css'
import { FaBars } from "react-icons/fa6"
import Logo from '../../assets/StartUFC-azul.png'
import { Link } from "react-router-dom"
import { FaTimes } from 'react-icons/fa'
import Button from '../../components/Button/Button'
import { Link as ScrollLink} from 'react-scroll'

function Navbar() {

const [isOpen, setIsOpen] = useState(false) 
const toggleMenu = () => setIsOpen(!isOpen)

const handleClick = () => {
    alert('Botão clicado!');
}
  
  return (
    <>
        <nav> 
            <div className='navbar'>

                <Link to="/">
                    <img src={Logo} alt="" className='navbar-logo'/>
                </Link>
            
                <ul className={isOpen ? "nav-link active" : "nav-link"}>
                    
                    <li>
                        {/* <Link to="/quem-somos">Quem Somos</Link> */}
                        <ScrollLink to="about-id" smooth={true} offset={-70} duration={500}>Quem Somos</ScrollLink>
                    </li>
                    <li>
                        {/* <Link to="/noticias">Notícias</Link> */}
                        <ScrollLink to="news-id" smooth={true} offset={-70} duration={500}>Notícias</ScrollLink>
                    </li>
                    <li>
                        {/* <Link to="/germinar">Germinar</Link> */}
                        <ScrollLink to="germinar-id" smooth={true} offset={-70} duration={500}>Germinar</ScrollLink>
                    </li>

                    {/* <button type="button" className='button-login'>Login</button> */}
                    <Button text="Login" onClick={handleClick} color="green" />
                </ul>
                
                <button className="menu" onClick={toggleMenu}>
                    {isOpen ? <FaTimes/> : <FaBars/>}
                </button>

            </div>
        </nav>
    </>
  )
}

export default Navbar