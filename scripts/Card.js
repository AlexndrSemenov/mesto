//import { pictureInPopup, popupPictureDiscription, popupPicture } from './utils.js';
// import PopupWithImage from './PopupWithImage.js';

// const popupIma = new PopupWithImage('.popup_picture');

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
    this._element.querySelector('.photo-grid__heart').classList.toggle('photo-grid__heart_active');
    }
  _handleDeleteCard = () => {
    this._element.querySelector('.photo-grid__delete').closest('.task').remove();
    this._element = null;
  }
  generateCard() {
    this._element = this._getTemplate();
    // ставим лайк
    this._element.querySelector('.photo-grid__heart').addEventListener('click', this._handleLike);
    
    // удаляем карточку
    this._element.querySelector('.photo-grid__delete').addEventListener('click', this._handleDeleteCard);

    // показываем фото в попап
    this._element.querySelector('.photo-grid__image').addEventListener('click', () => {
      this._handleCardClick(this._data);
    });

    this._element.querySelector('.photo-grid__image').src = this._link;
    this._element.querySelector('.photo-grid__text').textContent = this._name;

    return this._element;
  }
}