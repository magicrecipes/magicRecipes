class SpoonApi {
  constructor(url) {
    this.url = url;
  }

  getRecipe(ingredient1, ingredient2, ingredient3) {
    return axios.get(
      `${this.url}/findByIngredients?ingredients=${ingredient1},+${ingredient2},+${ingredient3}&apiKey=2419140a04c640f0bb96498eb6ad9124`
    );
  }
  getPrice(recipeId) {
    return axios.get(`${this.url}/${recipeId}priceBreakdownWidget.json`);
  }

  getRecipeInfo(recipeId) {
    return axios.get(
      `${this.url}/${recipeId}/information?apiKey=2419140a04c640f0bb96498eb6ad9124`
    );
  }
}
