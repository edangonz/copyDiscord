import axios from 'axios'
const { signIn, signInByToken } = require('../services/auth');

const user = { };

const LOGIN = 'LOGIN_USER';
const LOGIN_BY_TOKEN = 'LOGIN_USER_BY_TOKEN';

export default function userReducer(state = user, action) {
    switch (action.type) {
        case LOGIN:
            document.cookie=`token=${action.payload['access-token']}; path=/;`
            return {...state, ...action.payload}
        case LOGIN_BY_TOKEN:
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const singInUser = (username, password, history) => async (dispatch, getState) => {
    try {
        const response = await signIn(username, password)
        if(response.data.code === 100) {
            dispatch({
                type: LOGIN,
                payload: response.data.body
            });
            let { from } = { from: { pathname: "/" } };
            history.replace(from);
        }
    } catch (error) {
        console.log(error)
    }
}

export const singInUserByToken = (history, from) => async (dispatch, getState) => {
    try {
        const response = await signInByToken()
        if(response.data.code === 101) {
            dispatch({
                type: LOGIN_BY_TOKEN,
                payload: response.data.body
            });
            history.replace(from);
        }
    } catch (error) {
        console.log(error)
    }
} 