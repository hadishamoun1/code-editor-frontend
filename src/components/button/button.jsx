import React from "react";
import "./button.css";

const Button = ({ onMouseClick, style, index }) => {
  function handleClick() {
    onMouseClick(index);
  }
  return (
    <button onClick={handleClick} className={`button`} style={style}>
      Chat
    </button>
  );
};

export default Button;
