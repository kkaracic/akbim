document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".view-details");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-project");
      document.getElementById(`modal-${id}`).style.display = "block";
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").style.display = "none";
    });
  });

  window.addEventListener("click", e => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });

  AOS.init(); // AOS animations
});
