export default class Card {
  constructor(data, cardSelector, handleCardClick, api, popupDeleteForm, userId) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._likes = data.likes;
    this._popupDeleteForm = popupDeleteForm;
    this._userId = userId;
  }

  _getTemplate() {
    const taskTemplate = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.task')
      .cloneNode(true);
    return taskTemplate;
  }
  
  _handleLike = () => {
    
    //проверяем наличие класса
    if (this._likeButton.classList.contains('photo-grid__heart_active'))
    //если есть удаляем лайк
      {
      this._api.deleteLikes('cards', this._data._id)
      .then(data => {
        this._photoGridLikes.textContent = data.likes.length;
        this._likeButton.classList.remove('photo-grid__heart_active');
      })
      .catch(err => console.log(err))
      } else {
      //если нет ставим лайк
      this._api.putLikes('cards', this._data._id)
      .then(data => {
        this._photoGridLikes.textContent = data.likes.length;
        this._likeButton.classList.add('photo-grid__heart_active');
      })
      .catch(err => console.log(err));
      }
  }

  _handleDeleteCard = () => {
    //присваиваем this._element свойство/ключ id
    this._element.id = this._data._id;
    //показываем попап с вопросом "Вы уверены?"
    this._popupDeleteForm.open(this._element);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.photo-grid__heart');
    this._cardImage = this._element.querySelector('.photo-grid__image');
    this._cardName = this._element.querySelector('.photo-grid__text');
    this._photoGridDelete = this._element.querySelector('.photo-grid__delete');
    this._photoGridLikes = this._element.querySelector('.photo-grid__likes');
    this._cardImage.src = this._link;
    this._cardName.textContent = this._name;
    this._cardName.alt = this._name;
    this._photoGridLikes.textContent = this._likes.length;

    //сверяем id пользователя, если совпадает с создателем карточки
    if (this._data.owner._id == this._userId) {     
      //отображаем значок корзины
      this._photoGridDelete.classList.add('photo-grid__delete_visible');
    }

    //перебираем массив this._data.likes, если свойство _id хотя бы одного из объектов(кто лайкнул карточку) совпадает с id пользователя
    if (this._data.likes.some(item => {
        return item._id.includes(this._userId)
      })) {
      //затемняем значек лайка
      this._likeButton.classList.add('photo-grid__heart_active');
    }

    this._setEventListeners();
    return this._element;
  }

  //назначаем слушатели
  _setEventListeners() {
    // ставим лайк
    this._likeButton.addEventListener('click', this._handleLike);
    // удаляем карточку
    this._element.querySelector('.photo-grid__delete').addEventListener('click', this._handleDeleteCard);
    // показываем фото в попап
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }
}




// _handleLike = () => {
    
  //   //проверяем наличие класса
  //   if (this._likeButton.classList.contains('photo-grid__heart_active'))
  //   //если есть удаляем лайк
  //     {
  //     this._api.deleteLikes(this._data._id)
  //     .then(data => {
  //       this._photoGridLikes.textContent = data.likes.length;
  //       this._likeButton.classList.remove('photo-grid__heart_active');
  //     })
  //     .catch(err => console.log(err))
  //     } else {
  //     //если нет ставим лайк
  //     this._api.putLikes(this._data._id)
  //     .then(data => {
  //       this._photoGridLikes.textContent = data.likes.length;
  //       this._likeButton.classList.add('photo-grid__heart_active');
  //     })
  //     .catch(err => console.log(err));
  //     }
  // }