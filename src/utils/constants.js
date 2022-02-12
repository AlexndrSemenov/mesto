//карточки вставляемые на страницу при загрузке сайта
export const initialCards = [
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

//объекты настроек всеx нужныx функциям классов и селекторов элементов
export const config = {
  formSelector: '.popup__field',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__btn-submit_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
}

export const pictureInPopup = document.querySelector('.popup__picture-image');
export const popupPictureDiscription = document.querySelector('.popup__picture-discription');
export const popupPicture = document.querySelector('.popup_picture');
export const userName = document.querySelector('.profile__user-name');
export const usersHobby = document.querySelector('.profile__users-hobby');
export const nameInput = document.querySelector('.popup__text_type_name');
export const hobbyInput = document.querySelector('.popup__text_type_artist');
export const list = '.photo-grid__table';
export const popupProfile = '.popup_profile';
export const buttonEditProfile = document.querySelector('.profile__nav-item');
export const popupProfilForm = document.querySelector('.popup__form');
export const buttonAddCard = document.querySelector('.profile__nav-item-add');
export const popupImageElement ='.popup_image';