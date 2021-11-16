import React, { useRef } from "react";
import { TextField } from "@material-ui/core";
import "./style.css";

export default function ChatInput({ socket, loginContext }) {
  // 메모는 값 보다는 콜백에 더 적합한 방법이다.
  // JSX 자체를 캐시하는 형태도 쓸 수 있을 것 같다.
  //   const penddingMessage = useMemo(() => {
  //     return message;
  //   }, [message]);

  const messageRef = useRef();

  const submitText = (e) => {
    e.preventDefault();

    socket.emit("message", {
      name: loginContext.name,
      message: messageRef.current.value,
    });

    messageRef.current.value = "";
  };

  const inlineStyle = {
    width: "100%",
    padding: "1em",
  };

  return (
    <div className="chat-input-container">
      <form onSubmit={submitText}>
        <TextField
          inputRef={messageRef}
          name="message"
          id="outlined-multiline-static"
          variant="outlined"
          label="Message"
          style={inlineStyle}
        />
      </form>
    </div>
  );
}
