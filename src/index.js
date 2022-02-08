import {  initialCards, userName, usersHobby, nameInput, hobbyInput, list, popupProfile, buttonEditProfile, popupProfilForm, buttonAddCard, popupImageElement, pictureInPopup, popupPictureDiscription, config } from '../scripts/utils.js';
import Card from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
//import Popup from './Popup.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupWithImage from '../scripts/PopupWithImage.js';


//вызываем валидацию полей в попапе редактирования профиля
const profilFormValidator = new FormValidator(config, '.popup__form');
profilFormValidator.enableValidation();


//вызываем валидацию полей в попапе добавления карточки
const imageFormValidator = new FormValidator(config, '.popup__form-image');
imageFormValidator.enableValidation();


//const popupProfileForm = new Popup(popupProfile);






//__________________________________________________________________________
//работа с всплывающей картинкой


// const imageData = new PopupWithImage ('.popup__form-picture');


// imageData.open();

//____________________________________________________________________________




// const popupWithFormProfile = new PopupWithForm(
//   popupTypeProfile, (data) => {
//     userInfo.setUserInfo(data)
//   }
// );

// const popupProfileForm = new PopupWithForm ({
// //selectorPopup: popupProfile,
  
//   handleFormCallBack: ({ name, profession }) => {
//     userData({ name, profession });
//     profileName.textContent = popupInputTypeName.value;
//     profileProfession.textContent = popupInputTypeProfession.value;
//     popupProfileForm.close();
//     }
    
//     //
//   }, popupProfile);




//popupProfileForm._setEventListeners();
//openPopupAddImage.setEventListeners();



//работа с попапом редактирования профиля___________________________________________________

//передаем в userData координаты данных пользователя на странице
const userData = new UserInfo ({
  nameSelector: '.profile__user-name',
  professionSelector: '.profile__users-hobby'
  }
);

//создаем экземпляр класса
const popupProfileForm = new PopupWithForm (
  popupProfile,
  (item) => { userData.setUserInfo(item) }
);

//нажатие кнопки редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  popupProfileForm.open();//отрисовываем карточку при клике
  //вставляем данные пользователя со страницы в попап
  const getUserInfo = userData.getUserInfo();
  nameInput.value = getUserInfo.name;
  hobbyInput.value = getUserInfo.profession;
  //nameInput.value = userName.textContent;
  //hobbyInput.value = usersHobby.textContent;
  //если кнопка валидна, то кнопка активна
  //profFormValidator.enebleSubmitButton();
});

// при нажатии на кнопку сохранить в попапе
// popupProfilForm.addEventListener('submit', (evt) => { //функция изменения профиля и закрытия попапа:
//   evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
//   //userName.textContent = nameInput.value;
//   //usersHobby.textContent = hobbyInput.value;
  
//   //принимаем новые данные пользователя и вставляем их на страницу
//   const setUserInfo = userData.setUserInfo({});
//   userName.textContent = setUserInfo.name;
//   usersHobby.textContent = setUserInfo.profession;
//   popupProfileForm.close();
//   //closePopup(popupProfile);
// });
//-----------------------------------------------------------------------------------------

//работа с попапом добавления карточек___________________________________________________

//удалить
// const popupImageForm = new Popup('.popup_image');
// // нажатие кнопки добавления карточек
// buttonAddCard.addEventListener('click', function () {
//   popupImForm.open();
// });
//удалить


//отрисовываем карточку с названием и картинкой пользователя
const popupImageForm = new PopupWithForm (
  popupImageElement,
  (item) => {
    const card2 = new Card(item, '.template', (item) => {popupWithImage.open(item)});
    const taskTemplate2 = card2.generateCard();
    document.querySelector(list).prepend(taskTemplate2);
  }
);

//функция отрисовки карточек из переданного массива по шаблону
//function sss(nekiyMassiv) {
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
//}

//отрисовываем карточки при загрузке страницы
//sss(initialCards);

    // const place = popupImageElement.querySelector('.popup__text_type_place');
    // const link = popupImageElement.querySelector('.popup__text_type_link');
    // const inputValue = place.value;
    // const urlValue = link.value;
    

    

    //добавляем карточку
    

    //newMassiv = [];
  // //отрисовываем карточку с данными попапа на странице
  // const addCard = new Section({
  //   items: ([{name: inputValue, link: urlValue}]),
  //   renderer: (item) => {
  //     const card = new Card(item, '.template');
  //     const taskTemplate = card.generateCard();
  //     addCard.addItem(taskTemplate);
  //   }
  // }, list);
  // addCard.renderItems();



 

//нажатие кнопки редактирования профиля
buttonAddCard.addEventListener('click', () => { //функция открытия попапа профиля:
  popupImageForm.open();//отрисовываем карточку при клике
//   //вставляем данные пользователя со страницы в попап
  //     const getUserInfo = userData.getUserInfo();
  //     nameInput.value = getUserInfo.name;
  //     hobbyInput.value = getUserInfo.profession;
  //nameInput.value = userName.textContent;
  //hobbyInput.value = usersHobby.textContent;
  //если кнопка валидна, то кнопка активна
  //profFormValidator.enebleSubmitButton();
});









//-----------------------------------------------------------------------------------------

//удалить
//вставляем данные из попапа карточек на сайт
//const popupImageForm = popupImageElement.querySelector('.popup__form-image');
//const place = popupImageElement.querySelector('.popup__text_type_place');
//const link = popupImageElement.querySelector('.popup__text_type_link');

// popupImageForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   const inputValue = place.value;
//   const urlValue = link.value;
  
// //отрисовываем карточку с данными попапа на странице
//   const addCard = new Section({
//     items: ([{name: inputValue, link: urlValue}]),
//     renderer: (item) => {
//       const card = new Card(item, '.template');
//       const taskTemplate = card.generateCard();
//       addCard.addItem(taskTemplate);
//     }
//   }, list);
//   addCard.renderItems();

//   popupImForm.close();
//   link.value = '';
//   place.value = '';
//   const disableButton = new FormValidator(config, '.popup__form-image');//отключаем кнопку
//   disableButton.disableButton();
// });
// //-----------------------------------------------------------------------------------------
//удалить








//все работает не трогать отсюда вниз
// //показываем попап с картинкой
// const popupWithImage = new PopupWithImage('.popup_picture');
// //popupWithImage._setEventListeners();

// //функция отрисовки карточек из переданного массива по шаблону_____________________________
// const initialCardList = new Section({
//   items: initialCards,
//   renderer: (item) => {
//     const card = new Card(item, '.template', (item) => {popupWithImage.open(item)});
//     const taskTemplate = card.generateCard();
//     initialCardList.addItem(taskTemplate);
//   }
// }, list);
// //отрисовываем карточки при загрузке страницы
// initialCardList.renderItems();
//все работает не трогать досюда








//показываем попап с картинкой
const popupWithImage = new PopupWithImage('.popup_picture');



