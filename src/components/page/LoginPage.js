import React from 'react';

import SignIn from '../signin/SignIn';

import {useDispatch, useSelector} from 'react-redux'
import { singInUserByToken } from '../../redux/user'

import {
    useHistory,
    useLocation
} from "react-router-dom";

const { getCookie } =  require('../../services/curl');

export default function LoginPage(props){
    let history = useHistory();
    let location = useLocation();

    let token = getCookie(document.cookie);
    let { from } = (token?location.state:undefined) || { from: { pathname: "/" } };

    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    
    if(token && !user._id)
        dispatch(singInUserByToken(history, from));

    return <SignIn login={props.login}/>;
  }
