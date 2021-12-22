import { openPopup } from './index.js';

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

  generateCard() {
    this._element = this._getTemplate();
    //this._setEventListeners(); // вызовите _setEventListeners

    // ставим лайк
    this._element.querySelector('.photo-grid__heart').addEventListener('click', function (evt) {
      evt.target.classList.toggle('photo-grid__heart_active');
    });

    // удаляем карточку
    const _cardsDelete = this._element.querySelector('.photo-grid__delete');
    _cardsDelete.addEventListener('click', function () {
      const listItem = _cardsDelete.closest('.task');
      listItem.remove();
    });

    // показываем фото в попап

    const _pictureInPopup = document.querySelector('.popup__picture-image');
    const _popupPictureDiscription = document.querySelector('.popup__picture-discription');
    const _popupPicture = document.querySelector('.popup_picture');
    const _thisLink = this._link;
    const _thisName = this._name;
    this._element.querySelector('.photo-grid__image').addEventListener('click', function() {
      _pictureInPopup.src = _thisLink;
      _pictureInPopup.alt = _thisName;
      _popupPictureDiscription.textContent = _thisName;
      openPopup(_popupPicture);
    });

    this._element.querySelector('.photo-grid__image').src = this._link;
    this._element.querySelector('.photo-grid__text').textContent = this._name;

    return this._element;
  }
}

