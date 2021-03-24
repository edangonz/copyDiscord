import React, { useEffect } from 'react'
import logo from '../../../logo.svg'
import './Chat.css'

import {useSelector, useDispatch} from 'react-redux'

import { addChatNewFile } from '../../../redux/chat'
import { connect } from "react-redux";

let top = 0

const mapStateToProps  = function (state, ownprops) {
    let messages
    if(state.all_chat[state.current_friend._id_chat])
        messages = state.all_chat[state.current_friend._id_chat].messages
    return (
        {
            chat_file : state.all_chat[state.current_friend._id_chat],
            messages : messages,
            current_friend : state.current_friend,
            url_image : ownprops.url_image
        }
    )
}

function Chat (props){
    //const chat = useSelector(store => store.all_chat);
    //const chat_file = chat[props.current_friend._id_chat];
    const dispacth = useDispatch();

    let messagesEnd;

    const getMoreData = (e) => {
        if((!e || e.target.scrollTop <= 0) && props.chat_file.previous_id_chat){
            dispacth(addChatNewFile(props.current_friend._id_chat, props.chat_file.previous_id_chat))
        } 
        top = messagesEnd.scrollHeight
        //console.log(messagesEnd.scrollHeight - ((e)? e.target.scrollTop : 0) - 610)
        //top = messagesEnd.scrollHeight - ((e)? e.target.scrollTop : 0) + 610;
        //console.log(messagesEnd.scrollTop);
    }

    useEffect(() => {
        //console.log(messagesEnd.scrollTop);
        //messagesEnd.scrollTop
        if(messagesEnd.scrollHeight - top < 100){
            //if((messagesEnd.scrollHeight - messagesEnd.scrollTop) < 500 )
                messagesEnd.scrollTo(0, messagesEnd.scrollHeight);
        } else {
            if(messagesEnd.scrollHeight === top)
                messagesEnd.scrollTo(0, messagesEnd.scrollHeight);
            else
                messagesEnd.scrollTo(0, messagesEnd.scrollHeight - top);
        }

        if(props.chat_file && props.chat_file.previous_id_chat && props.chat_file.messages.length < 40)
            getMoreData()
    });
    
    return (
        <div className={`container-messages ${(props.url_image)?'image':''}`}>
            <h2 className="container-messages__title">{props.current_friend.username} <div></div></h2>
            <div className="container-messages__chat"
                onScroll={(e) => getMoreData(e)}
                ref={(el) => { messagesEnd = el }}>
                {props.messages && props.messages.map((m, index) => 
                <div className={`container-messages__chat__message ${(m.onwer !== props.current_friend._id)?'onwer_container':''}`}
                    key={index}>
                    <img src={logo} alt="profile user"/>
                    <div className="container-messages__chat__message__body">
                        <h4 className="text text--name">
                            {(m.onwer===props.current_friend._id)?props.current_friend.username: 'Yo'}
                            <span className="font-small">{(new Date(m.date)).toDateString()}</span>
                        </h4>
                        <p className="text text--mesage">{m.message}</p>
                    </div>
                </div>
                )}
            </div>
        </div>    
    )
}


export default connect(mapStateToProps) (Chat);