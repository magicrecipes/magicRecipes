require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Recipe = require("../models/Recipe");
const User = require("../models/User");
const activate = require(`../middlewares/activeMid`);

router.get("/:id", (req, res) => {
  let recipeID = req.params.id;
  axios
    .get(
      `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${process.env.SPOON_KEY}`
    )

    .then(recipeInfo => {
      let recipeDetail = recipeInfo.data;
      let ingredients = JSON.stringify(recipeDetail.extendedIngredients);
      let cuisines = JSON.stringify(recipeDetail.cuisines);
      let steps = JSON.stringify(recipeDetail.analyzedInstructions);
      res.render("profile/userViewRecipe", {
        recipeDetail,
        ingredients,
        steps,
        cuisines
      });
    })
    .catch(error => console.log(error));
});

router.post("/createRecipe", (req, res) => {
  let {
    id,
    title,
    image,
    readyInMinutes,
    servings,
    pricePerServing,
    instructions
  } = req.body;
  if (!req.body.extendedIngredients=="") {
    var extendedIngredients = JSON.parse(req.body.extendedIngredients);
  }
  if (!req.body.cuisines =="") {
    var cuisines = JSON.parse(req.body.cuisines);
  }
  if (!req.body.analizedInstructions== "") {
    var analizedInstructions = JSON.parse(req.body.analizedInstructions);
  }
  const newRecipe = new Recipe({
    id,
    title,
    image,
    cuisines,
    readyInMinutes,
    servings,
    pricePerServing,
    instructions,
    analizedInstructions,
    extendedIngredients
  });
  newRecipe
    .save()
    .then(newRecipeSaved => {
      User.findByIdAndUpdate(
        req.user._id,
        { $push: { recipes: newRecipeSaved._id } },
        { new: true }
      )
        .then(user => {
          res.redirect("/profile/collections");
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(error => console.log(error));
});

router.get("/delete/:recipeID", activate.checkActive, (req, res) => {
  Recipe.findByIdAndDelete(req.params.recipeID).then(recipeDeleted => {
    res.redirect("/profile/collections");
  });
});

router.post("/update", (req, res, next) => {
  let updated = {
    _id: req.body._id,
    title: req.body.titleUp,
    instructions: req.body.instructionsUp
  };

  Recipe.findByIdAndUpdate(req.body._id, updated)
    .then(recipeUpdated => {
      res.redirect("/profile/collections");
    })
    .catch(err => console.log(err));
});

module.exports = router;
