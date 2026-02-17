document.addEventListener("DOMContentLoaded", () => {

    const audio = document.getElementById("audioPlayer");
    const title = document.getElementById("songTitle");
    const disc = document.getElementById("disc");
    const notesContainer = document.getElementById("musicNotes");
    const playAllBtn = document.getElementById("playAllBtn");

    let currentIndex = 0;
    let isPlayingAll = false;
    let noteInterval;

    /* ================= MOVE FIRST 3 SONGS ================= */
    const mainPlaylist = document.querySelector(".playlist");
    const topPlaylist = document.querySelector(".top-playlist");

    const firstThree = mainPlaylist.querySelectorAll("li");

    for (let i = 0; i < 3; i++) {
        if (firstThree[i]) {
            topPlaylist.appendChild(firstThree[i]);
        }
    }

    /* ================= GET ALL SONGS ================= */
    function getAllSongs() {
        return document.querySelectorAll(".playlist li, .top-playlist li");
    }

    /* ================= PLAY SONG ================= */
    function playSong(event, name, file) {

        const allSongs = getAllSongs();

        title.innerText = name;
        audio.src = file;
        audio.play();

        allSongs.forEach(li => li.classList.remove("active"));

        if (event) {
            event.currentTarget.classList.add("active");
            currentIndex = [...allSongs].indexOf(event.currentTarget);
        }
    }

    window.playSong = playSong;

    /* ================= PLAY ALL ================= */
    if (playAllBtn) {
        playAllBtn.addEventListener("click", () => {

            const allSongs = getAllSongs();
            if (allSongs.length === 0) return;

            isPlayingAll = true;

            const activeSong = document.querySelector(".active");

            if (activeSong) {
                currentIndex = [...allSongs].indexOf(activeSong);
            } else {
                currentIndex = 0;
                allSongs[currentIndex].click();
            }
        });
    }

    /* ================= AUTO NEXT ================= */
    audio.addEventListener("ended", () => {

        if (!isPlayingAll) return;

        const allSongs = getAllSongs();

        currentIndex++;

        if (currentIndex < allSongs.length) {
            allSongs[currentIndex].click();
        } else {
            isPlayingAll = false;
        }
    });

    /* ================= DISC EFFECT ================= */
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

    /* ================= MUSIC NOTES ================= */
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
