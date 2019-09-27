const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
     apiId: Number,
     title:String,
     image: String,
     cuisines:[],
     readyInMinutes: Number,
     servings: Number,
     pricePerServing: Number,
     extendedIngredients: [],
     analizedInstructions: [],
     instructions: String,
     favorite:Boolean
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
