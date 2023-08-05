let isHeaderVisible = true;
const header = document.getElementById("header");
const headerHeight = header.offsetHeight;
let prevScrollPos = 0;

// Function to show or hide the header
function toggleHeader() {
  if (window.pageYOffset === 0) return; // Check if the header is at the top (position fixed) and do nothing

  if (isHeaderVisible) {
    // Header is visible, hide it
    header.style.top = `-${headerHeight}px`;
  } else {
    // Header is hidden, show it
    header.style.top = "0";
  }

  isHeaderVisible = !isHeaderVisible;
}

// Event listener to toggle header visibility on scroll
window.addEventListener("scroll", function () {
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
});

// Event listener to show or hide the header on click anywhere on the page
document.addEventListener("click", function (event) {
  const clickedElement = event.target;

  // Check if the clicked element is inside the header
  if (!header.contains(clickedElement)) {
    // Check if the clicked element is the buy or send button
    if ( clickedElement.id !== "buy-regular"
      && clickedElement.id !== "buy-vip"
      && clickedElement.id !== "submitBtn"
      && clickedElement.id !== "name"
      && clickedElement.id !== "email"
      && clickedElement.id !== "message") {
      // Clicked element is not inside the header or the buttons, toggle header visibility
      toggleHeader();
    }
  }

  // Prevent the event from bubbling up to the window level
  event.stopPropagation();
});

// Function to handle smooth scroll to the home section
function scrollToHome() {
  const homeSection = document.getElementById("home");
  const headerOffset = headerHeight + 17; // Adjust this value according to your header height
  const elementPosition = homeSection.getBoundingClientRect().top;
  const offsetPosition = elementPosition - headerOffset;

  window.scrollBy({
    top: offsetPosition,
    behavior: "smooth"
  });
}

// Event listener for the "Home" link
const homeLink = document.querySelector('a[href="#home"]');
homeLink.addEventListener("click", function (e) {
  e.preventDefault();
  scrollToHome();
});

// Formsprree Contact Form Submission
var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Thanks for your submission!";
      form.reset();
      resetContactForm();
      setTimeout(resetStatusMessage, 3000);
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = "Oops! There was a problem submitting your form";
        }
      });
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form";
  });
}

form.addEventListener("submit", handleSubmit);

// Fungsi untuk mereset input form kontak
function resetContactForm() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  nameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
}

// Fungsi untuk mengganti innerHTML pesan status menjadi kosong setelah beberapa detik
function resetStatusMessage() {
  const status = document.getElementById("my-form-status");
  status.innerHTML = "";
}