import React, {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {SERVER_URL} from "../constants/links";
import {Message} from "./message/Message";
import './chat.css';
import {Button} from "./button/Button";
import {Input} from "./input/Input";

export const Chat = () => {
    const socket = io(
        SERVER_URL,
        {transports: ['websocket', 'polling', 'flashsocket']}
    );

    const [userName, setUserName] = useState('');
    const [typingName, setTypingName] = useState('');
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [connected, setConnected] = useState(false);
    const [isUserTyping, setUserTyping] = useState(false);
    const [isDisabled, setDisabled] = useState(true);

    function connect() {
        socket.emit('join', {name: userName}, () => {
            setConnected(true);
        });

        socket.emit('findAllMessages', (data) => {
            setMessages(prev => [...prev, ...data]);
        });

        socket.on('message', (data) => {
            setMessages(prev => [...prev, data]);
        });

        socket.on('typingText', (data) => {
            setTypingName(data.name);
            const {isTyping} = data;
            setUserTyping(isTyping);
        });
    }

    const emitTyping = () => {
        socket.emit('typingText', {name: userName, isTyping: true});
        setTimeout(() => {
            socket.emit('typingText', {name: userName, isTyping: false});
        }, 1000);
    };

    const sendMessage = () => {
        const message = {
            name: userName,
            text: value,
        };
        socket.emit('createMessage', message);
        setValue('')
    };

    useEffect(() => {
        if (userName.length > 2) {
            setDisabled(false);
        }
    }, [userName]);

    useEffect(() => {
        if (userName.length < 2) {
            setDisabled(true);
        }
    }, [userName]);

    if (!connected) {
        return (
            <div className='user-name-enter-container'>
                <p className='greeting'>EK-Chat</p>
                <div className="form">
                    <Input
                        value={userName}
                        onChange={setUserName}
                        placeholder={"Enter your name"}
                    />
                    <Button
                        disabled={isDisabled}
                        onClick={connect}
                        title={'Go to chat'}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className='chat-container'>
            <p className='greeting'>{userName} online</p>

            {messages.map((item, index) => {
                return <Message
                    item={item}
                    key={index}
                />
            })}

            <div className='typing-card'>
                { isUserTyping && typingName !== userName && <p className='typing'>{typingName} typing ...</p> }
            </div>

            <Input
                value={value}
                onChange={setValue}
                emitTyping={emitTyping}
                placeholder={"Enter your message"}
            />

            <Button
                disabled={value.length < 1}
                onClick={sendMessage}
                title={'Send message'}
            />
        </div>);
};
