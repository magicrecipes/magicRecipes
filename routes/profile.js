require("dotenv").config();
const express = require("express");
const router = express.Router();
const activate = require(`../middlewares/activeMid`);

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

module.exports = router;
