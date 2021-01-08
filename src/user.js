/* eslint-disable max-len */
class User {
  constructor(id, name, pantry) {
    this.id = id;
    this.name = name;
    this.pantry = pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.shoppingList = [];
  }

  addToRecipeArray(recipe, array) {
    console.log('fuck')
    if (!array.includes(recipe)) {
      array.push(recipe)
    }
  }

  removeFromRecipeArray(recipe, array) {
    const i = array.indexOf(recipe);
    array.splice(i, 1)
  }

  filterRecipeArray(tag, array) {
    return array.filter(recipe => {
      return recipe.tags.includes(tag);
    });
  }

  findFavorites(strgToSrch) {
    return this.favoriteRecipes.filter(recipe => {
      return recipe.name.includes(strgToSrch) ||
        recipe.ingredients.find(ingredient => {
          return ingredient.name.includes(strgToSrch)
        });
    });
  }
  
  canICookThis(recipe) {
    // console.log("recipe ingredients", recipe.ingredients[0].id)
    // console.log("pantry", this.pantry[0].ingredient)

    let recipeIngredients = recipe.ingredients
    let pantryIngredients = this.pantry
    console.log(recipeIngredients)
    console.log(pantryIngredients)

    for (let i = 0; i < recipeIngredients; i++) {
      // if (pantryIngredients.indexOf(recipeIngredients[i].id) !== -1 ) {
      console.log(pantryIngredients.indexOf(recipeIngredients[i].id) !== -1)
      // }
      // else {
      // console.log("yes way")
      // }
    }
    // let foundIt = recipe.ingredients.every(element => this.pantry.includes(element.id))
    // console.log(foundIt)



    //   {
    //   console.log("prints first ing id", recipeIngredient.id)
    //   if (this.pantry.includes(recipeIngredient.id)) {
    //     // return recipeIngredient.id
    //   } else {
    //     console.log("yan can't cook")
    //   }
    //   this.pantry.find(ingredient => {
    //     ingredient === recipeIngredient.id
    //     // console.log(this.pantry.amount)
    //     // return the amount in the pantry
    //   })

    // })


    // (recipeIngredient.quantity.amount <= this.pantry.thisthing.amount)
    // console.log("found it", recipeIngredient.name)
    // console.log(recipe.ingredients)
  }

}

export default User;