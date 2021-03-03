import React, { useState } from 'react'
import { connected_friend, subject_friends$ } from '../../../observer/connected_friends';
import './Friend.css'

import Friends from './friend/Friends'
import Newfriend from './new_friend/Newfriend';
import Pending from './pending/Pending';

import { useSelector } from 'react-redux'

export default function Friend(props) {
    const [menuSelected, setmenuSelected] = useState('Amigos');
    const friends = useSelector(store => store.friends);
    const options = ['Conectados', 'Amigos', 'Pendiente', 'Añadir amigo'];
/*
    componentDidMount(){
        
        this.observable = subject_friends$.asObservable()
            .subscribe(() => this.setState({ list_friends: connected_friend }));
        this.setState({ list_friends: connected_friend })
        
    }
    
    componentWillUnmount(){
        
        this.observable.unsubscribe();
        
    }
*/
    const getSection = (page) => {
        switch(page) {
            case 'Conectados':
              return <Friends connect={true} list_friends={/*Array.from(this.state.list_friends.values()*/friends.friends}
                user={props.user}/>;
            case 'Amigos':
              return <Friends list_friends={friends.friends}/>;
            case 'Pendiente':
                return <Pending pending={friends.pending}/>;
            case 'Añadir amigo':
                return <Newfriend/>;
            default:
                return <p>Algo salio mal</p>;
        }
    }

    
    return (
        <div className="container-friend">
            <nav className="menu-friend">
                <ul className="menu-friend__ul">
                    {options.map((o, index) => (
                        <li key={index} className={(menuSelected===o)?'selected':''}
                            onClick={() => setmenuSelected(o)}>
                            <span>{o}</span>
                        </li>
                    ))}
                  </ul>
            </nav>
            <div className="container-body-friend">
                {getSection(menuSelected)}
            </div>
        </div>
    )
}