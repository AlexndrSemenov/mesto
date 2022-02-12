export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    }

  _handleDeleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.photo-grid__heart');
    this._cardImage = this._element.querySelector('.photo-grid__image');
    this._cardName = this._element.querySelector('.photo-grid__text');
    this._cardImage.src = this._link;
    this._cardName.textContent = this._name;
    this._cardName.alt = this._name;
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