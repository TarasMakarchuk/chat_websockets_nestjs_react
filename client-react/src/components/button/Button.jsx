import React from "react";
import './button.css';

export const Button = props => {
    return (
        <button
            data-testid='button'
            className='success-button'
            disabled={props.disabled}
            onClick={props.onClick}
            title={props.title}
        >
            {props.title}
        </button>
    );
}
