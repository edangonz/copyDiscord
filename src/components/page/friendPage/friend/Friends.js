import React, { useState } from 'react';
import logo from '../../../../logo.svg';

/*import { Link } from "react-router-dom";*/
import Menu from './Menu';

/*import { subject_friends$ } from '../../../../observer/connected_friends';*/

import { useDispatch } from 'react-redux'
import { updateFriends } from '../../../../redux/friends'

const { openChatFriend } = require('../../../../services/auth');

export default function Friends(props) {
    const dispatch = useDispatch();

    function MenuFunction(props){
        const [seenmenu, setseenmenu] = useState(false);

        return (
            <div className="icon" onClick={() => setseenmenu(!seenmenu)} onMouseLeave={() => setseenmenu(false)}>
                <i className="fas fa-ellipsis-v"></i>
                <Menu id_user={props.id_user} seenmenu={seenmenu}></Menu>
            </div>)
    }

    const openChat = (_id, state) => {
        if(!state)
            openChatFriend(_id).then(() => {dispatch(updateFriends())});
    }

    return (
        <>
            <h3 className="text title title--body">Todos los amigos - {props.list_friends.length}</h3>
            {props.list_friends && props.list_friends.map((f, index) =>
            <div key={index}>
                <div className="contact contact--friend" onClick={() => openChat(f._id, f.state_open)}>
                    <div className="row">
                    {f.id_session && <div className="point-connected"></div>}
                      <img className="contact__avatar" src={logo} alt="profile potho"/>
                      <span className="text username">{f.username}</span>
                    </div>
                    <div className="contact__icon">
                        {/*<Link to={'/chat/' + f._id} className="icon">
                            <i className="fas fa-comment-alt"></i>
                        </Link>*/}
                        <MenuFunction id_user={f._id}/>
                    </div>
                </div>
            </div>)}
        </>
    );
}