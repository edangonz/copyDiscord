import { getData, getCookie, putData, deleteData } from './curl';

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
}

//sign in acount that was provide to username and password
const signIn = async (username, password) => {
    return await postData(process.env.REACT_APP_API+'login/', {username: username, password: password});
}

//sign account by token
const signInByToken = async (token) => {
    return getData(process.env.REACT_APP_API+'login/', {'Content-Type': 'application/json', 'access-token': token})
        .then((response) => (response.code === 101)? response.body : undefined);
}

const createAccount = async (body) =>{
    return await postData(process.env.REACT_APP_API+'create/', body);
}

const signOut = async () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    return undefined;
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