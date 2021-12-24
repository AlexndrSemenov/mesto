export { closeByEscape }
import { openPopup } from './utils.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


const userName = document.querySelector('.profile__user-name');
const usersHobby = document.querySelector('.profile__users-hobby');
const nameInput = document.querySelector('.popup__text_type_name');
const hobbyInput = document.querySelector('.popup__text_type_artist');
const list = document.querySelector('.photo-grid__table');
const popups = document.querySelectorAll('.popup');


//объекты настроек всеx нужныx функциям классов и селекторов элементов
const config = {
  formSelector: '.popup__field',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__btn-submit_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
}


//вызываем валидацию полей в попапе редактирования профиля
const profilFormValidator = new FormValidator(config, '.popup__form');
profilFormValidator.enableValidation();


//вызываем валидацию полей в попапе добавления карточки
const imageFormValidator = new FormValidator(config, '.popup__form-image');
imageFormValidator.enableValidation();


//карточки вставляемые на страницу при загрузке сайта
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//закрываем любой попап по нажатию на крестик без сохранения введенных данных
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup);
      }
  })
})


function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


//общая функция скрытия попап:
function closePopup(popap) {
  document.removeEventListener('keydown', closeByEscape);
  popap.classList.remove('popup_opened');
}


//работа с попапом профиля__________________________________________________________________
const popupProfile = document.querySelector('.popup_profile');
const buttonEditProfile = document.querySelector('.profile__nav-item');
const popupProfilForm = document.querySelector('.popup__form');

buttonEditProfile.addEventListener('click', function () { //функция открытия попапа профиля:
  nameInput.value = userName.textContent;
  hobbyInput.value = usersHobby.textContent;
  openPopup(popupProfile);
});

popupProfilForm.addEventListener('submit', function (evt) { //функция изменения профиля и закрытия попапа:
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  userName.textContent = nameInput.value;
  usersHobby.textContent = hobbyInput.value;
  
  closePopup(popupProfile);
});
//-----------------------------------------------------------------------------------------


// открываем попап добавления карточек:____________________________________________________
const buttonAddCard = document.querySelector('.profile__nav-item-add');
const popupImageElement = document.querySelector('.popup_image');

buttonAddCard.addEventListener('click', function () {
  openPopup(popupImageElement);
});
//-----------------------------------------------------------------------------------------


// вставляем данные из попапа карточек на сайт:____________________________________________
const popupImageForm = popupImageElement.querySelector('.popup__form-image');
const place = popupImageElement.querySelector('.popup__text_type_place');
const link = popupImageElement.querySelector('.popup__text_type_link');

popupImageForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const inputValue = place.value;
  const urlValue = link.value;
  renderCards([{name: inputValue, link: urlValue}]);//отрисовываем карточку с данными попапа на странице
  closePopup (popupImageElement);
  link.value = '';
  place.value = '';
  const disableButton = new FormValidator(config, '.popup__form-image');//отключаем кнопку
  disableButton.disableButton();
});
//-----------------------------------------------------------------------------------


//функция отрисовки карточек из переданного массива по шаблону____________
function renderCards(arr) {
  arr.forEach((item) => {
    const card = new Card(item, '.template');
    const taskTemplate = card.generateCard();

    // Добавляем в DOM
    list.prepend(taskTemplate);
  });
}
//------------------------------------------------------------------------

//отрисовываем карточки при загрузке страницы
renderCards(initialCards);