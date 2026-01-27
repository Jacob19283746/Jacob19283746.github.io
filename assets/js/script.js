'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



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



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// check if form exists before adding event listeners
if (form && formInputs.length > 0 && formBtn) {
  // add event to all form input field
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }

    });
  }

  // handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // get form data
    const formData = new FormData(form);
    
    // disable button and show sending status
    formBtn.setAttribute("disabled", "");
    formBtn.querySelector("span").textContent = "Sending...";

    // send form data
    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert("Message sent successfully! Thank you for contacting me.");
        form.reset();
        formBtn.querySelector("span").textContent = "Send Message";
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error sending message. Please try again or contact me directly via email.");
      formBtn.removeAttribute("disabled");
      formBtn.querySelector("span").textContent = "Send Message";
    });
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// project modal variables
const projectItems = document.querySelectorAll("[data-project-item]");
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectCloseBtn = document.querySelector("[data-project-close-btn]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalCategory = document.querySelector("[data-project-modal-category]");
const projectModalDescription = document.querySelector("[data-project-modal-description]");
const projectModalTechnologies = document.querySelector("[data-project-modal-technologies]");
const screenshotTabs = document.querySelector("[data-screenshot-tabs]");
const screenshotContent = document.querySelector("[data-screenshot-content]");

// project modal toggle function
const projectModalFunc = function () {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
  document.body.style.overflow = projectModalContainer.classList.contains("active") ? "hidden" : "";
}

// function to switch screenshot tab
const switchScreenshotTab = function (index, screenshots) {
  // Remove active class from all tabs
  const tabs = screenshotTabs.querySelectorAll(".screenshot-tab");
  tabs.forEach(tab => tab.classList.remove("active"));
  
  // Add active class to clicked tab
  if (tabs[index]) {
    tabs[index].classList.add("active");
  }
  
  // Update screenshot content
  if (screenshots[index]) {
    screenshotContent.innerHTML = `
      <img src="${screenshots[index].path}" alt="${screenshots[index].name}" class="screenshot-image">
    `;
  }
}

// add click event to all project items
for (let i = 0; i < projectItems.length; i++) {
  
  projectItems[i].addEventListener("click", function (e) {
    e.preventDefault();
    
    // Get project data from data attributes
    const projectName = this.getAttribute("data-project-name");
    const projectCategory = this.getAttribute("data-project-category");
    const projectDescription = this.getAttribute("data-project-description");
    const projectTechnologies = JSON.parse(this.getAttribute("data-project-technologies") || "[]");
    const projectScreenshots = JSON.parse(this.getAttribute("data-project-screenshots") || "[]");
    
    // Set modal content
    projectModalTitle.textContent = projectName;
    projectModalCategory.textContent = projectCategory;
    projectModalDescription.textContent = projectDescription;
    
    // Set technologies
    projectModalTechnologies.innerHTML = "";
    projectTechnologies.forEach(tech => {
      const li = document.createElement("li");
      li.className = "technology-item";
      li.textContent = tech;
      projectModalTechnologies.appendChild(li);
    });
    
    // Set screenshots tabs
    screenshotTabs.innerHTML = "";
    screenshotContent.innerHTML = "";
    
    if (projectScreenshots.length > 0) {
      projectScreenshots.forEach((screenshot, index) => {
        // Create tab button
        const tab = document.createElement("li");
        tab.className = "screenshot-tab" + (index === 0 ? " active" : "");
        tab.textContent = screenshot.name;
        tab.addEventListener("click", function() {
          switchScreenshotTab(index, projectScreenshots);
        });
        screenshotTabs.appendChild(tab);
        
        // Set first screenshot as default
        if (index === 0) {
          screenshotContent.innerHTML = `
            <img src="${screenshot.path}" alt="${screenshot.name}" class="screenshot-image">
          `;
        }
      });
    }
    
    // Open modal
    projectModalFunc();
    
  });
  
}

// add click event to project modal close button
if (projectCloseBtn) {
  projectCloseBtn.addEventListener("click", projectModalFunc);
}

if (projectOverlay) {
  projectOverlay.addEventListener("click", projectModalFunc);
}