let myLibrary = [];
var library = document.getElementById('library');
var addItemBtn = document.querySelector('.add-item-btn');
var modalBg = document.querySelector('.modal-bg');
var closeBtn = document.querySelector('.close');
var submitBtn = document.querySelector('#add-manga');

// Manga Object Section //

/*
 * If Manga doesn't work out, maybe try music albums?
 */

function Manga(title, author, chapters, currentChapter, status) {
    this.title = title;
    this.author = author;
    this.chapters = chapters; // should be updatable
    this.currentChapter = currentChapter; // should be updatable
    this.status = status; // statuses include "completed", "ongoing", "cancelled", "hiatus", and "pending"
    this.progress = this.calculateProgress(currentChapter, chapters);
}

// If you’re using constructors to make your objects it is best to define functions on the prototype of that object.
Manga.prototype.info = function() {
    return `${this.title} (${this.status}) by ${this.author}, progress: ${this.currentChapter}/${this.chapters}  (${this.progress}%)`;
}

/* 
 * TODO: Add update functions for both current and total chapters to the prototype of Manga
 */
Manga.prototype.updateCurrentChapter = function(newCurrentChapter) {
    this.currentChapter = newCurrentChapter;
}

/* 
 * TODO: Add update functions for both current and total chapters to the prototype of Manga
 */
Manga.prototype.updateTotalChapter = function(newTotal) {
    this.chapters = newTotal;
}

Manga.prototype.calculateProgress = function(currentChapter, totalChapters) {
    return  ((currentChapter / totalChapters) * 100).toFixed(1);
}

// Library functions section //

function addToLibrary(manga) {
    myLibrary.push(manga);
}

function renderLibrary() {
    for (manga of myLibrary) {
        console.log(manga.info());
        let item = document.createElement('li');
        item.textContent = manga.info();
        library.appendChild(item);
    }
}

addItemBtn.addEventListener('click', function(e) {
    modalBg.classList.add('modal-active');
});

closeBtn.addEventListener('click', function(e) {
    modalBg.classList.remove('modal-active');
});

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let title = document.querySelector('#title');
    let authors = document.querySelector('#author');
    let chapters = document.querySelector('#chapters');
    let currentChapter = document.querySelector('#currentChapter');
    let status = document.querySelector('#status');

    let newManga = new Manga(title.value, authors.value, chapters.value, currentChapter.value, status.value);
    myLibrary.push(newManga);

    // create a new card or entry and append it to the DOM
    let newElement = document.createElement('li');
    newElement.textContent = newManga.info();
    library.appendChild(newElement);

    // for now, the form elements will need to be cleared manually
    // but this should not be needed once there is an actual backend
    title.value = "";
    authors.value = "";
    chapters.value = "";
    currentChapter.value = "";
    status.value = "ongoing";

    modalBg.classList.remove('modal-active');
});

/*
 * TODO: create a function to check for duplicates in myLibrary and do nothing if a duplicate is found.
 *
 * Iterate through the array and compare the objects and compare to see if it already exists
 */
function isDuplicate(item) {
    for (manga in myLibrary) {
        // return true if manga is the same object 
        if ((item.title === manga.title) && (item.author == manga.author)) {

        }
    }
}

/*
 * TODO: add a button on each book’s display to remove the book from the library. 
 */


// var theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295);
var badThinkingDiary = new Manga("Bad Thinking Diary", "Park Do-han", 7, 1, "ongoing");
var unlock99 = new Manga("Unlock 99 Heroines in End Times", "Mr. Two Cats", 134, 45, "ongoing");
var oreDake = new Manga("Ore Dake ni Koakuma na Doukyuusei", "Rifuru", 8, 1, "completed");
var married = new Manga("I Got Married to a Villain", "빡킬 (copin) / 사동 / 십삼월의새벽", 1, 1, "cancelled");
addToLibrary(badThinkingDiary);
addToLibrary(unlock99);
addToLibrary(oreDake);
addToLibrary(married);
// console.log(myLibrary);
// console.log(married.info());
renderLibrary();