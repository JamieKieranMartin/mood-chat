import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#cfe8fc',
        height: '200px',
        borderRadius: '20px',
      },
    window: {
      padding: "2rem 2.5rem",
      width: '70%',
      height: '30vh',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    text: {
        width: '100%',
    }
  });

export default function Login(props) {
    const classes = useStyles();
    const open = props.open;
    const [user, setUser] = React.useState("");

    const handleChange = (e) => {
        setUser(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleUsername(user);
    }
    
    return (
        <div className="Login">
            <Dialog open={open} >
                <Paper className={classes.window}>
                <DialogTitle>Enter a user name</DialogTitle>
                <DialogActions>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        className={classes.text}
                        onChange={handleChange}
                        value={user}
                    ></TextField>
                </form>
                </DialogActions>
                </Paper>
            </Dialog>
        </div>
    )
}