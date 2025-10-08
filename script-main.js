document.addEventListener("DOMContentLoaded", function() {
    
    // --- Typing Animation for Welcome Text on Homepage ---
    const typeEffectSpan = document.querySelector('.type-effect');
    if (typeEffectSpan)
   {
        new Typed('.type-effect', {
            strings: ['Welcome to University College of Engineering and Technology, Hazaribag', 'Fostering Future Innovators'],
            resizeToFit: true,
            typeSpeed: 70,
            backSpeed: 50,
            backDelay: 1200,
            smoothBackspace: true,
            loop: true
        });
    }       
            const heroSlider = document.getElementById('hero-slider');
            if (heroSlider) {
            const images = [
            'images/bg1.jpg',
            'images/bg2.jpg',
            'images/bg3.jpg'
        ];
        let currentIndex = 0;
        function changeBackground() {
            heroSlider.style.backgroundImage = `url('${images[currentIndex]}')`;
            currentIndex = (currentIndex + 1) % images.length;
        }
        changeBackground(); // Initial call
        setInterval(changeBackground, 5000); // Change every 5 seconds
    }
    
    // --- Dynamic Header Login/Profile Display ---
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const headerRightContent = document.getElementById('header-right-content');

    if (loggedInUser && headerRightContent) {
        headerRightContent.innerHTML = `
            <div class="dropdown">
                <a href="#" class="btn btn-outline-light btn-sm dropdown-toggle" role="button" data-bs-toggle="dropdown">
                    <i class="fas fa-user-circle me-2"></i> ${loggedInUser.name}
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#">My Profile</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" id="logout-button">Logout</a></li>
                </ul>
            </div>
        `;
        const logoutButton = document.getElementById('logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', function(e) {
                e.preventDefault();
                sessionStorage.removeItem('loggedInUser');
                window.location.href = 'index.html';
            });
        }
    }

    // --- Fade-in Animation on Scroll ---
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeInSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Gallery Page Logic ---
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        const galleryImages = [
            { src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800', category: 'campus' },
            { src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800', category: 'events' },
            { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800', category: 'academics' },
            { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800', category: 'campus' },
            { src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800', category: 'academics' },
            { src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800', category: 'events' }
        ];

        function renderGallery(filter = 'all') {
            galleryGrid.innerHTML = '';
            const filteredImages = (filter === 'all')
                ? galleryImages
                : galleryImages.filter(img => img.category === filter);

            filteredImages.forEach(img => {
                const col = document.createElement('div');
                col.className = 'col-lg-4 col-md-6';
                col.innerHTML = `
                    <div class="gallery-item">
                        <a href="#" data-bs-toggle="modal" data-bs-target="#galleryModal" data-img-src="${img.src}">
                            <img src="${img.src}" class="img-fluid" alt="Gallery Image">
                            <div class="gallery-overlay">
                                <div class="gallery-text"><i class="fas fa-search-plus"></i> View</div>
                            </div>
                        </a>
                    </div>
                `;
                galleryGrid.appendChild(col);
            });
        }

        renderGallery();

        const filterButtons = document.getElementById('filter-buttons');
        filterButtons.addEventListener('click', e => {
            if (e.target.tagName === 'BUTTON') {
                document.querySelector('.filter-buttons .btn.active').classList.remove('active');
                e.target.classList.add('active');
                renderGallery(e.target.dataset.filter);
            }
        });
    }

    // --- Gallery Modal Script ---
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
      galleryModal.addEventListener('show.bs.modal', event => {
        const triggerLink = event.relatedTarget;
        const imageSrc = triggerLink.getAttribute('data-img-src');
        const modalImage = galleryModal.querySelector('#modalImage');
        modalImage.src = imageSrc;
      });
    }

    // --- Bootstrap Form Validation ---
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
});
document.addEventListener("DOMContentLoaded", function() {
    // Find the container in the header where the login button is
    const headerRightContainer = document.getElementById('header-right-content');
    
    // Get user data from session storage
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    // Check if a user is actually logged in
    if (loggedInUser) {
        // Convert the JSON string from storage back into an object
        const user = JSON.parse(loggedInUser);

        // Determine the correct dashboard URL based on user type
        let dashboardUrl = '#'; // Default URL if type is unknown
        if (user.type === 'Student') {
            dashboardUrl = 'student-dashboard.html';
        } else if (user.type === 'Staff') {
            dashboardUrl = 'staff-dashboard.html';
        }

        // Create the new HTML to display the user's name and options
        // The username color is set to blue here using inline style
        const userDisplayHTML = `
            <div class="d-flex align-items-center">
                <span class="me-3" style="color: #0d6efd; font-weight: 500;">
                    Welcome, ${user.name}
                </span>

                <a href="${dashboardUrl}" class="btn btn-success btn-sm me-2">Dashboard</a>

                <button id="logout-btn" class="btn btn-danger btn-sm">Logout</button>
            </div>
        `;

        // Replace the original content with the new HTML
        headerRightContainer.innerHTML = userDisplayHTML;

        // Add a click event to the new logout button
        document.getElementById('logout-btn').addEventListener('click', function() {
            sessionStorage.removeItem('loggedInUser');
            window.location.reload();
        });
    }
});