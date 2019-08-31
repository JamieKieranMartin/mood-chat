import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Login(props) {
    const [open, setOpen] = React.useState(true);

    function handleClose() {
        setOpen(false);
    }

    const handleSubmit = (e) => {
        props.handleUserName(e);
    }
    
    return (
        
        <div className="Login">
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Enter a user name:</DialogTitle>
                <DialogActions>
                <form onSubmit={handleSubmit}>
                    <TextField value = {props.userName} onChange = {props.handleUserName}></TextField>
                    {console.log(props.userName)}
                </form>
                </DialogActions>
            </Dialog>
        </div>
    )
}