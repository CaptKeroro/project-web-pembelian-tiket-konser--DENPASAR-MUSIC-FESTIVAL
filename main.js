let isHeaderVisible = true;
const header = document.getElementById("header");
const headerHeight = header.offsetHeight;
let prevScrollPos = 0;

// Function to show or hide the header
function toggleHeader() {
  // Check if the header is at the top (position fixed) and do nothing
  if (window.pageYOffset === 0) return;

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
    if (clickedElement.id !== "buy" && clickedElement.id !== "send"
      && clickedElement.id !== "name" && clickedElement.id !== "email"
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

// Event listener for the contact form submission
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Kirim data ke server menggunakan metode AJAX
  fetch("/submit_form.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      // Tanggapan dari server
      console.log(data.message);
      // Tambahkan kode untuk menampilkan pesan sukses atau melakukan tindakan lain yang sesuai
    })
    .catch(error => {
      // Tambahkan kode untuk menampilkan pesan kesalahan jika terjadi masalah saat mengirim data
      console.error("Error:", error);
    });
});
