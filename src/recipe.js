import User from "./user"

class Recipe extends User {
  constructor(recipe, ingredientsData, id, name, pantry) {
    super(id, name, pantry, ingredientsData)
    this.name = recipe.name
    this.id = recipe.id
    this.ingredientsData = ingredientsData

    this.ingredients = recipe.ingredients
    this.instructions = recipe.instructions
    this.tags = recipe.tags
  }
}

export default Recipe;
