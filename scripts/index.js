const popupProfile = document.querySelector('.popup_profile');
const userName = document.querySelector('.profile__user-name');
const usersHobby = document.querySelector('.profile__users-hobby');
const nameInput = document.querySelector('.popup__text_type_name');
const hobbyInput = document.querySelector('.popup__text_type_artist');
const pictureInPopup = document.querySelector('.popup__picture-image');
const popupPictureDiscription = document.querySelector('.popup__picture-discription');

//общая функция придания видимости попапам:
function openPopup(popap) {
  popap.classList.add('popup_opened');
}

//общая функция скрытия попапа:
function closePopup(popap) {
  popap.classList.remove('popup_opened');
}

document.querySelector('.profile__nav-item').addEventListener('click', function () { //функция открытия попапа профиля:
  nameInput.value = userName.textContent;
  hobbyInput.value = usersHobby.textContent;
  openPopup(popupProfile);
});

document.querySelector('.popup__form').addEventListener('submit', function (evt) { //функция изменения профиля и закрытия попапа:
  evt.preventDefault() //Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  userName.textContent = nameInput.value;
  usersHobby.textContent = hobbyInput.value;
  closePopup(popupProfile);
});

popupProfile.querySelector('.popup__close-button').addEventListener('click', function () { //функция закрытия попапа профиля без сохранения введенных данных:
  closePopup(popupProfile);
});



// конец 4го спринта



// вставляем 6 карточек из шаблона:
const list = document.querySelector ('.photo-grid__table');
const template = document.querySelector ('.template');

const createTaskDomNode = function (item) {
  const taskTemplate = template.content.querySelector ('.task').cloneNode(true);
  const pictureView = taskTemplate.querySelector ('.photo-grid__image');
  taskTemplate.querySelector ('.photo-grid__text').textContent = item.name;
  pictureView.src = item.link;
  pictureView.alt = item.name;
  
  taskTemplate.querySelector('.photo-grid__heart').addEventListener('click', function (evt) {// ставим лайк
    evt.target.classList.toggle('photo-grid__heart_active');
  });
  
  const cardsDelete = taskTemplate.querySelector('.photo-grid__delete');
  cardsDelete.addEventListener('click', function () {// удаляем карточку
    const listItem = cardsDelete.closest('.task');
    listItem.remove();
  });

  pictureView.addEventListener('click', function() {// показываем фото в попап
    pictureInPopup.src = item.link;
    pictureInPopup.alt = item.name;
    popupPictureDiscription.textContent = taskTemplate.querySelector('.photo-grid__text').textContent;
    openPopup(document.querySelector('.popup_picture'));
  });
  
  return taskTemplate;
}

const result = initialCards.map(function (item) {
  return createTaskDomNode(item);
});
list.append(...result);



// открываем попап добавления карточек:
const popupImageElement = document.querySelector('.popup_image');
document.querySelector ('.profile__nav-item-add').addEventListener('click', function () {
  openPopup(popupImageElement);
});



// закрываем попап добавления карточек:
document.querySelector('.popup__close-button_image').addEventListener('click', function () {
  closePopup (popupImageElement);
});



// вставляем данные из попапа на сайт:
const places = popupImageElement.querySelector ('.popup__text_type_place');
const links = popupImageElement.querySelector('.popup__text_type_link');

popupImageElement.querySelector('.popup__form-image').addEventListener('submit', function (evt) {
  evt.preventDefault();
  const inputValue = places.value;
  const urlValue = links.value;
  const taskString = createTaskDomNode({ name: inputValue, link: urlValue, })
  places.value = '';
  links.value = '';
  list.prepend(taskString);
  closePopup (popupImageElement);
});



// закываем попап c картинкой:
document.querySelector ('.popup__close-button_picture').addEventListener('click', function () {
  closePopup (document.querySelector('.popup_picture'));
});