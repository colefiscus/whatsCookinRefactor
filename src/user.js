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
      this.pantry.forEach(panIng => {
        if (recIngPantryIng.id === panIng.ingredient && recIngPantryIng.quantity.amount > panIng.amount) {
          let amountToBuy = recIngPantryIng.quantity.amount - panIng.amount;
          let itemNeeded = {
            name: recIngPantryIng["name"],
            id: recIngPantryIng.id,
            quantity: amountToBuy
          }
          this.shoppingList.push(itemNeeded)
        }
      });
    })

    recIngsNotPantryIngs.forEach(recNotPantryIng => {
      recipe.ingredients.forEach(recIng => {
        if (recIng.id === recNotPantryIng) {
          let itemNeeded = {
            name: recIng["name"],
            id: recIng.id,
            quantity: recIng["quantity"]["amount"]
          };
          this.shoppingList.push(itemNeeded)
        }
      })
    })

    console.log("RECIPE INGS.....", recipe.ingredients)
    console.log("INGS WE HAVE.....", this.pantry)
    console.log("SHOPPING LIST.....", this.shoppingList)
    return "You cannot make this recipe, you need more ingredients."

  }

  calculateCost(ingredientsData) {
    let costCounter = 0;
    this.shoppingList.forEach(ingredient => {
      this.ingredientsData.find(specificIngredient => {
        if (specificIngredient.id === ingredient.id) {
          costCounter += (Number(specificIngredient.estimatedCostInCents) *
          Number(ingredient.quantity.amount))
        }
      })
    });
    return costCounter;
  }
}

export default User;
