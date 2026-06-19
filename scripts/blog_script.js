document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-bar input");
  const articlesContainer = document.querySelector(".articles");
  const pageButtons = document.querySelectorAll(".pagination button[data-page]");

  const cards = [
    {
      img: "images/l1.png",
      alt: "Japanese food photo",
      title: "Crochet Projects for Noodle Lovers",
      href: "blogPost.html",
      caption:
        "Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim",
      author: "Wade Warren",
      date: "12 November 2021",
    },
    {
      img: "images/l2.png",
      alt: "Healthy food photo",
      title: "10 Vegetarian Recipes To Eat This Month",
      href: "blogPost.html",
      caption:
        "Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim",
      author: "Robert Fox",
      date: "12 November 2021",
    },
    {
      img: "images/l3.png",
      alt: "Chef photo",
      title: "Full Guide to Becoming a Professional Chef",
      href: "blogPost.html",
      caption:
        "Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim",
      author: "Dianne Russell",
      date: "12 November 2021",
    },
    {
      img: "images/l4.png",
      alt: "Vegetarian Lasagna photo",
      title: "Simple & Delicious Vegetarian Lasagna",
      href: "blogPost.html",
      caption:
        "Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim",
      author: "Leslie Alexander",
      date: "12 November 2021",
    },
    {
      img: "images/l5.png",
      alt: "Stew photo",
      title: "Plantain and Pinto Stew with Aji Verde",
      href: "blogPost.html",
      caption:
        "Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim",
      author: "Courtney Henry",
      date: "12 November 2021",
    },
    {
      img: "images/l6.png",
      alt: "Promotional photo",
      title: "We’re Hiring a Communications Assistant!",
      href: "blogPost.html",
      caption:
        "Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim",
      author: "Albert Flores",
      date: "12 November 2021",
    },
  ];

  function shuffleArray(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  const pageData = {
    1: cards,
    2: shuffleArray(cards),
    3: shuffleArray(cards),
  };

  let currentSearchValue = "";
  let currentPage = 1;

  function createArticle(card) {
    return `
      <article>
        <img src="${card.img}" alt="${card.alt}" class="thumbnail" />
        <div class="details">
          <div class="title">
            <h3 class="name">
              <a href="${card.href}">${card.title}</a>
            </h3>
            <p class="caption">${card.caption}</p>
          </div>
          <div class="profile">
            <div class="avatar"></div>
            <div class="publish">
              <p class="author">${card.author}</p>
              <p class="date">${card.date}</p>
            </div>
          </div>
        </div>
      </article>
    `;
  }
// search functionality
  function applySearchFilter() {
    const articles = articlesContainer.querySelectorAll("article");

    articles.forEach((article) => {
      const titleElement = article.querySelector(".name");
      const titleText = titleElement ? titleElement.textContent.toLowerCase() : "";

      if (titleText.includes(currentSearchValue)) {
        article.classList.remove("hidden");
      } else {
        article.classList.add("hidden");
      }
    });
  }

  function renderPage(pageNumber) {
    currentPage = pageNumber;
    const currentPageCards = pageData[pageNumber];

    articlesContainer.innerHTML = currentPageCards.map(createArticle).join("");

    pageButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.page === String(pageNumber));
    });

    applySearchFilter();
  }

  searchInput.addEventListener("input", () => {
    currentSearchValue = searchInput.value.toLowerCase().trim();
    applySearchFilter();
  });

  pageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderPage(Number(button.dataset.page));
    });
  });

  renderPage(1);
});