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

  // const threeDots = document.createElement("object");
  // threeDots.classList.add("svg", "three-dots");
  // threeDots.setAttribute("type", "image/svg+xml");
  // threeDots.setAttribute("data", "three-dots-vertical-svgrepo-com.svg");
  // note.appendChild(threeDots);


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