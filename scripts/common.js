// header & footer navigation
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const page = link.dataset.page;
    window.location.href = page;
  });
});

// article click
const articles = document.querySelectorAll("article");

articles.forEach((article) => {
  if (article.closest(".container.content.articles")) return;

  article.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "recipe.html";
  });
});