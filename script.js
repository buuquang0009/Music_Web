document.addEventListener("DOMContentLoaded", () => {

    const audio = document.getElementById("audioPlayer");
    const title = document.getElementById("songTitle");
    const disc = document.getElementById("disc");
    const notesContainer = document.getElementById("musicNotes");
    const playAllBtn = document.getElementById("playAllBtn");

    let currentIndex = -1;
    let isPlayingAll = false;
    let noteInterval;

    /* ===== MOVE FIRST 3 SONGS ===== */
    const mainPlaylist = document.querySelector(".playlist");
    const topPlaylist = document.querySelector(".top-playlist");

    const firstThree = mainPlaylist.querySelectorAll("li");

    for (let i = 0; i < 3; i++) {
        if (firstThree[i]) {
            topPlaylist.appendChild(firstThree[i]);
        }
    }

    function getAllSongs() {
        return Array.from(document.querySelectorAll(".playlist li, .top-playlist li"));
    }

    function playByIndex(index) {

        const songs = getAllSongs();
        if (index < 0 || index >= songs.length) return;

        const song = songs[index];

        const name = song.dataset.name;
        const file = song.dataset.file;

        title.innerText = name;
        audio.src = file;
        audio.play();

        songs.forEach(li => li.classList.remove("active"));
        song.classList.add("active");

        currentIndex = index;
    }

    /* ===== CLICK SONG ===== */
    document.addEventListener("click", (e) => {

        const li = e.target.closest(".playlist li, .top-playlist li");
        if (!li) return;

        const songs = getAllSongs();
        const index = songs.indexOf(li);

        isPlayingAll = false;
        playByIndex(index);
    });

    /* ===== PLAY ALL ===== */
    if (playAllBtn) {
        playAllBtn.addEventListener("click", () => {

            const songs = getAllSongs();
            if (songs.length === 0) return;

            isPlayingAll = true;

            if (currentIndex === -1) {
                playByIndex(0);
            }
        });
    }

    /* ===== AUTO NEXT ===== */
    audio.addEventListener("ended", () => {

        if (!isPlayingAll) return;

        const songs = getAllSongs();

        currentIndex++;

        if (currentIndex < songs.length) {
            playByIndex(currentIndex);
        } else {
            isPlayingAll = false;
        }
    });

});
