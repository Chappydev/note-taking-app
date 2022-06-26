const noteGrid = document.querySelector("#note-container");
console.log(noteGrid)

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

  const noteTitleText = document.createTextNode(title);
  noteHeader.appendChild(noteTitleText);

  const noteContentText = document.createTextNode(content);
  noteParagraph.appendChild(noteContentText);

  note.appendChild(noteHeader);
  note.appendChild(noteParagraph);

  noteGrid.appendChild(note);
}