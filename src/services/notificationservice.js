import { getData, getCookie, deleteData } from "./curl";

const getNotifications = async () => {
    let token = getCookie(document.cookie);
    if(token)
        return await getData(process.env.REACT_APP_API+'notification/', {'Content-Type': 'application/json', 'access-token': token});
    else
        return {error: 1010};
}

const deleteNotification = async (_id) => {
    let token = getCookie(document.cookie);
    if(token)
        return await deleteData(process.env.REACT_APP_API+'notification/', {'Content-Type': 'application/json', 'access-token': token}, {_id: _id});
    else
        return {error: 1010};
}

export {
    getNotifications,
    deleteNotification,
}