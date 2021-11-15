const popupContent = document.querySelector('.popup__content');
const popupElement = document.querySelector('.popup');
const navButton = document.querySelector('.profile__nav-item');
const closeButton = popupElement.querySelector('.popup__close-button');
let userName = document.querySelector('.profile__user-name');
let usersHobby = document.querySelector('.profile__users-hobby');
let names = document.querySelector('.popup__text_type_name');
let hobbies = document.querySelector('.popup__text_type_artist');

function openPopup() { //функция открытия попап
  names.value = userName.textContent;
  hobbies.value = usersHobby.textContent;
  popupElement.classList.add('popup_opened');
}

function closePopup() { //функция закрытия попап без сохранения введенных данных
  popupElement.classList.remove('popup_opened');
}

function renameName(evt) { //функция изменения данных на сайте через попап
  evt.preventDefault() //Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  userName.textContent = names.value;
  usersHobby.textContent = hobbies.value;
  closePopup();
}

popupContent.addEventListener('submit', renameName);
navButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);