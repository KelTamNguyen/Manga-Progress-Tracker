export default class Manga {
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