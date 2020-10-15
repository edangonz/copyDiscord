import React from 'react'
import Chat from './chat/Chat'
import Newmessage from './newmessage/Newessage'

import { useParams } from "react-router-dom";
import { connected_friend } from '../../observer/connected_friends';

export default function Messages(){
    let { id } = useParams();

    return (
        <>
            {connected_friend.get(id) && <div className="list-friends">
                <Chat friend={connected_friend.get(id)}/>
                <Newmessage friend={connected_friend.get(id)} />
            </div>}
        </>
    );
}