import React, { useState, useEffect } from "react";
import ChatHistory from "../ChatHistory";
import ChatInput from "../ChatInput";
import "./style.css";

export default function Chat({ socket, loginContext }) {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // 메시지 콜백은 한번만
    socket.on("message", ({ date, name, message }) => {
      setChat((prevChat) => {
        return [...prevChat, { name, date, message }];
      });
    });

    // 처음 페이지 진입시 채팅 기록을 요청
  }, []);

  return (
    <div className="chat-app-container">
      <div className="chat-channel-title">채팅방 이름</div>
      <div className="chat-header-container">
        <div className="chat-header-left">
          <span>25명</span>
          <span>핀</span>
        </div>
        <div>
          <span className="chat-header-item">검색</span>
          <span className="chat-header-item">호출</span>
          <span className="chat-header-item">즐겨찾기</span>
          <span className="chat-header-item">도움말</span>
        </div>
      </div>
      <hr />
      <ChatHistory context={chat} />
      <ChatInput socket={socket} loginContext={loginContext} />
    </div>
  );
}
