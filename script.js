document.addEventListener("DOMContentLoaded", () => {
  const notesContainer = document.getElementById("notesContainer");
  const popupBox = document.getElementById("popupBox");
  const showPopup = document.getElementById("showPopup");
  const closePopup = document.getElementById("closePopup");
  const noteForm = document.getElementById("noteForm");
  let notes = [];
  let currentEditIndex = null;

  showPopup.addEventListener("click", () => {
    popupBox.classList.add("show");
  });

  closePopup.addEventListener("click", () => {
    popupBox.classList.remove("show");
    resetForm();
  });

  noteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("titleInput").value;
    const description = document.getElementById("descriptionInput").value;

    if (currentEditIndex !== null) {
      notes[currentEditIndex] = {
        title,
        description,
        date: new Date().toLocaleDateString(),
      };
      currentEditIndex = null;
    } else {
      notes.push({ title, description, date: new Date().toLocaleDateString() });
    }

    displayNotes();
    popupBox.classList.remove("show");
    resetForm();
  });

  function displayNotes() {
    notesContainer.innerHTML = "";
    notes.forEach((note, index) => {
      const noteElement = document.createElement("li");
      noteElement.classList.add("note");
      noteElement.innerHTML = `
              <div class="details">
                  <p>${note.title}</p>
                  <span>${note.description}</span>
              </div>
              <div class="bottom-content">
                  <span>${note.date}</span>
                  <div class="settings">
                      <button onclick="editNote(${index})">Edit</button>
                      <button onclick="deleteNote(${index})">Delete</button>
                  </div>
              </div>
          `;
      notesContainer.appendChild(noteElement);
    });
  }

  window.editNote = function (index) {
    currentEditIndex = index;
    const note = notes[index];
    document.getElementById("titleInput").value = note.title;
    document.getElementById("descriptionInput").value = note.description;
    popupBox.classList.add("show");
  };

  window.deleteNote = function (index) {
    notes.splice(index, 1);
    displayNotes();
  };

  function resetForm() {
    document.getElementById("titleInput").value = "";
    document.getElementById("descriptionInput").value = "";
  }

  displayNotes();
});
