import React, { useEffect, useRef } from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: "100%",
    overflowY: 'scroll'
  },
  container: {
    margin: "0.5rem 0",
    height: 'auto'
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    width: "100%"
  },
  chip: {
    maxWidth: '50% !important',
    height: 'auto !important',
    textAlign: 'left'
  }
}));

export default function Display(props) {
  const classes = useStyles();
  const data = /*props.messages ? props.messages :*/ [{
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    time: new Date(),
    score: 3,
    username: 'Kevin',
    id: 1
  },
  {
    message: 'Hello!',
    time: new Date(),
    score: 3,
    username: 'Jamie',
    id: 2
  }
  ];
  const username = props.username ? props.username : "Jamie";

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, []);

  return (
      <div className={classes.root}>
        {data.map(row => (
            <Message classes={classes} row={row} username={username} />
        ))}
        <div ref={messagesEndRef}>End of Page</div>
      </div>
  );
}


function Message(props) {
  const row = props.row;
  const classes = props.classes;
  const username = props.username;

  return (
    <Typography 
      className={classes.message} 
      style={{ 
        float: row.username == username ? "right" : "left", 
        alignItems: row.username == username ? "flex-end" : "flex-start" 
      }}
    >
      <Chip 
        icon={<TagFacesIcon />} 
        label={row.message} 
        className={classes.chip} 
      />
      <Typography 
        variant="caption" 
        style={{ 
          textAlign: row.username == username ? "right" : "left" 
        }} 
        className={classes.details}
      >
      {row.time.toLocaleString('en-AU', { hour: 'numeric', minute: 'numeric', hour12: true })} - {row.username}
      </Typography>
    </Typography>
  )
}