import React, { useState, useEffect } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';
import useSocket from 'use-socket.io-client';
import Display from './display';
import Login from './Login';

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
  const [typing, setType] = useState([]);
  const [messages, setMessages] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [username, setUsername] = useState("");
  const classes = useStyles();

  const [socket] = useSocket('ws://127.0.0.1:2999', {
    autoConnect: true,
    secure: false
  });

  // on event, do something
  socket.on('new message', (text) => {
    let newData = messages;
    if (!messages.includes(text)) {
      newData.push(text);
      setMessages(newData);
    }
    setRefresh(!refresh);
  });

  socket.on('analyze', (text) => {
    let newData = typing;
    if (!typing.includes(text)) {
      newData.push(text);
      setType(newData);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('new message', message);
    setMessage('');
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
    socket.emit('analyze', e.target.value);
  }

  const handleUserSubmit = (e) => {
    setUsername(e);
    socket.emit('add user', e);
  }

  return (
    <div className="App">
      <Login open={username == "" ? true : false} handleUsername={handleUserSubmit}/>
      <header>
        <h1>Chat App</h1>
      </header>
      <Paper className={classes.window}>
        <Display typing={typing} username={username} refresh={refresh} messages={messages} />
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
    </div>
  );
}
