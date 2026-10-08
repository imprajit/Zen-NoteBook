const sidebar = document.querySelector(".sidebar");
const topBar = document.querySelector(".top-bar");
const noteArea = document.querySelector(".note-area");
const notesList = document.querySelector("#notes-list");
const noteFiles = document.querySelector("#note-files");
const noteView = document.querySelector("#note-view");
const noteEditor = document.querySelector("#note-editor");
const noteTitle = document.querySelector("#note-title");
const noteContent = document.querySelector("#note-content");
const noteDate = document.querySelector("#note-date");
const searchInput = document.querySelector("#search");
const editorTitle = document.querySelector("#editor-title");
const editorContent = document.querySelector("#editor-content");
const listTitle = document.querySelector("#list-title");
const listSubtitle = document.querySelector("#list-subtitle");

const notesButton =
    document.querySelector("#notes-button");

const favoritesButton =
    document.querySelector("#favorites-button");

const trashButton =
    document.querySelector("#trash-button");

const newNoteButton =
    document.querySelector("#new-note-button");

const backButton =
    document.querySelector("#back-button");

const editorBack =
    document.querySelector("#editor-back");

const saveNoteButton =
    document.querySelector("#save-note-button");

const editButton =
    document.querySelector("#edit-button");

const deleteButton =
    document.querySelector("#delete-button");

const favoriteButton =
    document.querySelector("#favorite-button");

const restoreButton =
    document.querySelector("#restore-button");

const deleteForeverButton =
    document.querySelector("#delete-forever-button");

const confirmOverlay =
    document.querySelector("#confirm-overlay");

const confirmTitle =
    document.querySelector("#confirm-title");

const confirmMessage =
    document.querySelector("#confirm-message");

const confirmCancel =
    document.querySelector("#confirm-cancel");

const confirmOk =
    document.querySelector("#confirm-ok");

let confirmResolve = null;


// ==========================================
// CONFIRMATION MODAL
// ==========================================

function showConfirm(title, message, actionText) {

    return new Promise(resolve => {

        confirmResolve = resolve;

        confirmTitle.textContent =
            title;

        confirmMessage.textContent =
            message;

        confirmOk.textContent =
            actionText;

        confirmOverlay.style.display =
            "flex";

        confirmOk.focus();

    });

}


window.closeConfirm = function(result) {

    confirmOverlay.style.display =
        "none";

    if (confirmResolve) {

        confirmResolve(result);

        confirmResolve = null;

    }

};


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            confirmOverlay.style.display === "flex"
        ) {

            window.closeConfirm(false);

        }

    }
);


let notes = [];

let currentNote = null;

let currentMode = "notes";

let editingNoteId = null;


window.addEventListener("load", () => {

    setTimeout(() => {

        sidebar.classList.add("show");

        topBar.classList.add("show");

        noteArea.classList.add("show");

    }, 300);

    loadNotes();

});


// ==========================================
// LOAD NOTES
// ==========================================

async function loadNotes() {

    try {

        const response =
            await fetch("/api/notes");

        if (!response.ok) {

            throw new Error(
                "Could not load notes."
            );

        }

        notes =
            await response.json();

        currentMode = "notes";

        showNotes();

    } catch (error) {

        console.error(error);

        showError(
            "Could not connect to Zen Notebook."
        );

    }

}


async function loadFavorites() {

    try {

        const response =
            await fetch("/api/notes/favorites");

        if (!response.ok) {

            throw new Error(
                "Could not load favorites."
            );

        }

        notes =
            await response.json();

        currentMode = "favorites";

        showFavorites();

    } catch (error) {

        console.error(error);

        showError(
            "Could not load Favorites."
        );

    }

}


async function loadTrash() {

    try {

        const response =
            await fetch("/api/notes/trash");

        if (!response.ok) {

            throw new Error(
                "Could not load trash."
            );

        }

        notes =
            await response.json();

        currentMode = "trash";

        showTrash();

    } catch (error) {

        console.error(error);

        showError(
            "Could not load Trash."
        );

    }

}


// ==========================================
// SHOW NOTES
// ==========================================

function showNotes() {

    currentMode = "notes";

    listTitle.textContent =
        "Notes";

    listSubtitle.textContent =
        "Your thoughts, kept quietly.";

    setActiveButton(notesButton);

    hideNoteView();

    renderNotes(notes);

}


function showFavorites() {

    currentMode = "favorites";

    listTitle.textContent =
        "Favorites";

    listSubtitle.textContent =
        "The notes you want close.";

    setActiveButton(favoritesButton);

    hideNoteView();

    renderNotes(notes);

}


// ==========================================
// SHOW TRASH
// ==========================================

