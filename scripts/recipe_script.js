//recipe details GET

document.addEventListener("DOMContentLoaded", () => {
  fetchRecipeDetails();
});

async function fetchRecipeDetails() {
  const BASE_URL = "https://foodieland-oq9b.onrender.com";
  const ENDPOINT = "/api/recipe-details/1";

  const recipeSection = document.getElementById("recipe-content");

  const originalHTML = recipeSection.innerHTML;

  recipeSection.innerHTML = `
    <div style="text-align: center; width: 100%; padding: 80px 0;">
      <span class="loader" style="display: inline-block;"></span>
      <p style="margin-top: 15px; font-weight: 600; color: rgba(0,0,0,0.6);">
        Loading recipe details... (Server waking up, may take up to 60s)
      </p>
    </div>
  `;

  try {
    const response = await fetch(`${BASE_URL}${ENDPOINT}`);

    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    const recipeData = await response.json();
    console.log("SUCCESS! Here is the data from the API:", recipeData);

    recipeSection.innerHTML = originalHTML;

    populateRecipeUI(recipeData);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    recipeSection.innerHTML = `
      <div style="text-align: center; width: 100%; padding: 80px 0;">
        <h2 style="color: #e74c3c;">Oops! Something went wrong.</h2>
        <p style="color: #e74c3c; font-weight: bold;">We couldn't load the recipe details at this time. Please check your connection or try again later.</p>
      </div>
    `;
  }
}

function populateRecipeUI(data) {
  document.querySelector(".recipe h1").textContent = data.title;
  const mainImageElement = document.querySelector(".mid img");
  if (mainImageElement) {
    mainImageElement.src = data.mainImage;
  }

  document.querySelector(".recipe .author").textContent = data.author.name;
  document.querySelector(".recipe .date").textContent = data.author.date;
  const avatarElement = document.querySelector(".credit .profile .avatar");

  if (avatarElement) {
    avatarElement.style.backgroundImage = `url('${data.author.image}')`;
  }

  document.querySelector(".recipe .prep .duration").textContent = data.prepTime;
  document.querySelector(".recipe .cook .duration").textContent = data.cookTime;

  document.querySelector(".recipe .head .type p").textContent = data.category;

  const nutritionValues = document.querySelectorAll(
    ".recipe .nutrition .value",
  );
  if (data.nutrition && nutritionValues.length >= 5) {
    nutritionValues[0].textContent = data.nutrition.calories;
    nutritionValues[1].textContent = data.nutrition.totalFat;
    nutritionValues[2].textContent = data.nutrition.protein;
    nutritionValues[3].textContent = data.nutrition.carbohydrate;
    nutritionValues[4].textContent = data.nutrition.cholesterol;
  }

  const descriptionElement = document.querySelector(".recipe .foot p");
  if (descriptionElement) {
    descriptionElement.textContent =
      data.description || "Description not available.";
  }
}
