import React from "react";
import "./input.css";

const Input = ({placeholder, onTextChange, onMouseClick, onBlur , style, value }) => {
    return (
        <div className="input bg-color">
            <input
                type="text"
                placeholder={placeholder}
                onChange={(e) =>onTextChange(e)}
                onClick={onMouseClick}
                onBlur={onBlur}
                style={style}
                value={value}
            />
        </div>
    );
};

export default Input;