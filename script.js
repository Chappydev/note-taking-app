const noteGrid = document.querySelector("#note-container");
const noteForm = document.querySelector("#note-form");

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


  noteGrid.appendChild(note);
}

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInput = noteForm.children[0];
  const contentInput = noteForm.children[1];
  const newNoteObj = createNoteObject(titleInput.value, contentInput.value);
  notes.push(newNoteObj);
  localStorage.setItem("notes", JSON.stringify(notes));
  addNote(newNoteObj);
})