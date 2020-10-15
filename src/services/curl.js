async function getData(url = '', header = {}) {
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

async function postData(url = '',  header = {}, data = {}) {
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

async function putData(url = '',  header = {}, data = {}) {
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

async function deleteData(url = '',  header = {}, data = {}) {
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

function getCookie(cookie){
    let str = cookie.split('; ');
    var result = {};
    for (var i = 0; i < str.length; i++) {
        var cur = str[i].split('=');
        result[cur[0]] = cur[1];
    }

    return result.token;
}

module.exports = {
  getData,
  getCookie,
  postData,
  putData,
  deleteData,
}