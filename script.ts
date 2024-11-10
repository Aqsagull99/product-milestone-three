function generateResume(): void {
    // Get values from the form
    const name: string = (document.getElementById('name') as HTMLInputElement).value.trim();
    const email: string = (document.getElementById('email') as HTMLInputElement).value.trim();
    const phone: string = (document.getElementById('phone') as HTMLInputElement).value.trim();
    const experience: string = (document.getElementById('experience') as HTMLInputElement).value.trim();

    const jobTitle: string = (document.getElementById('jobTitle') as HTMLInputElement).value.trim();
    const company: string = (document.getElementById('company') as HTMLInputElement).value.trim();
    const years: string = (document.getElementById('years') as HTMLInputElement).value.trim();
    const education: string = (document.getElementById('education') as HTMLInputElement).value.trim();
    const skills: string = (document.getElementById('skills') as HTMLInputElement).value.trim();
    
    // Optional fields
    const profilePicture: File | null = (document.getElementById('profilePicture') as HTMLInputElement).files?.[0] || null;
    const shortIntro: string = (document.getElementById('shortIntro') as HTMLTextAreaElement).value.trim();

    // Validate required fields
    if (!name || !email || !phone || !jobTitle || !company || !years || !education || !skills) {
        alert('Please fill in all required fields.');
        return;
    }

    // Validate email format
    const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate phone format
    const phonePattern: RegExp = /^[0-9]+$/;
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
        const reader = new FileReader();
        reader.onloadend = () => {
            // Store Base64 data in localStorage
            localStorage.setItem('profilePicture', reader.result as string);
        };
        reader.readAsDataURL(profilePicture); 
    } else {
        localStorage.removeItem('profilePicture');
    }

    localStorage.setItem('shortIntro', shortIntro);

    // Redirect to the preview page
    window.location.href = 'preview.html';
}


function displayResume(): void {
    const profilePicture = localStorage.getItem('profilePicture');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const phone = localStorage.getItem('phone');
    const jobTitle = localStorage.getItem('jobTitle');
    const experience = localStorage.getItem('experience');
    const company = localStorage.getItem('company');
    const years = localStorage.getItem('years');
    const education = localStorage.getItem('education');
    const skills = localStorage.getItem('skills');
    const shortIntro = localStorage.getItem('shortIntro');

    // Ensure required data is available
    if (!name || !email || !phone) {
        console.error("Required data missing in localStorage.");
        return;
    }

    // Left column content
    let leftColumnContent = "";

    if (profilePicture) {
        leftColumnContent += `
            <div class="profile-section">
                <div class="profile-img-container">
                    <img src="${profilePicture}" alt="Profile Picture" class="profile-img" />
                    <div class="profile-text">
                        <h2><i class="fas fa-id-badge"></i> Resume</h2>
                        <p>A dedicated professional with a proven track record in problem-solving and teamwork. Seeking to contribute my skills to a dynamic organization.</p>
                        <p><strong><i class="fas fa-cogs"></i> Skills:</strong> Leadership, Communication, Time Management, Problem Solving</p>
                        <p><strong><i class="fas fa-chart-line"></i> Core Competencies:</strong> Critical Thinking, Project Management, Innovation</p>
                        <p><strong><i class="fas fa-bullseye"></i> Objective:</strong> Looking for opportunities to grow professionally while contributing to the success of the team.</p>
                    </div>
                </div>
            </div>
        `;
    }

    leftColumnContent += `
        <div class="resume-section">
            <h3 class="neon-text"><i class="fas fa-user"></i> Name</h3>
            <div class="Data-container">
                <p><i class="fas fa-star"></i> ${name}</p>
            </div>
        </div>
        <div class="resume-section">
            <h3 class="neon-text"><i class="fas fa-envelope"></i> Email</h3>
            <div class="Data-container">
                <p><i class="fas fa-star"></i> ${email}</p>
            </div>
        </div>
        <div class="resume-section">
            <h3 class="neon-text"><i class="fas fa-phone-alt"></i> Phone</h3>
            <div class="Data-container">
                <p><i class="fas fa-star"></i> ${phone}</p>
            </div>
        </div>
    `;

    if (shortIntro) {
        leftColumnContent += `
            <div class="resume-section">
                <h3 class="neon-text"><i class="fas fa-user"></i> Short Intro</h3>
                <div class="Data-container">
                    <p><i class="fas fa-star"></i> ${shortIntro}</p>
                </div>
            </div>
        `;
    }

    // Right column content
    let rightColumnContent = `
        <div class="resume-section">
            <h3 class="neon-text"><i class="fas fa-briefcase"></i> Job Title</h3>
            <div class="Data-container">
                <p><i class="fas fa-star"></i> ${jobTitle}</p>
            </div>
        </div>
        <div class="resume-section">
            <h3 class="neon-text"><i class="fas fa-building"></i> Company</h3>
            <div class="Data-container">
                <p><i class="fas fa-star"></i> ${company}</p>
            </div>
        </div>
        <div class="resume-section">
            <h3 class="neon-text"><i class="fas fa-calendar-alt"></i> Years of Experience</h3>
            <div class="Data-container">
                <p><i class="fas fa-star"></i> ${years}</p>
            </div>
        </div>
    `;

    if (education) {
        rightColumnContent += `
            <div class="resume-section">
                <h3 class="neon-text"><i class="fas fa-graduation-cap"></i> Education</h3>
                <div class="Data-container">
                    <p><i class="fas fa-star"></i> ${education}</p>
                </div>
            </div>
        `;
    }

    if (skills) {
        rightColumnContent += `
            <div class="resume-section">
                <h3 class="neon-text"><i class="fas fa-cogs"></i> Skills</h3>
                <div class="Data-container">
                    <ul>
                        ${skills.split(',').map(skill => `<li><i class="fas fa-star"></i> ${skill.trim()}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    // Insert content into the resume div
    const resumeDiv = document.getElementById('generatedResume');
    if (resumeDiv) {
        resumeDiv.innerHTML = `
            <div class="resume-container-one">
                <div class="left-column">
                    ${leftColumnContent}
                </div>
                <div class="right-column">
                    ${rightColumnContent}
                </div>
            </div>
        `;
    } else {
        console.error('generatedResume div not found.');
    }
}

// Page load
window.onload = displayResume;


