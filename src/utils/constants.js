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
export const usersAvatar = document.querySelector('.profile__avatar');
export const nameInput = document.querySelector('.popup__text_type_name');
export const hobbyInput = document.querySelector('.popup__text_type_artist');
export const list = '.photo-grid__table';
export const popupProfile = '.popup_profile';
export const buttonEditProfile = document.querySelector('.profile__nav-item');
export const popupProfilForm = document.querySelector('.popup__form');
export const buttonAddCard = document.querySelector('.profile__nav-item-add');
export const popupImageElement ='.popup_image';
export const popupAvatar ='.popup_avatar';
export const popupDeleteCard ='.popup_deletecard';
export const buttonDelete = document.querySelector('.photo-grid__delete');
export const submitButtonSelector = document.querySelectorAll('.popup__btn-submit');