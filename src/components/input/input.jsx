import React from "react";
import "./input.css";

const Input = ({placeholder, onTextChange }) => {
    return (
        <div className="input bg-color">
            <input
                type="text"
                placeholder={placeholder}
                onChange={(e) =>onTextChange(e)}
            />
        </div>
    );
};

export default Input;