const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    // id: Number,
    // title:String,
    // image: String,
    // cuisines:[],
    // readyInMinutes: Number,
    // servings: Number,
    // pricePerServing: Number,
    // extendedIngredients: [],
    // analizedInstructions: [],
    instructions: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
