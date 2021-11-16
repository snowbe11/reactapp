import React, { useState, useEffect, useRef } from "react";
import ChatHistory from "../ChatHistory";
import ChatInput from "../ChatInput";
import "./style.css";

export default function Chat({ socket, loginContext }) {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // 메시지 콜백은 한번만
    socket.on("message", ({ name, message }) => {
      setChat((prevChat) => {
        return [...prevChat, { name, message }];
      });
    });

    // 처음 페이지 진입시 채팅 기록을 요청
  }, []);

  return (
    <div className="chat-app-container">
      <div>채팅방 이름</div>
      <div>
        <span>
          <span>25명</span>
          <span>핀</span>
        </span>
        <span>
          <span>검색</span>
          <span>호출</span>
          <span>즐겨찾기</span>
          <span>도움말</span>
        </span>
      </div>
      <hr />
      <ChatHistory context={chat} />
      <ChatInput socket={socket} loginContext={loginContext} />
    </div>
  );
}
