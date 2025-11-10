const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // spriječi reload stranice
  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      status.textContent = "✅ Your message has been sent!";
      status.style.color = "#f39c12"; // žuta boja
      form.reset();

      // sakrij poruku nakon 5 sekundi
      setTimeout(() => {
        status.textContent = "";
      }, 5000);

    } else {
      status.textContent = "❌ Oops! Something went wrong.";
      status.style.color = "red";
    }
  } catch (error) {
    status.textContent = "❌ Network error, try again later.";
    status.style.color = "red";
  }
});
