import React from 'react'
import './Button.css'

const Button = ({text, onClick, color = 'blue', disabled = false}) => {
  return (
    <button 
      className={`btn ${color}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
