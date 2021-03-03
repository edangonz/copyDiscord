import { getData, getCookie, putData, deleteData } from "./curl";
import axios from 'axios';

const getRequestFriend = async () => {
    let token = getCookie(document.cookie);
    if(token)
        return await axios.get(process.env.REACT_APP_API+'request_friend/', {headers : {'Content-Type': 'application/json', 'access-token': token}});
    else
        return {code: 408};
}

const sendFriendRequest = async (_id) => {
    let token = getCookie(document.cookie);
    if(token)
        return await axios.post(process.env.REACT_APP_API+'request_friend', { _id: _id }, { headers : {'Content-Type': 'application/json', 'access-token': token}});
    else
        return {code: 408};
}

const aceptRequestFriend = async (_id) => {
    let token = getCookie(document.cookie);
    if(token)
        return await axios.put(process.env.REACT_APP_API+'request_friend/', {_id: _id}, { headers : {'Content-Type': 'application/json', 'access-token': token}});
    else
        return {code: 408};
}

const declineRequestFriend = async (_id) => {
    let token = getCookie(document.cookie);
    if(token)
        return await deleteData(process.env.REACT_APP_API+'request_friend/', {'Content-Type': 'application/json', 'access-token': token}, {_id: _id});
    else
        return {code : 408};
}

export {
    getRequestFriend,
    sendFriendRequest,
    aceptRequestFriend,
    declineRequestFriend,
}