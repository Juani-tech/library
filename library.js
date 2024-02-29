const bookContainer = document.querySelector('.book-container');


class libraryDisplay {
    constructor(library) {
        this.library = library;
    }
    #createRemoveButton(books, index) {
        const removeButton = document.createElement('button');
        removeButton.textContent = "x"; 
        removeButton.setAttribute("id", index);
        removeButton.setAttribute("class", "remove-button")
        removeButton.addEventListener('click', (event) => {
            this.library.removeBook(event.target.id);
            this.renderLibrary(books);
        });
        return removeButton;
    }
    #createReadButton(books, index) {
        const readButton = document.createElement('button');
        readButton.textContent = "Change read status";
        readButton.setAttribute("id", index);
        readButton.setAttribute("class", "book-info");
        readButton.addEventListener('click', (event) => {
            this.library.changeReadStatus(event.target.id);
            this.renderLibrary(books);
        });
        return readButton;
    }
    createBookElements(book, books, index) {
        const title  = document.createElement('p');
        title.setAttribute("class", "book-info");
        const author = document.createElement('p');
        author.setAttribute("class", "book-info");
        const numberOfPages = document.createElement('p');
        numberOfPages.setAttribute("class", "book-info");
        const read = document.createElement('p');
        read.setAttribute("class", "book-info");

        const removeButton = this.#createRemoveButton(books, index);
        const readButton = this.#createReadButton(books, index);
        
        title.appendChild(document.createTextNode("Title: " + book.title));
        author.appendChild(document.createTextNode("Author: " + book.author));
        numberOfPages.appendChild(document.createTextNode("Number of pages: " + book.numberOfPages));
        read.appendChild(document.createTextNode("Read: " + book.read));

        return [title, author, numberOfPages, read, removeButton, readButton]

    }
    renderLibrary(books) { 
        bookContainer.innerHTML = '';
        for(let i = 0; i < books.length; i++) {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');

            const bookElements = this.createBookElements(books[i], books, i);

            bookElements.forEach(element => {
                bookDiv.appendChild(element);
            });

            bookContainer.appendChild(bookDiv);
        }
    }
}

class Library {
    #books = [];
    libraryDisplay = new libraryDisplay(this);
    constructor() {}
    addBook(book) {
        this.#books.push(book);      
    }
    removeBook(id) {
        this.#books.splice(id, 1);
    } 
    changeReadStatus(id) {
        this.#books[id].changeReadStatus();
    }
    displayBooks() {
        this.libraryDisplay.renderLibrary(this.#books);
    }

}


class Book {
    constructor(title, author, numberOfPages, read) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.read = read;
    }
    changeReadStatus() {
        this.read = !this.read;
    }
}

const myLibrary = new Library();


class HandleNewBookDialog {
    library = myLibrary;
    submitForm() {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const numberOfPages = document.getElementById('number-of-pages').value;
        const read = document.getElementById('read');
        this.library.addBook(new Book(title, author, numberOfPages, read.checked));
        this.library.displayBooks();
        this.dialog.close();
        this.newBookForm.reset();      
    }
    constructor() {
        this.dialog = document.querySelector('dialog');
        this.newBookButton = document.getElementById('new-book-button');
        this.quitButton = document.getElementById('quit-button');
        this.submitButton = document.getElementById('submit-button');
        this.newBookForm = document.getElementById('book-form');
        this.newBookButton.addEventListener('click', () => {
            this.openDialog();
        });
        this.quitButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.closeDialog();
        });
        this.submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.submitForm();
        });
    }
    openDialog() {
        this.dialog.showModal();
    }
    closeDialog() {
        this.dialog.close();
        this.newBookForm.reset();
    }
}

const handleDialog = new HandleNewBookDialog();
