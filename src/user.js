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
    if (!array.includes(recipe)) {
      array.push(recipe)
    }
    return array
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

  checkPantry(recipe) {
    let recipeIngredientsInPantry = []
    recipe.ingredients.forEach((recipeIngredient) => {
      let answer = this.pantry.find((pantryIng) => pantryIng.ingredient === recipeIngredient.id)
      recipeIngredientsInPantry.push(answer)
    })
    let itemsForShoppingList = recipeIngredientsInPantry.filter(matchingItemInPantry => {
      for (let i = 0; i < recipe.ingredients.length; i++) {
        if ((recipe.ingredients[i].id === matchingItemInPantry.ingredient) && 
        (recipe.ingredients[i].quantity.amount <= matchingItemInPantry.amount)) {
          return matchingItemInPantry
        }
      }
    })
    if (recipe.ingredients.length === itemsForShoppingList.length) {
      return "You have the ingredients!"
    } else {
      // call the create shopping list function
    }
  }
}

export default User;