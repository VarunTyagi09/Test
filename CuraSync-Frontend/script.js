// CuraSync JavaScript - Fixed Login Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Clinic login form
    const clinicLoginForm = document.getElementById('clinicLoginForm');
    if (clinicLoginForm) {
        clinicLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('clinicEmail').value;
            const password = document.getElementById('clinicPassword').value;
            
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Demo credentials for testing
            const demoCredentials = {
                email: 'clinic@curasync.com',
                password: 'demo123'
            };
            
            if (email === demoCredentials.email && password === demoCredentials.password) {
                // Successful login
                const modal = bootstrap.Modal.getInstance(document.getElementById('clinicLoginModal'));
                modal.hide();
                
                showLoading('Welcome! Redirecting to Clinic Dashboard...');
                
                setTimeout(() => {
                    window.location.href = 'clinic-dashboard.html';
                }, 1500);
            } else {
                alert('Invalid credentials. Use:\nEmail: clinic@curasync.com\nPassword: demo123');
            }
        });
    }

    // Patient login form
    const patientLoginForm = document.getElementById('patientLoginForm');
    if (patientLoginForm) {
        patientLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('patientEmail').value;
            const password = document.getElementById('patientPassword').value;
            
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Demo credentials for testing
            const demoCredentials = {
                email: 'patient@curasync.com',
                password: 'demo123'
            };
            
            if (email === demoCredentials.email && password === demoCredentials.password) {
                // Successful login
                const modal = bootstrap.Modal.getInstance(document.getElementById('patientLoginModal'));
                modal.hide();
                
                showLoading('Welcome! Redirecting to Patient Portal...');
                
                setTimeout(() => {
                    window.location.href = 'patient-dashboard.html';
                }, 1500);
            } else {
                alert('Invalid credentials. Use:\nEmail: patient@curasync.com\nPassword: demo123');
            }
        });
    }

    // Loading indicator function
    function showLoading(message) {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-overlay';
        loadingDiv.innerHTML = `
            <div class="loading-content text-center">
                <div class="spinner-border text-primary mb-3" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mb-0 fw-bold">${message}</p>
            </div>
        `;
        document.body.appendChild(loadingDiv);
        
        setTimeout(() => {
            if (loadingDiv.parentNode) {
                loadingDiv.parentNode.removeChild(loadingDiv);
            }
        }, 2000);
    }

    // Demo login buttons for quick testing (add these to your HTML or create dynamically)
    createDemoLoginButtons();

    function createDemoLoginButtons() {
        // Check if we're on the main page and modals exist
        const clinicModal = document.getElementById('clinicLoginModal');
        const patientModal = document.getElementById('patientLoginModal');
        
        if (clinicModal && patientModal) {
            // Add demo buttons to login modals
            addDemoButtonToModal(clinicModal, 'clinic');
            addDemoButtonToModal(patientModal, 'patient');
        }
    }

    function addDemoButtonToModal(modal, type) {
        const modalBody = modal.querySelector('.modal-body');
        const demoButton = document.createElement('button');
        demoButton.type = 'button';
        demoButton.className = `btn btn-outline-${type === 'clinic' ? 'primary' : 'success'} btn-sm w-100 mt-2`;
        demoButton.innerHTML = `<i class="fas fa-bolt me-1"></i> Quick Demo Login`;
        demoButton.onclick = function() {
            if (type === 'clinic') {
                document.getElementById('clinicEmail').value = 'clinic@curasync.com';
                document.getElementById('clinicPassword').value = 'demo123';
                // Trigger form submission
                document.getElementById('clinicLoginForm').dispatchEvent(new Event('submit'));
            } else {
                document.getElementById('patientEmail').value = 'patient@curasync.com';
                document.getElementById('patientPassword').value = 'demo123';
                // Trigger form submission
                document.getElementById('patientLoginForm').dispatchEvent(new Event('submit'));
            }
        };
        modalBody.appendChild(demoButton);
    }

    // Testimonial carousel functionality
    let testimonialIndex = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Pricing plan selection
    document.querySelectorAll('.pricing-card .btn').forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.closest('.pricing-card').querySelector('h4').textContent;
            alert(`You selected the ${plan} plan. In a real application, this would redirect to a signup page.`);
        });
    });
});

// Utility functions
function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}