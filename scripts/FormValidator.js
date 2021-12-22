export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = document.querySelector(formElement);
    this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
    this._buttonElement = this._formElement.querySelector(config.submitButtonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }


  //отменяем стандартные сабмиты
  _noSubmitDefault() {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    })
  }

  //публичный метод, который включает валидацию формы
  enableValidation() {
    this._noSubmitDefault();
    this._setListeners();
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
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);//перенести вниз?
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //добавляем класс с ошибкой
  _showInputError(inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  //удаляем класс с ошибкой
  _hideInputError(inputElement) {
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






//-------------------------------------------------------------------------------------------------

// //1 создаем массив из форм
// //2 для каждой формы вызываем функцию setEventListeners

// const enableValidation = (config) => {
//   /*
//       Пример использования rest-оператора.
//       Из объекта config извлекаем свойство formSelector, остальные свойства помещаем в объект props. Название объекта может быть любым.
//   */
//   const { formSelector, ...props } = config;

//   // Найдём все формы с указанным классом в DOM,
//   // сделаем из них массив методом Array.from
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   formList.forEach((formElement) => {
//       formElement.addEventListener('submit', (evt) => {
//           evt.preventDefault();
//       });
//       // объект props передаём дальше. Он будет содержать в себе все необходимые свойства
//       setEventListeners(formElement, props);
//   })
// };



// //3 создаем массив из полей ввода
// //4 находим в текущей форме кнопку отправки
// //5 обходим массив и каждому полю назначаем слушатель, при активации запускаем для поля isValid(6)

// //11 Вызовем toggleButtonState и передадим ей массив полей и кнопку
// const setEventListeners = (formElement, config) => {
//   // Разбиваем конфиг на составляющие, чтобы передать нужные свойства в функции.
//         const {
//           inputSelector,
//           submitButtonSelector,
//           inactiveButtonClass,
//           errorClass,
//           inputErrorClass
//       } = config
// // inputSelector позволяет найти все поля ввода
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   // С помощью submitButtonSelector находим кнопку отправки формы
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   // inactiveButtonClass навашивается на кнопку формы, если она неактивна.
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//     isValid(formElement, inputElement, { errorClass, inputErrorClass });
//     toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//   });
//   });
// };



// //6 Функция, которая проверяет валидность поля
// //7 Если поле не проходит валидацию запускаем showInputError
// //8 Если поле проходит валидацию запускаем hideInputError
// const isValid = (formElement, inputElement, config) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, config);
//   } else {
//     hideInputError(formElement, inputElement, config);
//   }
// };



// //9 Функция, которая добавляет класс с ошибкой
// const showInputError = (formElement, inputElement, errorMessage, { errorClass, inputErrorClass }) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(inputErrorClass);
//   // Записываем текст ошибки в блок отображения ошибки
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(errorClass);
// };



// //10 Функция, которая удаляет класс с ошибкой
// const hideInputError = (formElement, inputElement, config) => {
//   const { inputErrorClass, errorClass, } = config;
//     // Находим блок, в котором отображается ошибка.
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
// };



// //12 Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
// const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
//   // Если есть хотя бы один невалидный инпут
//   if (hasInvalidInput(inputList)) {
//     // сделай кнопку неактивной
//     buttonElement.setAttribute('disabled', true);
//     buttonElement.classList.add(inactiveButtonClass);
//   } else {
//     // иначе сделай кнопку активной
//     buttonElement.removeAttribute('disabled');
//     buttonElement.classList.remove(inactiveButtonClass);
//   }
// };



// //13 Функция принимает массив полей
// const hasInvalidInput = (inputList) => {
//   // проходим по этому массиву методом some
//   return inputList.some((inputElement) => {
//     // Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся фунцкция hasInvalidInput вернёт true
//     return !inputElement.validity.valid;
//   });
// }







// enableValidation({
//   formSelector: '.popup__field',
//   inputSelector: '.popup__text',
//   submitButtonSelector: '.popup__btn-submit',
//   inactiveButtonClass: 'popup__btn-submit_inactive',
//   inputErrorClass: 'popup__text_type_error',
//   errorClass: 'popup__text-error_active'
// });