import React from 'react';

import './App.css';
import LoginPage from './components/page/loginPage/LoginPage'
import Wait from './components/wait_page/Wait';
import Notification from './components/chatroom/notification/Notification';
import Messages from './components/messages/Messages';
import Friend from './components/page/friendPage/FriendPage';
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
        <div className="ChatRoom">
          {user._id && <Menu current_user={user}/>}
        
          <div className="container-body">
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
                <Friend user={user}/>
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