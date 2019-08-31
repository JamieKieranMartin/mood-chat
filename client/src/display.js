import React, { useEffect, useRef } from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    height: '80%',
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
  const data = props.messages;
  const username = props.username ? props.username : "Jamie";

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, []);
  console.log(data)
  console.log(props.refresh)

  return (
      <div className={classes.root}>
        {data.map((row, index) => (
            <Message key={index} classes={classes} row={row} username={username} />
        ))}
        <Typography variant="overline" component='div' ref={messagesEndRef}>End of Page</Typography>
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
        label={row.score.score + " " + row.message} 
        className={classes.chip} 
      />
      <Typography 
        variant="caption" 
        style={{ 
          textAlign: row.username == username ? "right" : "left" 
        }} 
        className={classes.details}
      >
      {new Date(row.time).toLocaleString('en-AU', { hour: 'numeric', minute: 'numeric', hour12: true })} - {row.username}
      </Typography>
    </Typography>
  )
}
