import { getData, getCookie, putData, deleteData } from "./curl";

async function postData(url = '', data = {}) {
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

async function signIn(body){
    return await postData(process.env.REACT_APP_API+'login/', body);
}

async function isSignIn(){
    let token = getCookie(document.cookie);
    if(token)
        return await getData(process.env.REACT_APP_API+'login/', {'Content-Type': 'application/json', 'access-token': token});
    else
        return {code: 103};
}

async function createAccount(body){
    return await postData(process.env.REACT_APP_API+'create/', body);
}

async function signOut(){
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
    return undefined;
}

async function openChatConfiguration(_id, id_friend) {
    let token = getCookie(document.cookie);
    if(token)
        return await putData(process.env.REACT_APP_API+'configure/', {'Content-Type': 'application/json', 'access-token': token}, {_id: _id, id_friend: id_friend});
    else
        return {error: 1010};
}

async function closeChatConfiguration(_id, id_friend) {
    let token = getCookie(document.cookie);
    if(token)
        return await deleteData(process.env.REACT_APP_API+'configure/', {'Content-Type': 'application/json', 'access-token': token}, {_id: _id, id_friend: id_friend});
    else
        return {error: 1010};
}

module.exports = {
    signIn,
    signOut,
    isSignIn,
    createAccount,
    openChatConfiguration,
    closeChatConfiguration,
}