import React, { useState, useEffect } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';
import useSocket from 'use-socket.io-client';
//import Login from './Login';
import Display from './display';
import Login from './Login';
import Typing from './Typing'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#cfe8fc',
    height: '200px',
    borderRadius: '20px',
  },
  window: {
    padding: "2rem 2.5rem",
    width: '40%',
    height: '70vh',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  text: {
    width: '100%',
  }
});


export default function App() {
  const [message, setMessage] = useState("");
  const [typing,setType] = useState([]);
  const [displayMessage, setDisplayMessage] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [username, setUsername] = useState("");
  const classes = useStyles();

  const [socket] = useSocket('ws://127.0.0.1:2999', {
    autoConnect: true,
    secure: false
  });

  // on event, do something
  socket.on('new message', (text) => {
    let newData = displayMessage;
    if (!displayMessage.includes(text)) {
      newData.push(text);
      setDisplayMessage(newData);
    }
    
    setRefresh(!refresh);
  });

  socket.on('analyze', (text) => {
    let newData = typing;
    if (!typing.includes(text))
      {
        newData.push(text);
        setType(newData);
      }
    
  });

  const handleUserName = (e, tempUsername) => {
    e.preventDefault();
    setUsername(tempUsername)
    console.log(username);
  }
  
  return (
    <div className="App">
      {<Login handleUserName={handleUserName} userName = {username}></Login>}
      <header>
        <h1>Chat App</h1>
      </header>
      <Paper className={classes.window}>
        <Display refresh={refresh} messages={displayMessage} username={username} />
        <h1></h1>
        <Divider/>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            className={classes.text}
            value={message}
            onChange={handleChange}
          />
        </form>
      </Paper>
    </div>
  );
}

const handleChange = (e) => {
  e.preventDefault();
  setMessage(e.target.value);

  socket.emit('analyze', e.target.value);
}

const handleUserName = (e, tempUsername) => {
  e.preventDefault();
  setUsername(tempUsername)
  setRefresh(!refresh);
  console.log(username);
}

return (
  <div className="App">
    {<Login handleUserName={handleUserName} userName={username}></Login>}
    <header>
      <h1>Chat App</h1>
    </header>
    <Paper className={classes.window}>
      <Display refresh={refresh} messages={displayMessage} />
      
      <Divider />
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          className={classes.text}
          value={message}
          onChange={handleChange}
        />
      </form>
    </Paper>
    <Typing refresh={refresh} messages={typing} /> 
  </div>
);
}
