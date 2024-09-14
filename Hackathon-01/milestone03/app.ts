
const formSection = document.getElementById("form-section") as HTMLDivElement;
const resumeSection = document.getElementById("resume-section") as HTMLDivElement;

const resumeForm = document.getElementById("resume-form") as HTMLFormElement;


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


const skillsSection = document.getElementById("skill-section") as HTMLElement
const toggleButton = document.getElementById("toggle-skills") as HTMLButtonElement;

// Event Listeners
resumeForm.addEventListener("submit", generateResume);


//For Generate Resume Function
function generateResume(event: Event) {
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
            imageDisplay.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    } else {
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
function updateList(listElement: HTMLUListElement, text: string) {
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
        } else {
            skillsSection.style.display = 'none';
            toggleButton.textContent = 'Show Skills Section';
        }
    });

    skillsSection.style.display = 'none';
    toggleButton.textContent = 'Show Skills Section';
}


// Initial State of Display Sections
resumeSection.style.display = "none";



