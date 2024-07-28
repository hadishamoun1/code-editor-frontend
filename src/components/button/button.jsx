import React from "react";
import "./button.css";

const Button = ({text, onMouseClick}) => 
    {
        return (
        <button
            onClick={onMouseClick}
            className={`button`}
        >
            {text}
        </button>
        );
  };
  
export default Button;