// MODAL LOGIC - CALENDAR
var calendarModal = document.getElementById("CalendarModal");
var calendarBtn = document.getElementById("ts4");
const yearSelect = document.getElementById("yearSelect");
const todayBtn = document.getElementById("todayBtn");

function updateTime() {
  const time = new Date().toLocaleTimeString();
  document.getElementById("clock-count").textContent = time;
}
updateTime();
setInterval(updateTime, 1000);

// Desktop Shortcuts
function hideDesktopIcons() {
  document.getElementById("DesktopIcons").classList.add("hidden");
}

function showDesktopIcons() {
  document.getElementById("DesktopIcons").classList.remove("hidden");
}

document.getElementById("d1").addEventListener("click", function () {
  document.getElementById("NotesApp").style.display = "block";
  hideDesktopIcons();
});

document.getElementById("d2").addEventListener("click", function () {
  document.getElementById("TodoApp").style.display = "block";
  hideDesktopIcons();
});

document.getElementById("d3").addEventListener("click", function () {
  document.getElementById("MusicPlayerModal").style.display = "flex";
  hideDesktopIcons();
});

document.getElementById("d4").addEventListener("click", function () {
  document.getElementById("CalendarModal").style.display = "flex";
  hideDesktopIcons();
});

document.getElementById("btn").addEventListener("click", function () {
  document.getElementById("NotesApp").style.display = "none";
  showDesktopIcons();
});

document.getElementById("TodoClose").addEventListener("click", function () {
  document.getElementById("TodoApp").style.display = "none";
  showDesktopIcons();
});

document.getElementById("CloseBtn").addEventListener("click", function () {
  document.getElementById("MusicPlayerModal").style.display = "none";
  showDesktopIcons();
});

window.addEventListener("click", function (event) {
  if (event.target === document.getElementById("CalendarModal")) {
    document.getElementById("CalendarModal").style.display = "none";
    showDesktopIcons();
  }
});

calendarBtn.onclick = function () {
  calendarModal.style.display = "flex";
  console.log("Calendar modal opened");
};

window.onclick = function (event) {
  if (event.target === calendarModal) {
    calendarModal.style.display = "none";
  }
};

// CALENDAR
const monthYearElement = document.getElementById("monthYear");
const datesElement = document.getElementById("dates");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentDate = new Date();

const CURRENT_YEAR = new Date().getFullYear();

for (let y = 1970; y <= 2070; y++) {
  const option = document.createElement("option");
  option.value = y;
  option.textContent = y;
  if (y === CURRENT_YEAR) option.selected = true;
  yearSelect.appendChild(option);
}

yearSelect.addEventListener("change", () => {
  currentDate.setFullYear(parseInt(yearSelect.value));
  updateCalendar();
});

todayBtn.addEventListener("click", () => {
  currentDate = new Date();
  updateCalendar();
});

function updateCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  yearSelect.value = year;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const totalDays = lastDay.getDate();
  const startDay = firstDay.getDay();

  monthYearElement.textContent = currentDate.toLocaleString("default", {
    month: "long",
  });

  let datesHTML = "";

  for (let i = startDay; i > 0; i--) {
    const prevDate = new Date(year, month, 1 - i);
    datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
  }

  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(year, month, i);
    const isToday =
      date.toDateString() === new Date().toDateString() ? "active" : "";
    datesHTML += `<div class="date ${isToday}">${i}</div>`;
  }
  const totalCells = startDay + totalDays;
  const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= remaining; i++) {
    datesHTML += `<div class="date inactive">${i}</div>`;
  }
  datesElement.innerHTML = datesHTML;
}

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});
updateCalendar();

// MUSIC PLAYER MODAL + CLOSE LOGIC
var musicModal = document.getElementById("MusicPlayerModal");
var musicBtn = document.getElementById("ts3");

// OPEN & CLOSE MUSIC MODAL
musicBtn.onclick = function () {
  musicModal.style.display = "flex";
  console.log("Music modal opened");
};

document.getElementById("CloseBtn").addEventListener("click", function () {
  musicModal.style.display = "none";
});

// Switching Between Music Category
var UploadMusicBtn = document.getElementById("UploadMusicBtn");
var EnglishSongsBtn = document.getElementById("EnglishSongsBtn");
var TamilSongsBtn = document.getElementById("TamilSongsBtn");

