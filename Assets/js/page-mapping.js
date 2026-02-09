// Page Mapping Data - Maps pages to their teachers and books
// This file is loaded directly as JavaScript to avoid CORS issues with file:// protocol

window.pageMapping = {
  "u-exam": {
    "teachers": ["teacher-001", "teacher-002", "teacher-003", "teacher-004", "teacher-005", "teacher-006", "teacher-007", "teacher-013", "teacher-014", "teacher-015"],
    "books": [
      "book-001", "book-002", "book-003", "book-004", "book-005", "book-006", "book-007", 
      "book-008", "book-009", "book-010", "book-011", "book-012", "book-013", "book-014", 
      "book-015", "book-016", "book-017", "book-018", "book-024", "book-025", "book-026", "book-027"
    ]
  },
  "high-school-exam": {
    "teachers": [],
    "books": []
  },
  "english": {
    "teachers": ["teacher-008", "teacher-009", "teacher-010", "teacher-011", "teacher-012"],
    "books": ["book-019", "book-020", "book-021", "book-022", "book-023"]
  },
  "toeic": {
    "teachers": ["teacher-017", "teacher-018", "teacher-019"],
    "books": ["book-028", "book-029", "book-030", "book-031"]
  }
};
