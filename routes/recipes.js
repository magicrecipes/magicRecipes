require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");


router.get("/:id", (req, res) => {
  let recipeID = req.params.id;
  axios.get(`https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=cc6d41a5219b4fcfbb7f408d71cd3a3c`)
    
    .then(recipeInfo => {
      console.log(recipeInfo.data)
      let recipeDetail=recipeInfo.data
      res.render("profile/userViewRecipe", { recipeDetail });
    })
    .catch(error => console.log(error));
});

// router.get("/recipe/:borja", (req, res) => {
//   let recipeID = req.params.bora

//   axios.get("https://www.spoonful.com/recipes/" + recipeID + "/analyzendInstruction").then(recipe => {
//     steps = ["a", "b", "c"]

//     res.render("view-recipe.hbs", recipe)
//   })
// })

module.exports = router;
