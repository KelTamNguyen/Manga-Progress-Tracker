// import Manga from './manga.js';

// DOM Manipulation Section //
var library = document.getElementById('library');
var addItemBtn = document.querySelector('.add-item-btn');
var newMangaModal = document.querySelector('#new-manga-modal');
var closeAddModal = document.querySelector('#close-add-modal');
var editMangaModal = document.querySelector('#edit-manga-modal');
var closeEditModal = document.querySelector('#close-edit-modal');
var addBtn = document.querySelector('#add-manga');
var editBtn = document.querySelector('#edit-manga')
var bookGrid = document.querySelector('.book-grid');
var clearStorageBtn = document.getElementById('clear-storage');
var addModalError = document.getElementById('add-modal-error');
var editModalError = document.getElementById('edit-modal-error');
// let errorMsg = document.querySelector('.error-msg');

addItemBtn.addEventListener('click', function(e) {
    newMangaModal.classList.add('modal-active');
});

closeAddModal.addEventListener('click', function(e) {
    resetAddForm();
    newMangaModal.classList.remove('modal-active')
});

closeEditModal.addEventListener('click', function(e) {
    editMangaModal.classList.remove('modal-active');
});

clearStorageBtn.addEventListener('click', clearLocalLibrary);

addBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let chapters = document.querySelector('#chapters');
    let chaptersRead = document.querySelector('#chaptersRead');
    let status = document.querySelector('#status');

    if ((title.value !== "") && (author.value !== "") && 
        ((!isNaN(chapters.value) && !isNaN(chaptersRead.value)) && 
        (chaptersRead.value <= chapters.value))) {
        let newManga = new Manga(title.value, author.value, chapters.value, chaptersRead.value, status.value);
        addToLibrary(newManga);
        createCard(newManga);

        title.value = "";
        author.value = "";
        chapters.value = "";
        chaptersRead.value = "";
        status.value = "ongoing";
        addModalError.textContent = "";
        
        newMangaModal.classList.remove('modal-active');
    }
    else {
        // if (chaptersRead.value > chapters.value) {
        //     console.log('chapters: ', chapters.value);
        //     addModalError.textContent = '* Chapters read is greater than Chapters';
        // }
        // else {
        //     addModalError.textContent = '* Please fill all required fields';
        // }
        addModalError.textContent = '* Please refill the form';
    }
});

function resetBookGrid() {
    bookGrid.innerHTML = '';
}

// Manga Object Section //
class Manga {
    constructor(title, author, chapters, chaptersRead, status) {
        this.title = title;
        this.author = author;
        this.chapters = chapters; // should be updatable
        this.chaptersRead = chaptersRead; // should be updatable
        this.status = status; // statuses include "completed", "ongoing", "cancelled", "hiatus", and "pending"
        this.progress = this.calculateProgress(chaptersRead, chapters);
        this.id = Math.floor(Math.random() * 100); // there is probably a better way to do this
    }

    info() {
        return `${this.title} (${this.status}) by ${this.author}, progress: ${this.chaptersRead}/${this.chapters}  (${this.progress}%)`;
    }

    set updateChaptersRead(newChaptersRead) {
        this.chaptersRead = newChaptersRead;
    }

    set updateTotalChapters(newTotal) {
        this.chapters = newTotal;
    }

    calculateProgress(chaptersRead, chapters) {
        return ((chaptersRead / chapters) * 100).toFixed(1);
    }
}

// Library functions section //
var myLibrary = [];

function addToLibrary(manga) {
    myLibrary.push(manga);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function removeFromLibrary(id) {
    if(localStorage.getItem('myLibrary')) {
        myLibrary = myLibrary.filter((manga) => manga.id !== id);
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        updateBookGrid();
    }
}

function editLibraryItem(manga) {
    editModalError.textContent = "";
    editMangaModal.classList.add('modal-active');
    let titleField = document.querySelector('#edit-title');
    let authorField = document.querySelector('#edit-author');
    let chaptersField = document.querySelector('#edit-chapters');
    let chaptersReadField = document.querySelector('#edit-chaptersRead');
    let statusField = document.querySelector('#edit-status');
    const {title, author, chapters, chaptersRead, status, progress, id} = manga;
    titleField.value = title;
    authorField.value = author;
    chaptersField.value = chapters;
    chaptersReadField.value = chaptersRead;
    statusField.value = status;
    
    editBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log(
            `title: ${titleField.value}\n
            author: ${authorField.value}\n
            chapters: ${chaptersField.value}\n
            chapters read: ${chaptersReadField.value}\n
            status: ${statusField.value}\n
            id: ${id}`
        );
    
        if ((titleField.value !== "") && (authorField.value !== "") && 
            ((!isNaN(chaptersField.value) && !isNaN(chaptersReadField.value)) && (chaptersReadField.value <= chaptersField.value))) {
            let currentLibrary = JSON.parse(localStorage.getItem('myLibrary'));
            let targetItem = currentLibrary.find(item => item.id === id);
            let targetIndex = currentLibrary.indexOf(targetItem);
            console.log('Before changes:\n',currentLibrary);
            console.log('target item:\n',targetItem);
            console.log('taget index:', targetIndex);

            // apply changes to the target item
            currentLibrary[targetIndex].title = titleField.value;
            currentLibrary[targetIndex].author = authorField.value;

            // figure out how prototype method calls work again
            currentLibrary[targetIndex].chaptersRead = chaptersReadField.value;
            currentLibrary[targetIndex].chapters = chaptersField.value;
            currentLibrary[targetIndex].progress = ((chaptersReadField.value / chaptersField.value) * 100).toFixed(1);
            currentLibrary[targetIndex].status = statusField.value;
            console.log('After changes:\n',currentLibrary);
            localStorage.setItem('myLibrary', JSON.stringify(currentLibrary));
            editMangaModal.classList.remove('modal-active');
            updateBookGrid()
        }
        else {
            editModalError.textContent = '* Please refill the form';
        }
    });
}

