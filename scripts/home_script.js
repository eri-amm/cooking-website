//carousel card button navigation
document.addEventListener("DOMContentLoaded", () => {
  const viewRecipeButton = document.querySelector("#view-recipe-btn");

  viewRecipeButton.addEventListener("click", () => {
    window.location.href = "recipe.html";
  });
});