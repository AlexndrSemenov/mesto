import Popup from './Popup.js';
//, popupPicture
//import { pictureInPopup, popupPictureDiscription } from './utils.js';

export default class PopupWithForm extends Popup {
  constructor( popupSelector, handleFormCallBack ) {
    super(popupSelector);
    this._handleFormCallBack = handleFormCallBack;
    this._popupForm = this._container.querySelector('form');
    this._popupInputList = this._container.querySelectorAll('.popup__text');
    //this._buttonSubmit = this._container.querySelector('.popup__btn-submit');
  }
 
  //собираем данные всех полей попапа
  _getInputValues () {
    this._inputValues = {}
    this._popupInputList.forEach(input => {
      this._inputValues[input.name] = input.value;
      console.log(this._inputValues);//удалить............................
    });
    return this._inputValues;
  }

  //назначаем обработчик сабмита формы
  _setEventListeners() {
    super._setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      //console.log();
      //передаем объект с именем и профессией в метод setUserInfo класса UserInfo
      this._handleFormCallBack(this._getInputValues());
      this.close();
      //this._popupInputList.reset();
      //this._popupForm.reset();
      //this._container.reset();
      //evt.target.reset();
      // this._inputValues.remove();
      //delete this._inputValues;
      //this._inputValues(null);
      //this._inputValues = {}
      //this._inputValues = 0;
      //delete this._inputValues.link;
    });
    //this._popupForm.reset();
  }
 
  close() {
    
    
    //delete this._inputValues.name;
    this._inputValues = {}
    //delete this._inputValues.link;
    super.close();
    this._inputValues = {}
    //this._container.reset();
    this._popupForm.reset();
    //this._popupInputList.reset();
    //this._inputValues = {}
  }

  // open() {http://11
  //   super.open();
  // }

  // //закрываем попап кликом
  // _setEventListeners() {
  //   document.addEventListener('click', (evt) => {
  //     if (evt.target.classList.contains('popup_opened')) {
  //       this._container.classList.remove('popup_opened');
  //     }
  //     if (evt.target.classList.contains('popup__close-button')) {
  //       this._container.classList.remove('popup_opened');
  //     }
  //   });
  // }
}


// _handleOpenImage = () => {
//   pictureInPopup.src = this._link;
//   pictureInPopup.alt = this._name;
//   popupPictureDiscription.textContent = this._name;
//   //openPopup(popupPicture);
// }