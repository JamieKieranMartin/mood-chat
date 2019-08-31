import React, { useState } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import useSocket from 'use-socket.io-client';
import Login from './Login';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#cfe8fc',
    height: '200px',
    borderRadius: '20px',
  },
});


export default function App() {
  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState([]);
  const [userName, setUserName] = useState("");
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
        <div>
          <Container maxWidth="sm">
            <Typography className={classes.root}>
              Chat log: <br />
              { displayMessage.map(row => (
                <LineItem key={row.time} text={row.message} />
              )) }
            </Typography>
          </Container>
          <form onSubmit={submitMessage}>
            <TextField
              value={message}
              onChange={handleChange}
            />
           </form>
        </div>
    </div>
  );
}

function LineItem(props) {
  return <p>{props.text}</p>
}