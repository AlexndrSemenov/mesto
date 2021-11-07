const popupElement = document.querySelector('.popup');
const closeButton = popupElement.querySelector('.popup__close-button');
const navButton = document.querySelector('.profile__nav-item');
function openPopup() {
  popupElement.classList.add('popup_opened');
}
function closePopup() {
  popupElement.classList.remove('popup_opened');
}
navButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);



let addButton = document.querySelector('.popup__btn-submit');
let userName = document.querySelector('.profile__user-name');
let usersHobby = document.querySelector('.profile__users-hobby');
function renameName() {
  let names = document.querySelector('.popup__text_type_name');
  userName.textContent = (names).value;
  let hobbies = document.querySelector('.popup__text_type_artist');
  usersHobby.textContent = (hobbies).value;
}
addButton.addEventListener('click', renameName);
addButton.addEventListener('click', closePopup);