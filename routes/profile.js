require("dotenv").config();
const express = require("express");
const router = express.Router();
const activate = require(`../middlewares/activeMid`);
const User = require("../models/User")
const Recipe = require("../models/Recipe");

router.get("/userProfile", activate.checkActive, (req, res, next) => {
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

router.get("/userCollections", activate.checkActive, (req, res, next) => {
  User.findByIdAndUpdate((req.user._id)).populate("recipes").then (user=>{
    console.log(user.recipes)
    res.render("profile/userCollections", {
      message: req.flash("error"),
      recipes: req.user.recipes
    })
  })
});
module.exports = router;
