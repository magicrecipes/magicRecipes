class SpoonApi {
  constructor(url) {
    this.url = url;
  }

  getRecipe(ingredient1, ingredient2, ingredient3) {
    return axios.get(
      `${this.url}/findByIngredients?ingredients=${ingredient1},+${ingredient2},+${ingredient3}&apiKey=cc6d41a5219b4fcfbb7f408d71cd3a3c`
    );
  }
  getPrice(recipeId) {
    return axios.get(`${this.url}/${recipeId}priceBreakdownWidget.json`);
  }
}
