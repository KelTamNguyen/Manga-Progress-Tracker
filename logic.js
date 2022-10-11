import Manga from "./Manga.js";

// export var myLibrary = [];

export function addToLibrary(manga) {
    myLibrary.push(manga);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

export function removeFromLibrary(id) {
    if(localStorage.getItem('myLibrary')) {
        myLibrary = myLibrary.filter((manga) => manga.id !== id);
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        updateBookGrid();
    }
}