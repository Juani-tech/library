const myLibrary = [];

const bookContainer = document.querySelector('.book-container');

function Book(title, author, numberOfPages, read) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
}


function addBookToLibrary(newBook) {
    myLibrary.push(newBook)
}


function displayBooks() {
    // Reset the book container
    bookContainer.innerHTML = '';
    for(let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        const title  = document.createElement('p');
        const author = document.createElement('p');
        const numberOfPages = document.createElement('p');
        const read = document.createElement('p');
        
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove book"; 
        removeButton.setAttribute("id", i);
        removeButton.addEventListener('click', function(event) {
            myLibrary.splice(event.target.id, 1);
            displayBooks();
        });
 
        const readButton = document.createElement('button');
        readButton.textContent = "Change read status";
        readButton.setAttribute("id", i);
        readButton.addEventListener('click', function(event) {
            myLibrary[event.target.id].read = !myLibrary[event.target.id].read;
            displayBooks();
        });

        title.appendChild(document.createTextNode("Title: " + book.title));
        author.appendChild(document.createTextNode("Author: " + book.author));
        numberOfPages.appendChild(document.createTextNode("Number of pages: " + book.numberOfPages));
        read.appendChild(document.createTextNode("Read: " + book.read));

        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(numberOfPages);
        bookDiv.appendChild(read);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(removeButton);
        buttonContainer.appendChild(readButton);

        bookDiv.appendChild(buttonContainer);
        bookContainer.appendChild(bookDiv);
    }
}


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
    addBookToLibrary(new Book(title, author, numberOfPages, read.checked));
    displayBooks();
    dialog.close();
    newBookForm.reset();        
});

