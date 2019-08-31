import React, { useEffect, useRef } from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import './App.css';
import Emote from './Emoji'


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

export default function Typing(props) {
    const classes = useStyles();
    const content = props.messages;
    const username = props.username;
    const text = content.length > 0 ?  `${username} is typing...` : "";
    return (
        <div className={classes.root}>
            <div className={classes.message} style={{ margin: '0 auto' }}>
                <Chip label = {text} className={classes.chip}/>
            </div>
        </div>
    );
}
