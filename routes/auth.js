require("dotenv").config();
const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const activate = require(`../middlewares/activeMid`);

// NodeMailer import
const transporter = require("../configs/nodemailer.config");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.get("/userProfile", activate.checkActive, (req, res, next) => {
  res.render("profile/userProfile", { message: req.flash("error") });
});

router.get("/usersearchRecipes", activate.checkActive, (req, res, next) => {
  res.render("profile/userSearchRecipes", { message: req.flash("error") });
});

router.get("/checkMail", (req, res, next) => {
  res.render("auth/checkMail", { message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile/userProfile",
    failureRedirect: "/auth/signup",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let token = "";
    for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length)];
    }

    const newUser = new User({
      username,
      password: hashPass,
      confirmationCode: token,
      email
    });

    newUser
      .save()
      .then(() => {
        transporter
          .sendMail({
            from: `"My magicRecipe 👻" <${process.env.GMAIL_USERNAME}>`,
            to: email,
            subject: "confirmation email",
            text: "confirm",
            html: `<a href="https://magicrecipes.herokuapp.com/auth/confirm/${token}">please confirm</a>`
          })
          .then()
          .catch(error => console.log(error));
        res.redirect("/auth/login");
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      });
  });
});

// router.get("/recipe/:borja", (req, res) => {
//   let recipeID = req.params.bora

//   axios.get("https://www.spoonful.com/recipes/" + recipeID + "/analyzendInstruction").then(recipe => {
//     steps = ["a", "b", "c"]

//     res.render("view-recipe.hbs", recipe)
//   })
// })

router.get("/confirm/:token", (req, res) => {
  User.findOneAndUpdate(
    { confirmationCode: req.params.token },
    { $set: { active: true } },
    { new: true }
  )
    .then(user => {
      res.render("auth/login", { user });
    })
    .catch(() => {
      console.log("there was an error of authentication");
    });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/profile/userProfile",
    failureRedirect: "/auth/signup"
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
