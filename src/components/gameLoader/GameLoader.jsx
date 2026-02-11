// GameLoader.jsx
import "./GameLoader.css";

export default function GameLoader() {
  return (
    <div className="loader-container">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <p>Loading game...</p>
    </div>
  );
}
