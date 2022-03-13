import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor( popupSelector, handleFormCallBack ) {
    super(popupSelector);
    this._handleFormCallBack = handleFormCallBack;
    this._popupForm = this._container.querySelector('form');
    this._popupInputList = this._container.querySelectorAll('.popup__text');
    this._popupBtnSubmitText = this._popupForm.querySelector('.popup__btn-submit');
  }
 
  //собираем данные всех полей попапа
  _getInputValues () {
    this._inputValues = {}
    this._popupInputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  //назначаем обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(false);
      //передаем объект с именем и профессией в метод setUserInfo класса UserInfo
      this._handleFormCallBack(this._getInputValues());
      this.close();
    });
  }
 
  close() {
    super.close();
    this._popupForm.reset();
  }

  open() {
    super.open();
    this.renderLoading(true);
  }

  //изменяем надпись на кнопке
  renderLoading(isLoading) {
    if (isLoading) {
      this._popupBtnSubmitText.value = 'Сохранить';
    } else {
      this._popupBtnSubmitText.value = 'Сохранение...';
    }
  }
}