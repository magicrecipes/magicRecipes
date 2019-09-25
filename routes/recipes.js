require("dotenv").config();
const express = require("express");
const router = express.Router();
const recipesRoutes = require("./routes/recipes");
app.use("/recipes", recipesRoutes);
const recipeApi = new SpoonApi("https://api.spoonacular.com/recipes");

router.get("/:id", (req, res) => {
  let recipeID = req.params.id;
  recipeApi
    .getRecipeInfo(recipeID)
    .then(recipeInfo => {
      res.render("/views/auth/view-recipe", { recipeInfo });
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
