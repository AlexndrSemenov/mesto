export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = document.querySelector(formElement);
    this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
    this._buttonElement = this._formElement.querySelector(config.submitButtonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }


  //публичный метод, который отключает кнопку
  disableButton() {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }


  //публичный метод, который включает валидацию формы
  enableValidation() {
    this._noSubmitDefault();
    this._setListeners();
  }

  //отменяем стандартные сабмиты
  _noSubmitDefault() {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    })
  }

  //устанавливаем слушатели
  _setListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._validityState(inputElement);
        this._toggleButtonState(inputElement);
      });
    });
  }

  //проверяем input, чтобы вывести/убрать сообщение об ошибке
  _validityState(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //добавляем класс с ошибкой
  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);// Находим блок, в котором отображается ошибка
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  //удаляем класс с ошибкой
  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._errorClass);
  }

  //меняем стиль кнопки попапа
  _toggleButtonState = () => {
    //проверяем валидность формы
    const isFormValid = this._formElement.checkValidity();
    //если форма невалидна добавляем кнопке класс
    this._buttonElement.classList.toggle(this._inactiveButtonClass, !isFormValid);
    //если форма невалидна присваеваем свойству disabled кнопки значение true
    this._buttonElement.disabled = !isFormValid;
  }
}