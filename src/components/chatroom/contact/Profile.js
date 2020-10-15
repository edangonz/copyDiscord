import React, { useState } from 'react';

import { useHistory } from "react-router-dom";
import logo from '../../../logo.svg';
import {useTransition, animated} from 'react-spring'

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
      props.logout()
      window.location.reload();
    }

    return (
        <div className="profile" onMouseLeave={() => setseenmenu(false)}>
          {transitions.map(({ item, key, props }) =>
            item && <animated.div key={key} style={props} className="container-menu">
              <div className="menu">
                <div className="option" onClick={() => logout()}>
                  <span>Cerrar sesion</span>
                </div>
              </div>
            </animated.div>
          )}
          <div className="contact contact--profile" onClick={() => setseenmenu(!seenmenu)}>
            <img className="logo" src={logo} alt="profile potho"/>
            <span className="text username">{props.current_user.username}</span>
          </div>
        </div>
    )
}