import Manga from './Manga.js';
import {
    openAddModal,
    closeAddModal,
    closeEditModal,
    createCard,
    addManga,
    resetBookGrid,
} from './domModule.js';
import {
} from './logic.js';

// DOM Manipulation Section //
var library = document.getElementById('library');
var addItemBtn = document.querySelector('.add-item-btn');
var newMangaModal = document.querySelector('#new-manga-modal');
var addClose = document.querySelector('#close-add-modal');
var editMangaModal = document.querySelector('#edit-manga-modal');
var editClose = document.querySelector('#close-edit-modal');
var addBtn = document.querySelector('#add-manga');
var editBtn = document.querySelector('#edit-manga')
var bookGrid = document.querySelector('.book-grid');
var clearStorageBtn = document.getElementById('clear-storage');

var editModalError = document.getElementById('edit-modal-error');
// let errorMsg = document.querySelector('.error-msg');

addItemBtn.addEventListener('click', openAddModal);
addClose.addEventListener('click', closeAddModal);
editClose.addEventListener('click', closeEditModal);
clearStorageBtn.addEventListener('click', clearLocalLibrary);
addBtn.addEventListener('click', addManga);

// Library functions section //
var myLibrary = [];

export function addToLibrary(title, author, chapters, chaptersRead, status) {
    let newManga = new Manga(title, author, chapters, chaptersRead, status);
    myLibrary.push(newManga);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    createCard(newManga);
}

export function removeFromLibrary(id) {
    if(localStorage.getItem('myLibrary')) {
        myLibrary = myLibrary.filter((manga) => manga.id !== id);
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        updateBookGrid();
    }
}

export function editLibraryItem(manga) {
    const {title, author, chapters, chaptersRead, status, progress, id} = manga;

    // The problem here is that we might be adding multiple event listeners on the same element 
    // instead of resetting the listener
    editBtn.addEventListener('click', function(e) {
        let titleField = document.querySelector('#edit-title');
        let authorField = document.querySelector('#edit-author');
        let chaptersField = document.querySelector('#edit-chapters');
        let chaptersReadField = document.querySelector('#edit-chaptersRead');
        let statusField = document.querySelector('#edit-status');
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
            console.log('target id:\n', id);
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

// localStorage features Section //

function updateBookGrid() {
    resetBookGrid();
    if (localStorage.getItem('myLibrary')) {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }
    for (let manga of myLibrary) {
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