export default class Card {
  constructor(data, cardSelector, handleCardClick, api, popupDeleteForm) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._likes = data.likes;
    this._popupDeleteForm = popupDeleteForm;
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
    this._likeButton.classList.toggle('photo-grid__heart_active');
    
    //проверяем наличие класса
    this._likeButton.classList.contains('photo-grid__heart_active')
      
      //если есть
      ? this._api.putLikes(this._data._id)
        .then(data => {
          this._photoGridLikes.textContent = data.likes.length;
        })
        .catch(err => console.log(err))
      
      //если нет
      : this._api.deleteLikes(this._data._id)
        .then(data => {
          this._photoGridLikes.textContent = data.likes.length;
        })
        .catch(err => console.log(err));
  }

  _handleDeleteCard = () => {
    //показываем попап с вопросом "Вы уверены?"
    this._popupDeleteForm.open();
    
    //присваиваем this._element свойство/ключ id
    this._element.id = this._data._id;
    
    //назначаем слушатель сабмита
    this._popupDeleteForm.setEventListeners(this._element);
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
    
    //сверяем id пользователя
    if(this._data.owner._id === 'caf3cafe8f4c9040eb3e2afd')      
      //если совпадает с создателем карточки отображаем значок корзины
      this._photoGridDelete.classList.add('photo-grid__delete_visible');
      
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