import React, { useState } from 'react'
import { connect } from "react-redux";
import './Newmessage.css'
import { emitMessage, typing } from '../../../services/socketChat';

const mapStateToProps  = function (state, ownprops) {
    return (
        {
            typing_friends : state.current_friend.typing,
            current_friend : state.current_friend,
            url_image : ownprops.url_image,
            removeImage : ownprops.removeImage,
        }
    )
}

function Newmessage(props){
    const [formValue, setFormValue] = useState('');
    const [interval, setInterval] = useState('');
    const [state_typing, setState_typing] = useState('');

    const addMessage = (e) => {
        e.preventDefault();
        if(formValue || props.file)
            emitMessage(formValue, props.current_friend._id_chat, props.current_friend._id, props.file);
        setFormValue('');
        props.removeImage();
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
        <form className={`container-form ${(props.url_image)?'image':''}`} onSubmit={addMessage}>
            <div className="input-container">
                {props.typing_friends && <h3 className="font-small typing">
                    {(props.typing_friends)?`${props.current_friend.username} esta escribiendo...`:""}
                </h3>}
                {props.url_image && <img className="image" src={props.url_image} alt="nada"></img>}
                <input type="file" accept=".jpg, .jpeg, .png" formControlName="fileUrl" id="fileUrl" onChange={(e) => props.selectImage(e)}></input>
                <div className="input">
                    <label for="fileUrl"><i class="fas fa-plus-circle" ></i></label>
                    <input type="text"
                    placeholder={`Enviar un mensaje a ${props.current_friend.username}`}
                    value={formValue}
                    onChange={(e) => is_typing(e.target.value)}/>
                </div>
            </div>
        </form>
    );
}

export default connect(mapStateToProps) (Newmessage);