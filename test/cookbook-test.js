import {expect} from 'chai';


// import recipeData from '../src/data/recipes';
import Cookbook from '../src/cookbook';

let cookbook;

let recipeData = [
  {
  "name": "Sesame Cookies",
  "id": 541288,
  "image": "https://spoonacular.com/recipeImages/541288-556x370.jpg",
  "ingredients": [
    {
      "name": "all purpose flour",
      "id": 20081,
      "quantity": {
        "amount": 160,
        "unit": "g"
      }
    },
    {
      "name": "almond meal",
      "id": 93740,
      "quantity": {
        "amount": 40,
        "unit": "g"
      }
    },
    {
      "name": "egg yolk",
      "id": 1125,
      "quantity": {
        "amount": 1,
        "unit": ""
      }
    },
    {
      "name": "salt",
      "id": 2047,
      "quantity": {
        "amount": 1,
        "unit": "pinch"
      }
    },
    {
      "name": "sesame seeds",
      "id": 12023,
      "quantity": {
        "amount": 40,
        "unit": "g"
      }
    },
    {
      "name": "sugar",
      "id": 19335,
      "quantity": {
        "amount": 80,
        "unit": "g"
      }
    },
    {
      "name": "unsalted butter",
      "id": 1145,
      "quantity": {
        "amount": 1,
        "unit": "stick"
      }
    }
  ],
  "instructions": [
    {
      "number": 1,
      "instruction": "Cut the butter into small cubes and keep them refrigerated until ready to use (I cut on parchment paper and wrap up the butter for easy transfer.).In the food processor, combine the flour, almond meal, sugar, and salt. If you don’t have a food processor, you can simply use a bowl to mix all the ingredients.If you want your sesame seeds to be fine texture, add them now. If you prefer to keep the original shape of sesame seeds, add them with egg yolk later on.Take out the butter from the refrigerator and mix together. If you use a regular bowl to mix, use a dough/pastry blender to combine the butter into the dry ingredients.Lastly add egg yolk.If the food processor is small (like mine) and it doesn’t look like it’s mixed completely, take it out and mix well with a silicone spatula.Form the dough into a ball and cut in half."
    },
    {
      "number": 2,
      "instruction": "Roll it to a log approximately 2” across. For me it’s easier to work when the dough is wrapped in plastic wrap. While rolling, unwrap some parts of plastic wrap then roll again. Form a nice shape. I wasn't paying attention so my log is flat on one side (see step 11)!Wrap the logs tightly in plastic wrap and refrigerate until firm, about 1 hour.Preheat the oven to 350° F (175° C)."
    },
    {
      "number": 3,
      "instruction": "Remove the dough from plastic wrap and cut into discs about ¼ inch thick (if you prefer thicker cookies, cut into discs about ½ inch and you get 20 cookies total)."
    },
    {
      "number": 4,
      "instruction": "Place them on two baking sheets lined with parchment paper."
    },
    {
      "number": 5,
      "instruction": "Bake for about 15 minutes, or until lightly browned around the edges."
    },
    {
      "number": 6,
      "instruction": "Remove from the oven and allow to cool on the baking sheet for about 10 minutes. Then transfer to a wire rack to cool completely. Store cookies in an airtight container. Cookies will last for a day or two."
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
  },
  {
  "name": "Pastry Cream",
  "id": 605132,
  "image": "https://spoonacular.com/recipeImages/605132-556x370.jpg",
  "ingredients": [
    {
      "name": "butter",
      "id": 1001,
      "quantity": {
        "amount": 2,
        "unit": "tablespoons"
      }
    },
    {
      "name": "cornstarch",
      "id": 20027,
      "quantity": {
        "amount": 0.25,
        "unit": "cup"
      }
    },
    {
      "name": "egg",
      "id": 1123,
      "quantity": {
        "amount": 1,
        "unit": ""
      }
    },
    {
      "name": "egg yolks",
      "id": 1125,
      "quantity": {
        "amount": 2,
        "unit": ""
      }
    },
    {
      "name": "milk",
      "id": 1077,
      "quantity": {
        "amount": 2,
        "unit": "cups"
      }
    },
    {
      "name": "vanilla extract",
      "id": 2050,
      "quantity": {
        "amount": 1,
        "unit": "teaspoon"
      }
    },
    {
      "name": "white sugar",
      "id": 19335,
      "quantity": {
        "amount": 0.3333333333333333,
        "unit": "cup"
      }
    }
  ],
  "instructions": [
    {
      "number": 1,
      "instruction": "In a heavy saucepan, stir together the milk and 1/4 cup of sugar. Bring to a boil over medium heat."
    },
    {
      "number": 2,
      "instruction": "In a medium bowl, whisk together the egg yolks and egg. Stir together the remaining sugar and cornstarch; then stir them into the egg until smooth. When the milk comes to a boil, drizzle it into the bowl in a thin stream while mixing so that you do not cook the eggs. Return the mixture to the saucepan, and slowly bring to a boil, stirring constantly so the eggs don' t curdle or scorch on the bottom."
    },
    {
      "number": 3,
      "instruction": "When the mixture comes to a boil and thickens, remove from the heat. Stir in the butter and vanilla, mixing until the butter is completely blended in."
    },
    {
      "number": 4,
      "instruction": "Pour into a heat-proof container and place a piece of plastic wrap directly on the surface to prevent a skin from forming. Refrigerate until chilled before using."
    }
  ],
  "tags": [
    "side dish"
  ]
}]

describe('Cookbook', () => {
  beforeEach(() => {
    cookbook = new Cookbook(recipeData);
  });

  it('Should be an instance of Cookbook', () => {
    expect(cookbook).to.be.an.instanceOf(Cookbook);
  });

  it('Should have an array of all recipes', () => {
    expect(cookbook.recipes).to.be.an('array');
  });

  describe('findRecipe', () => {
    it('Should be able to filter through its array by ingredients', () => {
      expect(cookbook.findRecipe('yolk').length).to.equal(2);
    });

    it('Should be able to filter through its array by name', () => {
      expect(cookbook.findRecipe('Sesame Cookies').length).to.equal(1);
    });
  });
})
