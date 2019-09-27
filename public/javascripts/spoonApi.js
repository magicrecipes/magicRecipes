class SpoonApi {
  constructor(url) {
    this.url = url;
  }

  getRecipe(ingredient1, ingredient2, ingredient3) {
    return axios.get(
      `${this.url}/findByIngredients?ingredients=${ingredient1},+${ingredient2},+${ingredient3}&apiKey=ea9e5ea9d54042648047af34568a755a`
    );
  }
  getPrice(recipeId) {
    return axios.get(`${this.url}/${recipeId}priceBreakdownWidget.json`);
  }

  getRecipeInfo(recipeId) {
    return axios.get(
      `${this.url}/${recipeId}/information?apiKey=ea9e5ea9d54042648047af34568a755a`
    );
  }
}
