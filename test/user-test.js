/* eslint-disable max-len */
import {
  expect
} from 'chai';

import User from '../src/user.js';

let user1, recipeData, ingredientsData

describe('User', () => {
  beforeEach(() => {
    ingredientsData = [{
      "id": 20081,
      "name": "all purpose flour",
      "estimatedCostInCents": 142
    },
    {
      "id": 99999,
      "name": "sugar",
      "estimatedCostInCents": 582
    },
    {
      "id": 1123,
      "name": "eggs",
      "estimatedCostInCents": 472
    }];
    user1 = new User(1, "Boba", [{
      ingredient: 18372,
      amount: 1,
    },
    {
      ingredient: 20081,
      amount: 2,
    },
    {
      ingredient: 1123,
      amount: 3,
    },
  ], ingredientsData)
    recipeData = [
      {
        name: "Loaded Chocolate Chip Pudding Cookie Cups",
        tags: ["pudding"],
        id: 595736,
        image: "https://spoonacular.com/recipeImages/595736-556x370.jpg",
        ingredients: [
          {
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
      },
      {
        name: "Another Loaded Chocolate Chip Pudding Cookie Cups",
        tags: ["chocolate"],
        id: 595736,
        image: "https://spoonacular.com/recipeImages/595736-556x370.jpg",
        ingredients: [
          {
            name: "all purpose flour",
            id: 20081,
            quantity: {
              amount: 1.5,
              unit: "c",
            },
          },
          {
            name: "egg",
            id: 1123,
            quantity: {
              amount: 4,
              unit: "tsp",
            },
          },
          {
            name: "sugar",
            id: 99999,
            quantity: {
              amount: 3,
              unit: "tsp",
            }
          }
        ],
      },
    ];
  })

  it('Should have a property of favoriteRecipes with a default value', () => {
    expect(user1.favoriteRecipes).to.eql([]);
  });

  it('Should be able to add recipes to favoriteRecipes', () => {
    user1.addToRecipeArray(recipeData[0], user1.favoriteRecipes)
    expect(user1.favoriteRecipes[0].name).to.eql(recipeData[0].name)
  });

  it('Should be able to remove recipes from favoriteRecipes', () => {
    user1.addToRecipeArray(recipeData[0], user1.favoriteRecipes)
    expect(user1.favoriteRecipes[0].name).to.eql("Loaded Chocolate Chip Pudding Cookie Cups")
    user1.removeFromRecipeArray(recipeData, user1.favoriteRecipes)
    expect(user1.favoriteRecipes).to.eql([]);
  });

  it('Should be able to filter through favoriteRecipes by tag', () => {
    user1.addToRecipeArray(recipeData[0], user1.favoriteRecipes)
    user1.addToRecipeArray(recipeData[1], user1.favoriteRecipes)
    expect(user1.filterRecipeArray("pudding", user1.favoriteRecipes)).to.eql([recipeData[0]])
  });

  it('Should be able to search favoriteRecipes by name or ingredient', () => {
    user1.addToRecipeArray(recipeData[0], user1.favoriteRecipes)
    user1.addToRecipeArray(recipeData[1], user1.favoriteRecipes)
    expect(user1.findFavorites('egg')).to.eql([recipeData[1]]);
  });

  it('Should be able to check ingredients in User\'s pantry for a given recipe', () => {
    expect(user1.checkPantry(recipeData[0])).to.eql("You have the ingredients!")
  });

  it('Should inform User if they lack required ingredients for a given recipe', () => {
    expect(user1.createShoppingList(recipeData[1])).to.eql("You cannot make Another Loaded Chocolate Chip Pudding Cookie Cups; you need more ingredients. The cost is $22.18. Buy this: eggs, sugar");
  });
})
