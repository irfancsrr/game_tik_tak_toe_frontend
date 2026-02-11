import React, { useState, useEffect, useRef } from 'react';
import GameOnline from './GameOnline'; // Import the GameOnline component
import io from 'socket.io-client';

function GameQueue() {
  const [playersJoined, setPlayersJoined] = useState(0);
  const [roomName, setRoomName] = useState('');
  const [tag, setTag] = useState('');
  const socket = useRef(null);

  useEffect(() => {
    // Connect to backend server (port 4000)
    socket.current = io("https://game-tik-tak-toe-backend.onrender.com");

    // Join queue
    socket.current.emit('joinQueue');

    // When server starts game
    socket.current.on('startGame', (room) => {
      setRoomName(room);
      setPlayersJoined(2);
    });

    // Receive tag (x or o)
    socket.current.on('tag', (tagValue) => {
      setTag(tagValue);
    });

    // Cleanup on unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  // If 2 players joined and room assigned → start game
  if (playersJoined >= 2 && roomName ) {
    return <GameOnline room={roomName} user={socket.current} tag={tag} />;
  }

  // Otherwise show waiting screen
  return (
    <div className="game-queue">
      <p>Waiting for another player to join ...</p>
    </div>
  );
}

export default GameQueue;