function createCard(manga) {
    const {title, author, chapters, chaptersRead, status, progress, id} = manga;
    let card = document.createElement('div');
    card.classList.add('card');

    let actions = document.createElement('div');
    actions.classList.add('actions');
    let textContent = document.createElement('div');
    textContent.classList.add('text-content');
    let progressBar = document.createElement('div');
    progressBar.classList.add('progress');

    let editBtn = document.createElement('span');
    editBtn.classList.add('material-symbols-outlined', 'edit');
    editBtn.textContent = 'edit';
    editBtn.title = 'edit';
    editBtn.addEventListener('click', () => editLibraryItem(manga));
    let closeBtn = document.createElement('span');
    closeBtn.classList.add('material-symbols-outlined');
    closeBtn.textContent = 'close';
    closeBtn.title = 'remove';
    closeBtn.addEventListener('click', () => removeFromLibrary(id));
    actions.appendChild(editBtn);
    actions.appendChild(closeBtn);
    card.appendChild(actions);

    let titleLine = document.createElement('h2');
    titleLine.classList.add('title');
    if (progress === "100.0") {
        titleLine.classList.add('finished-title')
    }
    titleLine.textContent = title;
    let byLine = document.createElement('p');
    byLine.innerHTML = `by <span class="author">${author}</span>`;
    let statusLine = document.createElement('p');
    statusLine.innerHTML = `status: <span class="${status}">${status}</span>`;
    let progressLine = document.createElement('p');
    progressLine.textContent = `progress: ${chaptersRead}/${chapters} chapters read (${progress}%)`;
    textContent.append(titleLine, byLine, statusLine, progressLine);
    card.appendChild(textContent);

    let percent = document.createElement('div');
    percent.textContent = `${progress}%`;
    percent.classList.add('percent');
    let bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.width = `${progress}%`;
    progressBar.append(percent, bar);
    card.appendChild(progressBar);
    bookGrid.appendChild(card);
}


function resetAddForm() {
    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let chapters = document.querySelector('#chapters');
    let chaptersRead = document.querySelector('#chaptersRead');
    let status = document.querySelector('#status');

    title.value = "";
    author.value = "";
    chapters.value = "";
    chaptersRead.value = "";
    status.value = "ongoing";
    addModalError.textContent = "";
}

// localStorage features Section //

function updateBookGrid() {
    resetBookGrid();
    if (localStorage.getItem('myLibrary')) {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }
    for (manga of myLibrary) {
        createCard(manga);
    }
}

function clearLocalLibrary() {
    localStorage.removeItem('myLibrary');
    myLibrary = [];
    updateBookGrid();
}

// Debug Section //

// var badThinkingDiary = new Manga("Bad Thinking Diary", "Park Do-han", 7, 1, "ongoing");
// var unlock99 = new Manga("Unlock 99 Heroines in End Times", "Mr. Two Cats", 134, 45, "ongoing");
// var oreDake = new Manga("Ore Dake ni Koakuma na Doukyuusei", "Rifuru", 8, 1, "completed");
// var married = new Manga("I Got Married to a Villain", "빡킬 (copin) / 사동 / 십삼월의새벽", 1, 1, "cancelled");
// var married2 = new Manga("I Got Married to a Villain", "빡킬 (copin) / 사동 / 십삼월의새벽", 1, 1, "cancelled");
// const factoryManga = mangaFactory('Manga Diary of a Male Pornstar','Kaeruno Erafante', 22, 22, 'ongoing');
// addToLibrary(badThinkingDiary);
// addToLibrary(unlock99);
// addToLibrary(oreDake);
// addToLibrary(married);
// addToLibrary(married2);
// console.log(married);
// console.log(factoryManga);

// make sure it update the grid upon loading the page
updateBookGrid();