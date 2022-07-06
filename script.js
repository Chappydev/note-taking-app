const noteGrid = document.querySelector("#note-container");
const noteForm = document.querySelector("#note-form");
const noteModal = document.querySelector("#note-modal")
const noteModalTitle = noteModal.querySelector(".modal-title");
const noteModalContent = noteModal.querySelector(".modal-content");
const modalClose = document.querySelector(".close-modal");

let notes;
if (localStorage.getItem("notes") !== null) {
  console.log(`localStorage is ${localStorage.getItem("notes")}`);
  notes = JSON.parse(localStorage.getItem("notes"));
  console.log(JSON.parse(localStorage.getItem("notes")));
  console.log(notes);
  notes.forEach(addNote);
} else {
  console.log("Entered else");
  notes = [];
  localStorage.setItem("notes", JSON.stringify(notes));
  console.log(`Notes is ${notes}`);
};

function createNoteObject(title, content) {
  return { "title": title, "content": content };
}

function addNote({ title, content }) {
  const note = document.createElement("article");
  note.classList.add("note");

  note.innerHTML = '<svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-three-dots-vertical"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>';

  const noteHeader = document.createElement("h2");
  noteHeader.classList.add("note-title");

  const noteParagraph = document.createElement("p");
  noteParagraph.classList.add("note-text");

  if (title !== "") {
    const noteTitleText = document.createTextNode(title);
    noteHeader.appendChild(noteTitleText);
    note.appendChild(noteHeader);
  } else {
    note.dataset.title = "none";
  };

  if (content !== "") {
    const noteContentText = document.createTextNode(content);
    noteParagraph.appendChild(noteContentText);
    note.appendChild(noteParagraph);
  };

  const hiddenMenu = document.createElement("div");
  hiddenMenu.classList.add("hidden-menu");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button", "menu-button");
  const deleteText = document.createTextNode("Delete");
  const deleteSVGObjElement = document.createElement("object");
  deleteSVGObjElement.classList.add("delete-svg", "menu-icon");
  deleteSVGObjElement.setAttribute("type", "image/svg+xml");
  deleteSVGObjElement.setAttribute("data", "delete-svg-2.svg");
  deleteButton.appendChild(deleteSVGObjElement);
  deleteButton.appendChild(deleteText);

  hiddenMenu.appendChild(deleteButton);

  note.appendChild(hiddenMenu);
  hiddenMenu.style.display = 'none';

  const menuOpenButton = note.querySelector(".bi-three-dots-vertical");
  menuOpenButton.addEventListener("click", e => {
    e.stopPropagation();
    if (hiddenMenu.style.display === 'none') {
      hiddenMenu.style.display = 'flex';
    } else if (hiddenMenu.style.display === 'flex') {
      hiddenMenu.style.display = 'none';
    }
    
  })

  deleteButton.addEventListener("click", e => {
    e.stopPropagation();
    const noteIndex = [...note.parentElement.children].indexOf(note);

    note.remove();

    notes.splice(noteIndex, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
  })

  // click note to open modal with that note's content
  note.addEventListener("click", e => {
    // add note's content
    const noteIndex = [...note.parentElement.children].indexOf(note);
    noteModalTitle.textContent = notes[noteIndex].title;
    noteModalContent.textContent = notes[noteIndex].content;

    // open note
    noteModal.classList.toggle("hidden", noteModal.style.display === 'none');
  })

  noteGrid.appendChild(note);
}

function closeModal(e) {
  e.target.closest(".modal").classList.toggle("hidden", noteModal.style.display !== 'none');
}

noteForm.addEventListener("submit", e => {
  e.preventDefault();
  const titleInput = noteForm.children[0];
  const contentInput = noteForm.children[1];
  const newNoteObj = createNoteObject(titleInput.value, contentInput.value);
  notes.push(newNoteObj);
  localStorage.setItem("notes", JSON.stringify(notes));
  addNote(newNoteObj);
})

noteModal.querySelector(".inner-modal").addEventListener("click", e => {
  e.stopPropagation();
})
modalClose.addEventListener("click", closeModal);
noteModal.addEventListener("click", closeModal);
document.addEventListener("keydown", e => {
  if (noteModal.style.display === 'none') { return };
  if ((e.key === "Escape" || e.key === "Esc")) {
    noteModal.classList.toggle("hidden", noteModal.style.display !== 'none');
  }
})