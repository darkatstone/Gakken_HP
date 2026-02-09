// Dynamic Content Loader - Generates teachers and books HTML from data
// This should be loaded after data-loader.js

async function loadPageContent(pageName) {
    // Wait for data to be loaded
    await loadAllData();
    
    // Get teachers and books for this page
    const teachers = getTeachersForPage(pageName);
    const books = getBooksForPage(pageName);
    
    // Generate teachers HTML
    const teachersContainer = document.querySelector('.teachers-container .teachers-grid');
    if (teachersContainer) {
        if (teachers.length > 0 && teachers[0] && teachers[0].id) {
            teachersContainer.innerHTML = teachers.map(teacher => generateTeacherHTML(teacher)).join('');
        } else {
            // If no teachers data, show coming soon message
            teachersContainer.innerHTML = '<div class="coming-soon-message">COMING SOON</div>';
        }
    }
    
    // Generate books HTML
    const booksContainer = document.querySelector('.books-container .books-grid');
    if (booksContainer) {
        if (books.length > 0 && books[0] && books[0].id) {
            booksContainer.innerHTML = books.map(book => generateBookHTML(book)).join('');
        } else {
            // If no books data, show coming soon message
            booksContainer.innerHTML = '<div class="coming-soon-message">COMING SOON</div>';
        }
    }
    
    // Re-initialize event listeners after content is loaded
    initializeTeacherCards();
    initializeBookCards();
    initializeHiragana();
}

function generateTeacherHTML(teacher) {
    // 科目タグ（常に1行表示）
    const subjectTagsHTML = (teacher.tags || []).map(tag => {
        return `<span class="teacher-tag teacher-tag-singleline">${tag}</span>`;
    }).join('');
    
    // 参考書タグ（2行表示）
    const referenceBooksHTML = (teacher.referenceBooks || []).map(book => {
        // テキストを2行に分割（中央で分割）
        const midPoint = Math.ceil(book.length / 2);
        const firstLine = book.substring(0, midPoint);
        const secondLine = book.substring(midPoint);
        return `<span class="teacher-reference-book-tag teacher-reference-book-tag-singleline">${firstLine}<br>${secondLine}</span>`;
    }).join('');
    
    const hiraganaHTML = teacher.nameJpHiragana ? `<p class="teacher-name-jp-hiragana">${teacher.nameJpHiragana}</p>` : '';
    
    return `
        <div class="teacher-grid-item" data-teacher-id="${teacher.id}" data-teacher-description="${escapeHtml(teacher.description)}">
            <div class="teacher-card">
                <div class="teacher-image-wrapper">
                    <img src="${teacher.image}" alt="${teacher.nameJp}" class="teacher-image">
                </div>
                <p class="teacher-name-en">${teacher.nameEn}</p>
                ${hiraganaHTML}
                <h3 class="teacher-name-jp">${teacher.nameJp}</h3>
                ${subjectTagsHTML ? `<div class="teacher-tags">${subjectTagsHTML}</div>` : ''}
                ${referenceBooksHTML ? `<div class="teacher-reference-books">${referenceBooksHTML}</div>` : ''}
            </div>
        </div>
    `;
}

function generateBookHTML(book) {
    const previewImage = Array.isArray(book.previewImages) && book.previewImages.length > 0 
        ? book.previewImages[0] 
        : (book.previewImage || 'Assets/img/book_page.jpg');
    
    return `
        <div class="book-grid-item" 
             data-book-id="${book.id}"
             data-book-title="${escapeHtml(book.title)}"
             data-book-author="${escapeHtml(book.author)}"
             data-book-price="${escapeHtml(book.price)}"
             data-book-release="${escapeHtml(book.releaseDate)}"
             data-book-isbn="${escapeHtml(book.isbn)}"
             data-book-image="${previewImage}"
             data-book-description="${escapeHtml(book.description)}">
            <div class="book-card">
                <div class="book-image-wrapper">
                    <img src="${book.coverImage}" alt="${book.title}" class="book-image">
                </div>
            </div>
        </div>
    `;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function initializeTeacherCards() {
    const teacherCards = document.querySelectorAll('.teacher-card');
    teacherCards.forEach((card) => {
        // Skip if already has listener
        if (card.hasAttribute('data-listener-attached')) return;
        
        card.setAttribute('data-listener-attached', 'true');
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const gridItem = card.closest('.teacher-grid-item');
            const teacherId = gridItem?.getAttribute('data-teacher-id');
            
            if (teacherId && typeof getTeacherById === 'function') {
                const teacher = getTeacherById(teacherId);
                if (teacher) {
                    sessionStorage.setItem('teacherData', JSON.stringify(teacher));
                    window.location.href = 'teacher-intro.html';
                    return;
                }
            }
            
            // Fallback to old method for backward compatibility
            const nameJp = card.querySelector('.teacher-name-jp')?.textContent || '';
            const nameEn = card.querySelector('.teacher-name-en')?.textContent || '';
            const description = gridItem?.getAttribute('data-teacher-description') || '';
            const imageSrc = card.querySelector('.teacher-image')?.src || '';
            const tagElements = card.querySelectorAll('.teacher-tag');
            const tags = Array.from(tagElements).map(tag => tag.textContent.trim()).filter(tag => tag);
            
            sessionStorage.setItem('teacherData', JSON.stringify({
                nameJp: nameJp,
                nameEn: nameEn,
                description: description,
                imageSrc: imageSrc,
                tags: tags
            }));
            window.location.href = 'teacher-intro.html';
        });
    });
}

