const recipeApi = new SpoonApi(
  "https://api.spoonacular.com/recipes"

);

document.getElementById("search").addEventListener("click", e => {
  e.preventDefault()
  let ingredient1 = document.querySelector("#ingredient_1").value;
  let ingredient2 = document.querySelector("#ingredient-2").value;
  let ingredient3 = document.querySelector("#ingredient-3").value;
  recipeApi.getRecipe(ingredient1,ingredient2,ingredient3).then((allRecipes)=>

  document.querySelector("#vamos").innerHTML= allRecipes.data[0].title
  )
});
// recipeApi.getPrice()

