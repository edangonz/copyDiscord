import React from 'react'
import ContainerMessages from './ContainerMessages'

import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'

import { useParams } from "react-router-dom";
import { update_current_friend } from '../../redux/current_friend'
import { getChatFile } from '../../redux/chat'

export default function Messages(){

    let { id } = useParams();
    const current_friend = useSelector(store => store.current_friend);
    
    const dispatch = useDispatch()

    if(current_friend._id_chat !== id)
        dispatch(update_current_friend(id))
    
    dispatch(getChatFile(id))

    return (
        <>
            <ContainerMessages/>
        </>
    );
}