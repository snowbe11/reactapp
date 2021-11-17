import io from "socket.io-client";

import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "../../reducer";

import Rank from "../../component/Rank";
import Chat from "../../component/Chat";
import CreateAccount from "../../component/CreateAccount";
import Login from "../../component/Login";

import "./style.css";
import React from "react";

const socket = io.connect("http://localhost:4000");

function App() {
  const ChatPage = (
    <div className="app-content-container">
      <Rank />
      <Chat socket={socket} loginContext={{ name: "current user" }} />
    </div>
  );

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ChatPage} />
            <Route path="/account" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
