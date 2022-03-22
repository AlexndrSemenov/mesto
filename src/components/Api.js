export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
      }
      return Promise.reject('Произошла ошибка');
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers })
      .then(this._checkResponse);
  }

  createCard(task) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(task)
      })
        .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, { 
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  updateUser(task) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(task)
    })
      .then(this._checkResponse);
  }

  updateUserAvatar(task) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(task)
    })
      .then(this._checkResponse);
  }

  //ставим лайк
  putLikes(id) {
    return fetch(`${this._url}/cards/${id}/likes`, { 
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  //удаляем лайк
  deleteLikes(id) {
    return fetch(`${this._url}/cards/${id}/likes`, { 
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }
}