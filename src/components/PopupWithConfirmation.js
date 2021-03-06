import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor( popupSelector, handleFormCallBack ) {
    super(popupSelector);
    this._handleFormCallBack = handleFormCallBack;
    this._popupForm = this._container.querySelector('form');
  }
 
  //назначаем обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormCallBack(this._card);
    });
  }

  //назначаем обработчик сабмита формы
  open(card) {
    super.open();
    //передаем объект, на котором произошло открытие попапа, в метод setEventListeners()
    this._card = card;
  }
}