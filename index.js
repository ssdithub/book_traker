const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let books = []; // In-memory book list

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Add a new book
app.post('/books', (req, res) => {
  const book = req.body;
  books.push(book);
  res.status(201).json(book);
});

// Delete a book by title
app.delete('/books/:title', (req, res) => {
  const title = req.params.title;
  books = books.filter(book => book.title !== title);
  res.json({ message: 'Book deleted' });
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
