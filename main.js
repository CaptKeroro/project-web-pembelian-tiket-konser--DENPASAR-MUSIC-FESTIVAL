let prevScrollPos = window.pageYOffset;

function toggleHeaderVisibility() {
  const currentScrollPos = window.pageYOffset;
  const header = document.querySelector("header");
  const headerHeight = header.offsetHeight;

  if (prevScrollPos > currentScrollPos) {
    // Scroll up
    header.style.top = "0";
  } else {
    // Scroll down
    header.style.top = `-${headerHeight}px`;
  }

  prevScrollPos = currentScrollPos;
}

// Event listener to toggle header visibility on scroll
window.addEventListener("scroll", toggleHeaderVisibility);

// Function to show the header
function showHeader() {
  document.querySelector("header").style.top = "0";
}

// Event listener to show the header on click
document.querySelector("body").addEventListener("click", showHeader);