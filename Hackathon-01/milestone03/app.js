"use strict";
const formSection = document.getElementById("form-section");
const resumeSection = document.getElementById("resume-section");
const resumeForm = document.getElementById("resume-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const linkedInInput = document.getElementById("LinkedInId");
const profilePicInput = document.getElementById("image-input");
const educationInput = document.getElementById("education");
const experienceInput = document.getElementById("experience");
const skillsInput = document.getElementById("skills");
const displayName = document.getElementById("display-name");
const displayEmail = document.getElementById("display-email");
const displayPhone = document.getElementById("dispaly-phone");
const displayLinkedIn = document.querySelector("a");
const imageDisplay = document.getElementById("image-display");
const displayEducation = document.getElementById("display-education");
const displayExperience = document.getElementById("display-work-experience");
const displaySkills = document.getElementById("display-skills");
const skillsSection = document.getElementById("skill-section");
const toggleButton = document.getElementById("toggle-skills");
// Event Listeners
resumeForm.addEventListener("submit", generateResume);
//For Generate Resume Function
function generateResume(event) {
    event.preventDefault();
    //For Update name, email, phone, and LinkedIn
    displayName.textContent = nameInput.value;
    displayEmail.textContent = `Email: ${emailInput.value}`;
    displayPhone.textContent = `Phone: ${phoneInput.value}`;
    displayLinkedIn.href = linkedInInput.value;
    //For Handle profile image
    const file = profilePicInput.files ? profilePicInput.files[0] : null;
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            imageDisplay.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(file);
    }
    else {
        imageDisplay.src = "";
    }
    // Update Education, Experience, and Skills
    updateList(displayEducation, educationInput.value);
    updateList(displayExperience, experienceInput.value);
    updateList(displaySkills, skillsInput.value);
    formSection.style.display = "none";
    resumeSection.style.display = "block";
}
// Helper Function to Update Lists
function updateList(listElement, text) {
    listElement.innerHTML = "";
    const items = text.split(",");
    items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        listElement.appendChild(li);
    });
}
// Hangle Toggle Button
if (toggleButton && skillsSection) {
    toggleButton.addEventListener('click', () => {
        if (skillsSection.style.display === 'none' || !skillsSection.style.display) {
            skillsSection.style.display = 'block';
            toggleButton.textContent = 'Hide Skills Section';
        }
        else {
            skillsSection.style.display = 'none';
            toggleButton.textContent = 'Show Skills Section';
        }
    });
    skillsSection.style.display = 'none';
    toggleButton.textContent = 'Show Skills Section';
}
// Initial State of Display Sections
resumeSection.style.display = "none";