function showTrash() {

    currentMode = "trash";

    listTitle.textContent =
        "Trash";

    listSubtitle.textContent =
        "Deleted notes stay here.";

    setActiveButton(trashButton);

    hideNoteView();

    renderNotes(notes);

}


// ==========================================
// RENDER NOTES
// ==========================================

function renderNotes(noteArray) {

    noteFiles.innerHTML = "";

    if (noteArray.length === 0) {

        const empty =
            document.createElement("div");

        empty.className =
            "empty-notes";

        if (currentMode === "favorites") {

            empty.textContent =
                "No favorite notes yet.";

        } else if (currentMode === "trash") {

            empty.textContent =
                "Trash is empty.";

        } else {

            empty.textContent =
                "No notes yet.";

        }

        noteFiles.appendChild(empty);

        return;
    }


    noteArray.forEach(note => {

        const button =
            document.createElement("button");

        button.className =
            "note-file";

        button.type =
            "button";


        const star =
            note.favorite
                ? "★ "
                : "";


        button.innerHTML = `

            <span class="note-file-title">
                ${escapeHtml(star + note.title)}
            </span>

        `;


        button.addEventListener(
            "click",
            () => openNote(note)
        );


        noteFiles.appendChild(button);

    });

}


// ==========================================
// OPEN NOTE
// ==========================================

function openNote(note) {

    currentNote = note;

    noteTitle.textContent =
        note.title;

    noteContent.textContent =
        note.content;

    noteDate.textContent =
        note.deleted
            ? "TRASH"
            : note.favorite
                ? "FAVORITE"
                : "NOTE";


    updateActionButtons();


    notesList.style.display =
        "none";

    noteEditor.style.display =
        "none";

    noteView.style.display =
        "block";

}


// ==========================================
// UPDATE ACTION BUTTONS
// ==========================================

function updateActionButtons() {

    if (!currentNote) {

        return;

    }


    if (currentNote.deleted) {

        favoriteButton.style.display =
            "none";

        editButton.style.display =
            "none";

        deleteButton.style.display =
            "none";

        restoreButton.style.display =
            "inline-block";

        deleteForeverButton.style.display =
            "inline-block";

        return;

    }


    favoriteButton.style.display =
        "inline-block";

    editButton.style.display =
        "inline-block";

    deleteButton.style.display =
        "inline-block";

    restoreButton.style.display =
        "none";

    deleteForeverButton.style.display =
        "none";


    if (currentNote.favorite) {

        favoriteButton.textContent =
            "★ Unfavorite";

    } else {

        favoriteButton.textContent =
            "☆ Favorite";

    }

}


// ==========================================
// NEW NOTE
// ==========================================

newNoteButton.addEventListener(
    "click",
    () => {

        editingNoteId = null;

        editorTitle.value = "";

        editorContent.value = "";

        noteView.style.display =
            "none";

        notesList.style.display =
            "none";

        noteEditor.style.display =
            "block";

        editorTitle.focus();

    }
);


// ==========================================
// EDIT NOTE
// ==========================================

editButton.addEventListener(
    "click",
    () => {

        if (!currentNote) {

            return;

        }


        editingNoteId =
            currentNote.id;

        editorTitle.value =
            currentNote.title;

        editorContent.value =
            currentNote.content;


        noteView.style.display =
            "none";

        noteEditor.style.display =
            "block";

        editorTitle.focus();

    }
);


// ==========================================
// SAVE NOTE
// ==========================================

saveNoteButton.addEventListener(
    "click",
    saveNote
);


