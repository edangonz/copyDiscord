import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../../logo.svg';

import { useSelector} from 'react-redux'

import { useDispatch } from 'react-redux'
import { updateFriends, userTyping } from '../../../redux/friends'

import { initSocket } from '../../../services/socketChat';

import { addMessage } from '../../../redux/chat'

const { closeChatFriend } = require('../../../services/auth');

export default function Contacts(props) {
  const [selected, setselected] = useState(0)
  const friends = useSelector(store => store.friends.friends);
  const dispatch = useDispatch();

  const action = (TYPE, data) => {
    switch (TYPE) {
      case "ADDCHATFILE":
        const id = data._id;
        data._id = undefined;
        dispatch(addMessage(data, id))
        break;
      case "TYPING":
        dispatch(userTyping(data.state, data._id_friend))
        break;
      default:
        break;
    }
  }

  initSocket(props.user, action)

  const closeChat = (_id) => {
    closeChatFriend(_id).then(() => dispatch(updateFriends()));
  }

    return (
        <div className="container-menu container-contact">
          <h3 className="text title">mensajes directos</h3>
            {
              friends.map((element, index) => 
                  element.state_open && <div key={index}
                  className={`contact contact--friend ${(selected===element._id)?'selected':''}`}>
                    <Link className="row" to={'/chat/' + element._id_chat}>
                      <img className="contact__avatar" src={logo} alt="profile potho"/>
                      <span className={`text username ${(selected===element._id)?'text--selected':''}`}>{element.username}</span>
                    </Link>
                    <Link className="mini-icon" to="/"
                      onClick={() => closeChat(element._id)}>
                      <i className="fas fa-times"></i>
                    </Link>
                  </div>
                )
            }
        </div>
    );
}