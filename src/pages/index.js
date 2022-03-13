import './index.css';
import {  userName, usersHobby, usersAvatar, nameInput, hobbyInput, list, popupProfile, buttonEditProfile, buttonAddCard, popupImageElement, popupAvatar, popupDeleteCard, config } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';




//работа с попапом добавления карточек_______________________________________________

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort36/cards', 
  headers: {
    authorization: '6e4736b7-6cd6-4abb-a799-2940e7d04a53',
    'Content-Type': 'application/json'
  }
});

//получаем с сервера список карточек - data
api.getTasks()
  .then(data => {

    //создаем экземпляр класса
    const popupWithImage = new PopupWithImage('.popup_picture');
    popupWithImage.setEventListeners();
  
    
    //отрисовываем карточки при загрузке страницы
    const initialCardList = new Section({
      items: data,
      //функция создания карточки (без вставки ее в DOM)
      renderer: (item) => {
        //debugger;
        const card = new Card(item, '.template', (item) => {popupWithImage.open(item)}, api, popupDeleteForm);
        const taskTemplate = card.generateCard();
        //возвращаем готовую карточку с установленными обработчиками
        return taskTemplate;
      }
    }, list);

    //вставляем карточки в DOM
    initialCardList.renderItems();


    //отрисовываем карточку с названием и картинкой пользователя
    const popupImageForm = new PopupWithForm (
      popupImageElement,
      //this._handleFormCallBack(6 строчек вниз) принимает данные всех полей формы
      (item) => {
        //отправляем на сервер объект с двумя полями (данными введенными пользователем в попап), после чего сервер возвращает другой объект (data) - его и отрисовываем на странице
        api.createTask({ name: item.name , link: item.link })
          .then((data) => {
          //из данных, пришедших с сервера, создаем карточку и вставляем ее в DOM
          initialCardList.addItem({ name: data.name, link: data.link, likes: data.likes, owner: data.owner, _id: data._id });
          //отключаем кнопку
          imageFormValidator.disableButton();
          })
          .catch(err => console.log(err));
      }
    );
  
    //назначаем слушатель событию submit попапа добавления карточки:
    popupImageForm.setEventListeners();
  
    //нажатие кнопки добавления карточки
    buttonAddCard.addEventListener('click', () => { 
    //функция открытия попапа добавления карточки:
    popupImageForm.open();
    });
  })
  
  .catch(err => console.log(err));




//работа с валидацией полей___________________________________________________________

//вызываем валидацию полей в попапе редактирования профиля
const profilFormValidator = new FormValidator(config, '.popup__form');
profilFormValidator.enableValidation();


//вызываем валидацию полей в попапе добавления карточки
const imageFormValidator = new FormValidator(config, '.popup__form-image');
imageFormValidator.enableValidation();


//вызываем валидацию полей в попапе редактирования аватара
const avatarFormValidator = new FormValidator(config, '.popup__form-avatar');
avatarFormValidator.enableValidation();




//работа с попапом редактирования профиля______________________________________________

const apiUser = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort36/users/me', 
  headers: {
    authorization: '6e4736b7-6cd6-4abb-a799-2940e7d04a53',
    'Content-Type': 'application/json'
  }
});

//получаем данные пользователя с сервера (data)
apiUser.getTasks()
  .then(data => {
    
    //отрисовываем данные пользователя с сервера на странице
    userName.textContent = data.name;
    usersHobby.textContent = data.about;
    usersAvatar.src = data.avatar;

    //передаем в userData координаты данных пользователя на странице
    const userData = new UserInfo ({
      nameSelector: '.profile__user-name',
      professionSelector: '.profile__users-hobby'
      }
    );

    //нажатие кнопки редактирования профиля
    buttonEditProfile.addEventListener('click', () => {
      //открываем попап
      popupProfileForm.open();
 
      //вставляем данные пользователя со страницы в попап
      const getUserInfo = userData.getUserInfo();
      nameInput.value = getUserInfo.name;
      hobbyInput.value = getUserInfo.profession;
    });

    //создаем экземпляр класса для записывания данных из попапа на сайт
    const popupProfileForm = new PopupWithForm (
      popupProfile,
      //посылаем на сервер данные из попапа (item), сервер возвращает объект (data) - его поля показываем на странице
      (item) => {
      apiUser.updateUser({ name: item.initials , about: item.profession })
        .then((data) => {
        userData.setUserInfo(data);
      })
      .catch(err => console.log(err));
     }
    );

    //назначаем слушатель события submit:
    popupProfileForm.setEventListeners();
  })

  .catch(err => console.log(err));




//работа с изменением аватарки пользователя____________________________________________

const apiUserAvatar = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort36/users/me/avatar', 
  headers: {
    authorization: '6e4736b7-6cd6-4abb-a799-2940e7d04a53',
    'Content-Type': 'application/json'
  }
});

//отрисовываем аватар с картинкой пользователя
const popupAvatarForm = new PopupWithForm (
  popupAvatar,
  (item) => {
    //отправляем на сервер объект с одним полем (данными введенными пользователем в попап), после чего сервер возвращает другой объект (data) - его и отрисовываем на странице
    apiUserAvatar.updateUser({ avatar: item.link })
      .then(data => {
        usersAvatar.src = data.avatar;
        //отключаем кнопку
        avatarFormValidator.disableButton();
      })
      .catch(err => console.log(err));
  }
);

//назначаем слушатель событию submit попапа изменения аватара:
popupAvatarForm.setEventListeners();

//нажатие кнопки редактирования аватара
usersAvatar.addEventListener('click', () => { 
  //функция открытия попапа изменения аватара:
  popupAvatarForm.open();
});




//работа с попапом удаления________________________________________________________
const popupDeleteForm = new PopupWithConfirmation (
  popupDeleteCard,
  (data) => {
  api.deleteTask(data.id)
    .then(() => {
      //debugger;
      data.remove();
      data = null;
    })
    .catch(err => console.log(err));
  }
)