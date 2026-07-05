//carousel card button navigation
document.addEventListener("DOMContentLoaded", () => {
  const viewRecipeButton = document.querySelector("#view-recipe-btn");

  viewRecipeButton.addEventListener("click", () => {
    window.location.href = "recipe.html";
  });
});

// category GET
document.addEventListener('DOMContentLoaded', () => {
  fetchCategories();
});

async function fetchCategories() {
  const container = document.getElementById('category-list');

  container.innerHTML = `
    <div style="text-align: center; width: 100%; padding: 40px 0;">
      <span class="loader" style="display: inline-block;"></span>
      <p style="margin-top: 15px; font-weight: 600; color: rgba(0,0,0,0.6);">
        Loading categories... (Server waking up, may take up to 60s)
      </p>
    </div>
  `;

  try {
    const response = await fetch('https://foodieland-oq9b.onrender.com/api/categories');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const categories = await response.json();

    container.innerHTML = '';

    categories.forEach(category => {
      const linkItem = document.createElement('a');
      linkItem.href = `${category.name.toLowerCase()}_menu.html`;

      linkItem.classList.add('category-item');

      const img = document.createElement('img');
      img.src = category.image;
      img.alt = category.name;

      const span = document.createElement('span');
      span.textContent = category.name;

      linkItem.appendChild(img);
      linkItem.appendChild(span);

      container.appendChild(linkItem);
    });

  } catch (error) {
    console.error('Failed to fetch categories:', error);
    container.innerHTML = `
      <p style="color: #e74c3c; text-align: center; width: 100%; font-weight: bold;">
        Failed to load categories. Please try refreshing the page.
      </p>
    `;
  }
}