// Features section is now static HTML - no dynamic content updates needed
// All feature content is directly in HTML, CSS handles layout and animations

// updateFeatureContent() function removed - Features section is now static HTML

// Sidebar toggle functionality (used by both header mobile menu and sidebar toggle button)
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');
    
    function toggleSidebar() {
        if (sidebarMenu && sidebarOverlay) {
            const isActive = sidebarMenu.classList.contains('active');
            
            if (mobileMenuToggle) mobileMenuToggle.classList.toggle('active', !isActive);
            if (sidebarToggle) sidebarToggle.classList.toggle('active', !isActive);
            sidebarMenu.classList.toggle('active', !isActive);
            sidebarOverlay.classList.toggle('active', !isActive);
        }
    }
    
    function closeSidebar() {
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        if (sidebarToggle) sidebarToggle.classList.remove('active');
        if (sidebarMenu) sidebarMenu.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    }
    
    // Header mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });
    }
    
    // Sidebar toggle button (outside hero section)
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });
    }
    
    // Close sidebar
    if (sidebarClose) {
        sidebarClose.addEventListener('click', function() {
            closeSidebar();
        });
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            closeSidebar();
        });
    }
    
    // Close sidebar when clicking on links
    const sidebarLinks = sidebarMenu ? sidebarMenu.querySelectorAll('.sidebar-link, .sidebar-button') : [];
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeSidebar();
        });
    });
    
    // Scroll-triggered animations for all statement elements (top, middle, bottom)
    // Text appears when entering the section, circle and dots appear when fully in section
    const statementTexts = document.querySelectorAll('.statement-text-1, .statement-text-2, .statement-text-3, .statement-text-4, .statement-text-5, .statement-text-6, .statement-text-7');
    const statementLargeTexts = document.querySelectorAll('.statement-itsudemo, .statement-dokodemo, .statement-daredemo, .statement-nandodemo');
    
    // Observer for text elements - appears when entering section
    const statementTextObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const statementTextObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to title
                const statementTitle = document.querySelector('.statement-title-bg');
                if (statementTitle) {
                    statementTitle.classList.add('visible');
                }
                // Add visible class to all text elements when entering section
                statementTexts.forEach(text => {
                    text.classList.add('visible');
                });
                
                statementLargeTexts.forEach(text => {
                    text.classList.add('visible');
                });
            } else {
                // Remove visible class from title
                const statementTitle = document.querySelector('.statement-title-bg');
                if (statementTitle) {
                    statementTitle.classList.remove('visible');
                }
                // Remove visible class from all text elements when leaving section
                statementTexts.forEach(text => {
                    text.classList.remove('visible');
                });
                
                statementLargeTexts.forEach(text => {
                    text.classList.remove('visible');
                });
            }
        });
    }, statementTextObserverOptions);
    
    // Observer for circle and dots - appears at 80% of screen, disappears when completely invisible
    const statementCircleObserverOptions = {
        threshold: [0, 0.8, 1.0],
        rootMargin: '0px'
    };
    
    const statementCircleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            // Check if scroll is at top (scrollY === 0)
            if (window.scrollY === 0) {
                entry.target.classList.remove('visible');
                return;
            }
            
            // Appears when section reaches 80% visibility
            if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
                entry.target.classList.add('visible');
            } 
            // Disappears when section is completely invisible (intersectionRatio is 0)
            else if (!entry.isIntersecting || entry.intersectionRatio === 0) {
                entry.target.classList.remove('visible');
            }
        });
    }, statementCircleObserverOptions);
    
    // Observe the statement section with both observers
    const statementSection = document.querySelector('.statement-section');
    if (statementSection) {
        statementTextObserver.observe(statementSection);
        statementCircleObserver.observe(statementSection);
        
        // Also check scroll position on scroll event
        window.addEventListener('scroll', function() {
            if (window.scrollY === 0) {
                statementSection.classList.remove('visible');
            }
        });
    }
    
    // Scroll-triggered animations for all about elements (top, middle, bottom)
    // Text appears when entering the section, circle and dots appear when fully in section
    const aboutTexts = document.querySelectorAll('.about-text-1, .about-text-2, .about-text-3, .about-text-4, .about-text-5, .about-text-6, .about-text-7');
    
    // Observer for text elements - appears when entering section
    const aboutTextObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const aboutTextObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to section (for square and circle animations)
                entry.target.classList.add('visible');
                // Add visible class to title
                const aboutTitle = document.querySelector('.about-title-bg');
                if (aboutTitle) {
                    aboutTitle.classList.add('visible');
                }
                // Add visible class to all text elements when entering section
                aboutTexts.forEach(text => {
                    text.classList.add('visible');
                });
                // Add visible class to image
                const aboutImage = document.querySelector('.about-person-image');
                if (aboutImage) {
                    aboutImage.classList.add('visible');
                }
            } else {
                // Remove visible class from section
                entry.target.classList.remove('visible');
                // Remove visible class from title
                const aboutTitle = document.querySelector('.about-title-bg');
                if (aboutTitle) {
                    aboutTitle.classList.remove('visible');
                }
                // Remove visible class from all text elements when leaving section
                aboutTexts.forEach(text => {
                    text.classList.remove('visible');
                });
                // Remove visible class from image
                const aboutImage = document.querySelector('.about-person-image');
                if (aboutImage) {
                    aboutImage.classList.remove('visible');
                }
            }
        });
    }, aboutTextObserverOptions);
    
    // Observer for circle and dots - appears at 80% of screen, disappears when completely invisible
    const aboutCircleObserverOptions = {
        threshold: [0, 0.8, 1.0],
        rootMargin: '0px'
    };
    
    // Teachers Intro Section Title Observer
    const teachersIntroSection = document.querySelector('.teachers-intro-section');
    if (teachersIntroSection) {
        const teachersTitle = document.querySelector('.teachers-intro-top .teachers-title-bg');
        
        if (teachersTitle) {
            // Function to show the title
            const showTitle = () => {
                teachersTitle.classList.add('visible');
            };
            
            // Check if element is already visible on page load (after layout is complete)
            const checkInitialVisibility = () => {
                const rect = teachersIntroSection.getBoundingClientRect();
                const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
                // Check if section is visible (even partially)
                const isVisible = rect.top < viewportHeight && rect.bottom > 0;
                if (isVisible) {
                    showTitle();
                }
            };
            
            // Check immediately (might work if layout is already complete)
            checkInitialVisibility();
            
            // Check after a small delay to ensure layout is complete
            setTimeout(checkInitialVisibility, 100);
            setTimeout(checkInitialVisibility, 300);
            
            // Also check on window load
            if (document.readyState === 'complete') {
                checkInitialVisibility();
            } else {
                window.addEventListener('load', checkInitialVisibility);
            }
            
        const teachersTitleObserverOptions = {
                threshold: 0.01, // Trigger when even 1% is visible
                rootMargin: '0px'
        };
        
        const teachersTitleObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        showTitle();
                    } else {
                        // Only remove visible class if scrolled past the section
                        if (entry.boundingClientRect.top > window.innerHeight) {
                        teachersTitle.classList.remove('visible');
                    }
                }
            });
        }, teachersTitleObserverOptions);
        
        teachersTitleObserver.observe(teachersIntroSection);
        }
    }
    
    // Books Intro Section Title Observer
    const booksIntroSection = document.querySelector('.books-intro-section');
    if (booksIntroSection) {
        const booksTitle = document.querySelector('.books-intro-top .books-title-bg');
        
        if (booksTitle) {
            // Function to show the title
            const showTitle = () => {
                booksTitle.classList.add('visible');
            };
            
            // Check if element is already visible on page load (after layout is complete)
            const checkInitialVisibility = () => {
                const rect = booksIntroSection.getBoundingClientRect();
                const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
                // Check if section is visible (even partially)
                const isVisible = rect.top < viewportHeight && rect.bottom > 0;
                if (isVisible) {
                    showTitle();
                }
            };
            
            // Check immediately (might work if layout is already complete)
            checkInitialVisibility();
            
            // Check after a small delay to ensure layout is complete
            setTimeout(checkInitialVisibility, 100);
            setTimeout(checkInitialVisibility, 300);
            
            // Also check on window load
            if (document.readyState === 'complete') {
                checkInitialVisibility();
            } else {
                window.addEventListener('load', checkInitialVisibility);
            }
            
        const booksTitleObserverOptions = {
                threshold: 0.01, // Trigger when even 1% is visible
                rootMargin: '0px'
        };
        
        const booksTitleObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        showTitle();
                    } else {
                        // Only remove visible class if scrolled past the section
                        if (entry.boundingClientRect.top > window.innerHeight) {
                        booksTitle.classList.remove('visible');
                    }
                }
            });
        }, booksTitleObserverOptions);
        
        booksTitleObserver.observe(booksIntroSection);
        }
    }
    
    // News Section Title Observer
    const newsSection = document.querySelector('.news-section');
    if (newsSection) {
        const newsTitleObserverOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const newsTitleObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                const newsTitle = document.querySelector('.news-title-bg');
                if (newsTitle) {
                    if (entry.isIntersecting) {
                        newsTitle.classList.add('visible');
                    } else {
                        newsTitle.classList.remove('visible');
                    }
                }
            });
        }, newsTitleObserverOptions);
        
        newsTitleObserver.observe(newsSection);
    }
    
    // Footer Section Observer - Hide fixed background when footer appears
    const footerSection = document.querySelector('.footer-section');
    const fixedBackground = document.querySelector('.fixed-background');
    if (footerSection && fixedBackground) {
        const footerObserverOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };
        
        const footerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Footer is visible - hide fixed background
                    fixedBackground.style.opacity = '0';
                    fixedBackground.style.transition = 'opacity 0.5s ease';
                } else {
                    // Footer is not visible - show fixed background
                    fixedBackground.style.opacity = '1';
                }
            });
        }, footerObserverOptions);
        
        footerObserver.observe(footerSection);
    }
    
    const aboutCircleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            // Check if scroll is at top (scrollY === 0)
            if (window.scrollY === 0) {
                entry.target.classList.remove('visible');
                return;
            }
            
            // Appears when section reaches 80% visibility
            if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
                entry.target.classList.add('visible');
            } 
            // Disappears when section is completely invisible (intersectionRatio is 0)
            else if (!entry.isIntersecting || entry.intersectionRatio === 0) {
                entry.target.classList.remove('visible');
            }
        });
    }, aboutCircleObserverOptions);
    
    // Observe the about section with both observers
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        aboutTextObserver.observe(aboutSection);
        aboutCircleObserver.observe(aboutSection);
        
        // Also check scroll position on scroll event
        window.addEventListener('scroll', function() {
            if (window.scrollY === 0) {
                aboutSection.classList.remove('visible');
            }
        });
    }
    
    // Header visibility and mobile menu button based on Hero section scroll
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero-section') || document.querySelector('.teacher-intro-hero-section') || document.querySelector('.book-intro-hero-section') || document.querySelector('.video-viewer-hero-section');
    const fixedBottomButtons = document.querySelector('.fixed-bottom-buttons');
    
    function updateHeaderVisibility() {
        if (!heroSection || !header) return;
        
        const heroSectionHeight = heroSection.offsetHeight;
        const scrollY = window.scrollY;
        const heroScrollProgress = scrollY / heroSectionHeight;
        
        // When scrolled 80% of Hero section, hide header and show mobile menu button
        if (heroScrollProgress >= 0.8) {
            header.classList.add('header-hidden');
            if (sidebarToggle) {
                sidebarToggle.classList.add('visible');
            }
            if (fixedBottomButtons) {
                fixedBottomButtons.classList.add('visible');
            }
        } else {
            header.classList.remove('header-hidden');
            if (sidebarToggle) {
                sidebarToggle.classList.remove('visible');
            }
            if (fixedBottomButtons) {
                fixedBottomButtons.classList.remove('visible');
            }
        }
    }
    
    // Initial check
    updateHeaderVisibility();
    
    // Update on scroll
    window.addEventListener('scroll', function() {
        updateHeaderVisibility();
    });
    
    // Feature items animation - show only the item whose center is at viewport center
    const featureItems = document.querySelectorAll('.feature-item');
    
    // Function to remove visible class from all feature items except the specified one
    function setOnlyVisibleItem(visibleItem) {
        featureItems.forEach(item => {
            if (item === visibleItem) {
                item.classList.add('visible');
            } else {
                item.classList.remove('visible');
            }
        });
    }
    
    // Use Intersection Observer to detect when each feature-item enters viewport
    const featureObserverOptions = {
        threshold: 0.3, // Trigger when 30% of the item is visible
        rootMargin: '0px'
    };
    
    const featureObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Feature item entered viewport - add visible class for animation
                entry.target.classList.add('visible');
                
                // Update rectangle width for each feature
                if (entry.target.classList.contains('feature-1')) {
                    updateFeature1Rectangle(entry.target);
                } else if (entry.target.classList.contains('feature-2')) {
                    updateFeature2Rectangle(entry.target);
                } else if (entry.target.classList.contains('feature-3')) {
                    updateFeature3Rectangle(entry.target);
                } else if (entry.target.classList.contains('feature-4')) {
                    updateFeature4Rectangle(entry.target);
                }
            } else {
                // Feature item left viewport - remove visible class
                entry.target.classList.remove('visible');
                
                // Hide rectangle when leaving
                if (entry.target.classList.contains('feature-1')) {
                    hideFeature1Rectangle();
                } else if (entry.target.classList.contains('feature-2')) {
                    hideFeature2Rectangle();
                } else if (entry.target.classList.contains('feature-3')) {
                    hideFeature3Rectangle();
                } else if (entry.target.classList.contains('feature-4')) {
                    hideFeature4Rectangle();
                }
            }
        });
    }, featureObserverOptions);
    
    // Function to update rectangle width for feature1 (right side)
    function updateFeature1Rectangle(feature1Item) {
        const rectangle = document.querySelector('.feature-1-rectangle');
        if (!rectangle) return;
        
        const featureRect = feature1Item.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        // Calculate rectangle width from feature1 right edge to device right edge
        const featureRight = featureRect.right;
        const rectangleWidth = Math.max(0, viewportWidth - featureRight);
        
        rectangle.style.width = rectangleWidth + 'px';
    }
    
    // Function to hide rectangle for feature1
    function hideFeature1Rectangle() {
        const rectangle = document.querySelector('.feature-1-rectangle');
        if (!rectangle) return;
        rectangle.style.width = '0';
    }
    
    // Function to update rectangle width for feature2 (left side)
    function updateFeature2Rectangle(feature2Item) {
        const rectangle = document.querySelector('.feature-2-rectangle');
        if (!rectangle) return;
        
        const featureRect = feature2Item.getBoundingClientRect();
        
        // Calculate rectangle width from device left edge to feature2 left edge
        const featureLeft = featureRect.left;
        const rectangleWidth = Math.max(0, featureLeft);
        
        rectangle.style.width = rectangleWidth + 'px';
    }
    
    // Function to hide rectangle for feature2
    function hideFeature2Rectangle() {
        const rectangle = document.querySelector('.feature-2-rectangle');
        if (!rectangle) return;
        rectangle.style.width = '0';
    }
    
    // Function to update rectangle width for feature3 (right side, same as feature1)
    function updateFeature3Rectangle(feature3Item) {
        const rectangle = document.querySelector('.feature-3-rectangle');
        if (!rectangle) return;
        
        const featureRect = feature3Item.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        // Calculate rectangle width from feature3 right edge to device right edge
        const featureRight = featureRect.right;
        const rectangleWidth = Math.max(0, viewportWidth - featureRight);
        
        rectangle.style.width = rectangleWidth + 'px';
    }
    
    // Function to hide rectangle for feature3
    function hideFeature3Rectangle() {
        const rectangle = document.querySelector('.feature-3-rectangle');
        if (!rectangle) return;
        rectangle.style.width = '0';
    }
    
    // Function to update rectangle width for feature4 (left side, same as feature2)
    function updateFeature4Rectangle(feature4Item) {
        const rectangle = document.querySelector('.feature-4-rectangle');
        if (!rectangle) return;
        
        const featureRect = feature4Item.getBoundingClientRect();
        
        // Calculate rectangle width from device left edge to feature4 left edge
        const featureLeft = featureRect.left;
        const rectangleWidth = Math.max(0, featureLeft);
        
        rectangle.style.width = rectangleWidth + 'px';
    }
    
    // Function to hide rectangle for feature4
    function hideFeature4Rectangle() {
        const rectangle = document.querySelector('.feature-4-rectangle');
        if (!rectangle) return;
        rectangle.style.width = '0';
    }
    
    // Observe each feature item
    featureItems.forEach(item => {
        featureObserver.observe(item);
    });
    
    // Also handle features title visibility
    function updateFeaturesTitle() {
        const featuresSection = document.getElementById('featuresSection');
        const featuresTitle = document.querySelector('.features-title-bg');
        
        if (!featuresSection || !featuresTitle) return;
        
        const sectionRect = featuresSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const isSectionVisible = sectionRect.bottom > 0 && sectionRect.top < viewportHeight;
        
        if (isSectionVisible) {
            featuresTitle.classList.add('visible');
        } else {
            featuresTitle.classList.remove('visible');
        }
    }
    
    // Update features title and rectangle on scroll
    let scrollTimeout;
    function handleScroll() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateFeaturesTitle();
            // Update rectangle position for visible features
            const feature1Item = document.querySelector('.feature-item.feature-1.visible');
            if (feature1Item) {
                updateFeature1Rectangle(feature1Item);
            }
            const feature2Item = document.querySelector('.feature-item.feature-2.visible');
            if (feature2Item) {
                updateFeature2Rectangle(feature2Item);
            }
            const feature3Item = document.querySelector('.feature-item.feature-3.visible');
            if (feature3Item) {
                updateFeature3Rectangle(feature3Item);
            }
            const feature4Item = document.querySelector('.feature-item.feature-4.visible');
            if (feature4Item) {
                updateFeature4Rectangle(feature4Item);
            }
        }, 16);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial update
    updateFeaturesTitle();
    
    // Also update on resize
    window.addEventListener('resize', () => {
        updateFeaturesTitle();
        const feature1Item = document.querySelector('.feature-item.feature-1.visible');
        if (feature1Item) {
            updateFeature1Rectangle(feature1Item);
        }
        const feature2Item = document.querySelector('.feature-item.feature-2.visible');
        if (feature2Item) {
            updateFeature2Rectangle(feature2Item);
        }
        const feature3Item = document.querySelector('.feature-item.feature-3.visible');
        if (feature3Item) {
            updateFeature3Rectangle(feature3Item);
        }
        const feature4Item = document.querySelector('.feature-item.feature-4.visible');
        if (feature4Item) {
            updateFeature4Rectangle(feature4Item);
        }
    });
    
    // Create dots for hero section
    function createHeroDots() {
        const heroSection = document.querySelector('.hero-section') || 
                          document.querySelector('.teacher-intro-hero-section') || 
                          document.querySelector('.book-intro-hero-section') || 
                          document.querySelector('.video-viewer-hero-section');
        const dotsContainer = document.getElementById('heroDotsContainer');
        
        if (!heroSection || !dotsContainer) return;
        
        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        const sectionWidth = heroSection.offsetWidth;
        const sectionHeight = heroSection.offsetHeight;
        const dotSpacing = 40; // Space between dots (matching index.html)
        const dotSize = 2; // Size of each dot
        
        // Calculate number of dots needed
        const cols = Math.ceil(sectionWidth / dotSpacing);
        const rows = Math.ceil(sectionHeight / dotSpacing);
        
        // Create dots
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const dot = document.createElement('div');
                dot.className = 'hero-dot';
                dot.style.left = (col * dotSpacing) + 'px';
                dot.style.top = (row * dotSpacing) + 'px';
                dotsContainer.appendChild(dot);
            }
        }
    }
    
    // Create dots on load and resize
    window.addEventListener('load', function() {
        createHeroDots();
        createAboutDots();
    });
    
    window.addEventListener('resize', function() {
        createHeroDots();
        createAboutDots();
    });
    
    // Create dots for about section
    function createAboutDots() {
        const aboutSection = document.querySelector('.about-section');
        const dotsContainer = document.getElementById('aboutDotsContainer');
        
        if (!aboutSection || !dotsContainer) return;
        
        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        const sectionWidth = aboutSection.offsetWidth;
        const sectionHeight = aboutSection.offsetHeight;
        const dotSpacing = 50; // Space between dots
        const dotSize = 2; // Size of each dot
        
        // Calculate number of dots needed
        const cols = Math.ceil(sectionWidth / dotSpacing);
        const rows = Math.ceil(sectionHeight / dotSpacing);
        
        // Create dots
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const dot = document.createElement('div');
                dot.className = 'about-dot';
                dot.style.left = (col * dotSpacing) + 'px';
                dot.style.top = (row * dotSpacing) + 'px';
                dotsContainer.appendChild(dot);
            }
        }
    }
    
    // Teachers and Books sections are now handled by dynamic-content-loader.js
    // All teacher/book card click events, hiragana conversion, and tag handling
    // are managed in dynamic-content-loader.js for pages that use it
    
    // Books section is now using grid layout instead of Swiper
    // Create dots for teachers section
    function createTeachersDots() {
        const teachersSection = document.querySelector('.teachers-section');
        const dotsContainer = document.getElementById('teachersDotsContainer');
        
        if (!teachersSection || !dotsContainer) return;
        
        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        const sectionWidth = teachersSection.offsetWidth;
        const sectionHeight = teachersSection.offsetHeight;
        const dotSpacing = 60; // Space between dots
        const dotSize = 3; // Size of each dot
        
        // Calculate number of dots needed
        const cols = Math.ceil(sectionWidth / dotSpacing);
        const rows = Math.ceil(sectionHeight / dotSpacing);
        
        // Create dots
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const dot = document.createElement('div');
                dot.className = 'teachers-dot';
                dot.style.left = (col * dotSpacing) + 'px';
                dot.style.top = (row * dotSpacing) + 'px';
                dotsContainer.appendChild(dot);
            }
        }
    }
    
    // Create dots on load and resize
    window.addEventListener('load', function() {
        createTeachersDots();
    });
    
    window.addEventListener('resize', function() {
        createTeachersDots();
    });
    
});

