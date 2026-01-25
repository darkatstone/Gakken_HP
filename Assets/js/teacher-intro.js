// Teacher Introduction Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get teacher data from sessionStorage
    const teacherDataStr = sessionStorage.getItem('teacherData');
    
    if (teacherDataStr) {
        const teacherData = JSON.parse(teacherDataStr);
        
        // Populate teacher detail section
        const teacherDetailContainer = document.querySelector('.teacher-detail-container');
        if (teacherDetailContainer) {
            // Get tags from teacher data if available
            const tags = teacherData.tags || ['古典文法', '古典文法', '古典文法', '古典文法', '古典文法'];
            const tagsHTML = tags.map(tag => `<span class="teacher-detail-tag">${tag}</span>`).join('');
            
            teacherDetailContainer.innerHTML = `
                <div class="teacher-detail-layout">
                    <div class="teacher-detail-left">
                        <div class="teacher-detail-profile">
                            <div class="teacher-detail-image-wrapper">
                                <img src="${teacherData.imageSrc}" alt="${teacherData.nameJp}" class="teacher-detail-image">
                                <div class="teacher-detail-play-button">
                                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="30" cy="30" r="30" fill="#FF0000"/>
                                        <path d="M24 18L42 30L24 42V18Z" fill="white"/>
                                    </svg>
                                </div>
                            </div>
                            <h2 class="teacher-detail-name-jp">${teacherData.nameJp}</h2>
                            <p class="teacher-detail-name-en">${teacherData.nameEn}</p>
                            <div class="teacher-detail-social">
                                <a href="#" class="social-link" aria-label="Twitter">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                </a>
                                <a href="#" class="social-link" aria-label="YouTube">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                </a>
                                <a href="#" class="social-link" aria-label="Instagram">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                            </div>
                            <div class="teacher-detail-tags">
                                ${tagsHTML}
                            </div>
                        </div>
                        <a href="javascript:history.back()" class="teacher-detail-back-button">戻る</a>
                    </div>
                    <div class="teacher-detail-right">
                        <div class="teacher-detail-intro">
                            <h3 class="teacher-detail-intro-title">基本紹介</h3>
                            <div class="teacher-detail-description">
                                <p>株式会社mooble 代表取締役社長・難関私大専門塾マナビズム代表。高校3年生のときに「人の夢を叶える人になる」ことを自分の人生のテーマに決め、起業家になることを決意。関西大学法学部在学中にアルバイトを掛け持ちして資金を貯め、19歳で学習塾FCとして独立。22歳でFCから脱退し、オリジナルブランドの学習塾である「マナビズム」を立ち上げる。教育系YouTuberとしても活動しており、これまで1000名以上を難関大に合格させてきたノウハウや勉強法を受験生に発信している。チャンネル登録者は4.8万人以上。これが認められ、様々な有名大学のオープンキャンパスで講演や受験対策講座を請け負っている。</p>
                            </div>
                        </div>
                        <div class="teacher-detail-video">
                            <h3 class="teacher-detail-video-title">講師の動画</h3>
                            <div class="teacher-detail-video-wrapper">
                                <div class="teacher-detail-video-placeholder">
                                    <img src="${teacherData.imageSrc}" alt="講師動画" class="teacher-detail-video-thumbnail">
                                    <div class="teacher-detail-video-play-overlay">
                                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="40" cy="40" r="40" fill="rgba(255, 0, 0, 0.8)"/>
                                            <path d="M32 24L56 40L32 56V24Z" fill="white"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="teacher-detail-books">
                            <h3 class="teacher-detail-books-title">講師が書いた教科書</h3>
                            <div class="teacher-detail-books-grid">
                                <div class="teacher-detail-book-item">
                                    <div class="teacher-detail-book-top">
                                        <div class="teacher-detail-book-image-wrapper">
                                            <img src="Assets/img/book1.png" alt="古典文法" class="teacher-detail-book-image">
                                        </div>
                                        <div class="teacher-detail-book-info">
                                            <p class="teacher-detail-book-title">古典文法</p>
                                            <p class="teacher-detail-book-author">著者: ${teacherData.nameJp}</p>
                                            <p class="teacher-detail-book-price">本体価格: 1,570円（税込）</p>
                                            <p class="teacher-detail-book-release">発売日: 2023年7月1日</p>
                                            <p class="teacher-detail-book-isbn">ISBN: 978-4-05-305570-5</p>
                                            <div class="teacher-detail-book-bottom">
                                                <a href="video-viewer.html" class="teacher-detail-book-button">購入はこちら</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="teacher-detail-book-item">
                                    <div class="teacher-detail-book-top">
                                        <div class="teacher-detail-book-image-wrapper">
                                            <img src="Assets/img/book1.png" alt="古典文法" class="teacher-detail-book-image">
                                        </div>
                                        <div class="teacher-detail-book-info">
                                            <p class="teacher-detail-book-title">古典文法</p>
                                            <p class="teacher-detail-book-author">著者: ${teacherData.nameJp}</p>
                                            <p class="teacher-detail-book-price">本体価格: 1,570円（税込）</p>
                                            <p class="teacher-detail-book-release">発売日: 2023年7月1日</p>
                                            <p class="teacher-detail-book-isbn">ISBN: 978-4-05-305570-5</p>
                                            <div class="teacher-detail-book-bottom">
                                                <a href="video-viewer.html" class="teacher-detail-book-button">購入はこちら</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="teacher-detail-book-item">
                                    <div class="teacher-detail-book-top">
                                        <div class="teacher-detail-book-image-wrapper">
                                            <img src="Assets/img/book1.png" alt="古典文法" class="teacher-detail-book-image">
                                        </div>
                                        <div class="teacher-detail-book-info">
                                            <p class="teacher-detail-book-title">古典文法</p>
                                            <p class="teacher-detail-book-author">著者: ${teacherData.nameJp}</p>
                                            <p class="teacher-detail-book-price">本体価格: 1,570円（税込）</p>
                                            <p class="teacher-detail-book-release">発売日: 2023年7月1日</p>
                                            <p class="teacher-detail-book-isbn">ISBN: 978-4-05-305570-5</p>
                                            <div class="teacher-detail-book-bottom">
                                                <a href="video-viewer.html" class="teacher-detail-book-button">購入はこちら</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="teacher-detail-book-item">
                                    <div class="teacher-detail-book-top">
                                        <div class="teacher-detail-book-image-wrapper">
                                            <img src="Assets/img/book1.png" alt="古典文法" class="teacher-detail-book-image">
                                        </div>
                                        <div class="teacher-detail-book-info">
                                            <p class="teacher-detail-book-title">古典文法</p>
                                            <p class="teacher-detail-book-author">著者: ${teacherData.nameJp}</p>
                                            <p class="teacher-detail-book-price">本体価格: 1,570円（税込）</p>
                                            <p class="teacher-detail-book-release">発売日: 2023年7月1日</p>
                                            <p class="teacher-detail-book-isbn">ISBN: 978-4-05-305570-5</p>
                                            <div class="teacher-detail-book-bottom">
                                                <a href="video-viewer.html" class="teacher-detail-book-button">購入はこちら</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Clear sessionStorage after use
        sessionStorage.removeItem('teacherData');
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
