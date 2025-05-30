const form = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');
const API = 'http://localhost:5000/books';

// Load existing books
async function fetchBooks() {
  const res = await fetch(API);
  const books = await res.json();
  bookList.innerHTML = '';
  books.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `${book.title} by ${book.author}`;
    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.onclick = () => deleteBook(book.title);
    li.appendChild(btn);
    bookList.appendChild(li);
  });
}

// Handle book submission
form.onsubmit = async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author })
  });

  form.reset();
  fetchBooks();
};

// Delete a book
async function deleteBook(title) {
  await fetch(`${API}/${encodeURIComponent(title)}`, { method: 'DELETE' });
  fetchBooks();
}

fetchBooks();
