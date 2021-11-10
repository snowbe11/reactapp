import './App.css';
import { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

function App() {
  const [state, setState] = useState({message:'', name:''})
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('message', ({name, message}) => {
      setChat([...chat, {name, message}])
    })

    socket.on('rank', ({message, rank}) => {

      let newChat = []
      newChat.push({name:'system', message:message});

      for (const item of rank) {
        newChat.push({name:item.name, message:`score=${item.score}`})
      }

      setChat([...chat, ...newChat]);
    })
  })

  const onTextChanged = e => {
    setState({...state, [e.target.name]: e.target.value})
  }

  const submitText = e => {
    e.preventDefault();

    const {name, message} = state;

    socket.emit('message', {name, message});

    setState({message: '', name});
  }

  const getRank = () => {
    socket.emit('get rank');
  }

  const renderChat = () => {
    return chat.map(({name, message}, index) => (
      <div key={index}>
        <h3>{name}:<span>{message}</span></h3>
      </div>
    ))
  }

  return (
    <div className="App">
      <form onSubmit={submitText}>
        <h1>Message</h1>
        <div className="name-field">
          <TextField 
          name ="name" 
          onChange={e=> onTextChanged(e)} 
          value={state.name}
          label="Name"/>
        </div>
        <div >
          <TextField 
          name ="message" 
          onChange={e=> onTextChanged(e)} 
          value={state.message}
          id="outlined-multiline-static"
          variant="outlined"
          label="Message"/>
        </div>
        <button>Send Message</button>
      </form>

      <button onClick={getRank}>Get Rank</button>

      <div className="render-chat">
        <h1>Chat log</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default App;
