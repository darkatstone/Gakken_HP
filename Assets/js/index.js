// Features content data
const featuresData = {
    1: {
        imageSrc: 'Assets/img/feature1.png',
        title: '名物講義がスマホで受けられる',
        description: '授業動画・参考書・ミニブックが受験勉強を完全サポート。理解から暗記まで、充実した学習ツールが揃っています。',
        summary: '理解から暗記まで充実の学習ツール',
        layout: 'image-left', // image on left, text on right
        circleNumber: '01',
        circlePosition: 'left', // circle on left side
        dotsPosition: 'right' // dots on bottom right
    },
    2: {
        imageSrc: 'Assets/img/feature2.png',
        title: '最速で最大効果スマホで一流の講義',
        description: 'コンパクトにまとめた授業動画で、スピード攻略。各科目の要点を短時間で学べる授業動画が、全章に付いています。最速で最大の効果を生む一流講義を、スマホひとつで受講できます。',
        summary: '最速で最大効果スマホで一流の講義',
        layout: 'image-right', // image on right, text on left
        circleNumber: '02',
        circlePosition: 'right', // circle on right side
        dotsPosition: 'left' // dots on bottom left
    },
    3: {
        imageSrc: 'Assets/img/feature1.png', // Placeholder - update with actual image
        title: '授業動画に完全対応した解説が理解を深化',
        description: '講義調の語りかけるような文章で、やさしく嚙み砕いて解説しています。動画と参考書で絶対に挫折させません。',
        summary: '動画と参考書で絶対に挫折させない',
        layout: 'image-left', // same as feature 1
        circleNumber: '03',
        circlePosition: 'left', // circle on left side
        dotsPosition: 'right' // dots on bottom right
    },
    4: {
        imageSrc: 'Assets/img/feature2.png', // Placeholder - update with actual image
        title: 'ミニブックでいつでもどこでも復習できる',
        description: '覚えるべき知識は付属のミニブックにまとめて掲載。知識の定着をどこまでもサポートします。',
        summary: '知識の定着をどこまでもサポート',
        layout: 'image-right', // same as feature 2
        circleNumber: '04',
        circlePosition: 'right', // circle on right side
        dotsPosition: 'left' // dots on bottom left
    }
};

