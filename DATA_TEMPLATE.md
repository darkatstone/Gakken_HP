# データテンプレート

## 講師データ構造 (`Assets/data/teachers.json`)

```json
{
  "id": "teacher-001",
  "nameJp": "講師名（日本語）",
  "nameEn": "TEACHER NAME",
  "nameJpHiragana": "ひらがな読み",
  "image": "Assets/img/teacher1.png",
  "description": "講師のプロフィール説明文",
  "tags": ["タグ1", "タグ2", "タグ3"],
  "videoUrl": "",
  "socialLinks": {
    "youtube": "",
    "twitter": "",
    "instagram": ""
  },
  "books": ["book-001"]
}
```

## 書籍データ構造 (`Assets/data/books.json`)

```json
{
  "id": "book-001",
  "title": "書籍タイトル",
  "author": "著者名",
  "authorId": "teacher-001",
  "price": "価格",
  "releaseDate": "発売日",
  "isbn": "ISBN",
  "coverImage": "Assets/img/book1.png",
  "previewImages": [
    "Assets/img/book_page.jpg",
    "Assets/img/book_page.jpg",
    "Assets/img/book_page.jpg"
  ],
  "description": "書籍の説明文",
  "instructorImage": "Assets/img/teacher1.png",
  "instructorDescription": "講師の説明文",
  "videoUrl": ""
}
```

## ページマッピング (`Assets/data/page-mapping.json`)

```json
{
  "u-exam": {
    "teachers": ["teacher-001", "teacher-002"],
    "books": ["book-001", "book-002"]
  }
}
```

## 使用方法

1. `Assets/data/teachers.json`に講師データを追加
2. `Assets/data/books.json`に書籍データを追加
3. `Assets/data/page-mapping.json`で各ページに表示する講師・書籍IDを指定
4. データは自動的に読み込まれ、動的に表示されます
