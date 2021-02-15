import React, { useState } from 'react'
import './SignIn.css'
import Bubbles from './bubbles/Bubbles'
import FormLogin from './FormLogin'

import { Spring } from 'react-spring/renderprops'

import {useDispatch, useSelector} from 'react-redux'
import { singInUser } from '../../redux/user'

import {
    useHistory
} from "react-router-dom";

const { signIn, createAccount } = require('../../services/auth');

export default function SignIn(props) {
    let history = useHistory();

    const [message, setMessage] = useState(undefined);
    
    const dispatch = useDispatch();

    const onSubmit = (e,username, password) => {
        if(e) e.preventDefault();
        dispatch(singInUser(username, password, history))
    }
/*
    const onSumitRegister = (e) => {
        e.preventDefault();

        if(username.length >= 8 && password.length >= 3) {
            createAccount({username: username, password: password})
                .then((response) => {
                    if(response.code === 102)
                        onSubmit(undefined);                        
                    else 
                        replaceMesage(105);
                }).catch(() => replaceMesage(105));
        } else
            replaceMesage(109);
    }
*/
    const replaceMesage = (code) => {
        let message;

        switch (code) {
            case 105:
                message = 'Credenciales incorrectas';
                break;
            case 109:
                message = 'Ingrese un usuario de al menos 8 caracteres';
                break;
            default :
                break;
        }

        setMessage(message)
    }

        return (
            <div className="main-container center">
                <Spring
                    from={{ opacity: 0, transform: 'translateY(-100px)' }}
                    to={{ opacity: 1, transform: 'translateY(0)' }}>
                    {props =>
                        <FormLogin
                            onSubmit={onSubmit}
                            props={props}/>
                    }
                </Spring>
                <Bubbles/>
            </div>
        )
    
}