// Function to update feature section content with smooth transition
function updateFeatureContent(featureNumber) {
    const feature = featuresData[featureNumber];
    if (!feature) {
        console.error('Feature data not found for:', featureNumber);
        return;
    }
    
    const featuresSection = document.getElementById('featuresSection');
    const featureImage = document.getElementById('featureImage');
    const featureTitle = document.getElementById('featureTitle');
    const featureDescription = document.getElementById('featureDescription');
    const featureSummary = document.getElementById('featureSummary');
    const featuresContent = document.querySelector('.features-content');
    
    if (!featuresSection) {
        console.error('featuresSection element not found');
        return;
    }
    if (!featureImage || !featureTitle || !featureDescription || !featureSummary || !featuresContent) {
        console.error('One or more feature elements not found');
        return;
    }
    
    // Check if we're switching features (not initial load)
    const currentFeature = featuresSection.classList.contains('feature-1') ? 1 : 
                          featuresSection.classList.contains('feature-2') ? 2 :
                          featuresSection.classList.contains('feature-3') ? 3 :
                          featuresSection.classList.contains('feature-4') ? 4 : null;
    const isSwitching = currentFeature !== null && currentFeature !== featureNumber;
    
    // If switching, fade out first and reset circle animation
    if (isSwitching) {
        featuresSection.classList.add('transitioning');
        
        // Reset circle animation by temporarily removing visible class
        const wasVisible = featuresSection.classList.contains('visible');
        if (wasVisible) {
            featuresSection.classList.remove('visible');
        }
        
        // Wait for fade out, then update content and fade in
        setTimeout(() => {
            // Update content
            featureImage.src = feature.imageSrc;
            featureImage.alt = `Feature ${featureNumber}`;
            featureTitle.textContent = feature.title;
            featureDescription.textContent = feature.description;
            featureSummary.textContent = feature.summary;
            
            // Update layout (only on desktop, responsive will override)
            if (window.innerWidth > 1024) {
                if (feature.layout === 'image-right') {
                    featuresContent.style.flexDirection = 'row-reverse';
                } else {
                    featuresContent.style.flexDirection = 'row';
                }
            } else {
                // Tablet and mobile: always column
                featuresContent.style.flexDirection = 'column';
            }
            
            // Update section class for CSS styling
            featuresSection.className = 'features-section';
            if (featureNumber === 1) {
                featuresSection.classList.add('feature-1');
            } else if (featureNumber === 2) {
                featuresSection.classList.add('feature-2');
            } else if (featureNumber === 3) {
                featuresSection.classList.add('feature-3');
            } else if (featureNumber === 4) {
                featuresSection.classList.add('feature-4');
            }
            
            // Remove transitioning class to fade in
            setTimeout(() => {
                featuresSection.classList.remove('transitioning');
                // Re-add visible class to trigger circle and dot animations
                if (wasVisible) {
                    featuresSection.classList.add('visible');
                }
            }, 50);
        }, 400); // Half of transition duration (adjusted for slower animation)
    } else {
        // Initial load or same feature - update immediately
        featureImage.src = feature.imageSrc;
        featureImage.alt = `Feature ${featureNumber}`;
        featureTitle.textContent = feature.title;
        featureDescription.textContent = feature.description;
        featureSummary.textContent = feature.summary;
        
        // Update layout (only on desktop, responsive will override)
        if (window.innerWidth > 1024) {
            if (feature.layout === 'image-right') {
                featuresContent.style.flexDirection = 'row-reverse';
            } else {
                featuresContent.style.flexDirection = 'row';
            }
        } else {
            // Tablet and mobile: always column
            featuresContent.style.flexDirection = 'column';
        }
        
        // Update section class for CSS styling (preserve 'visible' class if it exists)
        const isVisible = featuresSection.classList.contains('visible');
        featuresSection.className = 'features-section';
        if (isVisible) {
            featuresSection.classList.add('visible');
        }
        if (featureNumber === 1) {
            featuresSection.classList.add('feature-1');
        } else if (featureNumber === 2) {
            featuresSection.classList.add('feature-2');
        } else if (featureNumber === 3) {
            featuresSection.classList.add('feature-3');
        } else if (featureNumber === 4) {
            featuresSection.classList.add('feature-4');
        }
    }
}


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
        const teachersTitleObserverOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const teachersTitleObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                const teachersTitle = document.querySelector('.teachers-intro-top .teachers-title-bg');
                if (teachersTitle) {
                    if (entry.isIntersecting) {
                        teachersTitle.classList.add('visible');
                    } else {
                        teachersTitle.classList.remove('visible');
                    }
                }
            });
        }, teachersTitleObserverOptions);
        
        teachersTitleObserver.observe(teachersIntroSection);
    }
    
    // Books Intro Section Title Observer
    const booksIntroSection = document.querySelector('.books-intro-section');
    if (booksIntroSection) {
        const booksTitleObserverOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const booksTitleObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                const booksTitle = document.querySelector('.books-intro-top .books-title-bg');
                if (booksTitle) {
                    if (entry.isIntersecting) {
                        booksTitle.classList.add('visible');
                    } else {
                        booksTitle.classList.remove('visible');
                    }
                }
            });
        }, booksTitleObserverOptions);
        
        booksTitleObserver.observe(booksIntroSection);
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
    
    // Initialize Swiper for Teachers Section
    const teachersSwiperElement = document.querySelector('.teachers-swiper');
    if (teachersSwiperElement) {
        const teachersSwiper = new Swiper('.teachers-swiper', {
            slidesPerView: 5,
            spaceBetween: 20,
            loop: true,
            centeredSlides: true,
            initialSlide: 0,
            speed: 1000,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.teachers-swiper .swiper-button-next',
                prevEl: '.teachers-swiper .swiper-button-prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    centeredSlides: false
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                    centeredSlides: true
                },
                1200: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                    centeredSlides: true
                }
            },
            on: {
                slideChange: function() {
                    updateTeacherDescription(this);
                }
            }
        });
        
        // Function to update teacher description
        function updateTeacherDescription(swiper) {
            // With centeredSlides: true, realIndex already points to the centered slide
            const realIndex = swiper.realIndex;
            
            // Get the slide at realIndex (this is the centered slide when centeredSlides is true)
            // In loop mode, we need to find the actual slide, not a duplicate
            let activeSlide = null;
            const slides = swiper.slides;
            
            // Find the slide that corresponds to realIndex
            // Swiper uses data-swiper-slide-index attribute for this in loop mode
            for (let i = 0; i < slides.length; i++) {
                const slideIndex = parseInt(slides[i].getAttribute('data-swiper-slide-index') || '-1');
                if (slideIndex === realIndex && !slides[i].classList.contains('swiper-slide-duplicate')) {
                    activeSlide = slides[i];
                    break;
                }
            }
            
            // Fallback: if not found, try to get by realIndex directly
            if (!activeSlide) {
                // Get all non-duplicate slides
                const nonDuplicateSlides = slides.filter(slide => 
                    !slide.classList.contains('swiper-slide-duplicate')
                );
                if (nonDuplicateSlides[realIndex]) {
                    activeSlide = nonDuplicateSlides[realIndex];
                } else if (slides[realIndex]) {
                    activeSlide = slides[realIndex];
                }
            }
            
            const descriptionContainer = document.querySelector('.teacher-description-container');
            const nameJpEl = descriptionContainer?.querySelector('.teacher-description-name-jp');
            const nameEnEl = descriptionContainer?.querySelector('.teacher-description-name-en');
            const descriptionTextEl = descriptionContainer?.querySelector('.teacher-description-text p');
            
            if (activeSlide && descriptionContainer) {
                // Get data from active slide or from the card content
                const card = activeSlide.querySelector('.teacher-card');
                if (card) {
                    const nameJp = card.querySelector('.teacher-name-jp')?.textContent || '';
                    const nameEn = card.querySelector('.teacher-name-en')?.textContent || '';
                    
                    // Get description from data attribute or use default
                    const description = activeSlide.getAttribute('data-teacher-description') || 
                                      `${nameJp}の詳細情報がここに表示されます。`;
                    
                    if (nameJpEl) nameJpEl.textContent = nameJp;
                    if (nameEnEl) nameEnEl.textContent = nameEn;
                    if (descriptionTextEl) descriptionTextEl.textContent = description;
                }
            }
        }
        
        // Initialize description on page load
        if (teachersSwiper) {
            updateTeacherDescription(teachersSwiper);
        }
        
        // Add click event to teacher cards
        // Add click event to book cards
        const bookCards = document.querySelectorAll('.book-card');
        bookCards.forEach((card) => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                const slide = card.closest('.swiper-slide');
                const title = slide?.getAttribute('data-book-title') || '';
                const author = slide?.getAttribute('data-book-author') || '';
                const price = slide?.getAttribute('data-book-price') || '';
                const releaseDate = slide?.getAttribute('data-book-release') || '';
                const isbn = slide?.getAttribute('data-book-isbn') || '';
                const previewImage = slide?.getAttribute('data-book-image') || 'Assets/img/book_page.jpg';
                const coverImage = card.querySelector('.book-image')?.src || 'Assets/img/book1.png';
                const description = slide?.getAttribute('data-book-description') || '';
                
                // Store book data in sessionStorage
                const bookData = {
                    title: title,
                    author: author,
                    price: price,
                    releaseDate: releaseDate,
                    isbn: isbn,
                    previewImage: previewImage,
                    coverImage: coverImage,
                    description: description,
                    instructorImage: 'Assets/img/study.png', // Video thumbnail image
                    authorImage: 'Assets/img/teacher1.png', // Author profile image (can be different)
                    instructorDescription: '株式会社mooble 代表取締役社長・難関私大専門塾マナビズム代表。高校3年生のときに「人の夢を叶える人になる」ことを自分の人生のテーマに決め、起業家になることを決意。関西大学法学部在学中にアルバイトを掛け持ちして資金を貯め、19歳で学習塾FCとして独立。22歳でFCから脱退し、オリジナルブランドの学習塾である「マナビズム」を立ち上げる。教育系YouTuberとしても活動しており、これまで1000名以上を難関大に合格させてきたノウハウや勉強法を受験生に発信している。<br>チャンネル登録者は4.8万人以上。これが認められ、様々な有名大学のオープンキャンパスで講演や受験対策講座を請け負っている。'
                };
                
                sessionStorage.setItem('bookData', JSON.stringify(bookData));
                window.location.href = 'book-intro.html';
            });
        });
        
        const teacherCards = document.querySelectorAll('.teacher-card');
        teacherCards.forEach((card, index) => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                const slide = card.closest('.swiper-slide');
                const nameJp = card.querySelector('.teacher-name-jp')?.textContent || '';
                const nameEn = card.querySelector('.teacher-name-en')?.textContent || '';
                const description = slide?.getAttribute('data-teacher-description') || '';
                const imageSrc = card.querySelector('.teacher-image')?.src || '';
                
                // Get tags
                const tagElements = card.querySelectorAll('.teacher-tag');
                const tags = Array.from(tagElements).map(tag => tag.textContent.trim()).filter(tag => tag);
                
                // Store teacher data in sessionStorage
                sessionStorage.setItem('teacherData', JSON.stringify({
                    nameJp: nameJp,
                    nameEn: nameEn,
                    description: description,
                    imageSrc: imageSrc,
                    tags: tags
                }));
                
                // Navigate to teacher intro page
                window.location.href = 'teacher-intro.html';
            });
        });
        
        // Handle "View Details" button click for teachers section
        const teachersViewDetailsBtn = document.querySelector('.teachers-view-details-button .view-details-btn');
        if (teachersViewDetailsBtn) {
            teachersViewDetailsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the first teacher card (or active one if Swiper is initialized)
                let teacherCard = null;
                const teachersSwiper = document.querySelector('.teachers-swiper');
                
                if (teachersSwiper && teachersSwiper.swiper) {
                    // Get the active slide's teacher card
                    const activeSlide = teachersSwiper.swiper.slides[teachersSwiper.swiper.activeIndex];
                    teacherCard = activeSlide?.querySelector('.teacher-card');
                }
                
                // Fallback to first teacher card if no active slide found
                if (!teacherCard) {
                    teacherCard = document.querySelector('.teacher-card');
                }
                
                if (teacherCard) {
                    const slide = teacherCard.closest('.swiper-slide');
                    const nameJp = teacherCard.querySelector('.teacher-name-jp')?.textContent || '';
                    const nameEn = teacherCard.querySelector('.teacher-name-en')?.textContent || '';
                    const description = slide?.getAttribute('data-teacher-description') || '';
                    const imageSrc = teacherCard.querySelector('.teacher-image')?.src || '';
                    
                    // Get tags
                    const tagElements = teacherCard.querySelectorAll('.teacher-tag');
                    const tags = Array.from(tagElements).map(tag => tag.textContent.trim()).filter(tag => tag);
                    
                    // Store teacher data in sessionStorage
                    sessionStorage.setItem('teacherData', JSON.stringify({
                        nameJp: nameJp,
                        nameEn: nameEn,
                        description: description,
                        imageSrc: imageSrc,
                        tags: tags
                    }));
                }
                
                // Navigate to teacher intro page
                window.location.href = 'teacher-intro.html';
            });
        }
    }
    
    // Handle "View Details" button click for books section
    const booksViewDetailsBtn = document.querySelector('.books-view-details-button .view-details-btn');
    if (booksViewDetailsBtn) {
        booksViewDetailsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the first book card (or active one if Swiper is initialized)
            let bookCard = null;
            const booksSwiper = document.querySelector('.books-swiper');
            
            if (booksSwiper && booksSwiper.swiper) {
                // Get the active slide's book card
                const activeSlide = booksSwiper.swiper.slides[booksSwiper.swiper.activeIndex];
                bookCard = activeSlide?.querySelector('.book-card');
            }
            
            // Fallback to first book card if no active slide found
            if (!bookCard) {
                bookCard = document.querySelector('.book-card');
            }
            
            if (bookCard) {
                const slide = bookCard.closest('.swiper-slide');
                const title = slide?.getAttribute('data-book-title') || '';
                const author = slide?.getAttribute('data-book-author') || '';
                const price = slide?.getAttribute('data-book-price') || '';
                const releaseDate = slide?.getAttribute('data-book-release') || slide?.getAttribute('data-book-release-date') || '';
                const isbn = slide?.getAttribute('data-book-isbn') || '';
                const previewImage = slide?.getAttribute('data-book-image') || bookCard.querySelector('.book-image')?.src || 'Assets/img/book_page.jpg';
                const coverImage = bookCard.querySelector('.book-image')?.src || 'Assets/img/book1.png';
                const description = slide?.getAttribute('data-book-description') || '';
                
                // Store book data in sessionStorage
                const bookData = {
                    title: title,
                    author: author,
                    price: price,
                    releaseDate: releaseDate,
                    isbn: isbn,
                    previewImage: previewImage,
                    coverImage: coverImage,
                    description: description,
                    instructorImage: 'Assets/img/study.png', // Video thumbnail image
                    authorImage: 'Assets/img/teacher1.png', // Author profile image
                    instructorDescription: '株式会社mooble 代表取締役社長・難関私大専門塾マナビズム代表。高校3年生のときに「人の夢を叶える人になる」ことを自分の人生のテーマに決め、起業家になることを決意。関西大学法学部在学中にアルバイトを掛け持ちして資金を貯め、19歳で学習塾FCとして独立。22歳でFCから脱退し、オリジナルブランドの学習塾である「マナビズム」を立ち上げる。教育系YouTuberとしても活動しており、これまで1000名以上を難関大に合格させてきたノウハウや勉強法を受験生に発信している。<br>チャンネル登録者は4.8万人以上。これが認められ、様々な有名大学のオープンキャンパスで講演や受験対策講座を請け負っている。'
                };
                
                sessionStorage.setItem('bookData', JSON.stringify(bookData));
            }
            
            // Navigate to book intro page
            window.location.href = 'book-intro.html';
        });
    }
    
    // Initialize Swiper for Books Section
    const booksSwiperElement = document.querySelector('.books-swiper');
    if (booksSwiperElement) {
        const booksSwiper = new Swiper('.books-swiper', {
            slidesPerView: 5,
            spaceBetween: 20,
            loop: true,
            centeredSlides: true,
            initialSlide: 0,
            speed: 1000,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.books-swiper .swiper-button-next',
                prevEl: '.books-swiper .swiper-button-prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    centeredSlides: false
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                    centeredSlides: true
                },
                1200: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                    centeredSlides: true
                }
            },
            on: {
                slideChange: function() {
                    updateBookDescription(this);
                }
            }
        });
        
        // Function to update book description
        function updateBookDescription(swiper) {
            // With centeredSlides: true, realIndex already points to the centered slide
            const realIndex = swiper.realIndex;
            
            // Get the slide at realIndex (this is the centered slide when centeredSlides is true)
            let activeSlide = null;
            const slides = swiper.slides;
            
            // Find the slide that corresponds to realIndex
            for (let i = 0; i < slides.length; i++) {
                const slideIndex = parseInt(slides[i].getAttribute('data-swiper-slide-index') || '-1');
                if (slideIndex === realIndex && !slides[i].classList.contains('swiper-slide-duplicate')) {
                    activeSlide = slides[i];
                    break;
                }
            }
            
            // Fallback: if not found, try to get by realIndex directly
            if (!activeSlide) {
                const nonDuplicateSlides = slides.filter(slide => 
                    !slide.classList.contains('swiper-slide-duplicate')
                );
                if (nonDuplicateSlides[realIndex]) {
                    activeSlide = nonDuplicateSlides[realIndex];
                } else if (slides[realIndex]) {
                    activeSlide = slides[realIndex];
                }
            }
            
            const descriptionContainer = document.querySelector('.book-description-container');
            const titleEl = descriptionContainer?.querySelector('.book-description-title');
            const authorEl = descriptionContainer?.querySelector('.book-description-author');
            const priceEl = descriptionContainer?.querySelector('.book-description-price');
            const releaseEl = descriptionContainer?.querySelector('.book-description-release');
            const isbnEl = descriptionContainer?.querySelector('.book-description-isbn');
            const imageEl = descriptionContainer?.querySelector('.book-description-image');
            
            if (activeSlide && descriptionContainer) {
                // Get book information from data attributes
                const title = activeSlide.getAttribute('data-book-title') || '参考書タイトル';
                const author = activeSlide.getAttribute('data-book-author') || '';
                const price = activeSlide.getAttribute('data-book-price') || '';
                const release = activeSlide.getAttribute('data-book-release') || '';
                const isbn = activeSlide.getAttribute('data-book-isbn') || '';
                const image = activeSlide.getAttribute('data-book-image') || '';
                
                if (titleEl) titleEl.textContent = title;
                if (authorEl) authorEl.textContent = author ? `著者：${author}` : '';
                if (priceEl) priceEl.textContent = price ? `本体価格：${price}` : '';
                if (releaseEl) releaseEl.textContent = release ? `発売日：${release}` : '';
                if (isbnEl) isbnEl.textContent = isbn ? `ISBN：${isbn}` : '';
                if (imageEl && image) {
                    imageEl.src = image;
                    imageEl.alt = title || 'Book page';
                }
            }
        }
        
        // Initialize description on page load
        if (booksSwiper) {
            updateBookDescription(booksSwiper);
        }
    }
    
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

