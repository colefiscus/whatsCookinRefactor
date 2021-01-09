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
      console.log("You have the ingredients!")
    } else {
      this.createShoppingList(recipe, recipeIngredientsInPantry);
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
    let recIngs = recipe.ingredients.map(recIng => recIng.id)
    let pantryIngs = this.pantry.map(pantryIng => pantryIng.ingredient)
    let recIngsNotPantryIngs = recIngs.filter(recIng => {
      return recIngs.includes(recIng) && !pantryIngs.includes(recIng)
    })

    let recipeIngredientsInPantry = [];
    this.pantry.forEach(pantryIng => {
      let answer = recipe.ingredients.find(recipeIng => recipeIng.id === pantryIng.ingredient)
      if (answer && !recipeIngredientsInPantry.includes(answer)) {
        recipeIngredientsInPantry.push(answer)
      }
    })
    
    recipeIngredientsInPantry.forEach(recInPantryIng => {
      recipe.ingredients.reduce((acc, recIng) => {
        if (recInPantryIng.ingredient === recIng.id && recIng.quantity.amount > recInPantryIng.amount) {
          console.log("SOMETHING WE HAVE BUT NOT ENOUGH OF!!!")
          let amountToBuy = recIng.quantity.amount - recInPantryIng.amount;
          acc[[recIng]["name"]] = amountToBuy;
          this.shoppingList.push(acc)
        }
        return acc;
      }, {});
    })

    recIngsNotPantryIngs.forEach(recNotPantryIng => {
      recipe.ingredients.reduce((acc, recIng) => {
        if (recIng.id === recNotPantryIng) {
          acc[recIng["name"]] = recIng["quantity"]["amount"];
          this.shoppingList.push(acc)
        }
        return acc;
      }, {})
    })
    // console.log("Shopping List?????", this.shoppingList);

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
