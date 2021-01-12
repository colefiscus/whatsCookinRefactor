/* eslint-disable max-len */
class User {
  constructor(id, name, pantry, ingredientsData) {
    this.id = id;
    this.name = name;
    this.pantry = pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.shoppingList = [];
    this.ingredientsData = ingredientsData;
  }

  addToRecipeArray(recipe, array) {
    if (!array.includes(recipe)) {
      array.push(recipe)
    }
    // return array
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

  checkPantry(recipe) {
    let recipeIngredients = recipe.ingredients
    let pantryIngredients = this.pantry
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
      return this.createShoppingList(recipe);
    }
  }

  createShoppingList(recipe) {
    this.shoppingList = [];
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
          let itemIDsAlreadyAdded = this.shoppingList.map(ing => ing.id)
          if (!itemIDsAlreadyAdded.includes(itemNeeded.id)) {
            this.shoppingList.push(itemNeeded)
          }
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
    let priceOfIngs = this.calculateCost()
    return `You cannot make ${recipe.name}; you need more ingredients. The cost is $${priceOfIngs}.`
  }

  calculateCost() {
    let costCounter = 0;
    this.shoppingList.forEach(ingredient => {
      this.ingredientsData.find(specificIngredient => {
        if (specificIngredient.id === ingredient.id) {
          costCounter += (Number(specificIngredient.estimatedCostInCents) *
          Number(ingredient.quantity))
        }
      })
    })
    return (costCounter / 100).toFixed(2);
  }
}

export default User;
