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
    renderLibrary(books) { 
        bookContainer.innerHTML = '';
        for(let i = 0; i < books.length; i++) {
            const book = books[i];
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            const title  = document.createElement('p');
            title.setAttribute("class", "book-info");
            const author = document.createElement('p');
            author.setAttribute("class", "book-info");
            const numberOfPages = document.createElement('p');
            numberOfPages.setAttribute("class", "book-info");
            const read = document.createElement('p');
            read.setAttribute("class", "book-info");
            
            const removeButton = this.#createRemoveButton(books, i);
            const readButton = this.#createReadButton(books, i);

            title.appendChild(document.createTextNode("Title: " + book.title));
            author.appendChild(document.createTextNode("Author: " + book.author));
            numberOfPages.appendChild(document.createTextNode("Number of pages: " + book.numberOfPages));
            read.appendChild(document.createTextNode("Read: " + book.read));

            bookDiv.appendChild(title);
            bookDiv.appendChild(author);
            bookDiv.appendChild(numberOfPages);
            bookDiv.appendChild(read);
            bookDiv.appendChild(removeButton);
            bookDiv.appendChild(readButton);

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


// function displayBooks() {
//     // Reset the book container
//     bookContainer.innerHTML = '';
//     for(let i = 0; i < myLibrary.length; i++) {
//         const book = myLibrary[i];
//         const bookDiv = document.createElement('div');
//         bookDiv.classList.add('book');
//         const title  = document.createElement('p');
//         title.setAttribute("class", "book-info");
//         const author = document.createElement('p');
//         author.setAttribute("class", "book-info");
//         const numberOfPages = document.createElement('p');
//         numberOfPages.setAttribute("class", "book-info");
//         const read = document.createElement('p');
//         read.setAttribute("class", "book-info");
        
//         const removeButton = document.createElement('button');
//         removeButton.textContent = "x"; 
//         removeButton.setAttribute("id", i);
//         removeButton.setAttribute("class", "remove-button")
//         removeButton.addEventListener('click', function(event) {
//             myLibrary.removeBook(event.target.id);
//             displayBooks();
//         });
 
//         const readButton = document.createElement('button');
//         readButton.textContent = "Change read status";
//         readButton.setAttribute("id", i);
//         readButton.setAttribute("class", "book-info");
//         readButton.addEventListener('click', function(event) {
//             myLibrary[event.target.id].read = !myLibrary[event.target.id].read;
//             displayBooks();
//         });

//         title.appendChild(document.createTextNode("Title: " + book.title));
//         author.appendChild(document.createTextNode("Author: " + book.author));
//         numberOfPages.appendChild(document.createTextNode("Number of pages: " + book.numberOfPages));
//         read.appendChild(document.createTextNode("Read: " + book.read));

//         bookDiv.appendChild(title);
//         bookDiv.appendChild(author);
//         bookDiv.appendChild(numberOfPages);
//         bookDiv.appendChild(read);
//         bookDiv.appendChild(removeButton);
//         bookDiv.appendChild(readButton);

//         bookContainer.appendChild(bookDiv);
//     }
// }


const dialog = document.querySelector('dialog');
const newBookButton = document.getElementById('new-book-button');
newBookButton.addEventListener('click', () => {
    dialog.showModal();
})


const quitButton = document.getElementById('quit-button');

quitButton.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.close();
    newBookForm.reset();
})

const submitButton = document.getElementById('submit-button');

const newBookForm = document.getElementById('book-form');

submitButton.addEventListener("click", function(event){
    event.preventDefault()
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const numberOfPages = document.getElementById('number-of-pages').value;
    const read = document.getElementById('read');
    myLibrary.addBook(new Book(title, author, numberOfPages, read.checked));
    myLibrary.displayBooks();
    dialog.close();
    newBookForm.reset();        
});

