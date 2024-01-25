const myLibrary = [];
const newBookButton = document.getElementById("newBookButton")
const closeFormButton = document.getElementById("closeForm")
const newBookForm = document.querySelector("form");
const formData = new FormData(newBookForm);

newBookButton.addEventListener("click", () => {
    newBookForm.classList.remove("hidden");
    closeFormButton.classList.remove("hidden");
    newBookButton.classList.add("hidden");
})

closeFormButton.addEventListener("click", () => {
    newBookForm.classList.add("hidden");
    closeFormButton.classList.add("hidden");
    newBookButton.classList.remove("hidden");
})

function Book(title, author, pages, readBook) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readBook = readBook;
}

Book.prototype.toggleReadStatus = function () {
    this.readBook = this.readBook === "Yes" ? "No" : "Yes";
}

newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const bookTitle = document.getElementById("bookTitle");
    const bookAuthor = document.getElementById("bookAuthor");
    const bookPages = document.getElementById("bookPages");
    const readBook = document.querySelector('input[name="read_book"]:checked');

    bookTitle === "" || bookAuthor === "" || bookPages === "" || !readBook ?
        alert("Ensure you input a value in each of the fields!") :
        myLibrary.push(new Book(bookTitle.value, bookAuthor.value, bookPages.value, readBook.value));

    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    readBook.checked = false;

    renderBooksHtml();
});


function popBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    renderBooksHtml()
}

function renderBooksHtml() {
    document.querySelectorAll("article").forEach(article => article.remove());

    myLibrary.forEach((book, index) => {
        const article = document.createElement('article');

        article.innerHTML = `
            <h2>"${book.title}"</h2>
            <h3><i>by ${book.author}</i></h3>
            <h4>${book.pages} pages</h4>
            <section>
                <label for="bookReadStatus">Status: ${book.readBook == "Yes" ? "Read" : "Didn't read"} </label>
                <input type="checkbox" id="bookReadStatus" ${book.readBook == "Yes" ? "checked" : ""} />
            </section>            
            <button onclick="popBookFromLibrary(${index})">Delete</button>
        `;

        const checkbox = article.querySelector('#bookReadStatus');
        checkbox.addEventListener('change', () => {
            myLibrary[index].toggleReadStatus();
            renderBooksHtml();
        });

        document.querySelector("main").appendChild(article);
    });
}


