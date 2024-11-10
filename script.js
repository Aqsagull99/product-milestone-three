
function generateResume() {
    var _a;
    // Get values from the form
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var experience = document.getElementById('experience').value.trim();
    var jobTitle = document.getElementById('jobTitle').value.trim();
    var company = document.getElementById('company').value.trim();
    var years = document.getElementById('years').value.trim();
    var education = document.getElementById('education').value.trim();
    var skills = document.getElementById('skills').value.trim();
    // Optional fields
    var profilePicture = ((_a = document.getElementById('profilePicture').files) === null || _a === void 0 ? void 0 : _a[0]) || null;
    var shortIntro = document.getElementById('shortIntro').value.trim();
    // Validate required fields
    if (!name || !email || !phone || !jobTitle || !company || !years || !education || !skills) {
        alert('Please fill in all required fields.');
        return;
    }
    // Validate email format
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    // Validate phone format
    var phonePattern = /^[0-9]+$/;
    if (!phonePattern.test(phone) || phone.length < 10 || phone.length > 15) {
        alert('Please enter a valid phone number (10-15 digits).');
        return;
    }
    // Store required values in localStorage
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);
    localStorage.setItem('experience', experience);
    localStorage.setItem('jobTitle', jobTitle);
    localStorage.setItem('company', company);
    localStorage.setItem('years', years);
    localStorage.setItem('education', education);
    localStorage.setItem('skills', skills);
    // Handle profile picture as Base64
    if (profilePicture) {
        var reader_1 = new FileReader();
        reader_1.onloadend = function () {
            // Store Base64 data in localStorage
            localStorage.setItem('profilePicture', reader_1.result);
        };
        reader_1.readAsDataURL(profilePicture); // Converts the file to Base64
    }
    else {
        localStorage.removeItem('profilePicture');
    }
    localStorage.setItem('shortIntro', shortIntro);
    // Redirect to the preview page
    window.location.href = 'preview.html';
}

