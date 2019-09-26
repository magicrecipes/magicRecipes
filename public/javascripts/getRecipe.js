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
        const div = document.getElementById("found-recipes");
        const cardRecipe = document.createElement("div",);
        let elRecipe = document.createElement("a");
        cardRecipe.setAttribute("class" ,"card-recipes");
        elRecipe.appendChild(document.createTextNode(element.title));
        elRecipe.href = `/recipes/${element.id}`;
        cardRecipe.appendChild(elRecipe);
        elRecipe = document.createElement("img");
        elRecipe.src = element.image;
        elRecipe.alt = "element.title";
        cardRecipe.appendChild(elRecipe);
        div.appendChild(cardRecipe);
      });
    });
});
// recipeApi.getPrice()
