"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-skills');
    const skillsSection = document.getElementById('skills');
    // Ensure both elements exist
    if (toggleButton && skillsSection) {
        // Add a click event listener to the toggle button
        toggleButton.addEventListener('click', () => {
            if (skillsSection.style.display === 'none') {
                skillsSection.style.display = 'block';
                toggleButton.textContent = 'Hide Skills Section';
            }
            else {
                skillsSection.style.display = 'none';
                toggleButton.textContent = 'Show Skills Section';
            }
        });
        // Initially hide the skills section
        skillsSection.style.display = 'none';
        toggleButton.textContent = 'Show Skills Section';
    }
});
