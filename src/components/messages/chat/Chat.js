import React from 'react'
import logo from '../../../logo.svg'
import './Chat.css'

import {useSelector} from 'react-redux'

const { getDataChat } = require('../../../services/friends');

export default function Chat (props){
    const chat = useSelector(store => store.all_chat);
    const chat_file = chat[props.current_friend._id_chat];

    let messagesEnd;

    const getPreviousDataChat = () => {/*
        getDataChat(this.state.previous_id_chat)
            .then((response) => {
                if(response.code === 500){
                    this.chat_data.list_messages = [...response.body.list_messages, ...this.chat_data.list_messages];
                    this.setState({list_messages: this.chat_data.list_messages, previous_id_chat: response.body.previous_id_chat})
                    this.messagesEnd.scrollTo(0, document.body.scrollHeight);
                }
            });*/
    }

    const getMoreData = (e) => {/*
        if(e.target.scrollTop <= 200){
            if(this.state.previous_id_chat)
                this.getPreviousDataChat();
        }*/
    }
    
    return (
        <div className="container-messages">
            <h2 className="container-messages__title">{props.current_friend.username} <div></div></h2>
            <div className="container-messages__chat"
                onScroll={(e) => getMoreData(e)}
                ref={(el) => { messagesEnd = el }}>
                {chat_file && chat_file.messages.map((m, index) => 
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