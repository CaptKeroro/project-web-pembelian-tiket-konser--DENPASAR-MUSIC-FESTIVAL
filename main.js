const esmScript = document.createElement('script');
esmScript.type = 'module';
esmScript.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
document.body.appendChild(esmScript);

const nomoduleScript = document.createElement('script');
nomoduleScript.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
document.body.appendChild(nomoduleScript);

let prevScrollPos = window.pageYOffset;
const header = document.querySelector("header");
const headerHeight = header.offsetHeight;

function toggleHeaderVisibility() {
  const currentScrollPos = window.pageYOffset;
  const scrollUp = prevScrollPos > currentScrollPos;

  if (scrollUp) {
    // Scroll up, show the header
    header.style.top = "0";
  } else {
    // Scroll down, hide the header
    header.style.top = `-${headerHeight}px`;
  }

  prevScrollPos = currentScrollPos;
}

// Event listener to toggle header visibility on scroll
window.addEventListener("scroll", toggleHeaderVisibility);


// Function to show or hide the header
function toggleHeader() {
  if (isHeaderVisible) {
    // Header is visible, hide it
    document.querySelector("header").style.top = `-${headerHeight}px`;
  } else {
    // Header is hidden, show it
    document.querySelector("header").style.top = "0";
  }

  isHeaderVisible = !isHeaderVisible;
}

// Event listener to show or hide the header on click anywhere on the page
document.addEventListener("click", function (event) {
  const clickedElement = event.target;
  const header = document.querySelector("header");

  if (!header.contains(clickedElement)) {
    // Clicked element is not inside the header, toggle header visibility
    toggleHeader();
  }
});

// Internal navigation - smooth scroll to target with compensating for header height
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    const headerOffset = headerHeight + 17; // Adjust this value according to your header height
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: "smooth"
    });
  });
});
