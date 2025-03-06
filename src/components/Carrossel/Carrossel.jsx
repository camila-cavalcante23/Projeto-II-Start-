import React, { useState } from "react";
import "./Carrossel.css";

const Carrossel = ({ imagens }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => {
            return (prevIndex + 3) % imagens.length;
        });
    };

    const prevImage = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 3 + imagens.length) % imagens.length
        );
    };

    const currentImages = imagens.slice(currentIndex, currentIndex + 3);

    return (
        <div className="carrossel-container1">
            <button className="prev" onClick={prevImage}>←</button>
            <div className="carrossel-imagens1">
                {currentImages.map((id, index) => (
                    <img
                        key={index}
                        src={`https://localhost:44367/api/images/${id}`} 
                        alt={`Imagem ${id}`} 
                        className="carrossel-imagem1"
                    />
                ))}
            </div>
            <button className="next" onClick={nextImage}>→</button>
        </div>
    );
};

export default Carrossel;
