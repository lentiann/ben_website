// Handle logo image error (fallback to text)
document.addEventListener('DOMContentLoaded', function() {
    const logoImage = document.querySelector('.logo-image');
    if (logoImage) {
        logoImage.onerror = function() {
            this.classList.add('error');
        };
    }

    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateThemeIcon(savedTheme === 'light-theme');
} else {
    // Default to dark theme
    updateThemeIcon(false);
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const isLightTheme = body.classList.toggle('light-theme');
    updateThemeIcon(isLightTheme);

    // Save theme preference
    if (isLightTheme) {
        localStorage.setItem('theme', 'light-theme');
    } else {
        localStorage.removeItem('theme');
    }
});

// Update theme icon
function updateThemeIcon(isLight) {
    themeIcon.textContent = isLight ? '☀️' : '🌙';
}

// Create arc text effect
function createArcText() {
    const text = "Wir füllen Ihren Termin Kalender";
    const container = document.getElementById('arcText');
    const radius = 100; // Reduced radius for more compact arc
    const angleSpan = 140; // Total angle span in degrees for arc
    const startAngle = -70; // Starting angle for upward arc

    // Clear container
    container.innerHTML = '';

    // Calculate angle per character
    const anglePerChar = angleSpan / (text.length - 1);

    // Create spans for each character
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space

        // Calculate rotation angle for this character
        const angle = startAngle + (anglePerChar * index);
        const angleRad = (angle - 90) * (Math.PI / 180);

        // Calculate position for upward arc - positioned lower in container
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius + 50; // Adjusted offset to prevent overlap

        // Apply transformation
        span.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`;

        container.appendChild(span);
    });
}

// Initialize arc text
createArcText();

// Recreate on window resize
window.addEventListener('resize', createArcText);

// Helper function to show status messages
function showStatus(message, type) {
    const statusEl = document.getElementById('formStatus');
    statusEl.className = `form-status show ${type}`;
    statusEl.textContent = message;

    // Hide message after 5 seconds
    setTimeout(() => {
        statusEl.classList.remove('show');
    }, 5000);
}

// Helper function to toggle button loading state
function toggleButtonLoading(isLoading) {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');

    if (isLoading) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        btnText.textContent = 'Wird gesendet...';
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        btnText.textContent = 'Anfrage senden';
    }
}

// Form submission handler with mailto
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value || 'Nicht angegeben',
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Create mailto link with form data
    const mailtoLink = `mailto:info@pp-supplier.de?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\n` +
        `E-Mail: ${formData.email}\n` +
        `Telefon: ${formData.phone}\n\n` +
        `Nachricht:\n${formData.message}`
    )}`;

    // Show loading briefly for better UX
    toggleButtonLoading(true);

    // Small delay for better user experience
    setTimeout(() => {
        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        showStatus('Ihr E-Mail-Programm wurde geöffnet. Bitte senden Sie die E-Mail ab.', 'info');

        // Reset form
        this.reset();

        // Reset button state
        toggleButtonLoading(false);
    }, 500);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Package buttons - scroll to contact form
document.querySelectorAll('.package-btn').forEach(button => {
    button.addEventListener('click', function() {
        const formSection = document.getElementById('formular');
        if (formSection) {
            formSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Optional: Pre-fill the subject based on package
            const packageCard = this.closest('.package-card');
            const packageName = packageCard.querySelector('h3').textContent;
            const subjectField = document.getElementById('subject');
            if (subjectField) {
                subjectField.value = `Anfrage für ${packageName} Paket`;
            }
        }
    });
});