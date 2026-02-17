document.addEventListener("DOMContentLoaded", () => {

    const audio = document.getElementById("audioPlayer");
    const title = document.getElementById("songTitle");
    const playAllBtn = document.getElementById("playAllBtn");

    let currentIndex = -1;
    let isPlayingAll = false;

    /* ===== MOVE FIRST 3 SONGS ===== */
    const mainPlaylist = document.querySelector(".playlist");
    const topPlaylist = document.querySelector(".top-playlist");

    const firstThree = [...mainPlaylist.querySelectorAll("li")].slice(0, 3);
    firstThree.forEach(li => topPlaylist.appendChild(li));

    /* ===== GET ALL SONGS ===== */
    function getSongs() {
        return Array.from(document.querySelectorAll("li[data-file]"));
    }

    /* ===== PLAY BY INDEX ===== */
    function playByIndex(index) {

        const songs = getSongs();
        if (!songs[index]) return;

        const song = songs[index];

        title.innerText = song.dataset.name;
        audio.src = song.dataset.file;
        audio.play();

        songs.forEach(li => li.classList.remove("active"));
        song.classList.add("active");

        currentIndex = index;
    }

    /* ===== CLICK SONG ===== */
    document.addEventListener("click", (e) => {

        const li = e.target.closest("li[data-file]");
        if (!li) return;

        const songs = getSongs();
        const index = songs.indexOf(li);

        isPlayingAll = false;
        playByIndex(index);
    });

    /* ===== PLAY ALL ===== */
    playAllBtn.addEventListener("click", () => {

        const songs = getSongs();
        if (songs.length === 0) return;

        isPlayingAll = true;

        if (currentIndex === -1) {
            playByIndex(0);
        }
    });

    /* ===== AUTO NEXT ===== */
    audio.addEventListener("ended", () => {

        if (!isPlayingAll) return;

        currentIndex++;

        const songs = getSongs();

        if (currentIndex < songs.length) {
            playByIndex(currentIndex);
        } else {
            isPlayingAll = false;
        }
    });

});
