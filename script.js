class BookCollection {
  constructor() {
    this.books = this.loadBooks();
    // const bookEl = document.getElementById("books").this.loadBooks();

    this.displayBooks();
    this.initializeNavigation();
  }

  initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        // Remove 'active' class from all links
        navLinks.forEach((l) => l.classList.remove('active'));
        // Add 'active' class to clicked link
        link.classList.add('active');

        // Get the section id from the data-section attribute
        const sectionId = link.dataset.section;
        this.switchSection(sectionId);
      });
    });
  }

  switchSection(sectionId, sections) {
    this.sections = document.querySelectorAll('.section');
    this.sections.forEach((section) => {
      section.classList.remove('active');
    });
    document.getElementById(sectionId, sections).classList.add('active');
  }

  loadBooks(storedBooks) {
    this.storedBooks = localStorage.getItem('books');
    return storedBooks ? JSON.parse(storedBooks) : [];
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  addBook(title, author) {
    const book = {
      title,
      author,
      id: Date.now().toString(),
    };
    this.books.push(book);
    this.saveBooks();
    this.displayBooks();
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.saveBooks();
    this.displayBooks();
  }

  displayBooks() {
    const booksList = document.getElementById('books-list');
    booksList.innerHTML = '';

    this.books.forEach((book) => {
      const bookElement = document.createElement('div');
      bookElement.className = 'book-item';
      bookElement.innerHTML = `   
                <div>
                    <span>"${book.title}" by ${book.author}</span>
                </div>
                <button class="remove-btn" onclick="bookCollection.removeBook('${book.id}')">
                    Remove
                </button>
            `;
      booksList.appendChild(bookElement);
    });
  }
}
// const lenght = BookCollection.length;
// console.log('the lenght is', lenght);

// Initialize the book collection
const bookCollection = new BookCollection();

// Handle form submission
function handleAddBook() {
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (title && author) {
    bookCollection.addBook(title, author);
    titleInput.value = '';
    authorInput.value = '';
  }
}

handleAddBook();