// Variable to track the current slide index
let index = 0;
const images = document.querySelectorAll(".carousel img");
const text = document.getElementById("carousel-text");

const descriptions = [
  "Welcome to the future of digital awareness.",
  "Join us in creating a positive impact.",
  "Empowering students for a brighter future."
];

function showNextSlide() {
  images[index].classList.remove("active");
  index = (index + 1) % images.length;
  images[index].classList.add("active");

  // Trigger text fade-out and fade-in
  text.classList.remove("fade");
  void text.offsetWidth; // Trigger a reflow to reset the animation
  text.classList.add("fade");

  text.textContent = descriptions[index];
}

function showPrevSlide() {
  images[index].classList.remove("active");
  index = (index - 1 + images.length) % images.length;
  images[index].classList.add("active");

  // Trigger text fade-out and fade-in
  text.classList.remove("fade");
  void text.offsetWidth; // Trigger a reflow to reset the animation
  text.classList.add("fade");

  text.textContent = descriptions[index];
}

const cursor = document.getElementById("cursor");

function moveCursor(tab) {
  const rect = tab.getBoundingClientRect();
  const containerRect = document.querySelector(".nav-links").getBoundingClientRect();
  cursor.style.width = `${rect.width}px`;
  cursor.style.height = `${rect.height}px`;
  cursor.style.top = `${rect.top - containerRect.top}px`;
  cursor.style.left = `${rect.left - containerRect.left}px`;
  cursor.style.opacity = "1";
}

function hideCursor() {
  cursor.style.opacity = "0";
}

// Scroll functionality to hide and show navbar
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTop) {
    // Scrolling down
    navbar.style.top = "-100px"; // Hide the navbar
  } else {
    // Scrolling up
    navbar.style.top = "0"; // Show the navbar
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll
});

// Function to toggle the mobile menu
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('active'); // Toggle the 'active' class to show/hide the menu
}
