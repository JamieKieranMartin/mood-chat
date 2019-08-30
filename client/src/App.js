import React from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import useSocket from 'use-socket.io-client';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#cfe8fc',
    height: '30vh',
  },
});


function App() {
  const classes = useStyles();

  const [socket] = useSocket('ws://localhost:2999',{
    autoConnect: true,
    secure: false,
  });

  // on event, do something
  socket.on('message', (text)=>{
    console.log(text);
  });

  socket.on('connected', (text)=>{
    console.log(text);
  });

  // send data to server
  socket.emit('message', 'this is demo..');

  return (
    <div className="App">
      <header>
        <h1>Chat App</h1>
      </header>
        <div>
          <Container maxWidth="sm">
            <Typography className={classes.root}>
              Chat log:
            </Typography>
          </Container>
          <TextField placeholder="Enter a message..."></TextField>
        </div>
    </div>
  );
}

export default App;
