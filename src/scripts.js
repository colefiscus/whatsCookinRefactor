/* eslint-disable max-len */
import './css/base.scss';
import './css/styles.scss';

import recipeData from './data/recipes';
import ingredientsData from "./data/ingredients"
// import users from './data/users';

import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';

import { getUser, postData, deleteData } from './util.js';

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
  user = getUser()
  
  // getData("http://localhost:3001/api/v1/ingredients")
  // getData("http://localhost:3001/api/v1/recipes")

  console.log("INSIDE THE SCRIPTS.JS>>>>>>>", user)
  pantry = new Pantry(user.pantry)
  // console.log(pantry)
  populateCards(cookbook.recipes);
  greetUser();
}

// function createRandomUser() {
//   let userId = (Math.floor(Math.random() * 49) + 1)
//   let newUser = users.find(user => {
//     return user.id === Number(userId);
//   });
//   user = new User(userId, newUser.name, newUser.pantry, ingredientsData)
// }

function getRecipeData(api) {
  return getData(api)
}

function getRecipeInstructions(api) {
  const recipeData = getData(api)
  return recipeData.map(recipe => recipe.instructions)
}

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
  updateFavoriteArray(event)
  return recipe
}

function updateFavoriteArray(event, recipe) {
  console.log(event.target.id)
  if (!user.favoriteRecipes.find(recipe => recipe.id === event.target.id)) {
    user.addToRecipeArray(recipe, user.favoriteRecipes)
  } else {
    user.removeFromRecipeArray(recipe, user.favoriteRecipes)
  }
}

function updateStar(event) {
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

function getFavorites() {
  if (user.favoriteRecipes.length) {
    user.favoriteRecipes.forEach(recipe => {
      document.querySelector(`.favorite-${recipe.id}`).classList.add('favorite-active')
    })
  } else {
    return
  }
}

function populateCards(recipes) {
  console.log("populate start<><><><><><><>")
  allCards.innerHTML = "";
  recipes.forEach(recipe => {
    let card = template.cloneNode(true);
    allCards.appendChild(card);
    template.querySelector('.card-header').setAttribute("id", recipe.id)
    template.querySelector('.add-button').setAttribute("id", recipe.id)
    template.querySelector('.favorite').setAttribute("id", recipe.id);
    template.querySelector('.recipe-name').textContent = `${recipe.name}`;
    template.querySelector('.card-picture').setAttribute("src", recipe.image);
    template.querySelector('.card-picture').setAttribute("id", recipe.id);
    template.querySelector('.card-picture').setAttribute("alt", `click to view recipe for ${recipe.name}`);
    getFavorites()
  })
}