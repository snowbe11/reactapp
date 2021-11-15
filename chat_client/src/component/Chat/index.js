import React, { useState, useEffect, useRef } from "react";
import ChatHistory from "../ChatHistory";
import { TextField } from "@material-ui/core";
import "./style.css";

export default function Chat({ socket, loginContext }) {
  const [chat, setChat] = useState([]);
  //   const penddingMessage = useMemo(() => {
  //     return message;
  //   }, [message]);

  const messageRef = useRef();

  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  }, []);

  const submitText = (e) => {
    e.preventDefault();

    socket.emit("message", {
      name: loginContext.name,
      message: messageRef.current.value,
    });

    messageRef.current.value = "";
  };

  return (
    <div>
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
      <div>
        <ChatHistory {...chat} />
        <form onSubmit={submitText}>
          <div className="name-field">
            <TextField name="name" value={loginContext.name} label="Name" />
          </div>
          <div>
            <TextField
              inputRef={messageRef}
              name="message"
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
            />
          </div>
          <button>Send Message</button>
        </form>
      </div>
    </div>
  );
}
