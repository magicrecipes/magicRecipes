require("dotenv").config();
const express = require("express");
const router = express.Router();
const activate = require(`../middlewares/activeMid`);
const Recipe = require("../models/Recipe")
const User = require("../models/User")

router.get("/userProfile", activate.checkActive, (req, res, next) => {
  console.log(req.user);
  res.render("profile/userProfile", {
    message: req.flash("error"),
    user: req.user
  });
});

router.get("/usersearchRecipes", activate.checkActive, (req, res, next) => {
  res.render("profile/userSearchRecipes", {
    message: req.flash("error"),
    user: req.user
  });
});
// router.post("/delete/:recipeID", (req, res) => {
//   Recipe.findByIdAndDelete(req.params.recipeID).then(recipeDeleted => {
//     res.redirect("/");
//   });
// });

router.get("/collections", activate.checkActive, (req, res, next) => {

  User.findById(req.user._id)
  .populate("recipes")
  .then(foundUser=>{
    console.log(foundUser)
    res.render("profile/collections",{foundUser, host: process.env.LOCAL_URL})
  })
  
  // res.render("profile/collections", {
  //   message: req.flash("error"),
  //   user: req.user
  // });
});


module.exports = router;
