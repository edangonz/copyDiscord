import React from 'react'
import './LoginPage.css'
import Bubbles from './signin/bubbles/Bubbles'
import FormLogin from './signin/FormLogin'

import { Spring } from 'react-spring/renderprops'

import {useDispatch, useSelector} from 'react-redux'
import { singInUser, singInUserByToken, registerAccount } from '../../../redux/user'

import {
    useHistory,
    useLocation
} from "react-router-dom";

const { getCookie } =  require('../../../services/curl');

export default function LoginPage() {
    let history = useHistory();
    let location = useLocation();

    let token = getCookie(document.cookie);
    let { from } = (token?location.state:undefined) || { from: { pathname: "/" } };

    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    
    if(token && !user._id)
        dispatch(singInUserByToken(history, from));

    const onSubmit = (username, password) => {
        dispatch(singInUser(username, password, history))
    }

    const onSumitRegister = (username, password) => {
        dispatch(registerAccount(username, password, history))
    }

    return (
        <div className="main-container center">
            <Spring
                from={{ opacity: 0, transform: 'translateY(-100px)' }}
                to={{ opacity: 1, transform: 'translateY(0)' }}>
                {props =>
                    <FormLogin
                        onSubmit={onSubmit}
                        onSumitRegister={onSumitRegister}
                        message={user.error}
                        props={props}/>
                }
            </Spring>
            <Bubbles/>
        </div>
    )
    
}
