var myLibrary = [];
var library = document.getElementById('library');
var addItemBtn = document.querySelector('.add-item-btn');
var modalBg = document.querySelector('.modal-bg');
var closeBtn = document.querySelector('.close-modal');
var submitBtn = document.querySelector('#add-manga');
var bookGrid = document.querySelector('.book-grid');
var clearStorageBtn = document.getElementById('clear-storage');
let errorMsg = document.querySelector('.error-msg');

addItemBtn.addEventListener('click', function(e) {
    modalBg.classList.add('modal-active');
});

closeBtn.addEventListener('click', function(e) {
    resetForm();
    modalBg.classList.remove('modal-active');
});

clearStorageBtn.addEventListener('click', clearLocalStorage);

// Manga Object Section //

/*
 * If Manga doesn't work out, maybe try music albums?
 */

function Manga(title, author, chapters, chaptersRead, status) {
    this.title = title;
    this.author = author;
    this.chapters = chapters; // should be updatable
    this.chaptersRead = chaptersRead; // should be updatable
    this.status = status; // statuses include "completed", "ongoing", "cancelled", "hiatus", and "pending"
    this.progress = this.calculateProgress(chaptersRead, chapters);

}

// If you’re using constructors to make your objects it is best to define functions on the prototype of that object.
Manga.prototype.info = function() {
    return `${this.title} (${this.status}) by ${this.author}, progress: ${this.chaptersRead}/${this.chapters}  (${this.progress}%)`;
}

/* 
 * TODO: Add update functions for both current and total chapters to the prototype of Manga
 */
Manga.prototype.updateChaptersRead = function(newCurrentChapter) {
    this.chaptersRead = newCurrentChapter;
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
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function removeFromLibrary(manga) {

}

function editLibraryItem(manga) {

}

function createCard(manga) {
    let card = document.createElement('div');
    card.classList.add('card');

    let actions = document.createElement('div');
    actions.classList.add('actions');
    let textContent = document.createElement('div');
    textContent.classList.add('text-content');
    let progress = document.createElement('div');
    progress.classList.add('progress');

    let editBtn = document.createElement('span');
    editBtn.classList.add('material-symbols-outlined', 'edit');
    editBtn.textContent = 'edit';
    // editBtn.addEventListener('click', editLibraryItem());
    // editBtn.onclick = editLibraryItem;
    let closeBtn = document.createElement('span');
    closeBtn.classList.add('material-symbols-outlined');
    closeBtn.textContent = 'close';
    // closeBtn.addEventListener('click', removeFromLibrary());
    // closeBtn.onclick = removeFromLibrary;
    actions.appendChild(editBtn);
    actions.appendChild(closeBtn);
    card.appendChild(actions);

    let title = document.createElement('h2');
    title.classList.add('title');
    title.textContent = manga.title;
    let byLine = document.createElement('p');
    byLine.innerHTML = `by <span class="author">${manga.author}</span>`;
    let statusLine = document.createElement('p');
    statusLine.innerHTML = `status: <span class="${manga.status}">${manga.status}</span>`;
    let progressLine = document.createElement('p');
    progressLine.textContent = `progress: ${manga.chaptersRead}/${manga.chapters} chapters read (${manga.progress}%)`;
    textContent.append(title, byLine, statusLine, progressLine);
    card.appendChild(textContent);

    let percent = document.createElement('div');
    percent.textContent = `${manga.progress}%`;
    percent.classList.add('percent');
    let bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.width = `${manga.progress}%`;
    progress.append(percent, bar);
    card.appendChild(progress);
    bookGrid.appendChild(card);
}

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let chapters = document.querySelector('#chapters');
    let currentChapter = document.querySelector('#currentChapter');
    let status = document.querySelector('#status');

    if ((title.value !== "") && (author.value !== "") && ((!isNaN(chapters.value) && !isNaN(currentChapter.value)) && (currentChapter.value <= chapters.value))) {
        let newManga = new Manga(title.value, author.value, chapters.value, currentChapter.value, status.value);
        // myLibrary.push(newManga); // let's keep this here for debugging?
        addToLibrary(newManga);
        createCard(newManga);

        
        // for now, the form elements will need to be cleared manually
        // but this should not be needed if/when there is an actual backend
        title.value = "";
        author.value = "";
        chapters.value = "";
        currentChapter.value = "";
        status.value = "ongoing";
        errorMsg.textContent = "";
        
        modalBg.classList.remove('modal-active');
    }
    else {
        if (currentChapter.value > chapters.value) {
            errorMsg.textContent = '* Current Chapter is greater than Chapters';
        }
        else {
            errorMsg.textContent = '* Please fill all required fields';
        }
    }
});

function resetForm() {
    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let chapters = document.querySelector('#chapters');
    let currentChapter = document.querySelector('#currentChapter');
    let status = document.querySelector('#status');

    title.value = "";
    author.value = "";
    chapters.value = "";
    currentChapter.value = "";
    status.value = "ongoing";
    errorMsg.textContent = "";
}

// var theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295);
var badThinkingDiary = new Manga("Bad Thinking Diary", "Park Do-han", 7, 1, "ongoing");
var unlock99 = new Manga("Unlock 99 Heroines in End Times", "Mr. Two Cats", 134, 45, "ongoing");
var oreDake = new Manga("Ore Dake ni Koakuma na Doukyuusei", "Rifuru", 8, 1, "completed");
var married = new Manga("I Got Married to a Villain", "빡킬 (copin) / 사동 / 십삼월의새벽", 1, 1, "cancelled");
var married2 = new Manga("I Got Married to a Villain", "빡킬 (copin) / 사동 / 십삼월의새벽", 1, 1, "cancelled");
// addToLibrary(badThinkingDiary);
// addToLibrary(unlock99);
// addToLibrary(oreDake);
// addToLibrary(married);
// renderLibrary();

function updateBookGrid() {
    resetBookGrid();
    if (localStorage.getItem('myLibrary')) {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }
    for (manga of myLibrary) {
        createCard(manga);
    }
}

function resetBookGrid() {
    bookGrid.innerHTML = '';
}

// localstorage functions

function clearLocalStorage() {
    localStorage.clear()
    myLibrary = [];
    updateBookGrid();
}

// make sure it update the grid upon loading the page
updateBookGrid();