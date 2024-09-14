var formSection = document.getElementById("form-section");
var resumeSection = document.getElementById("resume-section");
var resumeForm = document.getElementById("resume-form");
var editFormBtn = document.getElementById("editForm");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var phoneInput = document.getElementById("phone");
var linkedInInput = document.getElementById("LinkedInId");
var profilePicInput = document.getElementById("image-input");
var educationInput = document.getElementById("education");
var experienceInput = document.getElementById("experience");
var skillsInput = document.getElementById("skills");
var displayName = document.getElementById("display-name");
var displayEmail = document.getElementById("display-email");
var displayPhone = document.getElementById("dispaly-phone");
var displayLinkedIn = document.querySelector("a");
var imageDisplay = document.getElementById("image-display");
var displayEducation = document.getElementById("display-education");
var displayExperience = document.getElementById("display-work-experience");
var displaySkills = document.getElementById("display-skills");
var downloadPdfButton = document.getElementById('download-pdf');
var linkContainer = document.getElementById("shareable-link");
var skillsSection = document.getElementById("skill-section");
var toggleButton = document.getElementById("toggle-skills");
// Event Listeners FOr Submit and Edit Buttons
resumeForm.addEventListener("submit", generateResume);
editFormBtn.addEventListener("click", editForm);
// Generate Resume Function
function generateResume(event) {
    event.preventDefault();
    // Update name, email, phone, and LinkedIn
    displayName.textContent = nameInput.value;
    displayEmail.textContent = "Email: ".concat(emailInput.value);
    displayPhone.textContent = "Phone: ".concat(phoneInput.value);
    displayLinkedIn.href = linkedInInput.value;
    //For  Handle profile image
    var file = profilePicInput.files ? profilePicInput.files[0] : null;
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            imageDisplay.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(file);
    }
    else {
        imageDisplay.src = "";
    }
    //For updating lists
    updateList(displayEducation, educationInput.value);
    updateList(displayExperience, experienceInput.value);
    updateList(displaySkills, skillsInput.value);
    formSection.style.display = "none";
    resumeSection.style.display = "block";
}
// Helper Function to Update List
function updateList(listElement, text) {
    listElement.innerHTML = "";
    var items = text.split(",");
    items.forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item;
        listElement.appendChild(li);
    });
}
// Edit Form Function
function editForm(event) {
    event.preventDefault();
    formSection.style.display = "block";
    resumeSection.style.display = "none";
}
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print();
});
//Handle Toggle Button
if (toggleButton && skillsSection) {
    toggleButton.addEventListener('click', function () {
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
// Initial State of Display Sections None
resumeSection.style.display = "none";
// Adding functionalities: Generate Unique URL ||| Download PDF
// Generate Unique URL
function generateUniqueURL() {
    var urlParams = new URLSearchParams({
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        linkedin: linkedInInput.value,
        education: educationInput.value,
        experience: experienceInput.value,
        skills: skillsInput.value
    });
    var uniqueURL = "".concat(window.location.origin).concat(window.location.pathname, "?").concat(urlParams.toString());
    displayShareableLink(uniqueURL);
    window.history.pushState({}, '', uniqueURL);
}
// Display Shareable Link
function displayShareableLink(uniqueURL) {
    linkContainer.innerHTML = "<p>Shareable link: <a href=\"".concat(uniqueURL, "\" target=\"_blank\">").concat(uniqueURL, "</a></p>");
    document.body.appendChild(linkContainer);
}
// Load Resume from URL
function loadResumeFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    var name = urlParams.get('name');
    var email = urlParams.get('email');
    var phone = urlParams.get('phone');
    var linkedin = urlParams.get('linkedin');
    var education = urlParams.get('education');
    var experience = urlParams.get('experience');
    var skills = urlParams.get('skills');
    if (name && email && phone && linkedin && education && experience && skills) {
        displayName.textContent = name;
        displayEmail.textContent = "Email: ".concat(email);
        displayPhone.textContent = "Phone: ".concat(phone);
        displayLinkedIn.href = linkedin;
        updateList(displayEducation, education);
        updateList(displayExperience, experience);
        updateList(displaySkills, skills);
        formSection.style.display = "none";
        resumeSection.style.display = "block";
    }
}
// Call this on page load to check for URL params
window.onload = function () {
    loadResumeFromURL();
};
