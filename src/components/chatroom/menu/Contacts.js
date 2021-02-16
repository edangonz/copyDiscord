import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../../logo.svg';

export default function Contacts(props) {
  const [selected, setselected] = useState(0)

  const pruebaAmigos = [
    {_id: "123456",
    username: "Eduardo"},
    {_id: "123456",
    username: "Andres"},
    {_id: "123456",
    username: "Gonzalez"}
  ];

    return (
        <div className="container-menu container-contact">
          <h3 className="text title">mensajes directos</h3>
            {
              /*this.state.list_friends && Array.from(this.state.list_friends.values())*/
              pruebaAmigos.map((element, index) => 
                /*(this.props.current_user.configuration.chat_open.includes(element._id)) &&*/
                  <div key={index}
                  className={`contact contact--friend ${(selected===element._id)?'selected':''}`}>
                    <Link className="row"
                      /*onClick={() => setselected(element._id)}*/
                      to={'/chat/' + element._id}>
                      <img className="contact__avatar" src={logo} alt="profile potho"/>
                      <span className={`text username ${(selected===element._id)?'text--selected':''}`}>{element.username}</span>
                    </Link>
                    <Link className="mini-icon" to="/"
                      /*onClick={() => this.closeOpenChat(element._id)}*/>
                      <i className="fas fa-times"></i>
                    </Link>
                  </div>
                )
            }
        </div>
    );
}