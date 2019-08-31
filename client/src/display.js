import React from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import './App.css';

const useStyles = makeStyles(theme => ({
  container: {
    margin: "0.5rem 0",
    display: 'block'
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    width: "100%"
  },
  details: {

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
    username: 'Kevin'
  },
  {
    message: 'Hello!',
    time: new Date(),
    score: 3,
    username: 'Jamie'
  }
  ];
  const username = props.username ? props.username : "Jamie";

  return (
      <React.Fragment>
        {data.map(row => (
          <div className={classes.container}>
            <Typography className={classes.message} style={{ float: row.username == username ? "right" : "left", alignItems: row.username == username ? "flex-end" : "flex-start" }}>
              <Chip icon={<TagFacesIcon />} label={row.message} className={classes.chip} />
              <Typography variant="caption" style={{ textAlign: row.username == username ? "right" : "left" }} className={classes.details}>{row.time.toLocaleString('en-AU', { hour: 'numeric', minute: 'numeric', hour12: true })} - {row.username}</Typography>
            </Typography>
          </div>
        ))}
      </React.Fragment>
  );
}
