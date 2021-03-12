const { getRequestFriend } = require('../services/requestService');

const friends = {
    friends: [],
    request: [],
    pending: []
};

const LOGIN = 'LOGIN_USER';
const LOGIN_BY_TOKEN = 'LOGIN_USER_BY_TOKEN';
const TYPING = "TYPING";
const ERROR = "ERROR";
const UPDATE_FRIENDS = "Update friends"

export default function friendReducer(state = friends, action) {
    switch (action.type) {
        case LOGIN:
            return {...state, ...action.payload.friends}
        case LOGIN_BY_TOKEN:
            return {...state, ...action.payload.friends}
        case UPDATE_FRIENDS:
            return {...action.payload}
        case TYPING:
            for (let f of state.friends){
                if (f._id === action.payload.id) {
                    f.typing = action.payload.state;
                }
            }
            return {...state}
        default:
            return state;
    }
}

export const get_data_friends = (file_friends) => async (dispatch, getState) => {
    try {
        dispatch({
            type: LOGIN,
            payload: file_friends
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: undefined
        });
    }
}

export const updateFriends = () => async (dispatch, getState) => {
    try {
        const response = await getRequestFriend()
        dispatch({
            type: UPDATE_FRIENDS,
            payload: response.data.body
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: undefined
        });
    }
}
/*

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
*/

export const userTyping = (state, id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TYPING,
            payload: { state : state, id : id }
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: undefined
        });
    }
}