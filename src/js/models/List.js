import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      count,
      unit,
      ingredient,
      id: uniqid()
    };

    this.items.push(item);
    return item;
  }

  deleteItem(ID) {
    let index = this.items.findIndex(cur => cur.id === ID);
    this.items.splice(index, 1); //Deleting item from data structure
  }

  updateCount(ID, newCount) {
    let item = this.items.find(cur => cur.id === ID);
    item.count = newCount; //Updated new count
  }

}
