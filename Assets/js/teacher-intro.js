// Teacher Introduction Page JavaScript
document.addEventListener('DOMContentLoaded', async function() {
    // Load data first
    await loadAllData();
    
    // Get teacher data from sessionStorage
    const teacherDataStr = sessionStorage.getItem('teacherData');
    
    if (teacherDataStr) {
        const teacherData = JSON.parse(teacherDataStr);
        
        // Get teacher's books from data
        const teacherBooks = teacherData.books ? teacherData.books.map(bookId => getBookById(bookId)).filter(book => book !== null) : [];
        
        // Populate teacher detail section
        const teacherDetailContainer = document.querySelector('.teacher-detail-container');
        if (teacherDetailContainer) {
            // Get tags from teacher data
            const tags = teacherData.tags || [];
            const tagsHTML = tags.map(tag => `<span class="teacher-detail-tag">${tag}</span>`).join('');
            
            // Get reference books from teacher data
            const referenceBooks = teacherData.referenceBooks || [];
            const referenceBooksHTML = referenceBooks.map(book => {
                let firstLine = '';
                let secondLine = '';

                // ベーシック / スタンダード 系は単語ごとに改行
                if (book.startsWith('ベーシック')) {
                    firstLine = 'ベーシック';
                    secondLine = book.substring('ベーシック'.length);
                } else if (book.startsWith('スタンダード')) {
                    firstLine = 'スタンダード';
                    secondLine = book.substring('スタンダード'.length);
                } else {
                    // それ以外は従来どおり中央で分割
                    const midPoint = Math.ceil(book.length / 2);
                    firstLine = book.substring(0, midPoint);
                    secondLine = book.substring(midPoint);
                }

                return `<span class="teacher-detail-reference-book-tag">${firstLine}<br>${secondLine}</span>`;
            }).join('');
            
            // Social links
            const socialLinks = teacherData.socialLinks || {};
            const youtubeLink = socialLinks.youtube ? `<a href="${socialLinks.youtube}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>` : '';
            const twitterLink = socialLinks.twitter ? `<a href="${socialLinks.twitter}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>` : '';
            const instagramLink = socialLinks.instagram ? `<a href="${socialLinks.instagram}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>` : '';
            
            // Books HTML
            const booksHTML = teacherBooks.map(book => `
                <div class="teacher-detail-book-item">
                    <div class="teacher-detail-book-top">
                        <div class="teacher-detail-book-image-wrapper">
                            <img src="${book.coverImage}" alt="${book.title}" class="teacher-detail-book-image">
                        </div>
                        <div class="teacher-detail-book-info">
                            <p class="teacher-detail-book-title">${book.title}</p>
                            <p class="teacher-detail-book-author">著者: ${book.author}</p>
                            <p class="teacher-detail-book-price">本体価格: ${book.price}</p>
                            <p class="teacher-detail-book-release">発売日: ${book.releaseDate}</p>
                            <p class="teacher-detail-book-isbn">ISBN: ${book.isbn}</p>
                            <div class="teacher-detail-book-bottom">
                                <a href="#" class="teacher-detail-book-button" data-book-id="${book.id}">購入はこちら</a>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
            
            teacherDetailContainer.innerHTML = `
                <div class="teacher-detail-layout">
                    <div class="teacher-detail-left">
                        <div class="teacher-detail-profile">
                            <div class="teacher-detail-image-wrapper">
                                <img src="${teacherData.image || teacherData.imageSrc || 'Assets/img/teacher1.png'}" alt="${teacherData.nameJp}" class="teacher-detail-image">
                            </div>
                            <h2 class="teacher-detail-name-jp">${teacherData.nameJp}</h2>
                            <p class="teacher-detail-name-en">${teacherData.nameEn}</p>
                            <div class="teacher-detail-social">
                                ${youtubeLink}
                                ${twitterLink}
                                ${instagramLink}
                            </div>
                            <div class="teacher-detail-tags">
                                ${tagsHTML}
                            </div>
                            ${referenceBooksHTML ? `<div class="teacher-detail-reference-books">${referenceBooksHTML}</div>` : ''}
                        </div>
                    </div>
                    <div class="teacher-detail-right">
                        <div class="teacher-detail-intro">
                            <h3 class="teacher-detail-intro-title">PROFILE</h3>
                            <div class="teacher-detail-description">
                                <p>${teacherData.description || ''}</p>
                            </div>
                        </div>
                        <div class="teacher-detail-video">
                            <h3 class="teacher-detail-video-title">SAMPLE</h3>
                            <div class="teacher-detail-video-wrapper">
                                <video class="teacher-detail-video-element" preload="auto" muted>
                                    <source src="${teacherData.videoUrl || ''}" type="video/mp4">
                                    お使いのブラウザは動画タグをサポートしていません。
                                </video>
                                <div class="teacher-detail-video-play-overlay">
                                    <div class="teacher-detail-video-play-button">
                                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="40" cy="40" r="40" fill="#FF0000" fill-opacity="0.9"/>
                                            <path d="M32 24L32 56L56 40L32 24Z" fill="white"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="teacher-detail-books">
                            <h3 class="teacher-detail-books-title">LINEUP</h3>
                            <div class="teacher-detail-books-content">
                                <div class="teacher-detail-books-grid">
                                    ${booksHTML || '<p>書籍情報がありません</p>'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Handle video display - support both regular videos and YouTube URLs
            const videoElement = teacherDetailContainer.querySelector('.teacher-detail-video-element');
            const playOverlay = teacherDetailContainer.querySelector('.teacher-detail-video-play-overlay');
            const videoWrapper = teacherDetailContainer.querySelector('.teacher-detail-video-wrapper');
            
            if (videoElement && teacherData.videoUrl) {
                const videoUrl = teacherData.videoUrl;
                
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
                        if (videoWrapper) {
                            videoWrapper.innerHTML = `
                                <img src="${thumbnailUrl}" alt="Video thumbnail" class="teacher-detail-video-thumbnail" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;">
                                <div class="teacher-detail-video-play-overlay">
                                    <div class="teacher-detail-video-play-button">
                                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="40" cy="40" r="40" fill="#FF0000" fill-opacity="0.9"/>
                                            <path d="M32 24L32 56L56 40L32 24Z" fill="white"/>
                                        </svg>
                                    </div>
                                </div>
                                <iframe class="teacher-detail-video-iframe" style="display: none; width: 100%; height: 100%; position: absolute; top: 0; left: 0;" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            `;
                            
                            // Add click handler to play YouTube video
                            const thumbnail = videoWrapper.querySelector('.teacher-detail-video-thumbnail');
                            const overlay = videoWrapper.querySelector('.teacher-detail-video-play-overlay');
                            const iframe = videoWrapper.querySelector('.teacher-detail-video-iframe');
                            
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
            
            // Add click event listeners to book buttons
            const bookButtons = teacherDetailContainer.querySelectorAll('.teacher-detail-book-button[data-book-id]');
            bookButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const bookId = this.getAttribute('data-book-id');
                    const book = getBookById(bookId);
                    
                    if (book) {
                        // Prepare book data for book-intro page
                        const bookData = {
                            id: book.id,
                            title: book.title,
                            author: book.author,
                            authorId: book.authorId,
                            price: book.price,
                            releaseDate: book.releaseDate,
                            isbn: book.isbn,
                            coverImage: book.coverImage,
                            previewImages: book.previewImages || [],
                            previewImage: book.previewImage || (book.previewImages && book.previewImages[0]) || '',
                            description: book.description,
                            instructorImage: book.instructorImage || '',
                            instructorDescription: book.instructorDescription || '',
                            videoUrl: book.videoUrl || ''
                        };
                        
                        // Save to sessionStorage and navigate
                        sessionStorage.setItem('bookData', JSON.stringify(bookData));
                        window.location.href = 'book-intro.html';
                    }
                });
            });
        }
        
        // Keep sessionStorage data for page reload
        // sessionStorage.removeItem('teacherData'); // Removed to preserve data on reload
    } else {
        // If no teacher data, redirect back or show message
        const teacherDetailContainer = document.querySelector('.teacher-detail-container');
        if (teacherDetailContainer) {
            teacherDetailContainer.innerHTML = `
                <div class="teacher-detail-content">
                    <p>講師情報が見つかりませんでした。</p>
                    <a href="u-exam.html" class="back-link">講師一覧に戻る</a>
                </div>
            `;
        }
    }
    
    // Create hero dots
    function createHeroDots() {
        const heroSection = document.querySelector('.teacher-intro-hero-section');
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
