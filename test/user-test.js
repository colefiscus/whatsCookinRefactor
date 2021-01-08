/* eslint-disable max-len */
import {
  expect
} from 'chai';

import User from '../src/user.js';
// import recipeData from '../src/data/recipes.js'

let user1, recipesToCook, shoppingList, recipeData

describe('User', () => {

  it.skip('Should have a property of favoriteRecipes with a default value', () => {
    favoriteRecipes = []
    user1 = new User(1, "Boba", [{
      ingredient: 1077,
      amount: 1,
    },
    {
      ingredient: 14412,
      amount: 1,
    },
    {
      ingredient: 1009054,
      amount: 3,
    },
    ])
    expect(user1.favoriteRecipes).to.eql([]);
  });

  it.skip('Should be able to add recipes to favoriteRecipes', () => {
    user1 = new User(1, "Boba", [{
      ingredient: 1077,
      amount: 1,
    },
    {
      ingredient: 14412,
      amount: 1,
    },
    {
      ingredient: 1009054,
      amount: 3,
    },
    ]);
    recipeData = [{
      name: "Loaded Chocolate Chip Pudding Cookie Cups",
      id: 595736,
      image: "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      ingredients: [{
        name: "all purpose flour",
        id: 20081,
        quantity: {
          amount: 1.5,
          unit: "c",
        },
      },
      {
        name: "baking soda",
        id: 18372,
        quantity: {
          amount: 0.5,
          unit: "tsp",
        }
      }
      ]
    }];
    let favoriteRecipes = []

    user1.addToRecipeArray(recipeData[0], favoriteRecipes)
    expect(favoriteRecipes[0].name).to.eql(recipeData[0].name)
  });

  it.skip('Should be able to remove recipes from favoriteRecipes', () => {
    user1 = new User(1, "Boba", [{
      ingredient: 1077,
      amount: 1,
    },
    {
      ingredient: 14412,
      amount: 1,
    },
    {
      ingredient: 1009054,
      amount: 3,
    },
    ])
    recipeData = [{
      name: "Loaded Chocolate Chip Pudding Cookie Cups",
      id: 595736,
      image: "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      ingredients: [{
        name: "all purpose flour",
        id: 20081,
        quantity: {
          amount: 1.5,
          unit: "c",
        },
      },
      {
        name: "baking soda",
        id: 18372,
        quantity: {
          amount: 0.5,
          unit: "tsp",
        },
      },
      ],
    }, ]
    let favoriteRecipes = [{
      name: "Loaded Chocolate Chip Pudding Cookie Cups",
    }]

    expect(favoriteRecipes).to.eql([{
      name: "Loaded Chocolate Chip Pudding Cookie Cups",
    }, ])
    user1.removeFromRecipeArray(recipeData, favoriteRecipes)
    expect(favoriteRecipes).to.eql([]);
  });

  it('Should be able to filter through favoriteRecipes by tag', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.filterFavorites('antipasti')).to.eql([recipeData[0]]);
  });

  it('Should be able to search favoriteRecipes by name or ingredient', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.findFavorites('egg')).to.eql([recipeData[0]]);
  });

  it('Should be able to check ingredients in User\'s pantry for a given recipe', () => {
    expect(user1.canICookThis(recipeIngredients)).to.eql('You have the ingredients!');
  });

  it('Should inform User if they lack required ingredients for a given recipe', () => {
    expect(user1.checkPantry(recipeIngredients)).to.eql(missingIngredientsWithPrice);
  });
})