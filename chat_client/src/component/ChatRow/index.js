import React from "react";
import "./style.css";

export default function ChatRow({ potrait, time, name, message }) {
  return (
    <div className="chat-row-container">
      <span className="chat-row-time">{time}</span>
      <span className="chat-row-name">{name}</span>
      <span className="chat-row-name">{message}</span>
    </div>
  );
}
