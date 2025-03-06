import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Navbar2 from '../../components/Navbar2/Navbar2'

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className='dashboard'>
            <Navbar2/>
            <div className="admin-dashboard">
                <div className='group-dashboard'>
                <h1>Painel Administrativo</h1>
                <div className="dashboard-buttons">
                    <button className="news-button" color="green" onClick={() => navigate('/news-form')}>
                        Criar Notícia
                    </button>
                    <button className="event-button" onClick={() => navigate('/admin/create-event')}>
                        Criar Evento
                    </button>
                    <button className="gallery-button" color="green" onClick={() => navigate('/galeria')}>
                        Adicionar Fotos à Galeria
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