function HideUplaodCate() {
  document.getElementById("UploadMusic").style.display = "none";
  UploadMusicBtn.style.backgroundColor = "white";
  UploadMusicBtn.style.color = "black";
}

function HideTamilCate() {
  document.getElementById("TamilSongs").style.display = "none";
  TamilSongsBtn.style.backgroundColor = "white";
  TamilSongsBtn.style.color = "black";
}

function HideEnglishCate() {
  document.getElementById("EnglishSongs").style.display = "none";
  EnglishSongsBtn.style.backgroundColor = "white";
  EnglishSongsBtn.style.color = "black";
}

UploadMusicBtn.addEventListener("click", function () {
  document.getElementById("UploadMusic").style.display = "flex";

  UploadMusicBtn.style.backgroundColor = "black";
  UploadMusicBtn.style.color = "white";

  HideTamilCate();
  HideEnglishCate();
});

TamilSongsBtn.addEventListener("click", function () {
  document.getElementById("TamilSongs").style.display = "flex";

  TamilSongsBtn.style.backgroundColor = "black";
  TamilSongsBtn.style.color = "white";

  HideUplaodCate();
  HideEnglishCate();
});

EnglishSongsBtn.addEventListener("click", function () {
  document.getElementById("EnglishSongs").style.display = "flex";

  EnglishSongsBtn.style.backgroundColor = "black";
  EnglishSongsBtn.style.color = "white";

  HideUplaodCate();
  HideTamilCate();
});

// Upload Music and Play Music
const audioFileInput = document.getElementById("musicUpload");
const audioPlayer = document.getElementById("M-Control");

audioFileInput.addEventListener("change", function (event) {
  const files = event.target.files;
  if (files && files.length > 0) {
    const selectedFile = files[0];
    const fileURL = URL.createObjectURL(selectedFile);
    audioPlayer.src = fileURL;
    audioPlayer.load();
  }
});

// Muisc Pause, Play and Ended Changes
audioPlayer.addEventListener("play", (event) => {
  document.getElementById("UploadMusicIcon").src ="./assets/icons/DiscPlaying.gif";
  document.getElementById("UploadMusicIcon").addEventListener("click", function () {
      document.querySelector("label").removeAttribute("for");
      audioPlayer.pause();
    });
});

audioPlayer.addEventListener("pause", (event) => {
  document.getElementById("UploadMusicIcon").src ="./assets/icons/play-button.png";
  document.getElementById("UploadMusicIcon").addEventListener("click", function () {
      document.querySelector("label").removeAttribute("for");
      audioPlayer.play();
    });
});

audioPlayer.addEventListener("ended", (event) => {
  document.getElementById("UploadMusicIcon").src =
    "./assets/icons/upload-music.png";
  document
    .getElementById("UploadMusicIcon")
    .addEventListener("click", function () {
      document.querySelector("label").setAttribute("for", "musicUpload");
      audioPlayer.pause();
    });
});

// Playing Tamil and English Built-in Songs
let currentSongElement = null;
document.querySelectorAll(".ES-Items").forEach((song) => {
  song.addEventListener("click", () => {
    const src = song.dataset.src;
    if (currentSongElement === song) {
      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
      return;
    }
    currentSongElement = song;
    audioPlayer.src = src;
    audioPlayer.play();
  });
});

document.querySelectorAll(".TS-Items").forEach((song) => {
  song.addEventListener("click", () => {
    const src = song.dataset.src;

    if (currentSongElement === song) {
      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
      return;
    }

    currentSongElement = song;
    audioPlayer.src = src;
    audioPlayer.play();
  });
});

// Settings JavaScript
var settingsModal = document.getElementById("SettingsModal");
var settingsBtn = document.getElementById("ts5");

settingsBtn.onclick = function () {
  settingsModal.style.display = "flex";
  console.log("Settings Model Opened.");
};

document.getElementById("Sett-CloseBtn").addEventListener("click", function () {
  settingsModal.style.display = "none";
  console.log("Settings Model Closed.");
});

// Toggle Logic b/w settings options
const WallpaperBtn = document.getElementById("WallpaperBtn");
const WallpaperDiv = document.getElementById("WallpaperDiv");

const ThemeBtn = document.getElementById("ThemeBtn");
const ThemeDiv = document.getElementById("ThemeDiv");

