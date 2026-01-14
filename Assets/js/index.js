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
        description: 'コンパクトにまとった授業動画でスピード攻略　各科目の要点を短時間でまとめた授業動画が全章に付いています。最速で最大効果を生む一流講義を、スマホひとつで受けることができます。',
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
        
        // Scroll progress rectangles
        const rectTopLeft = document.querySelector('.statement-rectangle-top-left');
        const rectBottomRight = document.querySelector('.statement-rectangle-bottom-right');
        
        function updateStatementRectangles() {
            if (!statementSection || !rectTopLeft || !rectBottomRight) return;
            
            const rect = statementSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionHeight = statementSection.offsetHeight;
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;
            
            // Calculate progress based on section center position
            // Progress grows from 0 to 1 as section center approaches viewport center
            // Then shrinks from 1 to 0 as section center passes viewport center
            let progress = 0;
            
            if (sectionTop < windowHeight && sectionBottom > 0) {
                // Section is in viewport
                const sectionCenter = sectionTop + (sectionHeight / 2);
                const viewportCenter = windowHeight / 2;
                
                // Distance from section center to viewport center
                const distance = Math.abs(sectionCenter - viewportCenter);
                
                // Maximum distance is when section center is at viewport top or bottom
                const maxDistance = windowHeight / 2 + sectionHeight / 2;
                
                // Progress is 1 when section center is at viewport center (distance = 0)
                // Progress is 0 when section center is far from viewport center
                // This creates a bell curve: grows to center, then shrinks
                progress = Math.max(0, 1 - (distance / maxDistance));
            }
            
            // Maximum width is 1/4 (25%) of screen width
            const maxWidth = window.innerWidth * 0.25;
            const currentWidth = maxWidth * progress;
            
            rectTopLeft.style.width = currentWidth + 'px';
            rectBottomRight.style.width = currentWidth + 'px';
        }
        
        // Update on scroll
        window.addEventListener('scroll', updateStatementRectangles, { passive: true });
        window.addEventListener('resize', updateStatementRectangles);
        
        // Initial update
        updateStatementRectangles();
        
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
    const heroSection = document.querySelector('.hero-section');
    
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
        } else {
            header.classList.remove('header-hidden');
            if (sidebarToggle) {
                sidebarToggle.classList.remove('visible');
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
        const heroSection = document.querySelector('.hero-section');
        const dotsContainer = document.getElementById('heroDotsContainer');
        
        if (!heroSection || !dotsContainer) return;
        
        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        const sectionWidth = heroSection.offsetWidth;
        const sectionHeight = heroSection.offsetHeight;
        const dotSpacing = 50; // Space between dots
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
        createStatementDots();
    });
    
    window.addEventListener('resize', function() {
        createHeroDots();
        createAboutDots();
        createStatementDots();
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
    
    // Create dots for statement section
    function createStatementDots() {
        const statementSection = document.querySelector('.statement-section');
        const dotsContainer = document.getElementById('statementDotsContainer');
        
        if (!statementSection || !dotsContainer) return;
        
        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        const sectionWidth = statementSection.offsetWidth;
        const sectionHeight = statementSection.offsetHeight;
        const dotSpacing = 50; // Space between dots
        const dotSize = 2; // Size of each dot
        
        // Calculate number of dots needed
        const cols = Math.ceil(sectionWidth / dotSpacing);
        const rows = Math.ceil(sectionHeight / dotSpacing);
        
        // Create dots
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const dot = document.createElement('div');
                dot.className = 'statement-dot';
                dot.style.left = (col * dotSpacing) + 'px';
                dot.style.top = (row * dotSpacing) + 'px';
                dotsContainer.appendChild(dot);
            }
        }
    }
    
    // Wrap each character in hero title with span for animation
    function wrapHeroTitleCharacters() {
        const heroTitle = document.getElementById('heroTitle');
        if (!heroTitle) return;
        
        const part1 = heroTitle.querySelector('.hero-title-part1');
        const part2 = heroTitle.querySelector('.hero-title-part2');
        
        let totalCharIndex = 0;
        
        if (part1 && !part1.querySelector('.hero-char')) {
            const text1 = part1.textContent;
            part1.innerHTML = text1.split('').map((char) => {
                if (char === ' ') return ' ';
                const delay = totalCharIndex * 1; // 1秒ずつ遅延
                totalCharIndex++;
                return `<span class="hero-char" style="--char-delay: ${delay}s">${char}</span>`;
            }).join('');
        }
        
        if (part2 && !part2.querySelector('.hero-char')) {
            const text2 = part2.textContent;
            part2.innerHTML = text2.split('').map((char) => {
                if (char === ' ') return ' ';
                const delay = totalCharIndex * 1; // 1秒ずつ遅延
                totalCharIndex++;
                return `<span class="hero-char" style="--char-delay: ${delay}s">${char}</span>`;
            }).join('');
        }
        
        // 全体のアニメーション時間を文字数×1秒に設定し、各文字に個別のキーフレームを生成
        const allChars = heroTitle.querySelectorAll('.hero-char');
        const totalChars = allChars.length;
        if (totalChars > 0) {
            const totalDuration = totalChars * 1; // 文字数×1秒
            
            // 各文字に個別のアニメーションを生成
            allChars.forEach((char, index) => {
                const delaySeconds = index * 1; // 各文字の開始遅延（秒）
                const delayPercent = (delaySeconds / totalDuration) * 100; // パーセンテージに変換
                const charDurationPercent = (1 / totalDuration) * 100; // 1秒分のパーセンテージ
                const charStartPercent = delayPercent;
                const charMidPercent = delayPercent + (charDurationPercent * 0.5);
                const charEndPercent = delayPercent + charDurationPercent;
                
                // 各文字に個別のアニメーション名を付ける
                const animationName = `charPulse-${index}`;
                char.style.animation = `${animationName} ${totalDuration}s ease-in-out infinite`;
                char.style.animationDelay = '0s'; // delayはキーフレーム内で処理
                
                // 個別のキーフレームを生成
                const styleId = `hero-char-animation-${index}`;
                let existingStyle = document.getElementById(styleId);
                if (existingStyle) {
                    existingStyle.remove();
                }
                
                const style = document.createElement('style');
                style.id = styleId;
                style.textContent = `
                    @keyframes ${animationName} {
                        0% {
                            transform: scale(1);
                        }
                        ${charStartPercent}% {
                            transform: scale(1);
                        }
                        ${charMidPercent}% {
                            transform: scale(1.3);
                        }
                        ${charEndPercent}% {
                            transform: scale(1);
                        }
                        100% {
                            transform: scale(1);
                        }
                    }
                `;
                document.head.appendChild(style);
            });
        }
    }
    
    // Initialize hero title character animation
    window.addEventListener('load', wrapHeroTitleCharacters);
    // Also run on DOMContentLoaded in case load event already fired
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', wrapHeroTitleCharacters);
    } else {
        wrapHeroTitleCharacters();
    }
    
});

