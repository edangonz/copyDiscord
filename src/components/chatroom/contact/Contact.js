import React  from 'react';

import { Link } from "react-router-dom";

import logo from '../../../logo.svg';
import { connected_friend, subject_friends$, subject_update_friends$ } from '../../../observer/connected_friends';
import './Contact.css';
import Profile from './Profile';
import ChatService from '../../../services/chat';

const { getFriends } =  require('../../../services/friends');
const { closeChatConfiguration } = require('../../../services/auth');

export default class Contact extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selected: window.location.href.split('/chat/')[1],
      list_friends: undefined
    }

    this.getConnectedFriends = this.getConnectedFriends.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    this.observable_friends = subject_friends$.asObservable()
      .subscribe(() => this.setState({ list_friends: connected_friend }));

    this.observable_update_friends = subject_update_friends$.asObservable()
      .subscribe(() => this.getConnectedFriends());
    
    this.getConnectedFriends()
      .then(() => ChatService.initSocket(this.props.current_user));
  }

  componentWillUnmount(){
    this.observable_friends.unsubscribe();
    this.observable_update_friends.unsubscribe();
    connected_friend.clear();
  }

  async getConnectedFriends(){
    getFriends()
      .then(response => {
        if(response.code !== 204){
          connected_friend.clear();
          for(let f of response.body)
            connected_friend.set(f._id, f);
          subject_friends$.next();
        }
      });
  }

  logout(){
    ChatService.endSocket();
    this.props.logout();
  }

  closeOpenChat(_id){
    closeChatConfiguration(this.props.current_user.configuration._id, _id)
      .then(() => {
        this.props.current_user.configuration.chat_open = this.props.current_user.configuration.chat_open.filter((value, index, arr) => value !== _id);
        subject_friends$.next();
      })
  }

  render(){
    return (
      <div className={`container ${(this.props.menuphone)?'seen-menuphone':''}`}>
        <div className="container-contact">
          <Link to='/' className="contact contact--friend contact--option" onClick={() => this.setState({selected: ''})}>
            <i className="fas fa-user-friends"></i><span className="text username">Amigos</span>
          </Link>
        </div>
        <div className="container-contact">
          <h3 className="text title">mensajes directos</h3>
            {
              this.state.list_friends && Array.from(this.state.list_friends.values()).map((element, index) => 
                (this.props.current_user.configuration.chat_open.includes(element._id)) &&
                  <div key={index}
                  className={`contact contact--friend ${(this.state.selected===element._id)?'selected':''}`}>
                    <Link className="link-chat"
                      onClick={() => this.setState({selected: element._id})}
                      to={'/chat/' + element._id}>
                      <img className="logo" src={logo} alt="profile potho"/>
                      <span className={`text username ${(this.state.selected===element._id)?'text--selected':''}`}>{element.username}</span>
                    </Link>
                    <Link className="mini-icon" to="/"
                      onClick={() => this.closeOpenChat(element._id)}>
                      <i className="fas fa-times"></i>
                    </Link>
                  </div>
                )
            }
         </div>
        <Profile current_user={this.props.current_user} logout={this.logout}/>
      </div>
    );
  }
} 