import axiosModule from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const result = await axiosModule(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
      this.title = result.data.recipe.title;
      this.publisher = result.data.recipe.publisher;
      this.img = result.data.recipe.image_url;
      this.url = result.data.recipe.source_url;
      this.ingredients = result.data.recipe.ingredients;
      //console.log(result.data.recipe);
    }
    catch(error) {
      alert(error);
    }
  }

  seperateIngredients() {
    const longUnits = ["tablespoons", "tablespoon", "teaspoons", "teaspoon", "pounds", "cups", "ounces", "ounce"];
    const shortUnits = ["tbsp", "tbsp", "tsp", "tsp", "pound", "cup", "oz", "oz",];

    const name = this.ingredients.map(element => {
      let ingredient = element.toLowerCase();
      longUnits.forEach((current, i) => {
        ingredient = ingredient.replace(current, shortUnits[i]);
      });

      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
      const arrOfIng = ingredient.split(' ');
      //console.log(arrOfIng);
      const index = arrOfIng.findIndex(cur => shortUnits.includes(cur));

      let returningObj;
      if(arrOfIng[0] === "") {
        returningObj = {
          count: 1,
          unit: arrOfIng[index],
          ingredient: arrOfIng.slice(index + 1).join(' ')
        };
      }
      else if(index > -1){
        //Then normal
          const number = arrOfIng.slice(0, index);
          let count;
          if(number.length === 1){
            count = eval(arrOfIng[0].replace('-','+'));
          }
          else {
            count = eval(arrOfIng.slice(0, index).join('+'));
          }

          returningObj = {
            count,
            unit: arrOfIng[index],
            ingredient: arrOfIng.slice(index + 1).join(' ')
          };

      }
      else if(parseInt(arrOfIng[0], 10)){
        //Value present but no number with unit
        returningObj = {
          count: parseInt(arrOfIng[0], 10),
          unit: '',
          ingredient: arrOfIng.slice(1).join(' ')
        };
      }
      else if(index === -1){
        //No unit
        returningObj = {
          count: 1,
          unit: '',
          ingredient: arrOfIng.join(' ')
        };
      }


        return returningObj;
    });
    this.ingredients = name;

  }





  calculateTime() {
    //3 ingredients = 15 minutes
    const totalIngredients = this.ingredients.length;
    const periods = Math.ceil(totalIngredients / 3);
    this.time = periods * 15;
  }

  calculateServings() {
    this.servings = 4;
  }

  updateServings(type) {
    let localServings;
    if(type === 'dec'){
      localServings = this.servings - 1;
    }
    else if(type === "inc"){
      localServings = this.servings + 1;
    }
    this.ingredients.forEach(cur => {
      cur.count = cur.count * (localServings/this.servings);
    });
    this.servings = localServings;
  }

}
