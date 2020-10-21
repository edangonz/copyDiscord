import { getData, getCookie, postData, deleteData } from "./curl";

const getFriends = async () => {
    let token = getCookie(document.cookie);
    if(token)
        return await getData(process.env.REACT_APP_API+'friend/', {'Content-Type': 'application/json', 'access-token': token});
    else
        return {error: 1010};
}

const deleteFriend = async (filter) => {
    let token = getCookie(document.cookie);
    if(token)
        return await deleteData(process.env.REACT_APP_API+'friend/', {'Content-Type': 'application/json', 'access-token': token}, filter);
    else
        return {error: 1010};
}

const searchFriends = async (filter) => {
    let token = getCookie(document.cookie);
    if(token)
        return await postData(process.env.REACT_APP_API+'friend/search/',{'Content-Type': 'application/json', 'access-token': token}, {username: filter});
    else
        return {error: 1010};
}

const sendFriendRequest = async (user) => {
    let token = getCookie(document.cookie);
    if(token)
        return await postData(process.env.REACT_APP_API+'request/', {'Content-Type': 'application/json', 'access-token': token}, user);
    else
        return {code: 408};
}

const getDataChat = async (filter) => {
    let token = getCookie(document.cookie);
    if(token)
        return await postData(process.env.REACT_APP_API+'chat/',{'Content-Type': 'application/json', 'access-token': token}, {id_chat: filter});
    else
        return {error: 1010};
}

export {
    getFriends,
    searchFriends,
    sendFriendRequest,
    getDataChat,
    deleteFriend,
}