import React from 'react'
import Chat from './chat/Chat'
import Newmessage from './newmessage/Newessage'

import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'

import { useParams } from "react-router-dom";
import { update_current_friend } from '../../redux/current_friend'
import { getChatFile } from '../../redux/chat'
/*import { connected_friend } from '../../observer/connected_friends';*/

export default function Messages(){
    let { id } = useParams();
    const current_friend = useSelector(store => store.current_friend);
    
    const dispatch = useDispatch()

    if(current_friend._id_chat !== id)
        dispatch(update_current_friend(id))
    
    dispatch(getChatFile(id))

    return (
        <div className="list-friends">
            {/*friend={connected_friend.get(id)}*/}
            <Chat current_friend={current_friend}/>
            <Newmessage/>
        </div>
    );
}