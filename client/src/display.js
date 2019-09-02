import React from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Chip from '@material-ui/core/Chip';
import './App.css';
import Emote from './Emoji';
import Typing from './Typing';
import Avatar from '@material-ui/core/Avatar';


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
  const username = props.username;
  const typing = props.typing;
  console.log(typing)
  return (
    <div className={classes.root}>
      {data.map((row, index) => (
        <Message key={index} classes={classes} row={row} username={username} />
      ))}

      { props.typing.username ? (<Typography
        className={classes.message}
        component="div"
        style={{
          float: typing.username == username ? "right" : "left",
          alignItems: typing.username == username ? "flex-end" : "flex-start"
        }}
      >
        <Chip
          label={`${typing.username} is typing...`}
          className={classes.chip}
        />
      </Typography>) : ""}

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
      component="div"
      style={{
        float: row.username == username ? "right" : "left",
        alignItems: row.username == username ? "flex-end" : "flex-start"
      }}
    >
        <Chip
          icon={<Avatar style={{background: "none"}}><Emote num={row.score.score} ></Emote></Avatar>}
          label={row.message}
          className={classes.chip}
        />
      <Typography
        variant="caption"
        style={{ textAlign: row.username == username ? "right" : "left" }}
        className={classes.details}
      >
      {new Date(row.time).toLocaleString('en-AU', { hour: 'numeric', minute: 'numeric', hour12: true })} - {row.username}
      </Typography>
    </Typography>
  )
}




