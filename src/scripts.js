/* eslint-disable max-len */
import './css/base.scss';
import './css/styles.scss';

import recipeData from './data/recipes';
import ingredientsData from "./data/ingredients"

import Pantry from './pantry';
import Recipe from './recipe';
import Cookbook from './cookbook';

import { getUser, getCookbook, getIngredients, deleteData } from './util.js';

let favButton = document.querySelector('.view-favorites');
let homeButton = document.querySelector('.home')
let cardArea = document.querySelector('.all-cards');
let cookbook = new Cookbook(recipeData);
let user, pantry;

//template selctors
let allCards = document.querySelector('.all-cards')
let template = document.querySelector('.template').content;

homeButton.addEventListener('click', cardButtonConditionals);
favButton.addEventListener('click', viewFavorites);
cardArea.addEventListener('click', cardButtonConditionals);

window.onload = onStartup();

function onStartup() {
  const ingredientsResults = getIngredients()
    .catch((error) => console.log(error))
  const userResult = getUser()
    .then((userObject) => {
      user = userObject
      new Pantry(user.pantry)
      return user
    })
    .catch((error) => console.log(error))
  const cookbookResults = getCookbook()
    .then((CBObj) => {
      return new Cookbook(CBObj)
    })
    .catch((error) => console.log(error))
  Promise.all([ingredientsResults, userResult, cookbookResults])
    .then(() => {
      greetUser();
      populateCards(cookbook.recipes);
    }) 
}

// function getRecipeData(api) {
//   return getData(api)
// }

// function getRecipeInstructions(api) {
//   const recipeData = getData(api)
//   return recipeData.map(recipe => recipe.instructions)
// }

function viewFavorites() {
  if (!user.favoriteRecipes.length) {
    favButton.innerHTML = 'You have no favorites!';
    populateCards(cookbook.recipes);
    return
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
  let recipe = cookbook.recipes.find((recipe) => {
    if (recipe.id === Number(event.target.id)) {
      return recipe
    }
  })
  updateStar(event)
  updateFavoriteArray(event, recipe)
  getFavorites()
  return recipe
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

// function updateStar(event) {
//   let eventTarget = event.target
//   console.log(eventTarget)
//   if (!eventTarget.classList.contains("favorite-active")) {
//     console.log("BEFORE", eventTarget.classList)
//     eventTarget.classList.add("favorite-active")
//     console.log("AFTER", eventTarget.classList)
//     favButton.innerHTML = "View Favorites"
//   } else if (event.target.classList.contains("favorite-active")) {
//     event.target.classList.remove("favorite-active")
//   }
// }

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
    favoriteCard(event)
  } else if (event.target.classList.contains("card-picture")) {
    displayDirections(event)
  } else if (event.target.classList.contains("add-button")) {
    let recipe = cookbook.recipes.find((recipe) => {
      if (recipe.id === Number(event.target.id)) {
        return recipe
      }
    })
    user.addToRecipeArray(recipe, user.recipesToCook)

    user.checkPantry(recipe)
  } else if (event.target.classList.contains("home")) {
    favButton.innerHTML = "View Favorites"
    populateCards(cookbook.recipes)
  }
}

function displayDirections(event) {
  let newRecipeInfo = cookbook.recipes.find(recipe => {
    if (recipe.id === Number(event.target.id)) {
      return recipe;
    }
  })
  let recipeObject = new Recipe(newRecipeInfo, ingredientsData);
  let cost = recipeObject.calculateCost()
  let costInDollars = (cost / 100).toFixed(2)
  cardArea.classList.add('all');
  cardArea.innerHTML = `
    <h3>${recipeObject.name}</h3>
    <p class='all-recipe-info'>
    <strong>It will cost: </strong>
    <span class='cost recipe-info'>$${costInDollars}</span>
    <br><br>
    <strong>You will need: </strong>
    <span class='ingredients recipe-info'></span>
    <strong>Instructions: </strong>
    <ol><span class='instructions recipe-info'></span></ol>
    </p>`;
  let ingredientsSpan = document.querySelector('.ingredients');
  let instructionsSpan = document.querySelector('.instructions');
  recipeObject.ingredients.forEach(ingredient => {
    ingredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
    ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
    ${ingredient.name}</li></ul>
    `)
  })
  recipeObject.instructions.forEach(instruction => {
    instructionsSpan.insertAdjacentHTML('beforebegin', `<li>
    ${instruction.instruction}</li>
    `)
  })
}

// function getFavorites() {
//   console.log("FUUUUUUUUCKKKKKKK", user.favoriteRecipes.length)
//   if (user.favoriteRecipes.length) {
//     let stars = template.querySelectorAll('.favorite');
//     stars.forEach(star => {
//       if (user.favoriteRecipes.find(recipe => recipe.id === star.id)) {
//         template.querySelector('.favorite').classList.add('favorite-active')
//       }
//     })
//     // user.favoriteRecipes.forEach(recipe => {
//     //   if (template.querySelector('.favorite').id = recipe.id) {
//     //     template.querySelector('.favorite').classList.add('favorite-active')
//     //   }
//     // })
//   } else {
//     return
//   }
// }

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