import React, { useState } from 'react'
import './Navbar.css'
import { FaBars } from "react-icons/fa6"
import Logo from '../../assets/StartUFC-azul.png'
import { Link } from "react-router-dom"
import { FaTimes } from 'react-icons/fa'

function Navbar() {

const [isOpen, setIsOpen] = useState(false) 
const toggleMenu = () => setIsOpen(!isOpen)

  
  return (
    <>
        <nav> 
            <div className='navbar'>

                <Link to="/">
                    <img src={Logo} alt="" className='navbar-logo'/>
                </Link>
            
                <ul className={isOpen ? "nav-link active" : "nav-link"}>
                    
                    <li>
                        <Link to="/quem-somos">Quem Somos</Link>
                    </li>
                    <li>
                        <Link to="/noticias">Notícias</Link>
                    </li>
                    <li>
                        <Link to="/germinar">Germinar</Link>
                    </li>

                    <button type="button" className='button-login'>Login</button>
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