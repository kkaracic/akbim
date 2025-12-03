const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !isExpanded);
  if (mobileMenu.hasAttribute('hidden')) {
    mobileMenu.removeAttribute('hidden');
  } else {
    mobileMenu.setAttribute('hidden', '');
  }
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('open');
  });
  
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });

  document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const setActiveLink = () => {
    let scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").includes(`#${sectionId}`)) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", setActiveLink);
});

  document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("header[id], section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  function setActiveLink() {
    const scrollY = window.scrollY;
    let activeId = "home"; // default section at top

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150; // adjust based on navbar height
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        activeId = section.id;
      }
    });

    navLinks.forEach(link => {
      const targetId = link.getAttribute("href").substring(1);
      link.classList.toggle("active", targetId === activeId);
    });
  }

  // Run on scroll and on page load
  window.addEventListener("scroll", setActiveLink);
  setActiveLink();
});
document.addEventListener("click", function (e) {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  // Ako je meni otvoren i klikne se nešto što NIJE meni ni hamburger → zatvori
  if (mobileMenu.classList.contains("open")) {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      mobileMenu.classList.remove("open");
    }
  }
});

  
  AOS.init();

