require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Recipe = require("../models/Recipe");
const User = require("../models/User")
const activate = require(`../middlewares/activeMid`);


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
    image,
    cuisine,
    readyInMinutes,
    servings,
    pricePerServing,
    instructions,
    analizedInstructions
  } = req.body;
  const newRecipe = new Recipe({
    id,
    title,
    image,
    cuisine,
    readyInMinutes,
    servings,
    pricePerServing,
    instructions,
    analizedInstructions
  });
  newRecipe
    .save()
    .then(newRecipeSaved => {
      User.findByIdAndUpdate(req.user._id,{$push:{recipes:newRecipeSaved._id}},{new:true})
      .then(user=>{
        res.redirect("/profile/collections")
      })
      .catch(err=>{console.log(err)})
    })
    .catch(error=>console.log(error));
});


router.get("/delete/:recipeID", activate.checkActive, (req, res) => {
  Recipe.findByIdAndDelete(req.params.recipeID).then(recipeDeleted => {
    res.redirect("/profile/collections");
  });
});

router.post("/update", (req, res, next) => {

  let updated =  {
    _id : req.body._id,
    title : req.body.title[0],
    cuisine  : req.body.cuisine,
    readyInMinutes : req.body.readyInMinutes,
    servings : req.body.servings,
    pricePerServing : req.body.pricePerServing,
    // extendedIngredients,
    instructions : req.body.instructions
    // analizedInstructions
  }

console.log(updated)

Recipe.findByIdAndUpdate(req.body._id, updated)
    .then(recipeUpdated => {
      res.redirect("/profile/collections");
    })
    .catch(err => console.log(err));
});

module.exports = router;
