// Import Express
const express = require('express');

// Create Express App
const app = express();

// Server Port
const PORT = 3000;


// Parse JSON request bodies
app.use(express.json());

// Bonus: Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/* =========================
   In-Memory Book Data
========================= */
let books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", price: 500 },
  { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt", price: 650 }
];

/* =========================
   Routes
========================= */

/**
 * GET /books
 * Fetch all books
 */
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

/**
 * POST /books
 * Add a new book
 */
app.post('/books', (req, res) => {
  const { title, author, price } = req.body;

  // Validation (Bonus)
  if (!title || !author || !price) {
    return res.status(400).json({
      error: "Title, author, and price are required"
    });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    price
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

/**
 * PUT /books/:id
 * Update book details
 */
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author, price } = req.body;

  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({
      error: "Book not found"
    });
  }

  // Update only provided fields
  if (title) book.title = title;
  if (author) book.author = author;
  if (price) book.price = price;

  res.status(200).json(book);
});

/**
 * DELETE /books/:id
 * Delete a book
 */
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);

  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({
      error: "Book not found"
    });
  }

  const deletedBook = books.splice(index, 1);
  res.status(200).json({
    message: "Book deleted successfully",
    book: deletedBook[0]
  });
});

/* =========================
   Start Server
========================= */
app.listen(PORT, () => {
  console.log(`Bookstore API running on port ${PORT}`);
});