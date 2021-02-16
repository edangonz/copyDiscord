import React  from 'react';

import { Link } from "react-router-dom";

import { connected_friend, subject_friends$, subject_update_friends$ } from '../../../observer/connected_friends';
import './Menu.css';
import Profile from './Profile';
import ChatService from '../../../services/chat';
import ButtonsMenu from './ButtonsMenu';
import Contacts from './Contacts';

const { getFriends } =  require('../../../services/friends');
const { closeChatConfiguration } = require('../../../services/auth');

export default class Menu extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selected: window.location.href.split('/chat/')[1],
      list_friends: undefined
    }

    this.getConnectedFriends = this.getConnectedFriends.bind(this);
  }

  componentDidMount(){/*
    this.observable_friends = subject_friends$.asObservable()
      .subscribe(() => this.setState({ list_friends: connected_friend }));

    this.observable_update_friends = subject_update_friends$.asObservable()
      .subscribe(() => this.getConnectedFriends());
    
    
    this.getConnectedFriends()
      .then(() => ChatService.initSocket(this.props.current_user));*/
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

  closeOpenChat(_id){
    closeChatConfiguration(this.props.current_user.configuration._id, _id)
      .then(() => {
        this.props.current_user.configuration.chat_open = this.props.current_user.configuration.chat_open.filter((value, index, arr) => value !== _id);
        subject_friends$.next();
      })
  }

  render(){
    return (
      <div className={`container ${(this.props.seenMenu)?'hiden':''}`}>
        {/*${(this.props.menuphone)?'seen-menuphone':''}*/}
        <ButtonsMenu/>
        <Contacts/>
        <Profile current_user={this.props.current_user}/>
      </div>
    );
  }
} 