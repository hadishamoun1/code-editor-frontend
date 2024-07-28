import React from "react";
import "./input.css";

const Input = ({placeholder, onTextChange, onMouseClick, onBlur }) => {
    return (
        <div className="input bg-color">
            <input
                type="text"
                placeholder={placeholder}
                onChange={(e) =>onTextChange(e)}
                onClick={onMouseClick}
                onBlur={onBlur}
            />
        </div>
    );
};

export default Input;