import React, { useState } from 'react'
import { connect } from "react-redux";
import './Newmessage.css'
import { emitMessage, typing } from '../../../services/socketChat';

const mapStateToProps  = function (state) {
    return (
        {
            typing_friends : state.current_friend.typing,
            current_friend : state.current_friend
        }
    )
}

function Newmessage(props){
    const [formValue, setFormValue] = useState('');
    const [interval, setInterval] = useState('');
    const [state_typing, setState_typing] = useState('');

    const addMessage = (e) => {
        e.preventDefault();
        if(formValue)
            emitMessage(formValue, props.current_friend._id_chat, props.current_friend._id);
        setFormValue('');
    }

    const is_typing = (e) => {
        setFormValue(e)
        
        if(interval)
            window.clearInterval(interval);

        setInterval(window.setTimeout(() => {
            setState_typing(false)
            typing(props.current_friend._id, false)
        }, 3000));

        if(!state_typing){
            setState_typing(true)
            typing(props.current_friend._id, true)
        }
    }

    return (
        <form className="container-form" onSubmit={addMessage}>
            <h3 className="font-small">{(props.typing_friends)?`${props.current_friend.username} esta escribiendo...`:""}</h3>
            <input type="text"
            placeholder={`Enviar un mensaje a ${props.current_friend.username}`}
            value={formValue}
            onChange={(e) => is_typing(e.target.value)}/>
        </form>
    );
}

export default connect(mapStateToProps) (Newmessage);