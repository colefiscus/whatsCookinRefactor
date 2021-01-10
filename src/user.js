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
      return "You have the ingredients!"
    } else {
      return this.createShoppingList(recipe);
    }
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

    recipeIngredientsInPantry.forEach(recIngPantryIng => {
      this.pantry.reduce((acc, panIng) => {
        if (recIngPantryIng.id === panIng.ingredient && recIngPantryIng.quantity.amount > panIng.amount && !acc[recIngPantryIng["name"]]) {
          let amountToBuy = recIngPantryIng.quantity.amount - panIng.amount;
          acc[recIngPantryIng["name"]] = amountToBuy;
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

    console.log("RECIPE INGS.....", recipe.ingredients)
    console.log("INGS WE HAVE.....", this.pantry)
    console.log("SHOPPING LIST.....", this.shoppingList)
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
