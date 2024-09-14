
const formSection = document.getElementById("form-section") as HTMLDivElement;
const resumeSection = document.getElementById("resume-section") as HTMLDivElement;

const resumeForm = document.getElementById("resume-form") as HTMLFormElement;
const editFormBtn = document.getElementById("editForm") as HTMLButtonElement;

const nameInput = document.getElementById("name") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const linkedInInput = document.getElementById("LinkedInId") as HTMLInputElement;
const profilePicInput = document.getElementById("image-input") as HTMLInputElement;

const educationInput = document.getElementById("education") as HTMLTextAreaElement;
const experienceInput = document.getElementById("experience") as HTMLTextAreaElement;
const skillsInput = document.getElementById("skills") as HTMLTextAreaElement;

const displayName = document.getElementById("display-name") as HTMLElement;
const displayEmail = document.getElementById("display-email") as HTMLElement;
const displayPhone = document.getElementById("dispaly-phone") as HTMLElement;
const displayLinkedIn = document.querySelector("a") as HTMLAnchorElement;
const imageDisplay = document.getElementById("image-display") as HTMLImageElement;

const displayEducation = document.getElementById("display-education") as HTMLUListElement;
const displayExperience = document.getElementById("display-work-experience") as HTMLUListElement;
const displaySkills = document.getElementById("display-skills") as HTMLUListElement;

const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;
const linkContainer = document.getElementById("shareable-link") as HTMLDivElement;


const skillsSection = document.getElementById("skill-section") as HTMLElement;
const toggleButton = document.getElementById("toggle-skills") as HTMLButtonElement;



// Event Listeners FOr Submit and Edit Buttons
resumeForm.addEventListener("submit", generateResume);
editFormBtn.addEventListener("click", editForm);


// Generate Resume Function
function generateResume(event: Event) {
    event.preventDefault();

    // Update name, email, phone, and LinkedIn
    displayName.textContent = nameInput.value;
    displayEmail.textContent = `Email: ${emailInput.value}`;
    displayPhone.textContent = `Phone: ${phoneInput.value}`;
    displayLinkedIn.href = linkedInInput.value;

    //For  Handle profile image
    const file = profilePicInput.files ? profilePicInput.files[0] : null;
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageDisplay.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    } else {
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
function updateList(listElement: HTMLUListElement, text: string) {
    listElement.innerHTML = "";
    const items = text.split(",");
    items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        listElement.appendChild(li);
    });
}

// Edit Form Function
function editForm(event: Event) {
    event.preventDefault();
    formSection.style.display = "block";
    resumeSection.style.display = "none";
}

// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
    window.print();

});

//Handle Toggle Button
if (toggleButton && skillsSection) {
    toggleButton.addEventListener('click', () => {
        if (skillsSection.style.display === 'none' || !skillsSection.style.display) {
            skillsSection.style.display = 'block';
            toggleButton.textContent = 'Hide Skills Section';
        } else {
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
    const urlParams = new URLSearchParams({
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        linkedin: linkedInInput.value,
        education: educationInput.value,
        experience: experienceInput.value,
        skills: skillsInput.value
    });

    const uniqueURL = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;

    displayShareableLink(uniqueURL);
    window.history.pushState({}, '', uniqueURL);
}

// Display Shareable Link
function displayShareableLink(uniqueURL: string) {
    
    linkContainer.innerHTML = `<p>Shareable link: <a href="${uniqueURL}" target="_blank">${uniqueURL}</a></p>`;
    document.body.appendChild(linkContainer);

}


// Load Resume from URL
function loadResumeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);

    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const phone = urlParams.get('phone');
    const linkedin = urlParams.get('linkedin');
    const education = urlParams.get('education');
    const experience = urlParams.get('experience');
    const skills = urlParams.get('skills');

    if (name && email && phone && linkedin && education && experience && skills) {
        displayName.textContent = name;
        displayEmail.textContent = `Email: ${email}`;
        displayPhone.textContent = `Phone: ${phone}`;
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



