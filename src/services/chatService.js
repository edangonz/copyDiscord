import axios from 'axios'
import { getCookie } from "./curl";

const getChatFileApi = async (_id_chat) => {
    let token = getCookie(document.cookie);
    if(token)
        return await axios.post(process.env.REACT_APP_API+'chat', { id_chat : _id_chat}, { headers : {'Content-Type': 'application/json', 'access-token': token} });
    else
        return {code: 109};
} 

export {
    getChatFileApi
}