function displayResume() {
    var profilePicture = localStorage.getItem('profilePicture');
    var name = localStorage.getItem('name');
    var email = localStorage.getItem('email');
    var phone = localStorage.getItem('phone');
    var jobTitle = localStorage.getItem('jobTitle');
    var experience = localStorage.getItem('experience');
    var company = localStorage.getItem('company');
    var years = localStorage.getItem('years');
    var education = localStorage.getItem('education');
    var skills = localStorage.getItem('skills');
    var shortIntro = localStorage.getItem('shortIntro');
    // Ensure required data is available
    if (!name || !email || !phone) {
        console.error("Required data missing in localStorage.");
        return;
    }
    // Left column content
    var leftColumnContent = "";
    if (profilePicture) {
        leftColumnContent += "\n            <div class=\"profile-section\">\n                <div class=\"profile-img-container\">\n                    <img src=\"".concat(profilePicture, "\" alt=\"Profile Picture\" class=\"profile-img\" />\n                    <div class=\"profile-text\">\n                        <h2><i class=\"fas fa-id-badge\"></i> Resume</h2>\n                        <p>A dedicated professional with a proven track record in problem-solving and teamwork. Seeking to contribute my skills to a dynamic organization.</p>\n                        <p><strong><i class=\"fas fa-cogs\"></i> Skills:</strong> Leadership, Communication, Time Management, Problem Solving</p>\n                        <p><strong><i class=\"fas fa-chart-line\"></i> Core Competencies:</strong> Critical Thinking, Project Management, Innovation</p>\n                        <p><strong><i class=\"fas fa-bullseye\"></i> Objective:</strong> Looking for opportunities to grow professionally while contributing to the success of the team.</p>\n                    </div>\n                </div>\n            </div>\n        ");
    }
    leftColumnContent += "\n        <div class=\"resume-section\">\n            <h3 class=\"neon-text\"><i class=\"fas fa-user\"></i> Name</h3>\n            <div class=\"Data-container\">\n                <p><i class=\"fas fa-star\"></i> ".concat(name, "</p>\n            </div>\n        </div>\n        <div class=\"resume-section\">\n            <h3 class=\"neon-text\"><i class=\"fas fa-envelope\"></i> Email</h3>\n            <div class=\"Data-container\">\n                <p><i class=\"fas fa-star\"></i> ").concat(email, "</p>\n            </div>\n        </div>\n        <div class=\"resume-section\">\n            <h3 class=\"neon-text\"><i class=\"fas fa-phone-alt\"></i> Phone</h3>\n            <div class=\"Data-container\">\n                <p><i class=\"fas fa-star\"></i> ").concat(phone, "</p>\n            </div>\n        </div>\n    ");
    if (shortIntro) {
        leftColumnContent += "\n            <div class=\"resume-section\">\n                <h3 class=\"neon-text\"><i class=\"fas fa-user\"></i> Short Intro</h3>\n                <div class=\"Data-container\">\n                    <p><i class=\"fas fa-star\"></i> ".concat(shortIntro, "</p>\n                </div>\n            </div>\n        ");
    }
    // Right column content
    var rightColumnContent = "\n        <div class=\"resume-section\">\n            <h3 class=\"neon-text\"><i class=\"fas fa-briefcase\"></i> Job Title</h3>\n            <div class=\"Data-container\">\n                <p><i class=\"fas fa-star\"></i> ".concat(jobTitle, "</p>\n            </div>\n        </div>\n        <div class=\"resume-section\">\n            <h3 class=\"neon-text\"><i class=\"fas fa-building\"></i> Company</h3>\n            <div class=\"Data-container\">\n                <p><i class=\"fas fa-star\"></i> ").concat(company, "</p>\n            </div>\n        </div>\n        <div class=\"resume-section\">\n            <h3 class=\"neon-text\"><i class=\"fas fa-calendar-alt\"></i> Years of Experience</h3>\n            <div class=\"Data-container\">\n                <p><i class=\"fas fa-star\"></i> ").concat(years, "</p>\n            </div>\n        </div>\n    ");
    if (education) {
        rightColumnContent += "\n            <div class=\"resume-section\">\n                <h3 class=\"neon-text\"><i class=\"fas fa-graduation-cap\"></i> Education</h3>\n                <div class=\"Data-container\">\n                    <p><i class=\"fas fa-star\"></i> ".concat(education, "</p>\n                </div>\n            </div>\n        ");
    }
    if (skills) {
        rightColumnContent += "\n            <div class=\"resume-section\">\n                <h3 class=\"neon-text\"><i class=\"fas fa-cogs\"></i> Skills</h3>\n                <div class=\"Data-container\">\n                    <ul>\n                        ".concat(skills.split(',').map(function (skill) { return "<li><i class=\"fas fa-star\"></i> ".concat(skill.trim(), "</li>"); }).join(''), "\n                    </ul>\n                </div>\n            </div>\n        ");
    }
    // Insert content into the resume div
    var resumeDiv = document.getElementById('generatedResume');
    if (resumeDiv) {
        resumeDiv.innerHTML = "\n            <div class=\"resume-container-one\">\n                <div class=\"left-column\">\n                    ".concat(leftColumnContent, "\n                </div>\n                <div class=\"right-column\">\n                    ").concat(rightColumnContent, "\n                </div>\n            </div>\n        ");
    }
    else {
        console.error('generatedResume div not found.');
    }
}
// Page load
window.onload = displayResume;
// popup button
// Function to show the popup with a custom message
function showPopup(message) {
    var popup = document.getElementById('popup');
    var popupMessage = document.getElementById('popupMessage');
    popupMessage.innerText = message; // Set custom message
    popup.style.display = 'block'; // Show popup
}
// Function to close the popup
function closePopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'none'; // Hide popup
}
