export default class Popup {
  constructor(popupSelector) {
    this._container = document.querySelector(popupSelector);
  }

  //общая функция придания видимости попапам:
  open() {
    this._container.classList.add('popup_opened');
    this._handleEscClose();
    this._setEventListeners();
  }

  //общая функция скрытия попап:
  close() {
    this._container.classList.remove('popup_opened');
  }

  //закрываем попап по нажатию на esc
  _handleEscClose() {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this._container.classList.remove('popup_opened');
      }
    });
  }

  //добавляем обработчик клика иконке закрытия, закрываем попап кликом на затемненную область
  _setEventListeners() {
    document.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this._container.classList.remove('popup_opened');
      }
      if (evt.target.classList.contains('popup__close-button')) {
        this._container.classList.remove('popup_opened');
      }
    });
  }
}