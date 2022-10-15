import Manga from './Manga.js';
import {
    openAddModal,
    closeAddModal,
    closeEditModal,
    createCard,
    addManga,
    resetBookGrid,
} from './domModule.js';

// DOM Event Listeners Section //
var addItemBtn = document.querySelector('.add-item-btn');
var addClose = document.querySelector('#close-add-modal');
var editMangaModal = document.querySelector('#edit-manga-modal');
var editClose = document.querySelector('#close-edit-modal');
var addBtn = document.querySelector('#add-manga');
var editForm = document.querySelector('#edit-manga-form')
var clearStorageBtn = document.getElementById('clear-storage');

var editModalError = document.getElementById('edit-modal-error');
// let errorMsg = document.querySelector('.error-msg');

addItemBtn.addEventListener('click', openAddModal);
addClose.addEventListener('click', closeAddModal);
editClose.addEventListener('click', closeEditModal);
clearStorageBtn.addEventListener('click', clearLocalLibrary);
addBtn.addEventListener('click', addManga);

editForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let titleField = editForm["edit-title"];
    let authorField = editForm['edit-author'];
    let chaptersField = editForm['edit-chapters'];
    let chaptersReadField = editForm['edit-chaptersRead'];
    let statusField = editForm['edit-status'];
    let id = myLibrary.find(manga => manga.title === titleField.value && manga.author === authorField.value).id;

    if ((titleField.value !== "") && (authorField.value !== "") && 
        ((!isNaN(chaptersField.value) && !isNaN(chaptersReadField.value)) && (chaptersReadField.value <= chaptersField.value))) {
        let currentLibrary = JSON.parse(localStorage.getItem('myLibrary'));
        let targetItem = currentLibrary.find(item => item.id === id);

        // apply changes to the target item
        currentLibrary[targetIndex].title = titleField.value;
        currentLibrary[targetIndex].author = authorField.value;

        // figure out how prototype method calls work again
        currentLibrary[targetIndex].chaptersRead = chaptersReadField.value;
        currentLibrary[targetIndex].chapters = chaptersField.value;
        currentLibrary[targetIndex].progress = ((chaptersReadField.value / chaptersField.value) * 100).toFixed(1);
        currentLibrary[targetIndex].status = statusField.value;
        localStorage.setItem('myLibrary', JSON.stringify(currentLibrary));
        editMangaModal.classList.remove('modal-active');
        renderBookGrid()
    }
    else {
        editModalError.textContent = '* Please refill the form';
    }
});

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
        renderBookGrid();
    }
}

export function isUnique(title, author) {
    let currentLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    return !currentLibrary.find(manga => manga.title === title && manga.author === author);
}

// localStorage features Section //

function renderBookGrid() {
    resetBookGrid();
    if (localStorage.getItem('myLibrary')) {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
        for (let manga of myLibrary) {
            createCard(manga);
        }
    }
}

function clearLocalLibrary() {
    localStorage.removeItem('myLibrary');
    myLibrary = [];
    renderBookGrid();
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
window.addEventListener('load', renderBookGrid);