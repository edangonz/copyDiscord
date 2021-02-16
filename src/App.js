import React, { useState } from 'react';

import './App.css';
import LoginPage from './components/page/LoginPage/LoginPage'
import Wait from './components/wait_page/Wait';
import Notification from './components/chatroom/notification/Notification';
import Messages from './components/messages/Messages';
import Friend from './components/friend-page/Friend';
import Menu from './components/chatroom/menu/Menu';

import {useSelector} from 'react-redux'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default function App() {
  const user = useSelector(store => store.user);
  const [seenMenu, setSeenMenu] = useState(true);
  //document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

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

      {/*user._id && <Wait/>*/}

      <Router>
        <div className={`ChatRoom`}>
            {user._id && <Menu
              current_user={user}
              seenMenu={seenMenu}
            />}
        
          <div className="container-body">
            {
            <div className={`options-seen-menuphone ${(!seenMenu)?'left':''}`}>
              <i className="fas fa-bars" onClick={() => setSeenMenu(!seenMenu)}></i>
            </div>}
            
            {/*<div className={(menuphone)?'background-button':''} onClick={() => setmenuphone(false)}></div>*/}
            
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