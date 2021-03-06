import './css/base.scss';
import './css/styles.scss';

import Pantry from './pantry';
import Recipe from './recipe';

import {
  getUser,
  getCookbook,
  getIngredients,
  postData,
} from './util.js';

let favButton = document.querySelector('.view-favorites');
let homeButton = document.querySelector('.home')
let favButtonSmall = document.querySelector('.view-favorites-small');
let homeButtonSmall = document.querySelector('.home-small')
let cardArea = document.querySelector('.all-cards');
let user, cookbook

// template selctors
let allCards = document.querySelector('.all-cards')
let cardTemplate = document.querySelector('.card-template').content;
let directionTemplate = document.querySelector('.directions-template').content;
let ingredientFormTemplate = document.querySelector('.ingredient-form-template').content;

homeButton.addEventListener('click', cardButtonConditionals);
homeButtonSmall.addEventListener('click', cardButtonConditionals);
favButton.addEventListener('click', viewFavorites);
favButtonSmall.addEventListener('click', viewFavorites);
cardArea.addEventListener('click', cardButtonConditionals);

window.onload = onStartup();

function onStartup() {
  const ingredientsResults = getIngredients()
    .then((ingredients) => {
      return ingredients
    })
    .catch((error) => console.log(error))
  const userResult = getUser()
    .then((userObject) => {
      user = userObject
      new Pantry(user.pantry)
      return user
    })
    .catch((error) => console.log(error))
  const cookbookResults = getCookbook()
    .catch((error) => console.log('error', error))
  Promise.all([ingredientsResults, userResult, cookbookResults])
    .then(() => {
      ingredientsResults.then((ingredients) => {
          user.ingredientsData = ingredients
        })
        .then(() => {
          cookbookResults.then((cookbook) =>
            populateCards(cookbook.recipes)
          )
        })
      greetUser()
    })
}

function viewFavorites() {
  if (!user.favoriteRecipes.length) {
    favButton.innerHTML = 'You have no favorites!';
    getCookbook()
      .then((cookbook) =>
        populateCards(cookbook.recipes))
  } else {
    populateCards(user.favoriteRecipes)
  }
}

function greetUser() {
  const userName = document.querySelector('.user-name');
  userName.innerHTML =
    user.name.split(' ')[0] + ' ' + user.name.split(' ')[1][0];
  const userName1 = document.querySelector(".user-name-small")
  userName1.innerHTML =
    user.name.split(" ")[0] + " " + user.name.split(" ")[1][0]
}

function favoriteCard(event) {
  getCookbook()
    .then((cookbook) => {
      let recipe = cookbook.recipes.find((recipe) => {
        if (recipe.id === Number(event.target.id)) {
          return recipe
        }
      })
      updateStar(event)
      updateFavoriteArray(event, recipe)
      getFavorites()
      return recipe
    })
}

function updateFavoriteArray(event, recipe) {
  if (user.favoriteRecipes.length) {
    let foundRecipe = user.favoriteRecipes.find(recipe => recipe.id === Number(event.target.id))
    if (!foundRecipe) {
      user.addToRecipeArray(recipe, user.favoriteRecipes)
    } else {
      user.removeFromRecipeArray(recipe, user.favoriteRecipes)
    }
  } else {
    user.addToRecipeArray(recipe, user.favoriteRecipes)
  }
}

function updateStar(event) {
  getFavorites()
  if (!event.target.classList.contains("favorite-active")) {
    event.target.classList.add("favorite-active")
    favButton.innerHTML = "View Favorites"
  } else if (event.target.classList.contains("favorite-active")) {
    event.target.classList.remove("favorite-active")
  }
}

function cardButtonConditionals(event) {
  if (event.target.classList.contains('favorite')) {
    favoriteCard(event, cookbook)
  } else if (event.target.classList.contains("card-picture")) {
    displayDirections(event)
  } else if (event.target.classList.contains("home") || event.target.classList.contains("home-small")) {
    favButton.innerHTML = "View Favorites"
    getCookbook()
      .then((cookbook) =>
        populateCards(cookbook.recipes))
  }
}

