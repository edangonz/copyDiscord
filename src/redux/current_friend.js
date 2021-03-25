const current_friend = {
    _id: '',
    _id_chat: '',
    state_open: false,
    typing: false,
};

const SELECT_FRIEND = "SELECTED_FRIEND";
const TYPING = "TYPING";
const ERROR = "ERROR_CURRENT_FRIEND";

export default function FriendChatReducer(state = current_friend, action) {
    switch (action.type) {
        case SELECT_FRIEND:
            return {...state, ...action.payload}
        case TYPING:
            if(action.payload.id === state._id)
                state.typing = action.payload.state;
            return state;
        default:
            return state;
    }
}

export const update_current_friend = (id) => async (dispatch, getState) => {
    try {
        for (let u of getState().friends.friends){
            if(u._id_chat === id){
                dispatch({
                    type: SELECT_FRIEND,
                    payload: u
                });
                break;
            }
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: undefined
        });
    }
}