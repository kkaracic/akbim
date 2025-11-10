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

// Modal functionality
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('caption');
const openButtons = document.querySelectorAll('.view-details');
const closeButtons = document.querySelectorAll('.close');

openButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const projectId = btn.dataset.project;
    const modal = document.getElementById(`modal-${projectId}`);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // disable background scroll
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal').classList.remove('show');
    document.body.style.overflow = ''; // re-enable scroll
  });
});

window.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('show');
    document.body.style.overflow = '';
  }
});


document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    modal.style.display = 'block';
    modalImg.src = img.src;
    captionText.textContent = img.alt;
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

