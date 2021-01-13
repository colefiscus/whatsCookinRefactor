/* eslint-disable max-len */
import './css/base.scss';
import './css/styles.scss';

import Pantry from './pantry';
import Recipe from './recipe';

import {
  getUser,
  getCookbook,
  getIngredients,
} from './util.js';

let favButton = document.querySelector('.view-favorites');
let homeButton = document.querySelector('.home')
let favButtonSmall = document.querySelector('.view-favorites-small');
let homeButtonSmall = document.querySelector('.home-small')
let cardArea = document.querySelector('.all-cards');
let user, cookbook

// template selctors
let allCards = document.querySelector('.all-cards')
let template = document.querySelector('.template').content;

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
    // } else if (event.target.classList.contains("add-button")) {
    //   const cookbook = getCookbook()
    //     .then((cookbook) => {
    //       let recipe = cookbook.recipes.find((recipe) => {
    //         if (recipe.id === Number(event.target.id)) {
    //           return recipe
    //         }
    //       })
    //       user.addToRecipeArray(recipe, user.recipesToCook)
    //       user.checkPantry(recipe)
    //     })

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
          console.log("recipeObject's ingredients", recipeObject.ingredients)
          console.log("ingredientsData", recipeObject.ingredientsData)
          // DOESN'T HAVE THE FUCKING PRICE
          let cost = recipeObject.calculateCost(recipeObject.ingredients, recipeObject.ingredientsData)
          console.log('WRONG total recipe cost', cost.price)
          cardArea.innerHTML = `
          <p>${user.checkPantry(recipe)}</p>
          <h3>${recipeObject.name}</h3>
            <p class='all-recipe-info'>
            <strong>The total ingredients cost: </strong>
            <span class='cost recipe-info'>$${cost.price}</span>
            <br><br>
            <strong>You will need: </strong>
            <span class='ingredients recipe-info'></span>
            <strong>Instructions: </strong>
            <ol><span class='instructions recipe-info'></span></ol>
            </p>`
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
    let card = template.cloneNode(true);
    allCards.appendChild(card);
    template.querySelector('.card').setAttribute("id", recipe.id)
    template.querySelector('.card-header').setAttribute("id", recipe.id)
    template.querySelector('.add-button').setAttribute("id", recipe.id)
    template.querySelector('.favorite').setAttribute("id", recipe.id);
    template.querySelector('.recipe-name').textContent = `${recipe.name}`;
    template.querySelector('.card-picture').setAttribute("src", recipe.image);
    template.querySelector('.card-picture').setAttribute("id", recipe.id);
    template.querySelector('.card-picture').setAttribute("alt", `click to view recipe for ${recipe.name}`);
  })
  getFavorites()
}
