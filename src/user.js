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

  canICookThis(recipe) {
    let recipeIngredients = recipe.ingredients
    let pantryIngredients = this.pantry
    let recipeIngredientsInPantry = []
    recipeIngredients.forEach(recipeIngredient => {
      let match = pantryIngredients.find(pantryIng => pantryIng.ingredient === recipeIngredient.id)
      if (match) {
        recipeIngredientsInPantry.push(match)
      } else if (!match) {
        this.shoppingList.push(`{name: ${recipeIngredient.name}, amount: ${recipeIngredient.quantity.amount}}`)
        return
      }
    });
    recipeIngredientsInPantry.forEach(recipeItem => {
      if (recipeItem.ingredient === recipeIngredients.id) {
        if (recipeItem.amount >= recipeIngredients.quantity.amount) {
          return
        } else if (recipeItem.amount < recipeIngredients.quantity.amount) {
          let diff = (recipeIngredients.quantity.amount - recipeItem.amount)
          this.shoppingList.push(`{name: ${recipeItem.name}, amount: ${diff}}`)
        }
      }
    })
    console.log(shoppingList);
    if (recipeIngredients.length === pantryIngredients.length) {
      return 'You have the ingredients!'
    }
  }
}

export default User;