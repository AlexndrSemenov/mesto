const onError = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject('Произошла ошибка');
}

export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getTasks() {
    return fetch(this._url, { headers: this._headers })
      .then(onError);
  }

  createTask(task) {
      return fetch(this._url, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(task)
      })
        .then(onError);
  }

  deleteTask(id) {
    return fetch(`${this._url}/${id}`, { 
      method: 'DELETE',
      headers: this._headers
    })
      .then(onError);
  }

  updateUser(task) {
    return fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(task)
    })
      .then(onError);
  }

  //ставим лайк
  putLikes(id) {
    return fetch(`${this._url}/${id}/likes`, { 
      method: 'PUT',
      headers: this._headers
    })
      .then(onError);
  }

  //удаляем лайк
  deleteLikes(id) {
    return fetch(`${this._url}/${id}/likes`, { 
      method: 'DELETE',
      headers: this._headers
    })
      .then(onError);
  }
}