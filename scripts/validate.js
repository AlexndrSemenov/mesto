//9 Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, { errorClass, inputErrorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  // Записываем текст ошибки в блок отображения ошибки
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};



//10 Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, config) => {
  const { inputErrorClass, errorClass, } = config;
    // Находим блок, в котором отображается ошибка.
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};



//6 Функция, которая проверяет валидность поля
//7 Если поле не проходит валидацию запускаем showInputError
//8 Если поле проходит валидацию запускаем hideInputError
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};



//3 создаем массив из полей ввода
//4 находим в текущей форме кнопку отправки
//5 обходим массив и каждому полю назначаем слушатель, при активации запускаем для поля isValid(6)

//11 Вызовем toggleButtonState и передадим ей массив полей и кнопку
const setEventListeners = (formElement, config) => {
  // Разбиваем конфиг на составляющие, чтобы передать нужные свойства в функции.
        const {
          inputSelector,
          submitButtonSelector,
          inactiveButtonClass,
          errorClass,
          inputErrorClass
      } = config
// inputSelector позволяет найти все поля ввода
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // С помощью submitButtonSelector находим кнопку отправки формы
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // inactiveButtonClass навашивается на кнопку формы, если она неактивна.
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
    isValid(formElement, inputElement, { errorClass, inputErrorClass });
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  });
  });
};




const enableValidation = (config) => {
  /*
      Пример использования rest-оператора.
      Из объекта config извлекаем свойство formSelector, остальные свойства помещаем в объект props. Название объекта
      может быть любым.
  */
  const { formSelector, ...props } = config;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });
      // объект props передаём дальше. Он будет содержать в себе все необходимые свойства
      setEventListeners(formElement, props);
  })
};



//13 Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся фунцкция hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
}



//12 Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }
};



enableValidation({
  formSelector: '.form__field',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__btn-submit_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active'
});