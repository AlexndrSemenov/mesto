export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //создаем карточку и вставляем ее в DOM
  addItem(item) {
    //debugger;
    const card = this._renderer(item);
    this._container.prepend(card);
  }

  //перебираем изначальный массив
  renderItems() {
    this._renderedItems.forEach(item => {
      this.addItem(item);
    });
  }
}