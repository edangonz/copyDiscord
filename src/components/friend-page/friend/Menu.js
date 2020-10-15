import React from 'react';
import {useTransition, animated} from 'react-spring'
import { subject_update_friends$ } from '../../../observer/connected_friends'

const { deleteFriend } = require('../../../services/friends');

export default function Menu(props) {
    
    const transitions = useTransition(props.seenmenu, null, {
        from: { opacity: 0, transform: 'scale(0.8)' },
        enter: { opacity: 1, transform: 'scale(1)' },
        leave: { opacity: 0, transform: 'scale(0.8)'},
        config: {duration: 100}
    })

    const removeFriend = () => {
        deleteFriend({_id: props.id_user})
            .then((response) =>{
                if(response.code === 206)
                    subject_update_friends$.next();
            });
    }

    return (
        <div className="mini-menu-container">
            {transitions.map(({ item, key, props }) =>
                item && <animated.div key={key} style={props} className="container-menu mini-menu">
                    <div className="menu">
                        <div className="option option-delete" onClick={() => removeFriend()}>
                            <span>Eliminar amigo</span>
                        </div>
                    </div>
                </animated.div>
            )}
        </div>
    );
} 