//общая функция придания видимости попапам:
export function openPopup(popap) {
  popap.classList.add('popup_opened');
//скрываем попап по esc
  document.addEventListener('keydown', closeByEscape);
}
export const pictureInPopup = document.querySelector('.popup__picture-image');
export const popupPictureDiscription = document.querySelector('.popup__picture-discription');
export const popupPicture = document.querySelector('.popup_picture');
export const _handleLike = () => {
  this._element.querySelector('.photo-grid__heart').classList.toggle('photo-grid__heart_active');
}

import {closeByEscape} from './index.js';