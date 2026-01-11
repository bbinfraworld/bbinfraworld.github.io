// Hide splash screen when page fully loads
window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
        setTimeout(() => {
            splash.classList.add('hidden');
        }, 500); // Small delay for smoother transition
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // Intersection Observer for Fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // Navbar Scroll Effect
    /*
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)';
            navbar.style.boxShadow = 'none';
        }
    });
    */

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Lightbox Gallery Implementation
    const initLightbox = () => {
        // Create modal elements only if they don't exist
        if (!document.querySelector('.lightbox-modal')) {
            const modal = document.createElement('div');
            modal.className = 'lightbox-modal';
            modal.innerHTML = `
                <span class="lightbox-close">&times;</span>
                <a class="lightbox-prev">&#10094;</a>
                <a class="lightbox-next">&#10095;</a>
                <div class="lightbox-container">
                    <div class="lightbox-details">
                        <h3 id="lightbox-title"></h3>
                        <p id="lightbox-desc"></p>
                    </div>
                    <div class="lightbox-image-wrapper">
                        <img class="lightbox-content">
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            // Elements
            const closeBtn = modal.querySelector('.lightbox-close');
            const lightboxImg = modal.querySelector('.lightbox-content');
            const lightboxTitle = modal.querySelector('#lightbox-title');
            const lightboxDesc = modal.querySelector('#lightbox-desc');
            const prevBtn = modal.querySelector('.lightbox-prev');
            const nextBtn = modal.querySelector('.lightbox-next');

            // Find all unique images for gallery navigation
            const galleryImages = Array.from(document.querySelectorAll('.image-container img, .client-image-container img, .lightbox-trigger'));
            let currentIndex = 0;

            const updateContent = (index) => {
                if (index < 0 || index >= galleryImages.length) return;

                const img = galleryImages[index];

                // Find parent card to scrape text - reused logic
                const card = img.closest('.achievement-card') || img.closest('.testimonial-card') || img.closest('.news-card');
                let titleText = "Image Details";
                let descText = "";

                if (card) {
                    if (card.classList.contains('achievement-card')) {
                        const h3 = card.querySelector('.achievement-info h3');
                        if (h3) titleText = h3.textContent;
                        descText = img.alt || "Achievement and Recognition";
                    } else if (card.classList.contains('testimonial-card')) {
                        const h4 = card.querySelector('.testimonial-content h4');
                        const p = card.querySelector('.testimonial-content p');
                        if (h4) titleText = h4.textContent;
                        if (p) descText = p.textContent;
                    } else if (card.classList.contains('news-card')) {
                        const h3 = card.querySelector('.news-title');
                        const p = card.querySelector('.news-excerpt');
                        if (h3) titleText = h3.textContent;
                        if (p) descText = p.textContent;
                    }
                }

                lightboxImg.src = img.src;
                lightboxTitle.textContent = titleText;
                lightboxDesc.textContent = descText;
                currentIndex = index;
            };

            const closeLightbox = () => {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                    lightboxImg.src = '';
                    lightboxTitle.textContent = '';
                    lightboxDesc.textContent = '';
                }, 300);
            };

            // Event Listeners
            closeBtn.addEventListener('click', closeLightbox);

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeLightbox();
                }
            });

            // Navigation
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = galleryImages.length - 1; // Loop to last
                updateContent(newIndex);
            });

            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let newIndex = currentIndex + 1;
                if (newIndex >= galleryImages.length) newIndex = 0; // Loop to first
                updateContent(newIndex);
            });

            // Keyboard Nav
            document.addEventListener('keydown', (e) => {
                if (modal.style.display === 'flex') {
                    if (e.key === 'ArrowLeft') prevBtn.click();
                    if (e.key === 'ArrowRight') nextBtn.click();
                    if (e.key === 'Escape') closeLightbox();
                }
            });

            // Open Logic
            galleryImages.forEach((img, index) => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', (e) => {
                    updateContent(index);
                    modal.style.display = 'flex';
                    setTimeout(() => {
                        modal.classList.add('show');
                    }, 10);
                });
            });
        }
    };

    // FAQ Accordion Logic
    const faqSetup = () => {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.closest('.faq-item');
                const answer = item.querySelector('.faq-answer');

                // Check if currently active
                const isActive = item.classList.contains('active');

                // Close all other items
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });

                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = null;
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        });
    };
    faqSetup();

    // FAQ Search Functionality
    const initFaqSearch = () => {
        const searchInput = document.getElementById('faqSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase().trim();
                const items = document.querySelectorAll('.faq-item');
                const categories = document.querySelectorAll('.faq-category-title');

                items.forEach(item => {
                    const question = item.querySelector('.faq-question h3').innerText.toLowerCase();
                    const answer = item.querySelector('.faq-answer').innerText.toLowerCase();

                    if (question.includes(term) || answer.includes(term)) {
                        item.classList.remove('hidden-by-search');
                        item.style.display = 'block';
                    } else {
                        item.classList.add('hidden-by-search');
                        item.style.display = 'none';
                    }
                });

                // Hide empty categories
                categories.forEach(cat => {
                    // This is tricky because items are siblings or children of a container sibling?
                    // Structure: h2, div.faq-container > div.faq-item
                    // The .faq-container is the next sibling of h2

                    const container = cat.nextElementSibling;
                    if (container && container.classList.contains('faq-container')) {
                        const visibleItems = container.querySelectorAll('.faq-item:not(.hidden-by-search)');
                        if (visibleItems.length === 0) {
                            cat.style.display = 'none';
                        } else {
                            cat.style.display = 'block';
                        }
                    }
                });
            });

            // Add focus effect
            searchInput.addEventListener('focus', () => {
                searchInput.style.borderColor = 'var(--color-primary)';
                searchInput.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            });
            searchInput.addEventListener('blur', () => {
                searchInput.style.borderColor = '#ddd';
                searchInput.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)';
            });
        }
    };
    initFaqSearch();

    initLightbox();
});
