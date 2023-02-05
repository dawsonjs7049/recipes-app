export default class Recipe {

    constructor(recipe)
    {
        if(recipe === null)
        {
            this.name = "";
            this.description = "";
            this.isFavorited = false;
            this.steps = [];
            this.ingredients = [];
            this.tags = [];
            this.prepTime = "";
            this.originalServingSize = 1;
            this.userId = "";
            this.id = "";
            this.timestamp = "";
    
            console.log("INSIDE DEFAULT CONSTRUCTOR: " + JSON.stringify(this));
        }
        else
        {
            console.log("INSIDE CONSTRUCTOR: " + JSON.stringify(recipe));

            this.name = recipe.name;
            this.description = recipe.description ?? "N/A"
            this.isFavorited = recipe.isFavorited ?? 0;
            this.steps = recipe.steps;
            this.ingredients = recipe.ingredients;
            // this.ingredients = recipe.ingredients;
            this.tags = recipe.tags;
            this.prepTime = recipe.prepTime
            this.originalServingSize = recipe.originalServingSize;
            this.userId = recipe.userId;
            this.id = recipe.id;
            this.timestamp = recipe.timestamp;
        }
    }
}