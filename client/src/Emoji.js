import React, { Component } from 'react';


const Emoji = props => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
  );
 function renderSwitch(param) {
   if (param <= -15) return <Emoji symbol = "😭"/>;
   else if (param <= -12) return <Emoji symbol = "😢"/>;
   else if (param <= -9) return <Emoji symbol = "😓"/>;
   else if (param <= -6) return <Emoji symbol = "😟"/>;
   else if (param <= -3) return <Emoji symbol = "🙁"/>;
   else if (param >= 15) return <Emoji symbol = "😍"/>;
   else if (param >= 12) return <Emoji symbol = "🥰"/>;
   else if (param >= 9) return <Emoji symbol = "😄"/>;
   else if (param >= 6) return <Emoji symbol = "😀"/>;
   else if (param >= 3) return <Emoji symbol = "😌"/>;
   else return <Emoji symbol = "😐"/>;
}

export default function Emote(props) {
    return  (
        <span>
           {renderSwitch(props.num)}
        </span>
    )
    
}