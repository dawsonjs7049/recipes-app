export default class Recipe {
    constructor(recipe)
    {
        this.name = recipe.name;
        this.description = recipe.description ?? "N/A"
        this.steps = recipe.steps;
        this.ingredients = JSON.stringify(recipe.ingredients);
        this.tags = recipe.tags;
        this.prepTime = recipe.prepTime
        this.userId = recipe.userId;
        this.id = recipe.id;
        this.timestamp = recipe.timestamp;
        this.classDescription = "HELLO THERE";
    }
}