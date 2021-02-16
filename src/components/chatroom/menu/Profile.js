import React, { useState } from 'react';

import { useHistory } from "react-router-dom";
import logo from '../../../logo.svg';
import {useTransition, animated} from 'react-spring'

const { signOut } = require('../../../services/auth');

export default function Profile(props){
    const [seenmenu, setseenmenu] = useState(false);

    let history = useHistory();
    let { from } = { from: { pathname: "/" } };

    const transitions = useTransition(seenmenu, null, {
        from: { opacity: 0, transform: 'scale(0.8)' },
        enter: { opacity: 1, transform: 'scale(1)' },
        leave: { opacity: 0, transform: 'scale(0.8)'},
        config: {duration: 100}
      })

    const logout= () => {
      history.replace(from);
      signOut();
    }

    /* onMouseLeave={() => setseenmenu(false)} */
    return (
        <div className="container-profile">
          {transitions.map(({ item, key, props }) =>
            item && <animated.div key={key} style={props} className="container-menu">
              <div className="contact contact--button" onClick={() => logout()}>
                <span className="logout">Cerrar sesion</span>
              </div>
            </animated.div>
          )}
          <div className="contact" onClick={() => setseenmenu(!seenmenu)}>
            <img className="contact__avatar" src={logo} alt="profile potho"/>
            <span className="text username">{props.current_user.username}</span>
          </div>
        </div>
    )
}