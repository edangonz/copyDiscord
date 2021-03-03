import { getCookie, putData, deleteData } from './curl';
import axios from 'axios';

//sign in acount that was provide to username and password
const signIn = async (username, password) => {
    return await axios.post(process.env.REACT_APP_API+'login/', {username: username, password: password});
}

//sign account by token
const signInByToken = async () => {
    let token = getCookie(document.cookie);
    if(token)
        return await axios.get(process.env.REACT_APP_API+'login/', { headers : {'Content-Type': 'application/json', 'access-token': token} });
    else
        return {code : 103};
}

//create acount with usename and password
const createAccount = async (username, password) =>{
    return await axios.post(process.env.REACT_APP_API+'create/', {username: username, password: password});
}

//end session user
const signOut = async () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
}

const openChatFriend = async (_id) => {
    let token = getCookie(document.cookie);
    if(token)
        return await axios.patch(process.env.REACT_APP_API+'friend/chat_open/', {_id: _id}, {headers : {'Content-Type': 'application/json', 'access-token': token}});
    else
        return {code : 103};
}

const closeChatFriend = async(_id, id_friend) => {
    let token = getCookie(document.cookie);
    if(token)
        return await axios.patch(process.env.REACT_APP_API+'friend/chat_close/', {_id: _id}, {headers : {'Content-Type': 'application/json', 'access-token': token}});
    else
        return {code : 103};
}

export {
    signIn,
    signOut,
    signInByToken,
    createAccount,
    openChatFriend,
    closeChatFriend,
}