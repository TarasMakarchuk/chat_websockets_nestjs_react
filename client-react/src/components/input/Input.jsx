import React from "react";
import './input.css';

export const Input = ({ value, onChange, emitTyping, placeholder }) => {
    return (
        <input
            className='input-text'
            data-testid='input-text'
            value={value}
            onChange={e => {
                onChange(e.target.value);
                emitTyping();
            }}
            type="text"
            placeholder={placeholder}
        />
    );
};
