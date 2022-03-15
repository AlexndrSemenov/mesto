export default class UserInfo {
  constructor({ nameSelector, professionSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._profession = document.querySelector(professionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  //возвращаем объект с данными пользователя со страницы чтобы вставить их в попап при открытии попапа
  getUserInfo() {
    const userInfo = {}
    userInfo.name = this._name.textContent;
    userInfo.profession = this._profession.textContent;
    return userInfo;
  }

  //принимаем новые данные пользователя и вставляем их на страницу
  setUserInfo(item) {
    this._name.textContent = item.name;
    this._profession.textContent = item.about;
  }

  //принимаем с сервера аватарку и отображаем на странице
  setAvatar(item) {
    this._avatar.src = item.avatar;
  }
}