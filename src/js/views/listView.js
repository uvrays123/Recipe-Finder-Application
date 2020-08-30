import * as base from './base';

export const displayItem = (item) => {
  let insertingString = `
    <li class="shopping__item" data-itemid=${item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" class=shopping__count-value>
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
  `;

  base.DOMStrings.shoppingList.insertAdjacentHTML('beforeend', insertingString);
};

export const deleteItem = (ID) => {
  const item = document.querySelector(`[data-itemid="${ID}"]`);
  if(item) {
    let parent = item.parentElement;
    parent.removeChild(item);
  }
};