const Fontstn = document.getElementById("Fontstn");
const FontsDiv = document.getElementById("FontsDiv");

function hideAllSettings() {
  WallpaperDiv.style.display = "none";
  ThemeDiv.style.display = "none";
  FontsDiv.style.display = "none";

  WallpaperBtn.style.backgroundColor = "";
  ThemeBtn.style.backgroundColor = "";
  Fontstn.style.backgroundColor = "";

  WallpaperBtn.style.color = "";
  ThemeBtn.style.color = "";
  Fontstn.style.color = "";
}

WallpaperBtn.addEventListener("click", function () {
  hideAllSettings();
  WallpaperDiv.style.display = "flex";

  WallpaperBtn.style.backgroundColor = "black";
  WallpaperBtn.style.color = "white";
});

// ThemeBtn.addEventListener("click", function () {
//     hideAllSettings();
//     ThemeDiv.style.display = "block";

//     ThemeBtn.style.backgroundColor = "black";
//     ThemeBtn.style.color = "white";
// });

// Fontstn.addEventListener("click", function () {
//     hideAllSettings();
//     FontsDiv.style.display = "block";

//     Fontstn.style.backgroundColor = "black";
//     Fontstn.style.color = "white";
// });

settingsBtn.addEventListener("click", function () {
  hideAllSettings();
  WallpaperDiv.style.display = "flex";
});

// Wallpaper Changing Logic
let selectedWallpaper = null;

const wallpapers = document.querySelectorAll(".Wallpapers");
const saveWallpaperBtn = document.getElementById("SaveWallpaperBtn");

wallpapers.forEach((img) => {
  img.addEventListener("click", function () {
    wallpapers.forEach((w) => (w.style.border = "none"));
    this.style.border = "3px solid black";
    selectedWallpaper = this.src;
  });
});

saveWallpaperBtn.addEventListener("click", function () {
  if (!selectedWallpaper) {
    alert("Please select a wallpaper first!");
    return;
  }
  document.body.style.backgroundImage = `url('${selectedWallpaper}')`;
  localStorage.setItem("selectedWallpaper", selectedWallpaper);
});

const savedWallpaper = localStorage.getItem("selectedWallpaper");
if (savedWallpaper) {
  document.body.style.backgroundImage = `url('${savedWallpaper}')`;
}

// Start Menu
const startMenuBtn = document.getElementById("start-menu");
const startMenuContainer = document.getElementById("Start-Menu-Container");

startMenuBtn.addEventListener("click", function () {
  startMenuContainer.style.display = "flex";
});

startMenuBtn.addEventListener("mouseenter", function () {
  startMenuContainer.style.display = "flex";
});

startMenuContainer.addEventListener("mouseenter", function () {
  startMenuContainer.style.display = "flex";
});

startMenuContainer.addEventListener("mouseleave", function () {
  startMenuContainer.style.display = "none";
});

document.getElementById("SM1").addEventListener("click", function () {
  document.getElementById("NotesApp").style.display = "block";
});

document.getElementById("SM2").addEventListener("click", function () {
  document.getElementById("TodoApp").style.display = "block";
});

document.getElementById("SM3").addEventListener("click", function () {
  musicModal.style.display = "flex";
});

document.getElementById("SM4").addEventListener("click", function () {
  calendarModal.style.display = "flex";
});

document.getElementById("SM5").addEventListener("click", function () {
  settingsModal.style.display = "flex";
});

// Notes JavaScript
document.getElementById("ts1").addEventListener("click", function () {
  document.getElementById("NotesApp").style.display = "block";
});

document.getElementById("btn").addEventListener("click", function () {
  document.getElementById("NotesApp").style.display = "none";
});

let notes = [];
let editingNoteId = null;

function loadNotes() {
  const savedNotes = localStorage.getItem("notes");
  return savedNotes ? JSON.parse(savedNotes) : [];
}

