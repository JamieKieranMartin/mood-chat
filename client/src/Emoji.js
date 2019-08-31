import React, { Component } from 'react';
import { render } from 'react-dom';

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

    switch(param) {
      case -2:
        return <Emoji symbol = "🙃"/>;
      case 2:
        return <Emoji symbol = "😆"/>;
      default:
        return <Emoji symbol = "😅"/>;
    }
  }

export default function Emote(props) {
    return  (
        <div>
           {renderSwitch(props.num)}

        </div>
    )
    
}