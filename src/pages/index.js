import './index.css';
import {  initialCards, nameInput, hobbyInput, list, popupProfile, buttonEditProfile, buttonAddCard, popupImageElement, config } from '../components/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';


//вызываем валидацию полей в попапе редактирования профиля
const profilFormValidator = new FormValidator(config, '.popup__form');
profilFormValidator.enableValidation();


//вызываем валидацию полей в попапе добавления карточки
const imageFormValidator = new FormValidator(config, '.popup__form-image');
imageFormValidator.enableValidation();



//работа с попапом редактирования профиля______________________________________________

//передаем в userData координаты данных пользователя на странице
const userData = new UserInfo ({
  nameSelector: '.profile__user-name',
  professionSelector: '.profile__users-hobby'
  }
);

//нажатие кнопки редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  popupProfileForm.open();//отрисовываем карточку при клике
  //вставляем данные пользователя со страницы в попап
  const getUserInfo = userData.getUserInfo();
  nameInput.value = getUserInfo.name;
  hobbyInput.value = getUserInfo.profession;
});

//создаем экземпляр класса для записывания данных из попапа на сайт
const popupProfileForm = new PopupWithForm (
  popupProfile,
  (item) => { userData.setUserInfo(item) }
);

//назначаем слушатель события submit:
popupProfileForm.setEventListeners();



//работа с попапом добавления карточек_______________________________________________

//создаем экземпляр класса
const popupWithImage = new PopupWithImage('.popup_picture');
popupWithImage.setEventListeners();

//нажатие кнопки редактирования профиля
buttonAddCard.addEventListener('click', () => { //функция открытия попапа профиля:
  popupImageForm.open();
});

//отрисовываем карточку с названием и картинкой пользователя
const popupImageForm = new PopupWithForm (
  popupImageElement,
  (item) => {
    const cardAdd = new Card(item, '.template', (item) => {popupWithImage.open(item)});
    const taskTemplateAdd = cardAdd.generateCard();
    document.querySelector(list).prepend(taskTemplateAdd);
    //отключаем кнопку
    imageFormValidator.disableButton();
  }
);

//назначаем слушатель событию submit:
popupImageForm.setEventListeners();

//отрисовываем карточки при загрузке страницы
  const initialCardList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.template', (item) => {popupWithImage.open(item)});
      const taskTemplate = card.generateCard();
      initialCardList.addItem(taskTemplate);
    }
  }, list);
  //отрисовываем карточки
  initialCardList.renderItems();