import React, { useState } from 'react';

import './App.css';
import LoginPage from './components/page/LoginPage'
import Wait from './components/wait_page/Wait';
import Notification from './components/chatroom/notification/Notification';
import Messages from './components/messages/Messages';
import Friend from './components/friend-page/Friend';
import Contact from './components/chatroom/contact/Contact';

import {useSelector} from 'react-redux'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default function App() {
  //const [user, setUser] = useState(null);
  const [menuphone, setmenuphone] = useState(false);

  const user = useSelector(store => store.user);

  const logout = () => {
    //setUser(null);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route {...rest}
        render={({ location }) =>
          user._id ?
            (children)
            :(<Redirect to={{pathname: "/login", state: { from: location }}}/>)
        }
      />
    );
  }

  return (
    <div className="App">

      <Wait show_wait={user._id !== undefined} />

      <Router>
        <div className="ChatRoom">
            {/*<Contact
              current_user={user}
              logout={logout}
              menuphone={menuphone}
            />*/}
        
          <div className="container-body">

            <div className="options-seen-menuphone" onClick={() => setmenuphone(true)}>
              <i className="fas fa-bars"></i>
            </div>
            
            <div className={(menuphone)?'background-button':''} onClick={() => setmenuphone(false)}></div>
              <Switch>

                <Route path="/login">
                  <LoginPage/>
                </Route>

                {/*
                <PrivateRoute path="/chat/:id">
                  <Messages/>
                </PrivateRoute>
                */}
                <PrivateRoute path="/">
                  {/*<Friend current_user={user}/>*/}
                </PrivateRoute>
                
                
              </Switch>
              {/*
            <div className="notification">
              {user && <Notification/>} 
            </div>*/}

          </div>
        </div>
      </Router>
    </div>
  )  
}