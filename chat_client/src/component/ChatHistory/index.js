import React from "react";
import ChatRow from "../ChatRow";
import "./style.css";

export default function ChatHistory({ context }) {
  return (
    <div className="chat-history-container">
      {context &&
        context.map((row) => {
          return <ChatRow {...row} />;
        })}
    </div>
  );
}
