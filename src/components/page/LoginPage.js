import React, { useState } from 'react';

import SignIn from '../signin/SignIn';

import {
    useHistory,
    useLocation
} from "react-router-dom";

const { getCookie } =  require('../../services/curl');
const { signInByToken } = require('../../services/auth');

export default function LoginPage(props){
    let history = useHistory();
    let location = useLocation();

    let token = getCookie(document.cookie);
    let { from } = (token?location.state:undefined) || { from: { pathname: "/" } };
    
    //aqui el metodo
    console.log("hola")
    
    if(token){
        signInByToken(token).then((user) => {
            console.log(user);
            props.login(user);
            history.replace(from);
        });
    }

    return <SignIn login={props.login}/>;
  }
