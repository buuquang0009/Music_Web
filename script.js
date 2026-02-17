document.addEventListener("DOMContentLoaded", () => {

    const audio = document.getElementById("audioPlayer");
    const title = document.getElementById("songTitle");
    const disc = document.getElementById("disc");
    const notesContainer = document.getElementById("musicNotes");
    const playlistItems = document.querySelectorAll(".playlist li");
    const playAllBtn = document.getElementById("playAllBtn");

    let currentIndex = 0;
    let isPlayingAll = false;
    let noteInterval;

    /* ===== PLAY SONG ===== */
    function playSong(event, name, file) {

        title.innerText = name;
        audio.src = file;
        audio.play();

        document.querySelectorAll(".playlist li, .top-playlist li")
    .forEach(li => li.classList.remove("active"));


        if (event) {
            event.currentTarget.classList.add("active");
            currentIndex = [...playlistItems].indexOf(event.currentTarget);
        }
    }

    window.playSong = playSong; // QUAN TRỌNG (để onclick trong HTML dùng được)

    /* ===== PLAY ALL BUTTON ===== */
    if (playAllBtn) {
        playAllBtn.addEventListener("click", () => {

            if (playlistItems.length === 0) return;

            currentIndex = 0;
            isPlayingAll = true;

            playlistItems[currentIndex].click();
        });
    }

    /* ===== AUTO NEXT ===== */
    audio.addEventListener("ended", () => {

        clearInterval(noteInterval);

        if (isPlayingAll) {
            currentIndex++;

            if (currentIndex < playlistItems.length) {
                playlistItems[currentIndex].click();
            } else {
                isPlayingAll = false;
            }
        }
    });

    /* ===== DISC EFFECT ===== */
    audio.addEventListener("play", () => {
        disc.style.animationPlayState = "running";
        disc.classList.add("playing");
        startNotes();
    });

    audio.addEventListener("pause", () => {
        disc.style.animationPlayState = "paused";
        disc.classList.remove("playing");
        clearInterval(noteInterval);
    });

    /* ===== NOTES ===== */
    function startNotes() {
        clearInterval(noteInterval);
        noteInterval = setInterval(createNote, 400);
    }

    function createNote() {
        const note = document.createElement("div");
        note.classList.add("note");
        note.innerText = "♪";

        note.style.left = Math.random() * 80 + "%";
        note.style.top = "60%";

        notesContainer.appendChild(note);

        setTimeout(() => note.remove(), 3000);
    }

});

const mainPlaylist = document.querySelector(".playlist");
const topPlaylist = document.querySelector(".top-playlist");

const firstThree = mainPlaylist.querySelectorAll("li");

for (let i = 0; i < 3; i++) {
    if (firstThree[i]) {
        topPlaylist.appendChild(firstThree[i]);
    }
}

