const popupContent = document.querySelector('.popup__form');
const popupElement = document.querySelector('.popup');
const navButton = document.querySelector('.profile__nav-item');
const closeButton = popupElement.querySelector('.popup__close-button');
const userName = document.querySelector('.profile__user-name');
const usersHobby = document.querySelector('.profile__users-hobby');
const names = document.querySelector('.popup__text_type_name');
const hobbies = document.querySelector('.popup__text_type_artist');

//функция открытия попап редактирования данных пользователя
function openPopup() {
  names.value = userName.textContent;
  hobbies.value = usersHobby.textContent;
  popupElement.classList.add('popup_opened');
}

//функция закрытия попап без сохранения введенных данных
function closePopup() {
  popupElement.classList.remove('popup_opened');
}

//функция изменения данных на сайте через попап
function renameName(evt) { 
  evt.preventDefault() //Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  userName.textContent = names.value;
  usersHobby.textContent = hobbies.value;
  closePopup();
}

popupContent.addEventListener('submit', renameName);
navButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);



// конец 4го спринта



// вставляем 6 карточек из шаблона:
const list = document.querySelector ('.photo-grid__table');
const template = document.querySelector ('.template');

const createTaskDomNode = function (item) {
  const taskTemplate = template.content.querySelector ('.task').cloneNode(true);
  taskTemplate.querySelector ('.photo-grid__text').textContent = item.name;
  taskTemplate.querySelector ('.photo-grid__image').src = item.link;
  taskTemplate.querySelector ('.photo-grid__image').alt = item.name;
  
  taskTemplate.querySelector('.photo-grid__heart').addEventListener('click', function (evt) {// ставим лайк
    evt.target.classList.toggle('photo-grid__heart_active');
  });
  
  const cardsDelete = taskTemplate.querySelector('.photo-grid__delete');// удаляем карточку
  cardsDelete.addEventListener('click', function () {
    const listItem = cardsDelete.closest('.task');
    listItem.remove();
  });

  const pictureView = taskTemplate.querySelector ('.photo-grid__image');// показываем картинку в попап
  const pictureInPopup = document.querySelector('.popup__picture-image');
  const popupPictureDiscription = document.querySelector('.popup__picture-discription');
  pictureView.addEventListener('click', function() {
    pictureInPopup.src = pictureView.src;
    popupPictureDiscription.textContent = taskTemplate.querySelector('.photo-grid__text').textContent;
    popupPictureElement.classList.add('popup_opened');
  });
  
  return taskTemplate;
}

const result = initialCards.map(function (item) {
  return createTaskDomNode(item);
});
list.append(...result);



// открываем попап добавления карточек:
const navButtonImage = document.querySelector ('.profile__nav-item-add');
const popupImageElement = document.querySelector('.popup_image');

function openPopupImage() { //функция открытия попап для вставки карточек мест
  popupImageElement.classList.add('popup_opened');
}

navButtonImage.addEventListener('click', openPopupImage);



// закрываем попап добавления карточек:
const closeButtonImage = document.querySelector('.popup__close-button_image');

function closePopupImage() { //функция закрытия попап для вставки карточек мест без сохранения введенных данных
  popupImageElement.classList.remove('popup_opened');
}

closeButtonImage.addEventListener('click', closePopupImage);



// вставляем данные из попапа на сайт:
const popupContentImage = popupImageElement.querySelector('.popup__form-image');
const places = popupImageElement.querySelector ('.popup__text_type_place');
const links = popupImageElement.querySelector('.popup__text_type_link');

const submitFormHandler = (evt) => {
  evt.preventDefault();
  const inputValue = places.value;
  const urlValue = links.value;
  const taskString = createTaskDomNode({ name: inputValue, link: urlValue, })
  places.value = '';
  links.value = '';
  list.prepend(taskString);
  closePopupImage();
 }

popupContentImage.addEventListener('submit', submitFormHandler);



// закываем попап c картинкой:
const popupPictureElement = document.querySelector('.popup_picture');
const closeButtonPicture = document.querySelector ('.popup__close-button_picture');
  closeButtonPicture.addEventListener('click', function () {
  popupPictureElement.classList.remove('popup_opened');
});