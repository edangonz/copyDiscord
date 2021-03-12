import { getChatFileApi } from '../services/chatService'

const chat = {};

const ADDCHATFILE = "ADD_CHAT_FILE";
const ADDNEWMESSAGE = "ADD_NEW_MESSAGE";
const ERROR = "ERROR";

export default function chatFileReducer(state = chat, action) {
    switch (action.type) {
        case ADDCHATFILE:
            return {...state, ...action.payload}
        case ADDNEWMESSAGE:
            state[action.payload.id].messages.push(action.payload.new_message)
            return {...state}
        default:
            return state;
    }
}

export const addMessage = (new_message, id) => (dispatch, getState) => {
    try {
        if(getState().all_chat[id]){
            dispatch({
                type: ADDNEWMESSAGE,
                payload: { new_message : new_message, id: id}
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: undefined
        });
    }
}

export const getChatFile = (id) => async (dispatch, getState) => {
    try {
        if(!getState().all_chat[id]){
            const chat_file = await getChatFileApi(id)

            if(chat_file.data.code === 500){
                dispatch({
                    type: ADDCHATFILE,
                    payload: { [id] : {messages : chat_file.data.body.list_messages, unread_messages : 0}}
                }
            )}
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: undefined
        });
    }
}