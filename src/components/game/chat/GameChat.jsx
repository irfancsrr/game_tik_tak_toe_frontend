import React, { useState, useEffect, useRef } from 'react';
import './GameChat.css';
import io from 'socket.io-client';
import messageSound from '../../../sounds/message.mp3';

const GameChat = ({ room, user }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const referense=useRef();

    useEffect(() => {
        const socket = io("http://localhost:4000");
        setSocket(socket);

        const audio = new Audio(messageSound);

        socket.emit('joinRoom', room);

        socket.on('message', (message) => {
            audio.play();
            setMessages(prevMessages => [...prevMessages, message.message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [room]);

    const sendMessage = () => {


        if (input.trim() !== '' && socket) {
            socket.emit('message', { message: input, room: room });
            setMessages(prevMessages => [...prevMessages, input]);
            setInput('');
        }
    };
    useEffect(() => { if (referense.current) { referense.current.scrollIntoView({ behavior: "smooth", block: "end" }); } }, [messages]);

    return (
     
     <form onSubmit={(e)=>e.preventDefault()}>
        <div className='chat'>
             <div className="chatMessages" >
                {messages.map((message, index) => (
                    <div key={index} className="message">{message}</div>
                ))}
                 <div ref={referense}></div>
            </div>
            <div className="chatInput">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type='submit' onClick={sendMessage}>Send</button>
            </div>
        </div>
   
     </form>
     
    );
};

export default GameChat;
