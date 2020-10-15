import React, { useState } from 'react'
import './Newmessage.css'
import ChatService from '../../../services/chat';

function Newmessage(props){
    const [formValue, setFormValue] = useState('');
    
    const addMessage = (e) => {
        e.preventDefault();
        if(formValue){
            ChatService.emitMessage(formValue);
        }
        setFormValue('');
    }

    return (
        <form className="container-form" onSubmit={addMessage}>
            <input type="text"
            placeholder={`Enviar un mensaje a ${props.friend.username}`}
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}/>
        </form>
    );
}

export default Newmessage;