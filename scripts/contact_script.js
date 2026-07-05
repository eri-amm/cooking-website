// form POST
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".user-info");
  const submitButton = form.querySelector("button[type='submit']");

  const statusContainer = document.createElement("div");
  statusContainer.id = "form-status";
  form.insertBefore(statusContainer, submitButton);

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    statusContainer.innerHTML = "";
    statusContainer.className = "";

    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      enquiryType: formData.get("enquiry_type"),
      message: formData.get("message"),
    };

    submitButton.disabled = true;
    submitButton.innerHTML = `<span class="loader" style="display: inline-block;"></span> Sending... (May take up to 60s)`;

    try {
      const response = await fetch(
        "https://foodieland-oq9b.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.message ||
          "Something went wrong. Please check your inputs and try again.";
        throw new Error(errorMessage);
      }

      statusContainer.textContent = "Your message has been sent successfully!";
      statusContainer.classList.add("success-msg");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      statusContainer.textContent = "Error: " + error.message;
      statusContainer.classList.add("error-msg");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Submit";
    }
  });
});
