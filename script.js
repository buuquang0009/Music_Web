const audio = document.getElementById("audioPlayer");
const title = document.getElementById("songTitle");
const disc = document.getElementById("disc");
const notesContainer = document.getElementById("notes");


// ===== PLAY SONG =====
function playSong(name, file) {

    title.innerText = name;
    audio.src = file;
    audio.play();
}


// ===== DISC ROTATE =====
audio.addEventListener("play", () => {
    disc.style.animationPlayState = "running";
    startNotes();
});

audio.addEventListener("pause", () => {
    disc.style.animationPlayState = "paused";
});

audio.addEventListener("ended", () => {
    disc.style.animationPlayState = "paused";
});


// ===== MUSIC NOTES EFFECT =====
function startNotes() {

    setInterval(() => {

        if (audio.paused) return;

        const note = document.createElement("div");
        note.classList.add("note");
        note.innerText = "♪";

        note.style.left = Math.random() * 80 + "%";
        note.style.fontSize = (20 + Math.random() * 20) + "px";

        notesContainer.appendChild(note);

        setTimeout(() => {
            note.remove();
        }, 3000);

    }, 500);
}
