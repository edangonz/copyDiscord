import { getCookie, putData, deleteData } from './curl';
import axios from 'axios';

//sign in acount that was provide to username and password
const signIn = async (username, password) => {
    return await axios.post(process.env.REACT_APP_API+'login/', {username: username, password: password});
}

//sign account by token
const signInByToken = async () => {
    let token = getCookie(document.cookie);
    return await axios.get(process.env.REACT_APP_API+'login/', { headers : {'Content-Type': 'application/json', 'access-token': token} });
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

const openChatConfiguration = async (_id, id_friend) => {
    let token = getCookie(document.cookie);
    if(token)
        return await putData(process.env.REACT_APP_API+'configure/', {'Content-Type': 'application/json', 'access-token': token}, {_id: _id, id_friend: id_friend});
    else
        return {error: 1010};
}

const closeChatConfiguration = async(_id, id_friend) => {
    let token = getCookie(document.cookie);
    if(token)
        return await deleteData(process.env.REACT_APP_API+'configure/', {'Content-Type': 'application/json', 'access-token': token}, {_id: _id, id_friend: id_friend});
    else
        return {error: 1010};
}

export {
    signIn,
    signOut,
    signInByToken,
    createAccount,
    openChatConfiguration,
    closeChatConfiguration,
}