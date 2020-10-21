import { getData, getCookie, putData, deleteData } from "./curl";

const getRequestFriend = async () => {
    let token = getCookie(document.cookie);
    if(token)
        return await getData(process.env.REACT_APP_API+'request/', {'Content-Type': 'application/json', 'access-token': token});
    else
        return {error: 1010};
}

const aceptRequestFriend = async (_id) => {
    let token = getCookie(document.cookie);
    if(token)
        return await putData(process.env.REACT_APP_API+'request/', {'Content-Type': 'application/json', 'access-token': token}, {_id: _id});
    else
        return {error: 1010};
}

const declineRequestFriend = async (_id) => {
    let token = getCookie(document.cookie);
    if(token)
        return await deleteData(process.env.REACT_APP_API+'request/', {'Content-Type': 'application/json', 'access-token': token}, {_id: _id});
    else
        return {error: 1010};
}

export {
    getRequestFriend,
    aceptRequestFriend,
    declineRequestFriend,
}