import { getChatFileApi } from '../services/chatService'

const chat = {};

const ADDCHATFILE = "ADD_CHAT_FILE";
const ERROR = "ERROR";

export default function chatFileReducer(state = chat, action) {
    switch (action.type) {
        case ADDCHATFILE:
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const getChatFile = (id) => async (dispatch, getState) => {
    try {
        if(!chat[id]){
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