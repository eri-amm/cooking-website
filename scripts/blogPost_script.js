// carousel control logics
document.addEventListener("DOMContentLoaded", () => {
  const recipesGrid = document.querySelector(".recipes-grid");
  const prevButton = document.getElementById("daily-prev");
  const nextButton = document.getElementById("daily-next");

  const cards = [
    {
      img: "images/d1.png",
      alt: "Healthy food photo",
      title: "Mixed Tropical Fruit Salad with Superfood Boosts",
      time: "30 Minutes",
      type: "Healthy",
      liked: true,
    },
    {
      img: "images/d2.png",
      alt: "Steak photo",
      title: "Big and Juicy Wagyu Beef Cheeseburger",
      time: "30 Minutes",
      type: "Western",
      liked: false,
    },
    {
      img: "images/d3.png",
      alt: "Healthy food photo",
      title: "Healthy Japanese Fried Rice with Asparagus",
      time: "30 Minutes",
      type: "Healthy",
      liked: true,
    },
    {
      img: "images/d4.png",
      alt: "Eastern food photo",
      title: "Cauliflower Walnut Vegetarian Taco Meat",
      time: "30 Minutes",
      type: "Eastern",
      liked: false,
    },
  ];

  let currentIndex = 0;

  function createCard(card) {
    return `
      <article>
        <a href="recipe.html">
          <div class="visual">
            <button class="btn-like" type="button" aria-label="Like recipe">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="24" cy="24" r="24" fill="white" />
                <path
                  d="M28.5022 15C27.6291 14.9985 26.7677 15.2008 25.9865 15.5907C25.2052 15.9807 24.5258 16.5475 24.0022 17.2462C23.293 16.3027 22.3051 15.606 21.1782 15.2548C20.0513 14.9036 18.8426 14.9157 17.7229 15.2894C16.6033 15.663 15.6295 16.3793 14.9393 17.3368C14.2492 18.2943 13.8776 19.4447 13.8772 20.625C13.8772 27.3621 23.2373 32.6813 23.6357 32.9044C23.7477 32.9671 23.8739 33 24.0022 33C24.1305 33 24.2567 32.9671 24.3687 32.9044C26.0902 31.8961 27.7059 30.7173 29.1914 29.3856C32.4665 26.438 34.1272 23.4905 34.1272 20.625C34.1255 19.1337 33.5323 17.7039 32.4778 16.6494C31.4233 15.5949 29.9935 15.0017 28.5022 15Z"
                  fill="${card.liked ? "#FF6363" : "#DBE2E5"}"
                />
              </svg>
            </button>
            <img src="${card.img}" alt="${card.alt}" />
          </div>
          <div class="title">
            <p>${card.title}</p>
            <div class="info">
              <div class="time">
                <img src="images/timer.svg" alt="" />
                <p>${card.time}</p>
              </div>
              <div class="type">
                <img src="images/forkknife.svg" alt="" />
                <p>${card.type}</p>
              </div>
            </div>
          </div>
        </a>
      </article>
    `;
  }

  function renderCards() {
    const visibleCards = [
      ...cards.slice(currentIndex),
      ...cards.slice(0, currentIndex),
    ];

    recipesGrid.innerHTML = visibleCards.map(createCard).join("");

    const articleLinks = recipesGrid.querySelectorAll("article a");

    articleLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();

        window.location.href = "recipe.html";
      });
    });
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % cards.length;
    renderCards();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    renderCards();
  }

  nextButton.addEventListener("click", showNext);
  prevButton.addEventListener("click", showPrev);

  renderCards();
});
