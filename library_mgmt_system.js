Here's a JavaScript code example that demonstrates an implementation of a library management system. This code simulates actions like adding/removing books, searching for books, and tracking their availability.

```javascript
// library_mgmt_system.js

// Book class representing a single book object
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.available = true;
  }
}

// Library class representing a collection of books and associated operations
class Library {
  constructor() {
    this.books = [];
  }

  // Add book to the library
  addBook(title, author, isbn) {
    const book = new Book(title, author, isbn);
    this.books.push(book);
    console.log("Book added:", book);
  }

  // Remove book from the library
  removeBook(isbn) {
    const index = this.books.findIndex(book => book.isbn === isbn);
    if (index !== -1) {
      const removedBook = this.books.splice(index, 1)[0];
      console.log("Book removed:", removedBook);
    } else {
      console.log("Book not found in the library.");
    }
  }

  // Search for books matching a given query
  searchBooks(query) {
    const queryLowerCase = query.toLowerCase();
    const results = this.books.filter(book => {
      const titleMatch = book.title.toLowerCase().includes(queryLowerCase);
      const authorMatch = book.author.toLowerCase().includes(queryLowerCase);
      const isbnMatch = book.isbn.toLowerCase().includes(queryLowerCase);
      return titleMatch || authorMatch || isbnMatch;
    });
    console.log("Search results:", results);
  }

  // Borrow book by ISBN
  borrowBook(isbn) {
    const book = this.books.find(book => book.isbn === isbn);
    if (book && book.available) {
      book.available = false;
      console.log("Book borrowed:", book);
    } else if (book && !book.available) {
      console.log("Book is already borrowed.");
    } else {
      console.log("Book not found in the library.");
    }
  }

  // Return a borrowed book by ISBN
  returnBook(isbn) {
    const book = this.books.find(book => book.isbn === isbn);
    if (book && !book.available) {
      book.available = true;
      console.log("Book returned:", book);
    } else if (book && book.available) {
      console.log("Book is already available in the library.");
    } else {
      console.log("Book not found in the library.");
    }
  }
}

// Example usage
const library = new Library();
library.addBook("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565");
library.addBook("To Kill a Mockingbird", "Harper Lee", "9780446310789");
library.addBook("Pride and Prejudice", "Jane Austen", "9780141439518");
library.searchBooks("great");
library.borrowBook("9780743273565");
library.borrowBook("9780743273565"); // Attempting to borrow twice
library.returnBook("9780743273565");
library.removeBook("9780446310789");
library.searchBooks("mockingbird");
```

Note: This code is simplified and doesn't cover edge cases or user interaction. It provides a basic structure for managing a library's book collection.