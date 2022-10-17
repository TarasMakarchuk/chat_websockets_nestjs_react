import React from "react";
import './message.css';

export const Message = ({ item }) => {
    return (
        <div
            className='messages-list'
            data-testid='message'
        >
            <p className='user'>{item.name}</p>
            <div>{item.text}</div>
        </div>
    );

};
