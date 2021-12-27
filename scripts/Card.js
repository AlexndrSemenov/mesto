import { openPopup, pictureInPopup, popupPictureDiscription, popupPicture } from './utils.js';

export class Card {

  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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

  _handleOpenImage = () => {
    pictureInPopup.src = this._link;
    pictureInPopup.alt = this._name;
    popupPictureDiscription.textContent = this._name;
    openPopup(popupPicture);
  }

  generateCard() {
    this._element = this._getTemplate();

    // ставим лайк
    this._element.querySelector('.photo-grid__heart').addEventListener('click', this._handleLike);
    
    // удаляем карточку
    this._element.querySelector('.photo-grid__delete').addEventListener('click', this._handleDeleteCard);

    // показываем фото в попап
    this._element.querySelector('.photo-grid__image').addEventListener('click', this._handleOpenImage);

    this._element.querySelector('.photo-grid__image').src = this._link;
    this._element.querySelector('.photo-grid__text').textContent = this._name;

    return this._element;
  }
}