require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Recipe = require("../models/Recipe");

router.get("/:id", (req, res) => {
  let recipeID = req.params.id;
  axios
    .get(
      `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${process.env.SPOON_KEY}`
    )

    .then(recipeInfo => {
      let recipeDetail = recipeInfo.data;
      res.render("profile/userViewRecipe", { recipeDetail });
    })
    .catch(error => console.log(error));
});
// router.get("/price/:id", (req, res) => {
//   let recipeID = req.params.id;
//   axios.get(
//     `https://api.spoonacular.com/recipes/${recipeID}/priceBreakdownWidget.json?apiKey=${process.env.SPOON_KEY}`
//   );
// });
router.post("/createRecipe", (req, res) => {
  let {
    id,
    title,
    cuisine,
    readyInMinutes,
    servings,
    pricePerServing,
    instructions
  } = req.params.id;
  const newRecipe = new Recipe({
    id,
    title,
    cuisine,
    readyInMinutes,
    servings,
    pricePerServing,
    instructions
  });
  newRecipe
    .save()
    .then(newRecipeSaved => {})
    .catch(error, console.log(error));
});
router.post("/delete/:recipeID", (req, res) => {
  Recipe.findByIdAndDelete(req.params.recipeID).then(recipeDeleted => {
    res.redirect("/");
  });
});

router.post("/update", (req, res, next) => {
  let {
    // id,
    title,
    cuisine,
    readyInMinutes,
    servings,
    pricePerServing,
    // extendedIngredients,
    instructions
    // analizedInstructions
  } = req.body;

  Recipe.findByIdAndUpdate(_id, {
    // id,
    title,
    cuisine,
    readyInMinutes,
    servings,
    pricePerServing,
    // extendedIngredients,
    instructions
    // analizedInstructions
  })
    .then(recipeUpdated => {
      res.redirect("/");
    })
    .catch(err => console.log(err));
});

module.exports = router;
