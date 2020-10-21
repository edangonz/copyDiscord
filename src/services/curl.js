const getData = async (url = '', header = {}) => {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: header,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    return response.json();
}

const postData = async (url = '',  header = {}, data = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: header,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
}

const putData = async (url = '',  header = {}, data = {}) => {
    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: header,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
}

const deleteData = async (url = '',  header = {}, data = {}) => {
    const response = await fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: header,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
}

const getCookie = (cookie) => {
  let str = cookie.split('; ');
  
  var result = {};
  
  for (var i = 0; i < str.length; i++) {
    var cur = str[i].split('=');
    result[cur[0]] = cur[1];
  }

  return result.token;
}

export {
  getData,
  getCookie,
  postData,
  putData,
  deleteData,
}