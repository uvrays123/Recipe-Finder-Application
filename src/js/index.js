// Global app controller

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as base from './views/base';
import * as recipeView from './views/recipeView';
import * as searchView from './views/searchView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

const globalState = {};

const searchSubmit = async () => {
  const query = searchView.getInput();
  if(query) {
    globalState.search = new Search(query);

    searchView.clearInput();
    searchView.clearResults();
    base.addLoader(base.DOMStrings.resultContainer);

    try{
      await globalState.search.getResults();

      base.clearLoader();

      searchView.renderResults(globalState.search.result);
    }
    catch(error) {
      alert("Error in Search!");
      base.clearLoader();
    }

  }
}

base.DOMStrings.searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchSubmit();
});

base.DOMStrings.resultPages.addEventListener('click', event => {
  const target = event.target.closest(".btn-inline");
  if(target) {
    const targetPage = parseInt(target.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(globalState.search.result, targetPage);
  }
});



//Recipe

const recipeController = async() => {

    const ID = window.location.hash.replace('#','');
    console.log(ID);

    if(ID) {
      recipeView.clearRecipe();
      base.addLoader(base.DOMStrings.recipeContainer);

      if(globalState.search) {
        //console.log("hey1");
        searchView.highlight(ID);
        //console.log("hey2");
      }

      globalState.recipe = new Recipe(ID); //new Recipe Object
      //console.log(globalState.recipe);


    try{
      await globalState.recipe.getRecipe();
      //console.log(globalState);
      //console.log(globalState.recipe);
      globalState.recipe.seperateIngredients();
      globalState.recipe.calculateTime();
      globalState.recipe.calculateServings();

      base.clearLoader();
      //console.log("hey");
      //console.log(globalState.recipe);
      recipeView.displayRecipe(globalState.recipe, globalState.likes.isLiked(ID));
    }
    catch(error) {
      console.log(error);
    }
  }

};

window.addEventListener('hashchange', recipeController);
window.addEventListener("load", recipeController);


//LIST
function controlList() {
  if(!globalState.list) {
    globalState.list = new List();
  }

  for(let i = 0; i < globalState.recipe.ingredients.length; i++) {
    let item = globalState.recipe.ingredients[i];
    let displayItem = globalState.list.addItem(item.count, item.unit, item.ingredient);
    listView.displayItem(displayItem);
  }
}

base.DOMStrings.shoppingList.addEventListener('click', event => {
  let ID = event.target.closest(".shopping__item").dataset.itemid;

  if(event.target.matches('.shopping__delete, .shopping__delete *')){
    globalState.list.deleteItem(ID);
    listView.deleteItem(ID);
  }
  else if(event.target.matches('.shopping__count-value')) {
    const value = parseFloat(event.target.value, 10);
    globalState.list.updateCount(ID, value);
  }
});


//TESTING
//globalState.likes = new Likes(); //TESTING
//likesView.toggleLikeMenu(globalState.likes.getNumLikes()); //TESTING



//LIKE
const likeController = () => {
  if(!globalState.likes){
    globalState.likes = new Likes();
  }

  const currentID = globalState.recipe.id;

  if(!globalState.likes.isLiked(currentID)) {
    const newLike = globalState.likes.addLike(
      currentID,
      globalState.recipe.title,
      globalState.recipe.publisher,
      globalState.recipe.img
    );
    likesView.toggleLikeBtn(true);
    console.log("reached before display like");
    likesView.displayLikes(newLike);

  }
  else {
    globalState.likes.deleteLike(currentID);
    likesView.toggleLikeBtn(false);
    likesView.deleteLike(currentID);
  }
  likesView.toggleLikeMenu(globalState.likes.getNumLikes());
};


window.addEventListener('load', () => {
  globalState.likes = new Likes();
  globalState.likes.readStorage();
  likesView.toggleLikeMenu(globalState.likes.getNumLikes());
  globalState.likes.likes.forEach(cur => likesView.displayLikes(cur));
});


base.DOMStrings.recipeContainer.addEventListener('click', event => {
  if(event.target.matches('.btn-decrease, .btn-decrease *')){
    if(globalState.recipe.servings > 1){
      globalState.recipe.updateServings('dec');
      recipeView.updateServings(globalState.recipe);
    }
  }
  else if(event.target.matches('.btn-increase, .btn-increase *')){
    globalState.recipe.updateServings('inc');
    recipeView.updateServings(globalState.recipe);
  }
  else if(event.target.matches('.recipe__btn--add, .recipe__btn--add *')){
    controlList();
  }
  else if(event.target.matches('.recipe__love, .recipe__love *')){
    likeController();
  }
  //console.log(globalState.recipe);
});

window.globalState = globalState;