function initializeBookCards() {
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach((card) => {
        // Remove existing event listeners
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        
        newCard.style.cursor = 'pointer';
        newCard.addEventListener('click', function() {
            const gridItem = newCard.closest('.book-grid-item');
            const bookId = gridItem?.getAttribute('data-book-id');
            
            if (bookId) {
                const book = getBookById(bookId);
                if (book) {
                    // Get author teacher data if available
                    const author = book.authorId ? getTeacherById(book.authorId) : null;
                    
                    const bookData = {
                        ...book,
                        instructorImage: author?.image || book.instructorImage || 'Assets/img/teacher1.png',
                        authorImage: author?.image || book.instructorImage || 'Assets/img/teacher1.png',
                        instructorDescription: author?.description || book.instructorDescription || ''
                    };
                    
                    sessionStorage.setItem('bookData', JSON.stringify(bookData));
                    window.location.href = 'book-intro.html';
                }
            } else {
                // Fallback to old method for backward compatibility
                const title = gridItem?.getAttribute('data-book-title') || '';
                const author = gridItem?.getAttribute('data-book-author') || '';
                const price = gridItem?.getAttribute('data-book-price') || '';
                const releaseDate = gridItem?.getAttribute('data-book-release') || '';
                const isbn = gridItem?.getAttribute('data-book-isbn') || '';
                const previewImage = gridItem?.getAttribute('data-book-image') || 'Assets/img/book_page.jpg';
                const coverImage = newCard.querySelector('.book-image')?.src || 'Assets/img/book1.png';
                const description = gridItem?.getAttribute('data-book-description') || '';
                
                const bookData = {
                    title: title,
                    author: author,
                    price: price,
                    releaseDate: releaseDate,
                    isbn: isbn,
                    previewImage: previewImage,
                    coverImage: coverImage,
                    description: description,
                    instructorImage: 'Assets/img/teacher1.png',
                    authorImage: 'Assets/img/teacher1.png',
                    instructorDescription: ''
                };
                
                sessionStorage.setItem('bookData', JSON.stringify(bookData));
                window.location.href = 'book-intro.html';
            }
        });
    });
}

function initializeHiragana() {
    // Initialize hiragana conversion if needed
    const teacherCards = document.querySelectorAll('.teacher-card');
    teacherCards.forEach((card) => {
        const nameJpElement = card.querySelector('.teacher-name-jp');
        const hiraganaElement = card.querySelector('.teacher-name-jp-hiragana');
        
        if (nameJpElement && !hiraganaElement) {
            const gridItem = card.closest('.teacher-grid-item');
            const teacherId = gridItem?.getAttribute('data-teacher-id');
            
            if (teacherId) {
                const teacher = getTeacherById(teacherId);
                if (teacher && teacher.nameJpHiragana) {
                    const hiragana = document.createElement('p');
                    hiragana.className = 'teacher-name-jp-hiragana';
                    hiragana.textContent = teacher.nameJpHiragana;
                    nameJpElement.parentNode.insertBefore(hiragana, nameJpElement);
                }
            }
        }
    });
}

// Get page name from current HTML file
function getCurrentPageName() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    
    const pageMap = {
        'u-exam.html': 'u-exam',
        'high-school-exam.html': 'high-school-exam',
        'english.html': 'english',
        'toeic.html': 'toeic'
    };
    
    return pageMap[filename] || null;
}
