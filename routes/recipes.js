require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:id", (req, res) => {
  let recipeID = req.params.id;
  axios.get(`https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${process.env.SPOON_KEY}`)
    
    .then(recipeInfo => {
      
      let recipeDetail=recipeInfo.data
      res.render("profile/userViewRecipe", { recipeDetail });
    })
    .catch(error => console.log(error));
});
router.get("/price/:id", (req,res)=>{
  let recipeID=req.params.id;
  axios.get(`https://api.spoonacular.com/recipes/${recipeID}/priceBreakdownWidget.json?apiKey=${process.env.SPOON_KEY}`)
}

)

module.exports = router;
