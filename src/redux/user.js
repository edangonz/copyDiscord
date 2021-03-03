const { signIn, signInByToken, createAccount } = require('../services/auth');

const user = { };

const LOGIN = 'LOGIN_USER';
const LOGIN_BY_TOKEN = 'LOGIN_USER_BY_TOKEN';
const ERROR = "ERROR";

export default function userReducer(state = user, action) {
    let temp;
    switch (action.type) {
        case LOGIN:
            document.cookie=`token=${action.payload['access-token']}; path=/;`
            temp = {...action.payload};
            temp.friends = undefined;
            return {...state, ...temp}
        case LOGIN_BY_TOKEN:
            temp = {...action.payload};
            temp.friends = undefined;
            return {...state, ...temp}
        case ERROR:
            return {...state, error: action.payload}
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
        dispatch({
            type: ERROR,
            payload: replaceMesage(105)
        });
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
        dispatch({
            type: ERROR,
            payload: replaceMesage(105)
        });
    }
}

export const registerAccount = (username, password, history) => async (dispatch, getState) => {
    try {
        const response = await createAccount(username, password)
        if(response.data.code === 102) {
            dispatch({
                type: LOGIN,
                payload: response.data.body
            });
            let { from } = { from: { pathname: "/" } };
            history.replace(from);
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: replaceMesage(109)
        });
    }
}

const replaceMesage = (code) => {
    switch (code) {
        case 105:
            return 'Credenciales incorrectas';
        case 109:
            return 'Ingrese un usuario de al menos 8 caracteres';
        default :
            return "";
    }
}