async function saveNote() {

    const title =
        editorTitle.value.trim();

    const content =
        editorContent.value.trim();


    if (title === "") {

        alert(
            "Please enter a note title."
        );

        editorTitle.focus();

        return;

    }


    if (content === "") {

        alert(
            "Please write something."
        );

        editorContent.focus();

        return;

    }


    const noteData = {

        title: title,

        content: content

    };


    try {

        let response;


        if (editingNoteId === null) {

            response =
                await fetch(
                    "/api/notes",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                noteData
                            )
                    }
                );

        } else {

            response =
                await fetch(
                    `/api/notes/${editingNoteId}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                noteData
                            )
                    }
                );

        }


        if (!response.ok) {

            throw new Error(
                "Could not save note."
            );

        }


        await loadCurrentMode();

        editingNoteId = null;

    } catch (error) {

        console.error(error);

        alert(
            "Could not save note."
        );

    }

}


// ==========================================
// DELETE → TRASH
// ==========================================

deleteButton.addEventListener(
    "click",
    async () => {

        if (!currentNote) {

            return;

        }


        const confirmed =
            await showConfirm(
                "Move to Trash?",
                "This note will be moved to Trash. You can restore it later.",
                "Move to Trash"
            );


        if (!confirmed) {

            return;

        }


        try {

            const response =
                await fetch(
                    `/api/notes/${currentNote.id}`,
                    {
                        method: "DELETE"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Could not delete note."
                );

            }


            currentNote = null;

            await loadCurrentMode();

        } catch (error) {

            console.error(error);

            alert(
                "Could not move note to Trash."
            );

        }

    }
);


// ==========================================
// FAVORITE / UNFAVORITE
// ==========================================

favoriteButton.addEventListener(
    "click",
    async () => {

        if (!currentNote) {

            return;

        }


        try {

            const response =
                await fetch(
                    `/api/notes/${currentNote.id}/favorite`,
                    {
                        method: "PUT"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Could not update favorite."
                );

            }


            await loadCurrentMode();

        } catch (error) {

            console.error(error);

            alert(
                "Could not update Favorite."
            );

        }

    }
);


// ==========================================
// RESTORE
// ==========================================

restoreButton.addEventListener(
    "click",
    async () => {

        if (!currentNote) {

            return;

        }


        try {

            const response =
                await fetch(
                    `/api/notes/${currentNote.id}/restore`,
                    {
                        method: "PUT"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Could not restore note."
                );

            }


            currentNote = null;

            await loadTrash();

        } catch (error) {

            console.error(error);

            alert(
                "Could not restore note."
            );

        }

    }
);


// ==========================================
// DELETE FOREVER
// ==========================================

deleteForeverButton.addEventListener(
    "click",
    async () => {

        if (!currentNote) {

            return;

        }


        const confirmed =
            await showConfirm(
                "Delete forever?",
                "This note will be permanently deleted. This cannot be undone.",
                "Delete forever"
            );


        if (!confirmed) {

            return;

        }


        try {

            const response =
                await fetch(
                    `/api/notes/${currentNote.id}/permanent`,
                    {
                        method: "DELETE"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Could not permanently delete note."
                );

            }


            currentNote = null;

            await loadTrash();

        } catch (error) {

            console.error(error);

            alert(
                "Could not permanently delete note."
            );

        }

    }
);


// ==========================================
// BACK BUTTON
// ==========================================

backButton.addEventListener(
    "click",
    () => {

        currentNote = null;

        hideNoteView();

    }
);


// ==========================================
// EDITOR BACK
// ==========================================

editorBack.addEventListener(
    "click",
    async () => {

        const hasText =
            editorTitle.value.trim() !== "" ||
            editorContent.value.trim() !== "";


        if (hasText) {

            const confirmed =
                await showConfirm(
                    "Discard changes?",
                    "Your changes will be lost.",
                    "Discard"
                );


            if (!confirmed) {

                return;

            }

        }


        editingNoteId = null;

        hideEditor();

    }
);


// ==========================================
// SIDEBAR BUTTONS
// ==========================================

notesButton.addEventListener(
    "click",
    () => {

        loadNotes();

    }
);


favoritesButton.addEventListener(
    "click",
    () => {

        loadFavorites();

    }
);


trashButton.addEventListener(
    "click",
    () => {

        loadTrash();

    }
);


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    () => {

        const searchText =
            searchInput.value
                .toLowerCase()
                .trim();


        if (searchText === "") {

            renderNotes(notes);

            return;

        }


        const filtered =
            notes.filter(note =>

                note.title
                    .toLowerCase()
                    .includes(searchText)

                ||

                note.content
                    .toLowerCase()
                    .includes(searchText)

            );


        renderNotes(filtered);

    }
);


// ==========================================
// LOAD CURRENT MODE
// ==========================================

async function loadCurrentMode() {

    if (currentMode === "favorites") {

        await loadFavorites();

    } else if (currentMode === "trash") {

        await loadTrash();

    } else {

        await loadNotes();

    }

}


// ==========================================
// HIDE NOTE VIEW
// ==========================================

function hideNoteView() {

    notesList.style.display =
        "block";

    noteView.style.display =
        "none";

    noteEditor.style.display =
        "none";

}


// ==========================================
// HIDE EDITOR
// ==========================================

function hideEditor() {

    notesList.style.display =
        "block";

    noteView.style.display =
        "none";

    noteEditor.style.display =
        "none";

    loadCurrentMode();

}
function setActiveButton(button) {
    document
        .querySelectorAll(".nav-button")
        .forEach(item => {
            item.classList.remove(
                "active"
            );
        });
    button.classList.add(
        "active"
    );
}
function showError(message) {
    noteFiles.innerHTML = "";
    const error =
        document.createElement("div");
    error.className =
        "empty-notes";
    error.textContent =
        message;
    noteFiles.appendChild(error);
}
function escapeHtml(text) {
    const div =
        document.createElement("div");
    div.textContent =
        text;
    return div.innerHTML;
}
document.addEventListener(
    "keydown",
    event => {
        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {
            event.preventDefault();
            searchInput.focus();

        }
    }
);