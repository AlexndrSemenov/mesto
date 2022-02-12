export default class Popup {
  constructor(popupSelector) {
    this._container = document.querySelector(popupSelector);
    //здесь и на 11,17 строке правильно навешиваем обработчик
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //общая функция придания видимости попапам:
  open() {
    this._container.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //общая функция скрытия попап:
  close() {
    this._container.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
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
  setEventListeners() {
    this._container.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }
}