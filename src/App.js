import React, { useState } from 'react';

import './App.css';
import SignIn from './components/signin/SignIn';
import Wait from './components/wait_page/Wait';
import Notification from './components/chatroom/notification/Notification';
import Messages from './components/messages/Messages';
import Friend from './components/friend-page/Friend';
import Contact from './components/chatroom/contact/Contact';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const { getCookie } =  require('./services/curl');

export default function App() {
  const [user, setUser] = useState(null);
  const [show_wait, setshow_wait] = useState(false);
  const [menuphone, setmenuphone] = useState(false);

  const logout = () => {
    setUser(null);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  function LoginPage(){
    let history = useHistory();
    let location = useLocation();

    let token = getCookie(document.cookie);
    let { from } = (token?location.state:undefined) || { from: { pathname: "/" } };
    
    let login = (user) => {
      setshow_wait(true);
      setTimeout(() => {
        setUser(user);
        history.replace(from);
      }, 250);

      setTimeout(() => setshow_wait(false), 1750);
    };

    return <SignIn login={login}/>;
  }

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route {...rest}
        render={({ location }) =>
          user ?
            (children)
            :(<Redirect to={{pathname: "/login", state: { from: location }}}/>)
        }
      />
    );
  }

  return (
    <div className="App">
      {/*<Wait show_wait={show_wait} />*/}
      <Router>
        <div className="ChatRoom">
          {user && <Contact
            current_user={user}
            logout={logout}
            menuphone={menuphone}
          />}
          <div className="container-body">
            <div className="options-seen-menuphone" onClick={() => setmenuphone(true)}>
              <i className="fas fa-bars"></i>
            </div>
            <div className={(menuphone)?'background-button':''} onClick={() => setmenuphone(false)}></div>
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <PrivateRoute path="/chat/:id">
                <Messages/>
              </PrivateRoute>
              <PrivateRoute path="/">
                <Friend current_user={user}/>
              </PrivateRoute>
            </Switch>
            <div className="notification">
              {user && <Notification/>} 
            </div>
            </div>
          </div>
      </Router>
    </div>
  )  
}