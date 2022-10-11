import Manga from "./Manga.js";
import  {
    addToLibrary,
    removeFromLibrary,
    editLibraryItem
} from './library.js';

var bookGrid = document.querySelector('.book-grid');

var newMangaModal = document.querySelector('#new-manga-modal');
var editMangaModal = document.querySelector('#edit-manga-modal');

var addModalError = document.getElementById('add-modal-error');
var editModalError = document.getElementById('edit-modal-error');

var addMangaForm = document.getElementById('add-manga-form');
var editMangaForm = document.getElementById('edit-manga-form');

export function openAddModal() {
    newMangaModal.classList.add('modal-active');
}

export function closeAddModal() {
    addMangaForm.reset();
    newMangaModal.classList.remove('modal-active');
}

function openEditModal(manga) {
    editModalError.textContent = "";
    editMangaModal.classList.add('modal-active');
    const {title, author, chapters, chaptersRead, status} = manga;
    editMangaForm["edit-title"].value = title;
    editMangaForm["edit-author"].value = author;
    editMangaForm["edit-chapters"].value = chapters;
    editMangaForm["edit-chaptersRead"].value = chaptersRead;
    editMangaForm["edit-status"].value = status;
    editLibraryItem(manga);
}

export function closeEditModal() {
    editMangaModal.classList.remove('modal-active');
}

export function createCard(manga) {
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
    editBtn.addEventListener('click', () => openEditModal(manga));
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

export function addManga(e) {
    e.preventDefault();
    console.log(e.target);
    console.log(addMangaForm);
    console.log('title: ', addMangaForm["title"].value);
    console.log('author: ', addMangaForm["author"].value);
    console.log('chapters: ', addMangaForm["chapters"].value);
    console.log('chapters read: ', addMangaForm["chaptersRead"].value);
    console.log('status: ', addMangaForm["status"].value);
    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let chapters = document.querySelector('#chapters');
    let chaptersRead = document.querySelector('#chaptersRead');
    let status = document.querySelector('#status');

    if ((title.value !== "") && (author.value !== "") && 
        ((!isNaN(chapters.value) && !isNaN(chaptersRead.value)) && 
        (chaptersRead.value <= chapters.value))) {
        addToLibrary(title.value, author.value, chapters.value, chaptersRead.value, status.value);
        newMangaModal.classList.remove('modal-active');
        addMangaForm.reset();
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
}

export function resetBookGrid() {
    bookGrid.innerHTML = '';
}