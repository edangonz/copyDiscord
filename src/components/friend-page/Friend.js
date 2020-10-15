import React from 'react'
import { connected_friend, subject_friends$ } from '../../observer/connected_friends';
import './Friend.css'

import Friends from './friend/Friends'
import Newfriend from './new_friend/Newfriend';

import Pending from './pending/Pending';

export default class Friend extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            menuSelected: 'Amigos',
            list_friends: new Map(),
        }

        this.options = ['Conectados', 'Amigos', 'Pendiente', 'Añadir amigo'];
        this.getSection = this.getSection.bind(this);
    }

    componentDidMount(){
        this.observable = subject_friends$.asObservable()
            .subscribe(() => this.setState({ list_friends: connected_friend }));
        this.setState({ list_friends: connected_friend })
    }
    
    componentWillUnmount(){
        this.observable.unsubscribe();
    }

    getSection(page){
        switch(page) {
            case 'Conectados':
              return <Friends connect={true} list_friends={Array.from(this.state.list_friends.values())}
                current_user={this.props.current_user}/>;
            case 'Amigos':
              return <Friends list_friends={Array.from(this.state.list_friends.values())} current_user={this.props.current_user}/>;
            case 'Pendiente':
                return <Pending/>;
            case 'Añadir amigo':
                return <Newfriend/>;
            default:
                return <p>Algo salio mal</p>;
        }
    }

    render() {
        return (
        <div className="container-friend">
            <nav className="menu-friend">
                <ul className="menu-friend__ul">
                    {this.options.map((o, index) => (
                        <li key={index} className={(this.state.menuSelected===o)?'selected':''}
                            onClick={() => this.setState({menuSelected: o})}>
                            <span>{o}</span>
                        </li>
                    ))}
                  </ul>
            </nav>
            <div className="container-body-friend">
                {this.getSection(this.state.menuSelected)}
            </div>
        </div>
    );}
}