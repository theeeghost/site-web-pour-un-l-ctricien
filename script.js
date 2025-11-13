// Toggle Mobile Menu
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Close menu when a link is clicked
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navMenu').classList.remove('active');
    });
});

// Handle RDV Form Submission
document.getElementById('rdvForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        nom: document.getElementById('nom').value,
        telephone: document.getElementById('telephone').value,
        email: document.getElementById('email').value,
        adresse: document.getElementById('adresse').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission (replace with actual backend)
    try {
        console.log('Formulaire RDV soumis:', formData);
        
        // Show success message
        const alertDiv = document.getElementById('rdvAlert');
        alertDiv.textContent = '✓ Votre demande a été envoyée avec succès! Nous vous contacterons sous peu.';
        alertDiv.className = 'alert success';
        
        // Reset form
        this.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            alertDiv.className = 'alert';
        }, 5000);
        
    } catch (error) {
        const alertDiv = document.getElementById('rdvAlert');
        alertDiv.textContent = '✗ Une erreur s\'est produite. Veuillez réessayer.';
        alertDiv.className = 'alert error';
    }
});

// Handle Contact Form Submission
document.getElementById('contactForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        nom: document.getElementById('contactNom').value,
        email: document.getElementById('contactEmail').value,
        message: document.getElementById('contactMessage').value
    };
    
    // Simulate form submission (replace with actual backend)
    try {
        console.log('Formulaire Contact soumis:', formData);
        
        // Show success message
        const alertDiv = document.getElementById('contactAlert');
        alertDiv.textContent = '✓ Votre message a été envoyé! Nous vous répondrons très bientôt.';
        alertDiv.className = 'alert success';
        
        // Reset form
        this.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            alertDiv.className = 'alert';
        }, 5000);
        
    } catch (error) {
        const alertDiv = document.getElementById('contactAlert');
        alertDiv.textContent = '✗ Une erreur s\'est produite. Veuillez réessayer.';
        alertDiv.className = 'alert error';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section, .service-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Phone number formatting
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 2) {
                value = value;
            } else if (value.length <= 5) {
                value = value.slice(0, 2) + ' ' + value.slice(2);
            } else if (value.length <= 8) {
                value = value.slice(0, 2) + ' ' + value.slice(2, 5) + ' ' + value.slice(5);
            } else {
                value = value.slice(0, 2) + ' ' + value.slice(2, 5) + ' ' + value.slice(5, 8) + ' ' + value.slice(8, 10);
            }
        }
        e.target.value = value;
    });
});

// Prevent form submission if fields are empty
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ef4444';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
}

validateForm('rdvForm');
validateForm('contactForm');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Site électricien chargé avec succès!');
});

// Handle active nav link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navMenu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
