import "./App.css";
import Rank from "../component/Rank";
import Chat from "../component/Chat";

import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

function App() {
  return (
    <div className="App">
      <div className="app-content-container">
        <Rank />
        <Chat socket={socket} loginContext={{ name: "current user" }} />
      </div>
    </div>
  );
}

export default App;
