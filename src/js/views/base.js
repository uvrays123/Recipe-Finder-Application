export const DOMStrings = {
  searchBar: document.querySelector(".search"),
  searchResultList: document.querySelector(".results__list"),
  searchField: document.querySelector(".search__field"),
  resultContainer: document.querySelector(".results"),
  resultPages: document.querySelector(".results__pages"),
  recipeContainer: document.querySelector(".recipe"),
  shoppingList: document.querySelector(".shopping__list"),
  likesMenu: document.querySelector(".likes__field"),
  likesList: document.querySelector(".likes__list")
};

export const addLoader = (parent) => {
  const loader = `
    <div class="loader">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;

  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loaderElement = document.querySelector(".loader");
  if(loaderElement) {
    const parent = loaderElement.parentElement;
    parent.removeChild(loaderElement);
  }
};
