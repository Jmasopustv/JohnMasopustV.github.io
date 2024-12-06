# Personal Portfolio Website

This repository contains the source code for my personal portfolio website. It showcases my skills, experience, projects, and GitHub repositories. The website includes a contact form for communication and features dynamic content updates via JavaScript.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Setup](#setup)
- [Functionality](#functionality)
- [Customization](#customization)
- [License](#license)
- [Contact](#contact)

---

## Features

- **Responsive Design:** Fully functional on both desktop and mobile devices.
- **Dynamic Navigation:** Seamless navigation between pages.
- **GitHub Integration:** Automatically fetch and display repositories.
- **Contact Form:** Submit messages directly via email.
- **Project Showcase:** Filter projects by category.
- **Customizable Content:** Easily update skills, experience, and projects.

---

## Technologies Used

- **HTML5**: Structure of the website.
- **CSS3**: Styling and layout.
- **JavaScript (ES6+):** Functionality and interactivity.
- **EmailJS:** Contact form email handling.
- **Google Fonts:** Typography.
- **Ionicons:** Icons for UI enhancement.
- **GitHub API:** Fetching repository data dynamically.

---

## File Structure

```plaintext
root/
│
├── MyWebsite/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── images/
│   │   └── *                  # Static images for the website
│   ├── files/
│   │   └── REClogo.pdf        # Resume for download
│   ├── js/
│   │   └── script.js          # JavaScript for functionality
│   └── *                      # Other assets
│
├── index.html                 # Main HTML file
└── README.md                  # Documentation

## Functionality

### Sidebar Navigation
- A responsive sidebar toggles visibility on mobile devices.
- The `data-sidebar` attribute controls the sidebar functionality via JavaScript.

### Dynamic Project Filtering
- Projects can be filtered by category (e.g., Web Design, Database Projects).
- Uses `data-filter-btn` and `data-filter-item` attributes for seamless filtering.

### GitHub Repository Integration
- Dynamically fetches and displays your latest GitHub repositories.
- Updates repository title, description, and last updated date.

### Contact Form
- Is linked to an appscript webhook to provide a simple and FREE way to automate emails/form submissions.
- Displays a success message upon submission.

### Page Navigation
- Smooth transitions between pages like About, Resume, Projects, Repositories, and Contact.
- URL hash updates reflect the current page.

---

## Customization

### Update Personal Information
- Modify personal details in the `sidebar-info` section of `index.html`.
- Update the `about` section with your biography and achievements.

### Add Projects
- Add new `<li>` elements in the `projects` section of `index.html`.
- Use `data-category` attributes to categorize projects for filtering.

### Update GitHub Integration
- Replace the `githubUsername` in `script.js` with your GitHub username:
  ```javascript
  const githubUsername = "your-github-username";

## License

This project is licensed under the **MIT License**. Feel free to use and modify the code.

---

## Contact

**John Masopust V**  
- **Position**: IT Manager, Riverside Education Center  
- **Email**: [jjmasopust@gmail.com](mailto:jjmasopust@gmail.com)  
- **Phone**: +1 (719) 551-8096  
- **Location**: Grand Junction, Colorado, USA
