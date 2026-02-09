// Data Loader - Uses data.js file (loaded directly as JavaScript to avoid CORS issues)
// data.js must be loaded before this file in HTML

// These variables will be set from data.js
let teachersData = {};
let booksData = {};
let pageMapping = {};

// Load all data files (synchronous - data is already loaded from data.js)
function loadAllData() {
    // Use global variables from data.js (defined in data.js)
    if (typeof window.teachersData !== 'undefined') {
        teachersData = window.teachersData;
    }
    if (typeof window.booksData !== 'undefined') {
        booksData = window.booksData;
    }
    if (typeof window.pageMapping !== 'undefined') {
        pageMapping = window.pageMapping;
    }
    
    return Promise.resolve({ teachersData, booksData, pageMapping });
}

// Get teacher by ID
function getTeacherById(teacherId) {
    return teachersData.teachers?.find(teacher => teacher.id === teacherId) || null;
}

// Get book by ID
function getBookById(bookId) {
    return booksData.books?.find(book => book.id === bookId) || null;
}

// Get teachers for a page
function getTeachersForPage(pageName) {
    const teacherIds = pageMapping[pageName]?.teachers || [];
    return teacherIds.map(id => getTeacherById(id)).filter(teacher => teacher !== null);
}

// Get books for a page
function getBooksForPage(pageName) {
    const bookIds = pageMapping[pageName]?.books || [];
    return bookIds.map(id => getBookById(id)).filter(book => book !== null);
}

