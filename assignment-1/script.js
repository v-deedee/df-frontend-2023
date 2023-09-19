const seachBox = document.getElementById("search-box");

const addBookButton = document.getElementById("add-button");

const addBookDialog = document.getElementById("add-box");
const nameInput = document.getElementById("name-input");
const authorInput = document.getElementById("author-input");
const topicInput = document.getElementById("topic-input");

const table = document.querySelector("table");

const deleteDialog = document.getElementById("delete-box");

let deleteElement;

let bookList = table.querySelectorAll("tbody tr");


// Search event
seachBox.addEventListener("input", () => {
    const key = seachBox.value;
    if (key !== "") {
        bookList.forEach(book => {
            const title = book.querySelector(".name").textContent;
            if (title.toLowerCase().includes(key.toLowerCase()) || title.toUpperCase().includes(key.toUpperCase())) {
                book.style.display = "table-row";
            } else {
                book.style.display = "none";
            }
        });
    } else {
        bookList.forEach(book => {
            book.style.display = "table-row";
        });
    }
});

// Show dialog when user clicks "Add book" button
addBookButton.addEventListener("click", () => {
    addBookDialog.showModal();
    // Avoid blank input
    nameInput.required = true;
    authorInput.required = true;
    topicInput.required = true;
});

// Prevent closing dialog on pressing "Enter"
addBookDialog.querySelector("form").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
    }
});

// Prevent closing dialog on pressing "Enter"
deleteDialog.querySelector("form").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
    }
});

// Insert new row to table
addBookDialog.querySelector("[value='create']").addEventListener("click", () => {
    if (nameInput.value !== "" && authorInput.value !== "" && topicInput.value !== "") {
        let row = table.insertRow(-1);

        let nameCell = row.insertCell(0);
        let authorCell = row.insertCell(1);
        let topicCell = row.insertCell(2);
        let actionCell = row.insertCell(3);

        nameCell.innerHTML = nameInput.value;
        authorCell.innerHTML = authorInput.value;
        topicCell.innerHTML = topicInput.value;
        actionCell.innerHTML = "Delete";

        nameCell.classList.add("name");
        actionCell.classList.add("action");
    }
    // update list
    bookList = table.querySelectorAll("tbody tr");
});

// Close dialog without doing anything
addBookDialog.querySelector("[value='cancel']").addEventListener("click", () => {
    nameInput.required = false;
    authorInput.required = false;
    topicInput.required = false;
});

// Clear input box after successful insertion
addBookDialog.addEventListener("close", () => {
    if (addBookDialog.returnValue === "create") {
        nameInput.value = "";
        authorInput.value = "";
        topicInput.value = "";
    }
});

// Set event for "delete" action
table.addEventListener("click", (e) => {
    const clickedElement = e.target;
    if (clickedElement.tagName === "TD" && clickedElement.className === "action") {
        deleteElement = clickedElement.parentElement;
        const bookName = deleteElement.querySelector(".name").textContent;
        deleteDialog.showModal();
        deleteDialog.querySelector(".dialog-content b").textContent = bookName;
    }
    console.log(bookList);
});

// Delete a row from table
deleteDialog.querySelector("[value='delete']").addEventListener("click", () => {
    table.querySelector("tbody").removeChild(deleteElement);
});


