const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = document.querySelector("header p");
const closeIcon = document.querySelector("header i");
const addBtn = document.querySelector("button");
const titleTag = document.querySelector("input");
const descTag = document.querySelector("textarea");

const mnth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//Here we are getting the localStorage notes if there exists any..and parsing them to js object otherwise we simply passing the empty array to notes.

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let isUpdated = false,
  updateId;

addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdated = false;
  titleTag.value = "";
  descTag.value = "";
  addBtn.innerText = "Add Note";
  popupTitle.innerText = "Add a new Note";
  popupBox.classList.remove("show");
});

function showAllNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let liTagContent = ` <li class="note">
                              <div class="details">
                                  <p>${note.noteTitle}</p>
                                  <span>${note.noteDesc}
                                  </span>
                              </div>
                              <div class="bottom-content">
                                  <span>${note.noteDate}</span>
                                      <div class="settings">
                                          <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                          <ul class="menu">
                                              <li onclick="updateNote(${index},'${note.noteTitle}','${note.noteDesc}')"><i class="uil uil-pen">
                                              </i>Edit</li>
                                              <li onclick="deleteNote(${index})">  <i class="uil uil-trash"></i>  Delete   </li>
                                          </ul>
                                      </div>
                              </div>
                          </li>`;
    addBox.insertAdjacentHTML("afterend", liTagContent);
  });
}

showAllNotes();

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure that you want to delete this note?");
  if (!confirmDel) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showAllNotes();
}

function updateNote(noteId, title, desc) {
  isUpdated = true;
  updateId = noteId;
  addBox.click();
  titleTag.value = title;
  descTag.value = desc;
  addBtn.innerText = "Update Note";
  popupTitle.innerText = "Update a Note";
  console.log(noteId, title, desc);
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = titleTag.value;
  let desc = descTag.value;

  if (title || desc) {
    let dateObj = new Date(),
      months = mnth[dateObj.getMonth()],
      day = dateObj.getDate(),
      year = dateObj.getFullYear();

    let noteInfo = {
      noteTitle: title,
      noteDesc: desc,
      noteDate: `${months} ${day},${year}`,
    };

    if (!isUpdated) {
      notes.push(noteInfo); // adding new note to notes.
    } else {
      isUpdated = false; //once value get updated we have to make this false otherwise new value will not add for next new note it will get updated.
      notes[updateId] = noteInfo; // updating specified note.
    }

    //saving notes to localStorage.
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showAllNotes();
  }
});
