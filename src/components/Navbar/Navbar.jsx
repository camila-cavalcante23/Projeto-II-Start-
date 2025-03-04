import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { FaBars } from "react-icons/fa6"
import Logo from '../../assets/StartUFC-azul.png'
import { Link } from "react-router-dom"
import { FaTimes, FaUser, FaSignOutAlt, FaChevronDown } from 'react-icons/fa'
import Button from '../../components/Button/Button'
import { Link as ScrollLink} from 'react-scroll'
import axios from 'axios';  
import { useNavigate } from "react-router-dom";

function Navbar() {

const [isOpen, setIsOpen] = useState(false) 
const [user, setUser] = useState(null);
const [menuOpen, setMenuOpen] = useState(false);
const [role, setRole] = useState();
const navigate = useNavigate(); 

useEffect(() => {
    const id = localStorage.getItem('id'); 
    const role = localStorage.getItem('role');
    if (id && role) {
        setRole(role); 
        axios.get(`https://localhost:44367/users/${id}`)
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.error("Erro ao pegar dados do usuário:", error.response?.data || error.message);
          });
      }
    }, []);

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleLogout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <>
        <nav> 
            <div className='navbar'>

                <Link to="/">
                    <img src={Logo} alt="" className='navbar-logo'/>
                </Link>
            
                <ul className={isOpen ? "nav-link active" : "nav-link"}>
                    
                    <li>
                        <ScrollLink to="about-id" smooth={true} offset={-70} duration={500}>Quem Somos</ScrollLink>
                    </li>
                    <li>
                        <ScrollLink to="news-id" smooth={true} offset={-70} duration={500}>Notícias</ScrollLink>
                    </li>
                    <li>
                        <ScrollLink to="germinar-id" smooth={true} offset={-70} duration={500}>Germinar</ScrollLink>
                    </li>

                    {!user ? (
                        <li>
                        <Link to="/login">
                            <Button text="Login" color="green" />
                        </Link>
                        </li>
                    ) : (
                        
                        <li className="user-menu">
                            <div className="user-info" onClick={() => setMenuOpen(!menuOpen)}>
                                <div className="user-icon">
                                    <FaUser size={20} />
                                </div>
                                <span>{user.name}</span>
                                <FaChevronDown size={14} />
                            </div>

                            {menuOpen && (
                                <div className="dropdown-menu">
                                    <Link to="/perfil" className='profile-name'>Meu Perfil</Link>
                                    {role === "Admin" && (
                                    <Link to="/dashboard" className='dashboard-profile'>Dashboard</Link>
                                )}
                                    <div className='btn-leave'>
                                        <button onClick={handleLogout} ><FaSignOutAlt /> Sair</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    )}  
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