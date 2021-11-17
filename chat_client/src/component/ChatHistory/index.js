import React from "react";
import ChatRow from "../ChatRow";
import "./style.css";

export default function ChatHistory({ context }) {
  console.log(context);

  return (
    <div className="chat-history-container">
      {context &&
        context.map((row, i) => {
          return <ChatRow key={`${row.name}${i}`} {...row} />;
        })}
    </div>
  );
}
