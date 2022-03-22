import './index.css';
import { usersAvatar, nameInput, hobbyInput, list, popupProfile, buttonEditProfile, buttonAddCard, popupImageElement, popupAvatar, popupDeleteCard, config } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';


//подготовительная работа для глобальной видимости___________________________________

//объявляем переменную, чтобы впоследствие записать в нее значение id пользователя и передать это значение в класс card
let userId;


//передаем в userData координаты данных пользователя на странице
const userSelector = new UserInfo ({
  nameSelector: '.profile__user-name',
  professionSelector: '.profile__users-hobby',
  avatarSelector: '.profile__avatar'
  }
);


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort36/', 
  headers: {
    authorization: '6e4736b7-6cd6-4abb-a799-2940e7d04a53',
    'Content-Type': 'application/json'
  }
});


//Объединяем запрос данных профиля и получения карточек в один общий запрос с помощью Promise.all, иначе может возникнуть проблема, что _id пользователя еще не получили, а карточки уже пришли, и будут некорректно отображаться лайки и кнопки удаления на собственных карточках

// Promise.all([api.getInitialCardsAndUser('users/me'), api.getInitialCardsAndUser('cards')])
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {

    
    
    
    // Установка данных пользователя
    
    //отрисовываем данные пользователя с сервера на странице
    userSelector.setUserInfo(userData);
    
    //записываем в переменную значение id
    userId = userData._id;
    

    //нажатие кнопки редактирования профиля
    buttonEditProfile.addEventListener('click', () => {
      //открываем попап
      popupProfileForm.open();
 
      //вставляем данные пользователя со страницы в попап
      const getUserInfo = userSelector.getUserInfo();
      //вставляю в попап эти данные
      nameInput.value = getUserInfo.name;
      hobbyInput.value = getUserInfo.profession;
    });

    //создаем экземпляр класса для записывания данных из попапа на сайт
    const popupProfileForm = new PopupWithForm (
      popupProfile,
      //посылаем на сервер данные из попапа (item), сервер возвращает объект (data) - его поля показываем на странице
      (item) => {
      api.updateUser({ name: item.initials , about: item.profession })
        .then((data) => {
          userSelector.setUserInfo(data);
          popupProfileForm.close();
        })
        .catch(err => console.log(err));
      }
    );

    //назначаем слушатель события submit:
    popupProfileForm.setEventListeners();




    // Отрисовка карточек

    //создаем экземпляр класса
    const popupWithImage = new PopupWithImage('.popup_picture');
    popupWithImage.setEventListeners();
  
    
    //отрисовываем карточки при загрузке страницы
    const initialCardList = new Section({
      items: cards,
      //функция создания карточки (без вставки ее в DOM)
      renderer: (item) => {
        const card = new Card(item, '.template', (item) => {popupWithImage.open(item)}, api, popupDeleteForm, userId);
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
        api.createCard({ name: item.name , link: item.link })
          .then((data) => {
          //из данных, пришедших с сервера, создаем карточку и вставляем ее в DOM
          initialCardList.addItem({ name: data.name, link: data.link, likes: data.likes, owner: data.owner, _id: data._id });
          popupImageForm.close();
          })
          .catch(err => console.log(err));
      }
    );
  
    //назначаем слушатель событию submit попапа добавления карточки:
    popupImageForm.setEventListeners();
  
    //нажатие кнопки добавления карточки
    buttonAddCard.addEventListener('click', () => { 
    //отключаем кнопку
    imageFormValidator.disableButton();
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


// //Это потому, что Вы находите форму внутри FormValidator, а мой вариант передает готовую форму в конструктор. Нужно просто внутри класса не искать форму, а сразу брать ее из конструктора
// //Этот вариант для валидации полей не хочет работать, как ни старался
// //Можно универсально создать экземпляры валидаторов всех форм, поместив их все в один объект, а потом брать из него валидатор по атрибуту name, который задан для формы. Это очень универсально и для любого кол-ва форм подходит.
// const formValidators = {}

// // Включение валидации
// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector))
//   formList.forEach((formElement) => {
//     const validator = new FormValidator(formElement, config)
// // получаем данные из атрибута `name` у формы
//     const formName = formElement.getAttribute('name')

//    // вот тут в объект записываем под именем формы
//     formValidators[formName] = validator;
//    validator.enableValidation();
//   });
// };

// enableValidation(config);

// //И теперь можно использовать валидаторы для деактивации кнопки и тд

// formValidators[ profileForm.getAttribute('name') ].resetValidation()

// // или можно использовать строку (ведь Вы знаете, какой атрибут `name` у каждой формы)
// formValidators['profile-form'].resetValidation()




//работа с изменением аватарки пользователя____________________________________________

//отрисовываем аватар с картинкой пользователя
const popupAvatarForm = new PopupWithForm (
  popupAvatar,
  (item) => {
    //отправляем на сервер объект с одним полем (данными введенными пользователем в попап), после чего сервер возвращает другой объект (data) - его и отрисовываем на странице
    api.updateUserAvatar({ avatar: item.link })
      .then(data => {
        userSelector.setAvatar(data);
        popupAvatarForm.close();
      })
      .catch(err => console.log(err));
  }
);

//назначаем слушатель событию submit попапа изменения аватара:
popupAvatarForm.setEventListeners();

//нажатие кнопки редактирования аватара
usersAvatar.addEventListener('click', () => { 
  //отключаем кнопку
  avatarFormValidator.disableButton();
  //функция открытия попапа изменения аватара:
  popupAvatarForm.open();
});




//работа с попапом удаления________________________________________________________

const popupDeleteForm = new PopupWithConfirmation (
  popupDeleteCard,
  (data) => {
  api.deleteCard(data.id)
    .then(() => {
      data.remove();
      data = null;
      popupDeleteForm.close();
    })
    .catch(err => console.log(err));
  }
);

//назначаем слушатель событию submit попапа подтверждения удаления карточки:
popupDeleteForm.setEventListeners();