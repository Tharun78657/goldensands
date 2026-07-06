document.addEventListener('DOMContentLoaded', () => {

    // ─── Navbar Scroll Effect ───────────────────────────────────────────────
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.style.background = 'rgba(15, 31, 44, 0.97)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.25)';
        } else {
            navbar.style.background = 'rgba(15, 31, 44, 0.6)';
            navbar.style.boxShadow = 'none';
        }
    });

    // ─── Right-Side Drawer ──────────────────────────────────────────────────
    const hamburgerBtn  = document.getElementById('hamburgerBtn');
    const mobileDrawer  = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerClose   = document.getElementById('drawerClose');

    function openDrawer() {
        mobileDrawer.classList.add('is-open');
        drawerOverlay.classList.add('is-open');
        hamburgerBtn.classList.add('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        mobileDrawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // prevent background scroll
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('is-open');
        drawerOverlay.classList.remove('is-open');
        hamburgerBtn.classList.remove('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
    if (drawerClose)   drawerClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    // Close drawer when a link inside it is clicked
    document.querySelectorAll('.drawer-links a, .drawer-cta').forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // Close drawer on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
    });

    // ─── Smooth Scrolling ───────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({ top: targetElement.offsetTop, behavior: 'smooth' });
            }
        });
    });

    // ─── Hero Image Slider (DISABLED - static image only) ─────────────────
    // const slides = document.querySelectorAll('.hero-slide');
    // let currentSlide = 0;
    // let sliderInterval;

    // function goToSlide(index) {
    //     slides[currentSlide].classList.remove('active');
    //     slides[currentSlide].classList.add('prev');
    //     const leaving = slides[currentSlide];
    //     setTimeout(() => leaving.classList.remove('prev'), 1000);
    //     currentSlide = index;
    //     slides[currentSlide].classList.add('active');
    // }

    // function nextSlide() {
    //     goToSlide((currentSlide + 1) % slides.length);
    // }

    // function startAutoPlay() {
    //     sliderInterval = setInterval(nextSlide, 5500);
    // }

    // startAutoPlay();

    // ─── Sea View Slider ────────────────────────────────────────────────────
    const seaSlides = document.querySelectorAll('.sea-slide');
    const seaDots   = document.querySelectorAll('.sea-dot');
    let seaIndex    = 0;

    function goToSeaSlide(newIndex) {
        const current = seaSlides[seaIndex];
        const next    = seaSlides[newIndex];

        // Exit the current slide
        current.classList.remove('active');
        current.classList.add('exit');
        seaDots[seaIndex].classList.remove('active');

        // Clean up the exit class after transition
        const cleanup = () => {
            current.classList.remove('exit');
            current.removeEventListener('transitionend', cleanup);
        };
        current.addEventListener('transitionend', cleanup);

        // Update index
        seaIndex = newIndex;
        seaDots[seaIndex].classList.add('active');

        // Activate next slide — use double rAF so browser renders initial state first
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                next.classList.add('active');
            });
        });
    }

    // Auto-advance every 3.5 seconds
    setInterval(() => {
        goToSeaSlide((seaIndex + 1) % seaSlides.length);
    }, 3500);

    // Dot click navigation
    seaDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.dataset.index);
            if (idx !== seaIndex) goToSeaSlide(idx);
        });
    });

    // ─── Villa View Slider ──────────────────────────────────────────────────
    const villaSlides = document.querySelectorAll('.villa-slide');
    const villaDots   = document.querySelectorAll('.villa-dot');
    let villaIndex    = 0;

    function goToVillaSlide(newIndex) {
        const current = villaSlides[villaIndex];
        const next    = villaSlides[newIndex];

        current.classList.remove('active');
        current.classList.add('exit');
        villaDots[villaIndex].classList.remove('active');

        const cleanup = () => {
            current.classList.remove('exit');
            current.removeEventListener('transitionend', cleanup);
        };
        current.addEventListener('transitionend', cleanup);

        villaIndex = newIndex;
        villaDots[villaIndex].classList.add('active');

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                next.classList.add('active');
            });
        });
    }

    // Auto-advance every 4 seconds
    setInterval(() => {
        goToVillaSlide((villaIndex + 1) % villaSlides.length);
    }, 4000);

    // Dot click navigation
    villaDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.dataset.index);
            if (idx !== villaIndex) goToVillaSlide(idx);
        });
    });

    // ─── Coverflow Slider ───────────────────────────────────────────────────
    const coverflowItems = document.querySelectorAll('.coverflow-item');
    const coverflowPrev = document.getElementById('coverflow-prev');
    const coverflowNext = document.getElementById('coverflow-next');
    let currentCoverflowIndex = 0;

    function updateCoverflow() {
        coverflowItems.forEach((item, index) => {
            // Remove all classes first
            item.className = 'coverflow-item';
            
            const diff = index - currentCoverflowIndex;
            
            if (diff === 0) {
                item.classList.add('active');
            } else if (diff === -1 || (currentCoverflowIndex === 0 && index === coverflowItems.length - 1 && coverflowItems.length > 3)) {
                item.classList.add('prev');
            } else if (diff === 1 || (currentCoverflowIndex === coverflowItems.length - 1 && index === 0 && coverflowItems.length > 3)) {
                item.classList.add('next');
            } else if (diff === -2 || (currentCoverflowIndex <= 1 && index === coverflowItems.length - 2 + currentCoverflowIndex)) {
                item.classList.add('prev-2');
            } else if (diff === 2 || (currentCoverflowIndex >= coverflowItems.length - 2 && index === diff - 2)) {
                item.classList.add('next-2');
            } else if (diff === -3 || (currentCoverflowIndex <= 2 && index === coverflowItems.length - 3 + currentCoverflowIndex)) {
                item.classList.add('prev-3');
            } else if (diff === 3 || (currentCoverflowIndex >= coverflowItems.length - 3 && index === diff - 3)) {
                item.classList.add('next-3');
            } else if (diff < 0) {
                item.classList.add('hidden-left');
            } else if (diff > 0) {
                item.classList.add('hidden-right');
            }
        });
    }

    let coverflowAutoPlayInterval;

    function startCoverflowAutoPlay() {
        coverflowAutoPlayInterval = setInterval(() => {
            currentCoverflowIndex = (currentCoverflowIndex === coverflowItems.length - 1) ? 0 : currentCoverflowIndex + 1;
            updateCoverflow();
        }, 2000); // 2 seconds
    }

    function resetCoverflowAutoPlay() {
        clearInterval(coverflowAutoPlayInterval);
        startCoverflowAutoPlay();
    }

    if (coverflowPrev && coverflowNext) {
        coverflowPrev.addEventListener('click', () => {
            currentCoverflowIndex = (currentCoverflowIndex === 0) ? coverflowItems.length - 1 : currentCoverflowIndex - 1;
            updateCoverflow();
            resetCoverflowAutoPlay();
        });

        coverflowNext.addEventListener('click', () => {
            currentCoverflowIndex = (currentCoverflowIndex === coverflowItems.length - 1) ? 0 : currentCoverflowIndex + 1;
            updateCoverflow();
            resetCoverflowAutoPlay();
        });
        // Add click events to items to focus them directly
        coverflowItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (currentCoverflowIndex !== index) {
                    currentCoverflowIndex = index;
                    updateCoverflow();
                    resetCoverflowAutoPlay();
                }
            });
        });

        // Initialize
        updateCoverflow();
        startCoverflowAutoPlay();
    }

    // ─── Scroll Reveal from Bottom ─────────────────────────────────────────
    const revealElements = document.querySelectorAll('.reveal-bottom');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
});

