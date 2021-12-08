// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelector('.form__field');
const formInput = formElement.querySelector('.popup__text');
const formError = formElement.querySelector(`.${formInput.id}-error`);



//9 Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__text_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__text-error_active');
};



//10 Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__text_type_error');
  errorElement.classList.remove('popup__text-error_active');
  errorElement.textContent = '';
};



//6 Функция, которая проверяет валидность поля
//7 Если поле не проходит валидацию запускаем showInputError
//8 Если поле проходит валидацию запускаем hideInputError
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});



//3 создаем массив из полей ввода
//4 находим в текущей форме кнопку отправки
//5 обходим массив и каждому полю назначаем слушатель, при активации запускаем для поля isValid(6)

//11 Вызовем toggleButtonState и передадим ей массив полей и кнопку
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  const buttonElement = formElement.querySelector('.popup__btn-submit');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
    isValid(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
  });
  });
};



//1 создаем массив из форм
//2 для каждой формы вызываем функцию setEventListeners
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.form__field'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();



//13 Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся фунцкция hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};



//12 Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('popup__btn-submit_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__btn-submit_inactive');
  }
};