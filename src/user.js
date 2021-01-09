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
      let answer = this.pantry.find((pantryIng) => pantryIng.ingredient === recipeIngredient.id && pantryIng.amount >= recipeIngredient.quantity.amount)
      if (answer) {
        recipeIngredientsInPantry.push(answer)
      }
    })
    if (recipe.ingredients.length === recipeIngredientsInPantry.length) {
      return "You have the ingredients!"
    } else {
      this.createShoppingList(recipe);
    }
    //   let recipeItemsWeHave = recipeIngredientsInPantry.filter(matchingItemInPantry => {
    //     for (let i = 0; i < recipe.ingredients.length; i++) {
    //       console.log(matchingItemInPantry)
    //       if ((recipe.ingredients[i].id === matchingItemInPantry.ingredient) &&
    //       (recipe.ingredients[i].quantity.amount <= matchingItemInPantry.amount)) {
    //         return matchingItemInPantry
    //       } else {
    //         console.log("You CANNOT cook this.")
    //         // this.createShoppingList(recipeIngredientsInPantry, recipe)
    //       }
    //     }
    //   }
    // }
  }

  createShoppingList(recipe) {
    recipe.ingredients.forEach((recipeIngredient) => {
      let answer = this.pantry.find((pantryIng) => {
         if (pantryIng.ingredient === recipeIngredient.id && pantryIng.amount < recipeIngredient.quantity.amount) {
           return
         } else if (recipeIngredient.id) {
           return
         }
      })
      if (answer) {
        this.shoppingList.push(recipeIngredient)
      } else if (recipe.ingredient !== )
    })
    return this.shoppingList
  }

  // createShoppingList(recipeIngredientsInPantry, recipe) {
  //   let itemsForShoppingList = recipeIngredientsInPantry.filter(matchingItemInPantry => {
  //     for (let i = 0; i < recipe.ingredients.length; i++) {
  //       if ((recipe.ingredients[i].id === matchingItemInPantry.ingredient) &&
  //       (recipe.ingredients[i].quantity.amount <= matchingItemInPantry.amount)) {
  //         this.shoppingList.push(matchingItemInPantry)
  //       }
  //     }
  //   })
  //   console.log(this.shoppingList)
  // }
}

export default User;
