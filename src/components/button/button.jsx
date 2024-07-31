import React from "react";
import "./button.css";

const Button = ({text, onMouseClick, style}) => 
    {
        return (
        <button
            onClick={onMouseClick}
            className={`button`}
            style={style}
        >
            {text}
        </button>
        );
  };
  
export default Button;