const current_friend = {
    _id: '',
    _id_chat: '',
    state_open: false,
};

const SELECT_FRIEND = "SELECTED_FRIEND";
const ERROR = "ERROR";

export default function FriendChatReducer(state = current_friend, action) {
    switch (action.type) {
        case SELECT_FRIEND:
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const update_current_friend = (friends, id) => async (dispatch, getState) => {
    try {
        for (let u of friends){
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