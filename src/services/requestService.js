const { getData, getCookie, putData, deleteData } = require("./curl");

async function getRequestFriend() {
    let token = getCookie(document.cookie);
    if(token)
        return await getData(process.env.REACT_APP_API+'request/', {'Content-Type': 'application/json', 'access-token': token});
    else
        return {error: 1010};
}

async function aceptRequestFriend(_id) {
    let token = getCookie(document.cookie);
    if(token)
        return await putData(process.env.REACT_APP_API+'request/', {'Content-Type': 'application/json', 'access-token': token}, {_id: _id});
    else
        return {error: 1010};
}

async function declineRequestFriend(_id) {
    let token = getCookie(document.cookie);
    if(token)
        return await deleteData(process.env.REACT_APP_API+'request/', {'Content-Type': 'application/json', 'access-token': token}, {_id: _id});
    else
        return {error: 1010};
}

module.exports = {
    getRequestFriend,
    aceptRequestFriend,
    declineRequestFriend,
}