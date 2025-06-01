function openNav() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.style.width = "250px";
        sidebar.classList.add('active');
    }
}

function closeNav() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.style.width = "0";
        sidebar.classList.remove('active');
    }
}

window.addEventListener('load', function() {
    closeNav();
});

document.addEventListener('DOMContentLoaded', function() {
    closeNav();
    
    if (document.querySelectorAll('.letter').length > 0) {
        animateText();
    }
    initializeModal();
    initializeScrollReveal();
    initializeCardAnimations();

    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            closeNav();
            if (link.getAttribute('href') === window.location.pathname.split('/').pop()) {
                e.preventDefault();
            }
        });
    });

    document.addEventListener('click', function(e) {
        const sidebar = document.getElementById("sidebar");
        const hamburger = document.querySelector('.hamburger');
        
        if (sidebar && sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !hamburger.contains(e.target)) {
            closeNav();
        }
    });

    const introSection = document.getElementById('intro');
    if (introSection) {
        const introParagraphs = introSection.querySelectorAll('p');
        introParagraphs.forEach((p, index) => {
            p.style.setProperty('--paragraph-index', index);
        });

        const rect = introSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setTimeout(() => {
                introSection.classList.add('reveal');
            }, 500);
        }
    }
    
    window.addEventListener('scroll', function() {
        const introSection = document.getElementById('intro');
        if (introSection) {
            const rect = introSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                introSection.classList.add('reveal');
            }
        }
    });
    
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', scrollToContent);
    }
});

function scrollToContent() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    
    const offset = -30; 
    const targetPosition = mainContent.offsetTop - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

function animateText() {
    const letters = document.querySelectorAll('.letter');
    if (!letters || letters.length === 0) return;
    
    const lettersLength = letters.length;
    
    for (let i = 0; i < lettersLength; i++) {
        letters[i].style.opacity = '0';
    }
    
    for (let i = 0; i < lettersLength; i++) {
        setTimeout(() => {
            if (letters[i]) {  
                letters[i].style.opacity = '1';
            }
        }, i * 150); 
    }

    const totalDisplayTime = lettersLength * 150;
    
    setTimeout(() => {
        if (document.querySelectorAll('.letter').length > 0) {
            for (let i = 0; i < lettersLength; i++) {
                if (letters[i]) {
                    letters[i].style.opacity = '0';
                }
            }
            setTimeout(() => {
                if (document.querySelectorAll('.letter').length > 0) {
                    animateText();
                }
            }, 5000);
        }
    }, totalDisplayTime + 5000); 
}

function initializeModal() {
    const modal = document.getElementById("modal");
    if (!modal) return;
    
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalImage = document.getElementById("modal-image");
    const modalClose = document.getElementById("modal-close");

    document.addEventListener('click', function(e) {
        const gridItem = e.target.closest('.grid-item');
        if (gridItem) {
            const title = gridItem.getAttribute("data-title");
            const description = gridItem.getAttribute("data-description");
            const image = gridItem.getAttribute("data-image");

            if (modalTitle) modalTitle.textContent = title;
            if (modalDescription) modalDescription.innerHTML = description;
            
            if (modalImage && image) {
                modalImage.src = image;
            }

            modal.classList.add("active");
        }
    });

    if (modalClose) {
        modalClose.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
}

function initializeSidebar() {
    const sidebar = document.getElementById("sidebar");
    const hamburger = document.querySelector('.hamburger');
    const closeBtn = document.querySelector('.close-btn');
    
    if (!sidebar || !hamburger) return;

    function toggleSidebar() {
        const isOpen = sidebar.classList.contains('active');
        if (isOpen) {
            sidebar.style.width = "0";
            sidebar.classList.remove('active');
            hamburger.classList.remove('active');
        } else {
            sidebar.style.width = "250px";
            sidebar.classList.add('active');
            hamburger.classList.add('active');
        }
    }

    hamburger.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleSidebar();
    };

    if (closeBtn) {
        closeBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            sidebar.style.width = "0";
            sidebar.classList.remove('active');
            hamburger.classList.remove('active');
        };
    }

    document.onclick = function(e) {
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !hamburger.contains(e.target)) {
            sidebar.style.width = "0";
            sidebar.classList.remove('active');
            hamburger.classList.remove('active');
        }
    };

    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.onclick = function(e) {
            sidebar.style.width = "0";
            sidebar.classList.remove('active');
            hamburger.classList.remove('active');
            if (link.getAttribute('href') === window.location.pathname.split('/').pop()) {
                e.preventDefault();
            }
        };
    });

    sidebar.style.width = "0";
    sidebar.classList.remove('active');
    hamburger.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    
    if (document.querySelectorAll('.letter').length > 0) {
        animateText();
    }
    initializeModal();
    initializeScrollReveal();
    initializeCardAnimations();

    const introSection = document.getElementById('intro');
    if (introSection) {
        const introParagraphs = introSection.querySelectorAll('p');
        introParagraphs.forEach((p, index) => {
            p.style.setProperty('--paragraph-index', index);
        });

        const rect = introSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setTimeout(() => {
                introSection.classList.add('reveal');
            }, 500);
        }
    }
    
    window.addEventListener('scroll', function() {
        const introSection = document.getElementById('intro');
        if (introSection) {
            const rect = introSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                introSection.classList.add('reveal');
            }
        }
    });
    
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', scrollToContent);
    }
});

function initializeScrollReveal() {
    const sections = document.querySelectorAll('.section');
    if (!sections.length) return;
    
    sections.forEach(section => {
        section.classList.remove('reveal');
        
        if (section.id === 'intro') {
            const paragraphs = section.querySelectorAll('p');
            paragraphs.forEach((p, index) => {
                p.style.setProperty('--paragraph-index', index);
                p.style.opacity = '0';
                p.style.transform = 'translateY(20px)';
            });
        }
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                if (entry.target.id === 'intro') {
                    const paragraphs = entry.target.querySelectorAll('p');
                    paragraphs.forEach((p, index) => {
                        p.style.setProperty('--paragraph-index', index);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' 
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

function initializeCardAnimations() {
    const cardContainer = document.querySelector('.container');
    if (!cardContainer) return;
    
    const cards = cardContainer.querySelectorAll('.card');
    if (cards.length === 0) return;
    
    const cardObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            cardContainer.classList.add('animate-cards');
        } else {
            cardContainer.classList.remove('animate-cards');
        }
    }, { threshold: 0.1 });
    
    cardObserver.observe(cardContainer);
}