// ─── Gallery Lightbox ───────────────────────────────────────────────────
function openLightbox(src) {
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) {
        lightboxImg.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing when clicking the image itself
        });
    }
});

// ─── Enquire Modal ──────────────────────────────────────────────────────
function openEnquireModal() {
    const modal = document.getElementById('enquire-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeEnquireModal() {
    const modal = document.getElementById('enquire-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close enquire modal when clicking outside of it
document.addEventListener('DOMContentLoaded', () => {
    const enquireModal = document.getElementById('enquire-modal');
    if (enquireModal) {
        enquireModal.addEventListener('click', (e) => {
            if (e.target === enquireModal) {
                closeEnquireModal();
            }
        });
    }

    const enquireForm = document.getElementById('enquire-form');
    if (enquireForm) {
        enquireForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your enquiry! We will get back to you soon.');
            closeEnquireModal();
            enquireForm.reset();
        });
    }

    // Layout Modal Events
    const layoutModal = document.getElementById('layout-modal');
    if (layoutModal) {
        layoutModal.addEventListener('click', (e) => {
            if (e.target === layoutModal) {
                closeLayoutModal();
            }
        });
    }

    const layoutForm = document.getElementById('layout-form');
    if (layoutForm) {
        layoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your download will begin shortly.');
            
            // Trigger PDF download
            const link = document.createElement('a');
            link.href = '../assets/A, B & C Block Layout Revised 18052026.pdf';
            link.download = 'Golden_Sands_Layout.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            closeLayoutModal();
            layoutForm.reset();
        });
    }
});

// ─── Layout Modal ───────────────────────────────────────────────────────
function openLayoutModal() {
    const modal = document.getElementById('layout-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeLayoutModal() {
    const modal = document.getElementById('layout-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}
