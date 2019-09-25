require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const activate = require(`../middlewares/activeMid`);

router.get("/userProfile", activate.checkActive, (req, res, next) => {
  res.render("profile/userProfile", { message: req.flash("error") });
});

router.get("/usersearchRecipes", activate.checkActive, (req, res, next) => {
  res.render("profile/userSearchRecipes", { message: req.flash("error") });
});