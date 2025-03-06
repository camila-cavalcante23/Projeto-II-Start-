import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Galeria.css";  
import Footer from "../../components/Footer/Footer";
import Navbar2 from "../../components/Navbar2/Navbar2";
import Carrossel from "../../components/Carrossel/Carrossel";

const Galeria = () => {
    const [imagens, setImagens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newImage, setNewImage] = useState(null);

    const role = localStorage.getItem('role'); 

    useEffect(() => {
        axios.get('https://localhost:44367/api/galeries')
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setImagens(response.data);
                } else {
                    throw new Error("Formato de resposta inválido");
                }
            })
            .catch((err) => {
                console.error("Erro ao buscar imagens:", err);
                setError("Erro ao carregar imagens.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const dividirImagens = (imagens) => {
        const total = imagens.length;
        const tamanhoParte = Math.ceil(total / 3); 

        return [
            imagens.slice(0, tamanhoParte), 
            imagens.slice(tamanhoParte, tamanhoParte * 2), 
            imagens.slice(tamanhoParte * 2)
        ];
    };

    const [imagens1, imagens2, imagens3] = dividirImagens(imagens);

    const handleImageChange = (event) => {
        setNewImage(event.target.files[0]); 
    };

    const handleAddImage = async () => {
        if (!newImage) {
            alert("Por favor, selecione uma imagem.");
            return;
        }

        const formData = new FormData();
        formData.append("image", newImage);

        try {
            const response = await axios.post('https://localhost:44367/api/galeries', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setImagens((prevImages) => [...prevImages, response.data]); 
            alert("Imagem adicionada com sucesso!");
            window.location.reload();
        } catch (error) {
            console.error("Erro ao adicionar a imagem:", error);
            alert("Erro ao adicionar a imagem.");
        }
    };

    return (
        <div>
            <Navbar2 />
            <div className="galeries-all">
                <h1 className="galeries-context">Galeria</h1>

                {loading ? (
                    <p>Carregando imagens...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : (
                    <div>
                        <Carrossel imagens={imagens1} />
                        <br />
                        <Carrossel imagens={imagens2} />
                        <br />
                        <Carrossel imagens={imagens3} />
                    </div>
                )}

                {role === "Admin" && (
                    <div className="add-image-container">
                        <div className="btn-input-img">
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange} 
                                className="image-upload" 
                            />
                            <button onClick={handleAddImage} className="add-image-btn">
                                Adicionar Imagem
                            </button>
                        </div>
                    </div>
                )}
            </div> 
            <Footer />   
        </div>
    );
};

export default Galeria;
