import React  from 'react';

import './Menu.css';
import Profile from './Profile';
import ButtonsMenu from './ButtonsMenu';
import Contacts from './Contacts';

export default class Menu extends React.Component {
  state = {
    seenMenu: false,
    selected: window.location.href.split('/chat/')[1],
    list_friends: undefined
  }

  componentDidMount(){

  }
  componentWillUnmount(){

  }

  render(){
    return (
      <div className={`container-move ${(!this.state.seenMenu)?'noseen':'max-container'}`}>
        <div className="container">
          <ButtonsMenu/>
          <Contacts user={this.props.current_user}/>
          <Profile current_user={this.props.current_user}/>
        </div>
        <div className={`options-seen-menuphone ${(this.state.seenMenu)?'max':''}`} onClick={() => this.setState({seenMenu: !this.state.seenMenu})}>
          <i className="fas fa-bars"></i>
        </div>
      </div>
    );
  }
} 