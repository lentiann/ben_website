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

// Arc text functionality removed - using logo instead

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
        phone: document.getElementById('phone').value || 'Nicht angegeben',
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Create mailto link with form data
    const mailtoLink = `mailto:pundpsuppliergbr@gmx.de?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\n` +
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