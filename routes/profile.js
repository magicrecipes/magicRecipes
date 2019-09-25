require("dotenv").config();
const express = require("express");
const router = express.Router();
const activate = require(`../middlewares/activeMid`);

router.get("/userProfile", activate.checkActive, (req, res, next) => {
  res.render("profile/userProfile", { message: req.flash("error") });
});

router.get("/usersearchRecipes", activate.checkActive, (req, res, next) => {
  res.render("profile/userSearchRecipes", { message: req.flash("error") });
});

// router.get("/recipe/:borja", (req, res) => {
//   let recipeID = req.params.bora

//   axios.get("https://www.spoonful.com/recipes/" + recipeID + "/analyzendInstruction").then(recipe => {
//     steps = ["a", "b", "c"]

//     res.render("view-recipe.hbs", recipe)
//   })
// })
module.exports = router;