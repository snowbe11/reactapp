import React from "react";
import "./style.css";

export default function ChatRow({ portrait, date, name, message }) {
  portrait = "https://freesvg.org/img/PixelCharacter.png";

  const time = new Date(date);

  return (
    <div className="chat-row-container">
      <div className="chat-row-potrait-container">
        <img className="chat-row-potrait" src={portrait} alt={name} />
      </div>
      <div>
        <div className="chat-row-name-container">
          <span className="chat-row-name">{name}</span>
          <span className="chat-row-time">{time.toLocaleString()}</span>
        </div>
        <div className="chat-row-message">{message}</div>
      </div>
    </div>
  );
}
