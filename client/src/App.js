import React, { useState } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import useSocket from 'use-socket.io-client';


function App() {
  

  const useStyles = makeStyles({
    root: {
      backgroundColor: '#cfe8fc',
      height: '200px',
      borderRadius: '20px',
    },
  });

  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const classes = useStyles();
  //const [state, setState] = React.useState("kjkj");

  const [socket] = useSocket('ws://localhost:2999',{
    autoConnect: true,
    secure: false
  });

  // connect to socket
  //socket.connect();

  // on event, do something
  socket.on('new message', (text)=>{
    console.log(text);
  });


  const submitMessage = (event) => {
    event.preventDefault();
    socket.emit('new message', message);
    setDisplayMessage(message);
  }
  
  const handleChange = (event) => {
    setMessage(event.target.value)
  }

  return (
    <div className="App">
      <header>
        <h1>Chat App</h1>
      </header>
        <div>
          <Container maxWidth="sm">
            <Typography className={classes.root}>
              Chat log: <br />
              {displayMessage}
            </Typography>
          </Container>
          <form onSubmit={submitMessage}>
          <TextField
           onChange={handleChange}
           ></TextField>
           </form>
        </div>
    </div>
  );
}

export default App;
