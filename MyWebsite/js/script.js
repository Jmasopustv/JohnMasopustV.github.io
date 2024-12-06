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
  const contactButton = document.querySelector(".navigate-contact-btn");

  if (contactButton) {
    contactButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior

      // Navigate to the contact page
      const contactSection = document.querySelector("[data-page='contact']");
      const allSections = document.querySelectorAll("[data-page]");

      // Remove 'active' class from all sections and add it to the contact page
      allSections.forEach((section) => section.classList.remove("active"));
      contactSection.classList.add("active");

      // Update the active state in the navigation bar
      const navLinks = document.querySelectorAll("[data-nav-link]");
      navLinks.forEach((link) => link.classList.remove("active"));
      const contactNavLink = Array.from(navLinks).find((link) =>
        link.textContent.trim().toLowerCase() === "contact"
      );
      if (contactNavLink) contactNavLink.classList.add("active");

      // Scroll to the top of the contact page
      window.scrollTo(0, 0);
    });
  }  
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

  /**
   * Contact Form Submission Logic
   */
  const form = document.querySelector("#data-form");
  const successMessage = document.querySelector(".success-message");

  if (form && successMessage) {
    // Ensure success message is hidden by default
    successMessage.style.display = "none";

    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent default form submission
      console.log("Submitting form..."); // Debugging form submission

      // Prevent duplicate submissions
      const submitButton = form.querySelector("button[type='submit']");
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = `<ion-icon name="paper-plane"></ion-icon> <span>Sending...</span>`;
      }

      // Collect form data
      const formData = new FormData(form);

      try {
        // Send data to Apps Script
        const response = await fetch("https://script.google.com/macros/s/AKfycbzgkw7r6-_y3wkr1jyT4AhDBfEVXzJmCttNBFey1fBsP6TAA5P53-D7sEfK-04_YhTu/exec", {
          method: "POST",
          body: new URLSearchParams(formData), // Send as URL-encoded data
        });

        const result = await response.json();

        if (result.status === "success") {
          console.log("Form submitted successfully!"); // Debugging success

          const successMessage = document.querySelector(".success-message");

          if (successMessage) {
            console.log("Success message element found:", successMessage);
          } else {
            console.error("Success message element NOT found. Check your HTML!");
          }

          // Show success message
          successMessage.classList.add("show");
          successMessage.textContent =
            "Your contact form was submitted! I will reach out to you based on the email you provided.";

          form.reset(); // Clear the form
        } else {
          console.error("Form submission failed:", result.message);
          alert("Failed to send the form. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
      } finally {
        // Re-enable the submit button
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = `<ion-icon name="paper-plane"></ion-icon> <span>Send Message</span>`;
        }
      }
    });
  } else {
    console.log("Contact form or success message not found.");
  }

  /**
   * GitHub Repositories Fetching Logic
   */
  const repositoriesList = document.querySelectorAll(".repositories-post-item");

  if (repositoriesList.length > 0) {
    // Replace 'your-username' with your actual GitHub username
    const githubUsername = "jmasopustv";
    const githubApiUrl = `https://api.github.com/users/${githubUsername}/repos`;

    fetch(githubApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`GitHub API Error: ${response.status}`);
        }
        return response.json();
      })
      .then((repos) => {
        repos.slice(0, repositoriesList.length).forEach((repo, index) => {
          const listItem = repositoriesList[index];

          const anchor = listItem.querySelector("a");
          const image = listItem.querySelector(".repositories-banner-box img");
          const title = listItem.querySelector(".repositories-item-title");
          const description = listItem.querySelector(".repositories-text");
          const metaTime = listItem.querySelector(".repositories-meta time");

          // Update content dynamically
          anchor.href = repo.html_url;
          image.alt = repo.name;
          title.textContent = repo.name;
          description.textContent = repo.description || "No description available.";
          metaTime.textContent = `Updated: ${new Date(repo.updated_at).toLocaleDateString()}`;
          metaTime.setAttribute("datetime", repo.updated_at);
        });
      })
      .catch((error) => {
        console.error("Error fetching GitHub repositories:", error);
      });
  } else {
    console.log("No repository items found in the DOM.");
  }
});
