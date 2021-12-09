const popupProfile = document.querySelector('.popup_profile');
const userName = document.querySelector('.profile__user-name');
const usersHobby = document.querySelector('.profile__users-hobby');
const nameInput = document.querySelector('.popup__text_type_name');
const hobbyInput = document.querySelector('.popup__text_type_artist');
const pictureInPopup = document.querySelector('.popup__picture-image');
const popupPictureDiscription = document.querySelector('.popup__picture-discription');
const popupPicture = document.querySelector('.popup_picture');
const buttonPopup = document.querySelector('.popup__btn-submit');
const popups = document.querySelectorAll('.popup');


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


//общая функция придания видимости попапам:
function openPopup(popap) {
  popap.classList.add('popup_opened');

//скрываем попап по esc
  document.addEventListener('keydown', closeByEscape);
}


//скрываем попап по клику
popups.forEach(function (item) {
  item.addEventListener('mousedown', function (evt) {
    if(evt.target === evt.currentTarget) {
      closePopup(item);
    }
  });
});


//общая функция скрытия попап:
function closePopup(popap) {
  document.removeEventListener('keydown', closeByEscape);
  popap.classList.remove('popup_opened');
}


document.querySelector('.profile__nav-item').addEventListener('click', function () { //функция открытия попапа профиля:
  nameInput.value = userName.textContent;
  hobbyInput.value = usersHobby.textContent;
  openPopup(popupProfile);
});


document.querySelector('.popup__form').addEventListener('submit', function (evt) { //функция изменения профиля и закрытия попапа:
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  userName.textContent = nameInput.value;
  usersHobby.textContent = hobbyInput.value;
  
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
    openPopup(popupPicture);
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

//отключаем и задаем не активный класс кнопке Сохранить
  popupImageElement.querySelector('.popup__btn-submit').setAttribute('disabled', true);
  popupImageElement.querySelector('.popup__btn-submit').classList.add('popup__btn-submit_inactive');

  closePopup (popupImageElement);
});