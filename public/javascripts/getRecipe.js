const recipeApi = new SpoonApi("https://api.spoonacular.com/recipes");

document.getElementById("btn-searchRecipes").addEventListener("click", e => {
  e.preventDefault();
  let ingredient1 = document.querySelector("#ingredient-1").value;
  let ingredient2 = document.querySelector("#ingredient-2").value;
  let ingredient3 = document.querySelector("#ingredient-3").value;

  recipeApi
    .getRecipe(ingredient1, ingredient2, ingredient3)
    .then(allRecipes => {
      allRecipes.data.forEach(element => {
        const ul = document.getElementById("found-recipes");
        let elRecipe = document.createElement("a");
        elRecipe.appendChild(document.createTextNode(element.title));
        elRecipe.href = `/auth/recipe/${element.id}`;
        ul.appendChild(elRecipe);
        elRecipe = document.createElement("img");
        elRecipe.src = element.image;
        //  li.id="element.id"
        ul.appendChild(elRecipe);
      });
    });
});
// recipeApi.getPrice()
