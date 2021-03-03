import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../../logo.svg';

import { useSelector} from 'react-redux'

import { useDispatch } from 'react-redux'
import { updateFriends } from '../../../redux/friends'

const { closeChatFriend } = require('../../../services/auth');

export default function Contacts(props) {
  const [selected, setselected] = useState(0)
  const friends = useSelector(store => store.friends.friends);
  const dispatch = useDispatch();

  const closeChat = (_id) => {
    closeChatFriend(_id).then(() => {dispatch(updateFriends())});
  }

    return (
        <div className="container-menu container-contact">
          <h3 className="text title">mensajes directos</h3>
            {
              /*this.state.list_friends && Array.from(this.state.list_friends.values())*/
              friends.map((element, index) => 
                /*(this.props.current_user.configuration.chat_open.includes(element._id)) &&*/
                  element.state_open && <div key={index}
                  className={`contact contact--friend ${(selected===element._id)?'selected':''}`}>
                    <Link className="row"
                      /*onClick={() => setselected(element._id)}*/
                      to={'/chat/' + element._id}>
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