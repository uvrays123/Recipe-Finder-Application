import * as base from './base';
import * as searchView from './searchView';

export const toggleLikeBtn = (isLiked) => {
  let iconString;
  if(isLiked) {
    iconString = 'icon-heart';
  }
  else {
    iconString = 'icon-heart-outlined';
  }
  document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};

export const toggleLikeMenu = (numLikes) => {
  let visibilityString;
  if(numLikes > 0) {
    visibilityString = "visible";
  }
  else {
    visibilityString = "hidden";
  }
  base.DOMStrings.likesMenu.style.visibility = visibilityString;
};

export const displayLikes = (like) => {
  console.log("reached display function");
  let insertingString = `
  <li>
      <a class="likes__link" href="#${like.id}">
          <figure class="likes__fig">
              <img src="${like.img}" alt="${like.title}">
          </figure>
          <div class="likes__data">
              <h4 class="likes__name">${searchView.limitRecipeTitle(like.title)}</h4>
              <p class="likes__author">${like.author}</p>
          </div>
      </a>
  </li>
  `;
  base.DOMStrings.likesList.insertAdjacentHTML("beforeend", insertingString);
};

export const deleteLike = (ID) => {
  const parent = document.querySelector(`.likes__link[href*="${ID}"]`).parentElement;
  if(parent) {
    parent.parentElement.removeChild(parent);
  }
};
