import React, { useState } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';
import useSocket from 'use-socket.io-client';
<<<<<<< HEAD
import Login from './Login';
=======
import Display from './display';
>>>>>>> 4d74a9bffc88a4c89fe5470faf648005f8db1ebe

const useStyles = makeStyles({
  root: {
    backgroundColor: '#cfe8fc',
    height: '200px',
    borderRadius: '20px',
  },
  display: {
    padding: "2rem 2.5rem",
    width: '40%',
    height: '50vh',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
});


export default function App() {
  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState([]);
<<<<<<< HEAD
  const [userName, setUserName] = useState("");
=======
  const [username, setUsername] = useState("");
>>>>>>> 4d74a9bffc88a4c89fe5470faf648005f8db1ebe
  const classes = useStyles();

  const [socket] = useSocket('ws://127.0.0.1:2999',{
    autoConnect: true,
    secure: false
  });

  // on event, do something
  socket.on('new message', (text)=>{
    console.log(displayMessage)
    let newData = displayMessage;
    if ( !newData.includes(text) ) {
      newData.push(text)
      setDisplayMessage(newData);
    }
    
  });

  const submitMessage = (e) => {
    e.preventDefault();
    socket.emit('new message', message);
    setMessage('');
  }
  
  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const handleUserName = (e) => {
    e.preventDefault();
    setUserName(e.target.value)
    console.log(userName);
  }

  console.log(displayMessage);

  return (
    <div className="App">
      <Login handleUserName={handleUserName}></Login>
      <header>
        <h1>Chat App</h1>
      </header>
      <Paper className={classes.display}>
        <Display/>
        <Divider/>
        <TextField/>
      </Paper>
    </div>
  );
}

function LineItem(props) {
  return <p>{props.text}</p>
}