class User {
  constructor(id, name, pantry, ingredientsData) {
    this.name = name;
    this.id = id;
    this.ingredientsData = ingredientsData || [];
    this.pantry = pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.shoppingList = [];
  }

  addToRecipeArray(recipe, array) {
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

  searchRecipesToCook(strgToSrch) {
    return this.recipesToCook.filter(recipe => {
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
      return this.createShoppingList(recipe);
    }
  }

  createShoppingList(recipe) {
    this.shoppingList = [];
    let recIngs = recipe.ingredients.map(recIng => recIng.id)
    let pantryIngs = this.pantry.map(pantryIng => pantryIng.ingredient)
    let reqIngs = this.filterReqIngs(recipe)
    this.addPartialIngsToShopList(reqIngs)
    this.addEntireIngsToShopList(recipe, recIngs, pantryIngs)
    let priceOfIngs = this.calculateCost(this.shoppingList, this.ingredientsData)
    return `You cannot make ${recipe.name}; you need more ingredients. The cost is $${priceOfIngs.price}. Buy this: ${priceOfIngs.groceryList.join(', ')}`
  }

  filterReqIngs(recipe) {
    let recipeIngredientsInPantry = [];
    this.pantry.forEach(pantryIng => {
      let answer = recipe.ingredients.find(recipeIng => recipeIng.id === pantryIng.ingredient)
      if (answer && !recipeIngredientsInPantry.includes(answer)) {
        recipeIngredientsInPantry.push(answer)
      }
    })
    return recipeIngredientsInPantry
  }

  addPartialIngsToShopList(recipeIngredientsInPantry) {
    recipeIngredientsInPantry.forEach(recIngPantryIng => {
      this.pantry.forEach(panIng => {
        if (recIngPantryIng.id === panIng.ingredient && recIngPantryIng.quantity.amount > panIng.amount) {
          let amountToBuy = recIngPantryIng.quantity.amount - panIng.amount;
          let itemNeeded = {
            id: recIngPantryIng.id,
            quantity: {
              amount: amountToBuy
            }
          }
          let itemIDsAlreadyAdded = this.shoppingList.map(ing => ing.id)
          if (!itemIDsAlreadyAdded.includes(itemNeeded.id)) {
            this.shoppingList.push(itemNeeded)
          }
        }
      });
    })
  }

  addEntireIngsToShopList(recipe, recIngs, pantryIngs) {
    let recIngsNotPantryIngs = recIngs.filter(recIng => {
      return recIngs.includes(recIng) && !pantryIngs.includes(recIng)
    })
    recIngsNotPantryIngs.forEach(recNotPantryIng => {
      recipe.ingredients.forEach(recIng => {
        if (recIng.id === recNotPantryIng) {
          let itemNeeded = {
            id: recIng.id,
            quantity: {
              amount: recIng["quantity"]["amount"]
            }
          };
          this.shoppingList.push(itemNeeded)
        }
      })
    })
  }

  calculateCost(partialIngs, wholeIngs) {
    let costCounter = 0;
    let groceryList = [];
    partialIngs.forEach(ingredient => {
      wholeIngs.find(specificIngredient => {
        if (specificIngredient.id === ingredient.id) {
          costCounter += (Number(specificIngredient.estimatedCostInCents) *
            Number(ingredient.quantity.amount))
          groceryList.push(specificIngredient.name)
        }
      })
    })
    return {
      groceryList: groceryList,
      price: (costCounter / 100).toFixed(2)
    }
  }
}

export default User;