function displayDirections(event) {
  cardArea.classList.add("all")
  getCookbook()
    .then((cookbook) => {
      let recipe = cookbook.recipes.find(recipe => {
        if (recipe.id === Number(event.target.id)) {
          return recipe;
        }
      })
      user.checkPantry(recipe)
      getIngredients()
        .then((ingredientsData) => {
          let recipeObject = new Recipe(recipe, ingredientsData)
          let cost = recipeObject.calculateCost(recipeObject.ingredients, recipeObject.ingredientsData)
          let directionDisplay = directionTemplate.cloneNode(true);
          cardArea.innerHTML = "";
          allCards.appendChild(directionDisplay);
          document.querySelector(".add-to-pantry").addEventListener('click', showIngredientsForm)
          document.querySelector(".display-recipe-name").textContent = `${recipeObject.name}`
          document.querySelector(".can-cook").textContent = `${user.checkPantry(recipe)}`
          document.querySelector(".cost").textContent = `$${cost.price}`
          let ingredientsSpan = document.querySelector(".ingredients")
          let instructionsSpan = document.querySelector(".instructions")
          recipeObject.ingredients.forEach((ingredient, i) => {
            let specificIngredientName = recipeObject.ingredients.map(ingredient => {
              let theIngredientWeWant = recipeObject.ingredientsData.find(ingredientName => {
                if (ingredientName.id === ingredient.id) {
                  return ingredientName.name
                }
              })
              return theIngredientWeWant.name
            })
            ingredientsSpan.insertAdjacentHTML(
              "afterbegin",
              `<ul><li>
              ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
              ${specificIngredientName[i]}</li></ul>
              `)
          })
          recipeObject.instructions.forEach((instruction) => {
            instructionsSpan.insertAdjacentHTML(
              "beforebegin",
              `<li>
                ${instruction.instruction}</li>
                `
            )
          })
        })
    })
}

function showIngredientsForm() {
  cardArea.classList.add("all")
  let ingredientForm = ingredientFormTemplate.cloneNode(true);
  cardArea.innerHTML = "";
  allCards.appendChild(ingredientForm);
  document.querySelector(".ingredient-amount").addEventListener('keyup', checkFields)
  document.querySelector(".ingredient-name").addEventListener('keyup', checkFields)
  document.querySelector(".ingredient-form-button").addEventListener('click', postIngredient)
}

function checkFields() {
  if (document.querySelector(".ingredient-name").value && document.querySelector(".ingredient-amount").value) {
    document.querySelector(".ingredient-form-button").disabled = false;
  } else {
    document.querySelector(".ingredient-form-button").disabled = true;
  }
}

function postIngredient() {
  getIngredients()
    .then((ingredientsData) => {
      let ingName = document.querySelector(".ingredient-name").value;
      let ingId = ingredientsData.find(ingredient => {
        if (ingredient.name) {
          return ingredient.name === ingName
        }
      })
      let ingAmount = document.querySelector(".ingredient-amount").value;
      let idToAdd
      if (ingId) {
        idToAdd = ingId.id
      } else {
        idToAdd = Date.now()
      }
      postData(user.id, idToAdd, ingAmount)
    })
}

function getFavorites() {
  let allStars = document.querySelectorAll('.favorite')
  if (user.favoriteRecipes.length) {
    user.favoriteRecipes.forEach(recipe => {
      allStars.forEach(star => {
        let starId = Number(star.id);
        if (starId === recipe.id) {
          star.classList.add('favorite-active')
        }
      })
    })
  } else {
    return
  }
}

function populateCards(recipes) {
  cardArea.classList.remove('all');
  allCards.innerHTML = "";
  recipes.forEach(recipe => {
    let card = cardTemplate.cloneNode(true);
    allCards.appendChild(card);
    cardTemplate.querySelector('.card').setAttribute("id", recipe.id)
    cardTemplate.querySelector('.card-header').setAttribute("id", recipe.id)
    cardTemplate.querySelector('.favorite').setAttribute("id", recipe.id);
    cardTemplate.querySelector('.recipe-name').textContent = `${recipe.name}`;
    cardTemplate.querySelector('.card-picture').setAttribute("src", recipe.image);
    cardTemplate.querySelector('.card-picture').setAttribute("id", recipe.id);
    cardTemplate.querySelector('.card-picture').setAttribute("alt", `click to view recipe for ${recipe.name}`);
  })
  getFavorites()
}