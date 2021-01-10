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
      // console.log(this.recipesToCook)
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

  searchRecipesToCook(strgToSrch) {
    return this.recipesToCook.filter(recipe => {
      return recipe.name.includes(strgToSrch)
      || recipe.ingredients.find(indredient => {
        return ingredient.name.includes(strgToSrch)
      });
    });
  }


  canICookThis(recipe) {
    let recipeIngredients = recipe.ingredients
    let pantryIngredients = this.pantry
    let recipeIngredientsInPantry = []
    let shoppingList = []
    recipeIngredients.forEach(recipeIngredient => {
        let match = pantryIngredients.find(pantryIng => pantryIng.ingredient === recipeIngredient.id)
        if (match) {
        recipeIngredientsInPantry.push(match)
        } else if (!match) {
        shoppingList.push(`{name: ${recipeIngredient.name}, amount: ${recipeIngredient.quantity.amount}, unit: ${recipeIngredient.quantity.unit}}`)
      }
    });
    recipeIngredientsInPantry.forEach(recipeItem => {
      if (recipeItem.ingredient === recipeIngredients.id) {
        if (recipeItem.amount >= recipeIngredients.quantity.amount) {
          return
        } else if (recipeItem.amount < recipeIngredients.quantity.amount) {
          let diff = (recipeIngredients.quantity.amount - recipeItem.amount)
          shoppingList.push(`{name: ${recipeItem.name}, amount: ${diff}, unit: ${recipeIngredient.quantity.unit}}`)
        }
      }
    })
    console.log(shoppingList);
  }

  // canICookThis(recipe) {
  //   let recipeIngredients = recipe.ingredients
  //   let pantryIngredients = this.pantry
  //   if (recipeIngredients.every(item => pantryIngredients.includes(item.id))) {
  //     console.log('you can cook this!')
  //     return
  //   }
  //   let ingredientsThatMatch = []
  //   let successCount = []
  //   let shoppingList = []
  //   recipeIngredients.forEach((ingredient, i) => {
  //     let foundIngredient = pantryIngredients.find(pIng => pIng.ingredient === ingredient.id)
  //     ingredientsThatMatch.push(foundIngredient)
  //     // console.log(foundIngredient)
  //     if (ingredientsThatMatch.length === recipeIngredients.length && ingredient.quantity.amount <= foundIngredient.amount) {
  //     successCount.push(true)
  //     } else {
  //     // create shopping list
  //     console.log(foundIngredient.amount)
  //     let ingredientDifference = (ingredient.quantity.amount - foundIngredient.amount)
  //     shoppingList.push(`You need ${ingredientDifference} of ${ingredient.name} to be able to cook this`)
  //     // actually want to push an object with name and diff
  //       }
  //     })
  //     if (successCount.length === recipe.length){
  //     console.log('yan can cook')
  //     } else {
  //     console.log("shoppingList>>>>", shoppingList)
  //     console.log('yan cannot cook')
  //     }
  //   // console.log('line quantity amount', line.quantity.amount)
  //   // console.log('found ingredient', foundIngredient.amount)
  //   // console.log('ingredientsThatMatch', ingredientsThatMatch.length)
  //   // console.log('num of rec ings', recipe.length)
  // }

}

export default User;