function saveNote(event) {
  event.preventDefault();
  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim();
  if (editingNoteId) {
    const noteIndex = notes.findIndex((note) => note.id === editingNoteId);
    notes[noteIndex] = {
      ...notes[noteIndex],
      title: title,
      content: content,
    };
  } else {
    notes.unshift({
      id: generateID(),
      title: title,
      content: content,
    });
  }
  closeNoteDialog();
  saveNotes();
  renderNotes();
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function deleteNote(noteId) {
  notes = notes.filter((note) => note.id != noteId);
  saveNotes();
  renderNotes();
}

function renderNotes() {
  const notesContainer = document.getElementById("notesContainer");
  if (notes.length === 0) {
    notesContainer.innerHTML =
      '<div class="empty-state"><h2>No Notes</h2><p>Currently No Notes Are Available! Try To Create Something</p><button class="add-note-btn" onclick="openNoteDialog()">+ Add Your Note</button></div>';
    return;
  }
  notesContainer.innerHTML = notes
    .map(
      (note) =>
        `<div class="note-card"><h3 class="note-title">${note.title}</h3><p class="note-content">${note.content}</p><div class="note-actions"><button class="edit-btn" onclick="openNoteDialog('${note.id}')">E</button><button class="delete-btn" onclick="deleteNote('${note.id}')">D</button></div></div>`,
    )
    .join("");
}

function generateID() {
  return Date.now().toString();
}

function openNoteDialog(noteId = null) {
  const dialog = document.getElementById("noteDialog");
  const titleInput = document.getElementById("noteTitle");
  const contentInput = document.getElementById("noteContent");

  if (noteId) {
    const noteTOEdit = notes.find((note) => note.id === noteId);
    editingNoteId = noteId;
    document.getElementById("dialogTitle").textContent = "Edit Now";
    titleInput.value = noteTOEdit.title;
    contentInput.value = noteTOEdit.content;
  } else {
    editingNoteId = null;
    document.getElementById("dialogTitle").textContent = "Add Your New Note";
    titleInput.value = "";
    contentInput.value = "";
  }
  dialog.showModal();
  titleInput.focus();
}

function closeNoteDialog() {
  document.getElementById("noteDialog").close();
}

document.addEventListener("DOMContentLoaded", function () {
  notes = loadNotes();
  renderNotes();
  document.getElementById("noteForm").addEventListener("submit", saveNote);
  document
    .getElementById("noteDialog")
    .addEventListener("click", function (event) {
      if (event.target === this) {
        closeNoteDialog();
      }
    });
});

// To Do App JavaScript
document.getElementById("ts2").addEventListener("click", function () {
  document.getElementById("TodoApp").style.display = "block";
});

document.getElementById("TodoClose").addEventListener("click", function () {
  document.getElementById("TodoApp").style.display = "none";
});

const inputBox = document.getElementById("input-box");
const list = document.getElementById("list-container");
const taskStatus = document.getElementById("task-status");

function addTask() {
  if (inputBox.value === "") {
    alert("Please Fill The Task!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    list.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveTask();
  updateTaskStatus();
}

function updateTaskStatus() {
  const tasks = list.getElementsByTagName("li");
  let unCompletedCount = 0;
  for (let task of tasks) {
    if (!task.classList.contains("selected")) {
      unCompletedCount++;
    }
  }
  if (tasks.length === 0) {
    taskStatus.innerText = "No Tasks Yet";
  } else {
    taskStatus.innerText = `${unCompletedCount} Tasks Remaining`;
  }
}

function saveTask() {
  localStorage.setItem("data", list.innerHTML);
  updateTaskStatus();
}

function showTask() {
  list.innerHTML = localStorage.getItem("data");
  updateTaskStatus();
}
showTask();

list.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("selected");
      saveTask();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveTask();
    } else {
      alert("Please Fill The Task!");
    }
  },
  false,
);

const mobileMenuBtn = document.getElementById("MobileMenuBtn");
const mobileNav = document.getElementById("MobileNavMenu");

mobileMenuBtn.onclick = () => {
  if (mobileNav.style.display === "flex") {
    mobileNav.style.display = "none";
  } else {
    mobileNav.style.display = "flex";
  }
};

function closeMobileMenu(){
  mobileNav.style.display = "none";
}

document.getElementById("m1").onclick = () => {
  document.getElementById("ts1").click();
  closeMobileMenu();
};

document.getElementById("m2").onclick = () => {
  document.getElementById("ts2").click();
  closeMobileMenu();
};

document.getElementById("m3").onclick = () => {
  document.getElementById("ts3").click();
  closeMobileMenu();
};

document.getElementById("m4").onclick = () => {
  document.getElementById("ts4").click();
  closeMobileMenu();
};

document.getElementById("m5").onclick = () => {
  document.getElementById("ts5").click();
  closeMobileMenu();
};
