import React from 'react';
import logo from '../../../../logo.svg';

import {useDispatch} from 'react-redux'

import { updateFriends } from '../../../../redux/friends'
/*
import { subject_update_friends$ } from '../../../../observer/connected_friends';
import { subjectRequestFriends$ } from '../../../../observer/notice_friend';
*/
const { aceptRequestFriend, declineRequestFriend } =  require('../../../../services/requestService');

export default function Pending(props) {
    const dispatch = useDispatch();

    const aceptRequest = (_id) => {
        aceptRequestFriend(_id)
            .then((response) => {
                if(response.data.code === 402)
                    dispatch(updateFriends())
            });
    }

    const declineRequest = (_id) => {
        declineRequestFriend(_id)
            .then((response) => {
                if(response.code !== 407)
                    dispatch(updateFriends())
            });
    }

        return (
            <>
            <h3 className="text title title--body">Solicitudes de amistad - {props.pending.length}</h3>
            {props.pending.map((f, index) =>
                <div key={index} className="contact contact--friend">
                    <div className="row">
                      <img className="contact__avatar" src={logo} alt="profile potho"/>
                      <div className="column">   
                        <p className="text text--friend username">{f.username}</p>
                        <p className="text text--friend username" style={{fontSize: '0.618em'}}>Solicitud de amistad entrante</p>
                      </div>
                    </div>
                    <div className="contact__icon">
                        <div className="icon check" onClick={() => aceptRequest(f._id)}>
                            <i className="fas fa-check"></i>
                        </div>
                        <div className="icon nocheck" onClick={() => declineRequest(f._id)}>
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                </div>)
            }
        </>
        );
}