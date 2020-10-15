const { getData, getCookie, deleteData } = require("./curl");

async function getNotifications() {
    let token = getCookie(document.cookie);
    if(token)
        return await getData(process.env.REACT_APP_API+'notification/', {'Content-Type': 'application/json', 'access-token': token});
    else
        return {error: 1010};
}

async function deleteNotification(_id) {
    let token = getCookie(document.cookie);
    if(token)
        return await deleteData(process.env.REACT_APP_API+'notification/', {'Content-Type': 'application/json', 'access-token': token}, {_id: _id});
    else
        return {error: 1010};
}

module.exports = {
    getNotifications: getNotifications,
    deleteNotification: deleteNotification,
}