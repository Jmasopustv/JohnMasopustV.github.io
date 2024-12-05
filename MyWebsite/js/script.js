'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}
document.addEventListener("DOMContentLoaded", () => {
  /**
   * Page Navigation Logic
   */
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  // Add event listener to all navigation links
  navigationLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const targetPage = this.textContent.trim().toLowerCase(); // Get button text and normalize

      console.log(`Navigating to: ${targetPage}`); // Debugging navigation

      // Toggle active page
      pages.forEach((page) => {
        if (page.dataset.page === targetPage) {
          page.classList.add("active");
        } else {
          page.classList.remove("active");
        }
      });

      // Toggle active navigation link
      navigationLinks.forEach((navLink) => navLink.classList.remove("active"));
      this.classList.add("active");

      // Scroll to the top of the page
      window.scrollTo(0, 0);
    });
  });

  /**
   * Handle Navigation from URL Hash on Page Load
   */
  const fragment = window.location.hash.slice(1); // Remove '#' from the hash

  if (fragment) {
    console.log(`Loading fragment: ${fragment}`); // Debugging hash loading
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].dataset.page === fragment) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  }

  console.log("Navigation initialized!");
});

/**
 * EmailJS Logic
 */
(function () {
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  // Safely check if the form exists
  if (form) {
    // Debugging: Log form initialization
    console.log("Form found. Initializing EmailJS...");

    // Initialize EmailJS with your User ID
    emailjs.init("4vTTUUnGvsKbVMIRX"); // Replace with your EmailJS public key

    // Enable/Disable submit button based on form validation
    formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        console.log("Checking form validity..."); // Debug validation state

        if (form.checkValidity()) {
          console.log("Form is valid! Enabling submit button.");
          formBtn.removeAttribute("disabled");
        } else {
          console.log("Form is invalid. Disabling submit button.");
          formBtn.setAttribute("disabled", "");
        }
      });
    });

    // Handle form submission
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent default form submission

      console.log("Form submitted! Sending email..."); // Debugging submission

      // Update button state to show "Sending..."
      formBtn.setAttribute("disabled", "");
      formBtn.innerHTML = `<ion-icon name="paper-plane"></ion-icon> <span>Sending...</span>`;

      emailjs
        .sendForm("service_2o9al6l", "template_ilj67fg", form)
        .then(
          () => {
            console.log("Email sent successfully!"); // Debug success
            form.reset();
            formBtn.innerHTML = `<ion-icon name="paper-plane"></ion-icon> <span>Send Message</span>`;
            alert("Your message has been sent successfully!");
          },
          (error) => {
            console.error("EmailJS Error:", error); // Debug failure
            formBtn.innerHTML = `<ion-icon name="paper-plane"></ion-icon> <span>Send Message</span>`;
            formBtn.removeAttribute("disabled");
            alert("Oops! Something went wrong. Please try again.");
          }
        );
    });

    console.log("EmailJS initialized!");
  } else {
    console.log("No form found. Skipping EmailJS initialization.");
  }
})();
