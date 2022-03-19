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

  getInitialCardsAndUser(endUrl) {
    return fetch(`${this._url}/${endUrl}`, { headers: this._headers })
      .then(this._checkResponse);
  }

  createCard(endUrl, task) {
      return fetch(`${this._url}/${endUrl}`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(task)
      })
        .then(this._checkResponse);
  }

  confirmationDeletion(endUrl, id) {
    return fetch(`${this._url}/${endUrl}/${id}`, { 
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  updateUser(endUrl, task) {
    return fetch(`${this._url}/${endUrl}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(task)
    })
      .then(this._checkResponse);
  }

  //ставим лайк
  putLikes(endUrl, id) {
    return fetch(`${this._url}/${endUrl}/${id}/likes`, { 
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  //удаляем лайк
  deleteLikes(endUrl, id) {
    return fetch(`${this._url}/${endUrl}/${id}/likes`, { 
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }
}



// const onError = res => {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject('Произошла ошибка');
// }

// export default class Api {
//   constructor({ url, headers }) {
//     this._url = url;
//     this._headers = headers;
//   }

//   getTasks() {
//     return fetch(this._url, { headers: this._headers })
//       .then(onError);
//   }

//   createTask(task) {
//       return fetch(this._url, {
//         method: 'POST',
//         headers: this._headers,
//         body: JSON.stringify(task)
//       })
//         .then(onError);
//   }

//   deleteTask(id) {
//     return fetch(`${this._url}/${id}`, { 
//       method: 'DELETE',
//       headers: this._headers
//     })
//       .then(onError);
//   }

//   updateUser(task) {
//     return fetch(this._url, {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify(task)
//     })
//       .then(onError);
//   }

//   //ставим лайк
//   putLikes(id) {
//     return fetch(`${this._url}/${id}/likes`, { 
//       method: 'PUT',
//       headers: this._headers
//     })
//       .then(onError);
//   }

//   //удаляем лайк
//   deleteLikes(id) {
//     return fetch(`${this._url}/${id}/likes`, { 
//       method: 'DELETE',
//       headers: this._headers
//     })
//       .then(onError);
//   }
// }