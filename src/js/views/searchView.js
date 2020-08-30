import * as base from './base';

export const getInput = () => {
  return base.DOMStrings.searchField.value;
};

export const clearInput = () => {
  base.DOMStrings.searchField.value = "";
};

export const clearResults = () => {
  base.DOMStrings.searchResultList.innerHTML = "";
  base.DOMStrings.resultPages.innerHTML = "";
};

export const highlight = ID => {
  const resultsArray = Array.from(document.querySelectorAll('.results__link'));
  for(let i = 0; i < resultsArray.length; i++) {
    resultsArray[i].classList.remove("results__link--active");
  }

  document.querySelector(`.results__link[href*="${ID}"]`).classList.add("results__link--active");
};

export const limitRecipeTitle = (title, limit = 17) => {
  let titleWords = title.split(' ');
  let newTitle = [];
  let count = 0;
  //console.log(titleWords);
  if(title.length > limit){
    for(let i = 0; i < titleWords.length; i++) {
      //console.log("hey1");
      if(count + titleWords[i].length <= limit){
        //console.log("Hey2");
        newTitle.push(titleWords[i]);
      }
      else {
        break;
      }
      count += titleWords[i].length;
      //console.log("Hey3");
    }
    return `${newTitle.join(' ')} ...`;
  }
  return title;
};

export const createButton = (page, type) => {

  let buttonString;
  if(type === 'prev') {
    buttonString = `
    <button class="btn-inline results__btn--${type}" data-goto=${page - 1}>
        <span>Page ${page - 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-left"></use>
        </svg>
    </button>
    `;
    return buttonString;
  }
  else if(type === 'next') {
    buttonString = `
    <button class="btn-inline results__btn--${type}" data-goto=${page + 1}>
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>
    </button>
     `;
     return buttonString;

  }
};

export const renderButtons = (page, numOfResults, resPerPage) => {
  const numOfPages = Math.ceil(numOfResults / resPerPage);
  let button;
  if(page === 1 && numOfPages > 1) {
    button = createButton(page, 'next');
  }
  else if(page === numOfPages && numOfPages > 1){
    button = `
      ${createButton(page, 'next')}
      ${createButton(page, "prev")}
    `;
  }
  else if(page < numOfPages) {
    button = createButton(page, "prev");
  }

  base.DOMStrings.resultPages.insertAdjacentHTML('afterbegin', button);
};



export const printResult = (recipeArray) => {
  for(let i = 0; i < recipeArray.length; i++) {
    const printRecipe = `<li>
        <a class="results__link" href="#${recipeArray[i].recipe_id}">
            <figure class="results__fig">
                <img src="${recipeArray[i].image_url}" alt="${recipeArray[i].title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipeArray[i].title)}</h4>
                <p class="results__author">${recipeArray[i].publisher}</p>
            </div>
        </a>
    </li>`;
    base.DOMStrings.searchResultList.insertAdjacentHTML("beforeend", printRecipe);
  }
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = ((page - 1) * resPerPage) + 10;
  printResult(recipes.slice(start, end));

  renderButtons(page, recipes.length, resPerPage);
};
