require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Recipe = require("../models/Recipe");
const User = require("../models/User")

router.get("/:id", (req, res) => {
  let recipeID = req.params.id;
  axios
    .get(
      `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${process.env.SPOON_KEY}`
    )

    .then(recipeInfo => {
      let recipeDetail = recipeInfo.data;
      let list =  JSON.stringify(recipeDetail.extendedIngredients)
      // console.log(recipeDetail)
      // console.log(recipeDetail.cuisines)
      res.render("profile/userViewRecipe", { recipeDetail,list });
    })
    .catch(error => console.log(error));
});

router.post("/createRecipe", (req, res) => {

  let {
    id,
    title,
    image,
    cuisine,
    readyInMinutes,
    servings,
    pricePerServing,
    instructions,
    analizedInstructions,
    
  } = req.body;
  let extendedIngredients = JSON.parse(req.body.extendedIngredients)
  // let ex=req.body.extendedIngredients
  // console.log(JSON.parse(ex))
  const newRecipe = new Recipe({
    id,
    title,
    image,
    cuisine,
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
      User.findByIdAndUpdate(req.user._id,{$push:{recipes:newRecipeSaved._id}},{new:true})
      .then(user=>{
        res.redirect("/profile/userSearchRecipes")
      })
      .catch(err=>{console.log(err)})
    })
    .catch(error=>console.log(error));
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
