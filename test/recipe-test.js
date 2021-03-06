import { expect } from 'chai';

import Recipe from '../src/recipe.js';
let recipeData = [{
  "name": "Loaded Chocolate Chip Pudding Cookie Cups",
  "id": 595736,
  "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
  "ingredients": [
    {
      "name": "all purpose flour",
      "id": 20081,
      "quantity": {
        "amount": 1.5,
        "unit": "c"
      }
    },
    {
      "name": "baking soda",
      "id": 18372,
      "quantity": {
        "amount": 0.5,
        "unit": "tsp"
      }
    },
    {
      "name": "egg",
      "id": 1123,
      "quantity": {
        "amount": 1,
        "unit": "large"
      }
    },
    {
      "name": "granulated sugar",
      "id": 19335,
      "quantity": {
        "amount": 0.5,
        "unit": "c"
      }
    },
    {
      "name": "instant vanilla pudding mix",
      "id": 19206,
      "quantity": {
        "amount": 3,
        "unit": "Tbsp"
      }
    },
    {
      "name": "light brown sugar",
      "id": 19334,
      "quantity": {
        "amount": 0.5,
        "unit": "c"
      }
    },
    {
      "name": "salt",
      "id": 2047,
      "quantity": {
        "amount": 0.5,
        "unit": "tsp"
      }
    },
    {
      "name": "sea salt",
      "id": 1012047,
      "quantity": {
        "amount": 24,
        "unit": "servings"
      }
    },
    {
      "name": "semisweet chocolate chips",
      "id": 10019903,
      "quantity": {
        "amount": 2,
        "unit": "c"
      }
    },
    {
      "name": "unsalted butter",
      "id": 1145,
      "quantity": {
        "amount": 0.5,
        "unit": "c"
      }
    },
    {
      "name": "vanilla extract",
      "id": 2050,
      "quantity": {
        "amount": 0.5,
        "unit": "tsp"
      }
    }
  ],
  "instructions": [
    {
      "number": 1,
      "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy."
    },
    {
      "number": 2,
      "instruction": "Add egg and vanilla and mix until combined."
    },
    {
      "number": 3,
      "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees."
    },
    {
      "number": 4,
      "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt."
    },
    {
      "number": 5,
      "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown."
    },
    {
      "number": 6,
      "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce."
    }
  ],
  "tags": [
    "antipasti",
    "starter",
    "snack",
    "appetizer",
    "antipasto",
    "hor d'oeuvre"
  ]
}];

let ingredientsData = [
  {
    "id": 20081,
    "name": "wheat flour",
    "estimatedCostInCents": 142
  },
  {
    "id": 18372,
    "name": "bicarbonate of soda",
    "estimatedCostInCents": 582
  },
  {
    "id": 1123,
    "name": "eggs",
    "estimatedCostInCents": 472
  },
  {
    "id": 19335,
    "name": "sucrose",
    "estimatedCostInCents": 902
  },
  {
    "id": 19206,
    "name": "instant vanilla pudding",
    "estimatedCostInCents": 660
  },
  {
    "id": 19334,
    "name": "brown sugar",
    "estimatedCostInCents": 559
  },
  {
    "id": 2047,
    "name": "salt",
    "estimatedCostInCents": 280
  },
  {
    "id": 1012047,
    "name": "fine sea salt",
    "estimatedCostInCents": 528
  },
  {
    "id": 10019903,
    "name": "semi sweet chips",
    "estimatedCostInCents": 253
  },
  {
    "id": 1145,
    "name": "unsalted butter",
    "estimatedCostInCents": 617
  },
  {
    "id": 2050,
    "name": "vanilla",
    "estimatedCostInCents": 926
  },
]

let recipe;

describe('Recipe', () => {
  beforeEach(() => {
    recipe = new Recipe(recipeData[0], ingredientsData);
  });

  describe('Recipe Data', () => {

    it('Should hold its own ingredient data', () => {
      expect(recipe.ingredients).to.equal(recipeData[0].ingredients);
    })

    it('Should hold its own instruction data', () => {
      expect(recipe.instructions).to.equal(recipeData[0].instructions);
    })
  })
});
