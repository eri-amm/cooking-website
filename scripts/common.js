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

// drop down
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
});

// email POST
document.addEventListener("DOMContentLoaded", function () {
  const newsletterForm = document.querySelector(".newsletter form");
  const newsletter = document.querySelector(".newsletter");
  const emailInput = newsletterForm.querySelector("input[type='email']");
  const submitBtn = newsletterForm.querySelector("button[type='submit']");

  const statusMsg = document.createElement("div");
  statusMsg.style.marginTop = "15px";
  statusMsg.style.fontWeight = "bold";
  statusMsg.style.textAlign = "center";
  newsletter.appendChild(statusMsg);

  newsletterForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    statusMsg.textContent = "";
    statusMsg.style.color = "";

    const emailValue = emailInput.value.trim();

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="loader" style="display: inline-block; width: 14px; height: 14px; border-width: 3px;"></span> Please wait... (Up to 60s)`;

    try {
      const response = await fetch(
        "https://foodieland-oq9b.onrender.com/api/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emailValue }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Invalid email or server error.");
      }

      statusMsg.textContent = "You have successfully subscribed!";
      statusMsg.style.color = "#2ecc71";
      newsletterForm.reset();
    } catch (error) {
      console.error("Newsletter Subscription Error:", error);
      statusMsg.textContent = "Error: " + error.message;
      statusMsg.style.color = "#e74c3c";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Subscribe";
    }
  });
});
