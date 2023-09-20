const seachBox = document.getElementById("search-box");

const addBookButton = document.getElementById("add-button");

const addBookDialog = document.getElementById("add-box");
const nameInput = document.getElementById("name-input");
const authorInput = document.getElementById("author-input");
const topicInput = document.getElementById("topic-input");

const table = document.querySelector("table");

const deleteDialog = document.getElementById("delete-box");

// Store element for deletion
let deleteElement;

// Store a list of book for searching and displaying on screen
let bookList;

// A boolean variable store the state of searching
let exist;

const sampleData = [
    ["Harry Potter", "J.K.Rowling", "Magic"],
    ["The lord of the rings", "J.R.R.Tolkien", "Fantasy"],
    ["Sans famille", "Hector Malot", "Adventure"]
];

// Fill localStorage with sample data
if (!localStorage.getItem("bookList")) {
    localStorage.setItem("bookList", JSON.stringify(sampleData));
}

// A list for getting and setting items in localStorage
let localData = JSON.parse(localStorage.getItem("bookList"));

// Prevent closing dialog on pressing "Enter"
document.querySelectorAll("form").forEach(f => {
    f.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    });
});

// Get data from localStorage and put into table
window.addEventListener("load", () => {
    table.querySelector("tbody").innerHTML = "";
    localData.forEach(e => {
        customInsertRow(e[0], e[1], e[2]);
    });
    bookList = table.querySelectorAll("tbody tr");
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
    const clickElement = e.target;
    if (clickElement.tagName === "TD" && clickElement.className === "action") {
        deleteElement = clickElement.parentElement;
        const bookName = deleteElement.querySelector(".name").textContent;
        deleteDialog.showModal();
        deleteDialog.querySelector(".dialog-content b").textContent = bookName;
    }
});

/**
 * Event handler function
 */

// Perform searching when users input keyword into search box
function search() {
    const key = seachBox.value;
    exist = false;
    if (key !== "") {
        bookList.forEach(book => {
            const title = book.querySelector(".name").textContent;
            if (title.toLowerCase().includes(key.toLowerCase()) || title.toUpperCase().includes(key.toUpperCase())) {
                book.style.display = "table-row";
                exist = true;
            } else {
                book.style.display = "none";
            }
        });
    } else {
        bookList.forEach(book => {
            book.style.display = "table-row";
        });
        exist = true;
    }
    // Show notification if search-key exists or not
    if (exist) document.getElementById("notification").style.display = "none";
    else document.getElementById("notification").style.display = "block";
};

// Show "Add book" dialog when users click "Add book" button
function showAddDialog() {
    addBookDialog.showModal();
    // Avoid blank input
    nameInput.required = true;
    authorInput.required = true;
    topicInput.required = true;
};

// Close "Add book" dialog without doing anything
function closeAddDialog() {
    nameInput.required = false;
    authorInput.required = false;
    topicInput.required = false;
};

// Get data from input form and insert into table
function addNewBook() {
    if (nameInput.value !== "" && authorInput.value !== "" && topicInput.value !== "") {
        customInsertRow(nameInput.value, authorInput.value, topicInput.value);

        // Update data in localStorage
        localData.push([nameInput.value, authorInput.value, topicInput.value]);
        localStorage.setItem("bookList", JSON.stringify(localData));
    }
    // Update list
    bookList = table.querySelectorAll("tbody tr");
    // Update notification
    search();
};

// Delete selected row from table
function deleteBook() {
    table.querySelector("tbody").removeChild(deleteElement);
    // Update notification
    bookList = table.querySelectorAll("tbody tr");
    search();
    
    // Update data in localStorage
    const bookName = deleteElement.querySelector(".name").textContent;
    localData = localData.filter(e => e[0] !== bookName);
    localStorage.setItem("bookList", JSON.stringify(localData));
};

// Insert new row to table
function customInsertRow(name, author, topic) {
    let row = table.querySelector("tbody").insertRow(-1);

    let nameCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let topicCell = row.insertCell(2);
    let actionCell = row.insertCell(3);

    nameCell.innerHTML = name;
    authorCell.innerHTML = author;
    topicCell.innerHTML = topic;
    actionCell.innerHTML = "Delete";

    nameCell.classList.add("name");
    actionCell.classList.add("action");
}

