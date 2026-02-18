// Book Introduction Page JavaScript
document.addEventListener('DOMContentLoaded', async function() {
    // Load data first
    await loadAllData();
    
    // Get book data from sessionStorage
    const bookDataStr = sessionStorage.getItem('bookData');
    
    if (bookDataStr) {
        const bookData = JSON.parse(bookDataStr);
        
        // Get author teacher data if available
        const author = bookData.authorId ? getTeacherById(bookData.authorId) : null;
        
        // Populate book detail section
        const bookDetailContainer = document.querySelector('.book-detail-container');
        if (bookDetailContainer) {
            bookDetailContainer.innerHTML = `
                <div class="book-detail-layout">
                    <div class="book-detail-left">
                        <div class="book-detail-profile">
                            <div class="book-detail-cover-wrapper">
                                <img src="${bookData.coverImage || 'Assets/img/book1.png'}" alt="${bookData.title || '本のカバー'}" class="book-detail-cover">
                            </div>
                            <div class="book-detail-info">
                                <p class="book-detail-meta"><strong>著者:</strong> ${bookData.author || '著者名'}</p>
                                <p class="book-detail-meta"><strong>本体価格:</strong> ${bookData.price || '価格'}</p>
                                <p class="book-detail-meta"><strong>発売日:</strong> ${bookData.releaseDate || '発売日'}</p>
                                <p class="book-detail-meta"><strong>ISBN:</strong> ${bookData.isbn || 'ISBN'}</p>
                                <div class="book-detail-purchase-button-wrapper">
                                    <a href="${bookData.purchaseUrl || '#'}" class="book-detail-purchase-button" ${bookData.purchaseUrl ? 'target="_blank" rel="noopener noreferrer"' : 'onclick="return false;"'}>購入はこちら</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="book-detail-right">
                        <div class="book-detail-section-block">
                            <h3 class="book-detail-section-title">IMAGE</h3>
                            <div class="book-detail-preview-images">
                                ${(bookData.previewImages || [bookData.previewImage || 'Assets/img/book_page.jpg']).map((img, index) => `
                                    <div class="book-preview-image-wrapper">
                                        <img src="${img}" alt="本の内容プレビュー${index + 1}" class="book-preview-image">
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="book-detail-section-block">
                            <h3 class="book-detail-section-title">SAMPLE</h3>
                            <div class="book-detail-video-main">
                                <video class="book-detail-video-element" preload="auto" muted>
                                    <source src="${bookData.videoUrl || ''}" type="video/mp4">
                                    お使いのブラウザは動画タグをサポートしていません。
                                </video>
                                <div class="book-detail-video-play-overlay">
                                    <div class="book-detail-video-play-button">
                                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="40" cy="40" r="40" fill="#FF0000" fill-opacity="0.9"/>
                                            <path d="M32 24L32 56L56 40L32 24Z" fill="white"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="book-detail-section-block">
                            <h3 class="book-detail-section-title">PROFILE</h3>
                            <div class="book-detail-instructor-profile">
                                <div class="book-detail-instructor-image-wrapper" data-teacher-id="${bookData.authorId || ''}" style="cursor: ${bookData.authorId ? 'pointer' : 'default'};">
                                    <img src="${author?.image || bookData.authorImage || bookData.instructorImage || 'Assets/img/teacher1.png'}" alt="講師" class="book-detail-instructor-image">
                                </div>
                                <div class="book-detail-instructor-description">
                                    <p>${author?.description || bookData.instructorDescription || bookData.description || '講師の説明文がここに表示されます。'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Handle video display - support both regular videos and YouTube URLs
            const videoElement = bookDetailContainer.querySelector('.book-detail-video-element');
            const playOverlay = bookDetailContainer.querySelector('.book-detail-video-play-overlay');
            const videoMain = bookDetailContainer.querySelector('.book-detail-video-main');
            
            if (videoElement && bookData.videoUrl) {
                const videoUrl = bookData.videoUrl;
                
                // Check if it's a YouTube URL
                if (videoUrl.includes('youtube.com/watch') || videoUrl.includes('youtu.be/') || videoUrl.includes('youtube.com/embed/')) {
                    // Extract YouTube video ID
                    let videoId = '';
                    if (videoUrl.includes('youtube.com/embed/')) {
                        // Embed format: https://www.youtube.com/embed/VIDEO_ID
                        videoId = videoUrl.split('youtube.com/embed/')[1]?.split('?')[0] || '';
                    } else if (videoUrl.includes('youtube.com/watch')) {
                        videoId = videoUrl.split('v=')[1]?.split('&')[0] || '';
                    } else if (videoUrl.includes('youtu.be/')) {
                        videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0] || '';
                    }
                    
                    if (videoId) {
                        // Get YouTube thumbnail (first frame)
                        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                        
                        // Replace video element with YouTube thumbnail and iframe
                        if (videoMain) {
                            videoMain.innerHTML = `
                                <img src="${thumbnailUrl}" alt="Video thumbnail" class="book-detail-video-thumbnail" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;">
                                <div class="book-detail-video-play-overlay">
                                    <div class="book-detail-video-play-button">
                                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="40" cy="40" r="40" fill="#FF0000" fill-opacity="0.9"/>
                                            <path d="M32 24L32 56L56 40L32 24Z" fill="white"/>
                                        </svg>
                                    </div>
                                </div>
                                <iframe class="book-detail-video-iframe" style="display: none; width: 100%; height: 100%; position: absolute; top: 0; left: 0;" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            `;
                            
                            // Add click handler to play YouTube video
                            const thumbnail = videoMain.querySelector('.book-detail-video-thumbnail');
                            const overlay = videoMain.querySelector('.book-detail-video-play-overlay');
                            const iframe = videoMain.querySelector('.book-detail-video-iframe');
                            
                            const playYouTube = function() {
                                if (thumbnail) thumbnail.style.display = 'none';
                                if (overlay) overlay.style.display = 'none';
                                if (iframe) {
                                    iframe.src = embedUrl;
                                    iframe.style.display = 'block';
                                }
                            };
                            
                            if (thumbnail) {
                                thumbnail.style.cursor = 'pointer';
                                thumbnail.addEventListener('click', playYouTube);
                            }
                            if (overlay) {
                                overlay.style.cursor = 'pointer';
                                overlay.addEventListener('click', playYouTube);
                            }
                        }
                    }
                } else {
                    // Regular video file - show first frame
                    videoElement.addEventListener('loadedmetadata', function() {
                        videoElement.currentTime = 0.1;
                    });
                    
                    videoElement.addEventListener('loadeddata', function() {
                        videoElement.currentTime = 0.1;
                    });
                    
                    const playVideo = function() {
                        if (videoElement.paused) {
                            videoElement.muted = false;
                            videoElement.play();
                            videoElement.setAttribute('controls', 'controls');
                            if (playOverlay) {
                                playOverlay.style.display = 'none';
                            }
                        }
                    };
                    
                    videoElement.style.cursor = 'pointer';
                    videoElement.addEventListener('click', playVideo);
                    
                    if (playOverlay) {
                        playOverlay.style.cursor = 'pointer';
                        playOverlay.addEventListener('click', playVideo);
                    }
                    
                    videoElement.addEventListener('play', function() {
                        if (playOverlay) {
                            playOverlay.style.display = 'none';
                        }
                    });
                }
            }
            
            // Add click event listener to instructor image wrapper
            const instructorImageWrapper = bookDetailContainer.querySelector('.book-detail-instructor-image-wrapper[data-teacher-id]');
            if (instructorImageWrapper && bookData.authorId) {
                instructorImageWrapper.addEventListener('click', function() {
                    const teacherId = this.getAttribute('data-teacher-id');
                    const teacher = getTeacherById(teacherId);
                    
                    if (teacher) {
                        // Prepare teacher data for teacher-intro page
                        const teacherData = {
                            id: teacher.id,
                            nameJp: teacher.nameJp,
                            nameEn: teacher.nameEn,
                            nameJpHiragana: teacher.nameJpHiragana,
                            image: teacher.image,
                            description: teacher.description,
                            tags: teacher.tags || [],
                            referenceBooks: teacher.referenceBooks || [],
                            videoUrl: teacher.videoUrl || '',
                            socialLinks: teacher.socialLinks || {},
                            books: teacher.books || []
                        };
                        
                        // Save to sessionStorage and navigate
                        sessionStorage.setItem('teacherData', JSON.stringify(teacherData));
                        window.location.href = 'teacher-intro.html';
                    }
                });
            }
        }
        
        // Keep sessionStorage data for page reload
        // sessionStorage.removeItem('bookData'); // Removed to preserve data on reload
    } else {
        // If no book data, redirect back or show message
        const bookDetailContainer = document.querySelector('.book-detail-container');
        if (bookDetailContainer) {
            bookDetailContainer.innerHTML = `
                <div class="book-detail-content">
                    <p>本の情報が見つかりませんでした。</p>
                    <a href="u-exam.html" class="back-link">本一覧に戻る</a>
                </div>
            `;
        }
    }
    
    // Create hero dots
    function createHeroDots() {
        const heroSection = document.querySelector('.book-intro-hero-section');
        const dotsContainer = document.getElementById('heroDotsContainer');
        
        if (!heroSection || !dotsContainer) return;
        
        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        const sectionWidth = heroSection.offsetWidth;
        const sectionHeight = heroSection.offsetHeight;
        const dotSpacing = 50;
        const dotSize = 3;
        
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
    });
    
    window.addEventListener('resize', function() {
        createHeroDots();
    });
});
