// Book Introduction Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get book data from sessionStorage
    const bookDataStr = sessionStorage.getItem('bookData');
    
    if (bookDataStr) {
        const bookData = JSON.parse(bookDataStr);
        
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
                            </div>
                        </div>
                        <a href="javascript:history.back()" class="book-detail-back-button">戻る</a>
                    </div>
                    <div class="book-detail-right">
                        <div class="book-detail-section-block">
                            <h3 class="book-detail-section-title">${bookData.title || '本のタイトル'}</h3>
                            <div class="book-detail-preview-images">
                                <div class="book-preview-image-wrapper">
                                    <img src="${bookData.previewImage || 'Assets/img/book_page.jpg'}" alt="本の内容プレビュー1" class="book-preview-image">
                                </div>
                                <div class="book-preview-image-wrapper">
                                    <img src="${bookData.previewImage || 'Assets/img/book_page.jpg'}" alt="本の内容プレビュー2" class="book-preview-image">
                                </div>
                                <div class="book-preview-image-wrapper">
                                    <img src="${bookData.previewImage || 'Assets/img/book_page.jpg'}" alt="本の内容プレビュー3" class="book-preview-image">
                                </div>
                            </div>
                        </div>
                        <div class="book-detail-section-block">
                            <h3 class="book-detail-section-title">講師の動画</h3>
                            <div class="book-detail-video-main">
                                <img src="${bookData.instructorImage || 'Assets/img/teacher1.png'}" alt="講師の動画" class="book-detail-video-thumbnail">
                                <div class="book-detail-play-button">
                                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="30" cy="30" r="30" fill="#FF0000"/>
                                        <path d="M24 18L42 30L24 42V18Z" fill="white"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="book-detail-section-block">
                            <h3 class="book-detail-section-title">著者紹介</h3>
                            <div class="book-detail-instructor-profile">
                                <div class="book-detail-instructor-image-wrapper">
                                    <img src="${bookData.authorImage || bookData.instructorImage || 'Assets/img/teacher1.png'}" alt="講師" class="book-detail-instructor-image">
                                </div>
                                <div class="book-detail-instructor-description">
                                    <p>${bookData.instructorDescription || '講師の説明文がここに表示されます。'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Clear sessionStorage after use
        sessionStorage.removeItem('bookData');
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
