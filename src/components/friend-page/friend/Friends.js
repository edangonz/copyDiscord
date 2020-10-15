import React, { useState } from 'react';
import logo from '../../../logo.svg';

import { Link } from "react-router-dom";
import Menu from './Menu';

import { subject_friends$ } from '../../../observer/connected_friends';

const { openChatConfiguration } = require('../../../services/auth');

export default function Friends(props) {
    function MenuFunction(props){
        const [seenmenu, setseenmenu] = useState(false);

        return (
            <div className="icon" onClick={() => setseenmenu(!seenmenu)} onMouseLeave={() => setseenmenu(false)}>
                <i className="fas fa-ellipsis-v"></i>
                <Menu id_user={props.id_user} seenmenu={seenmenu}></Menu>
            </div>)
    }

    const openChat = (_id) => {
        if(!props.current_user.configuration.chat_open.includes(_id))
            openChatConfiguration(props.current_user.configuration._id, _id)
                .then(() => {
                    props.current_user.configuration.chat_open.push(_id);
                    subject_friends$.next();
                })
    }

    return (
        <>
            <h3 className="text title title--body">Todos los amigos - {props.list_friends.length}</h3>
            {props.list_friends && props.list_friends.map((f, index) =><div key={index}>
                {(!props.connect || f.id_session) && <div className="contact contact--friend contact--friends"
                    onClick={() => props.search?props.action(f):''}>
                    <div className="logo-container">
                        {f.id_session?<div className="point-connected"></div>:''}
                        <img src={logo} alt="profile" className="logo"/>
                    </div>
                    <div className="contact--friends__text">
                        <p className="text text--friend username">{f.username}</p>
                        <p className="text username">{f.id_session?'Conectado':'Desconectado'}</p>
                    </div>
                    {!props.search && <div className="contact--friends__icon">
                        <Link to={'/chat/'+f._id} className="icon" onClick={() => openChat(f._id)}>
                            <i className="fas fa-comment-alt"></i>
                        </Link>
                        <MenuFunction id_user={f._id} />
                    </div>}
                </div>}
            </div>)}
        </>
    );
}