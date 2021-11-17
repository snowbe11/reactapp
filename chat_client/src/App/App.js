import "./App.css";
import Rank from "../component/Rank";
import Chat from "../component/Chat";
import io from "socket.io-client";

import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "../context/LoginContext";
import CreateAccount from "../component/CreateAccount";

const socket = io.connect("http://localhost:4000");

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="app-content-container">
          <Rank />
          <Chat socket={socket} loginContext={{ name: "current user" }} />
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/account" element={<CreateAccount />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
