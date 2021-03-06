import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._link = this._container.querySelector('.popup__picture-image');
    this._name = this._container.querySelector('.popup__picture-discription');
  }

  open(data) {
    super.open();
    this._link.src = data.link;
    this._link.alt = data.name;
    this._name.textContent = data.name;
  }
}