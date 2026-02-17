document.addEventListener("DOMContentLoaded", function () {

    const audio = document.getElementById("audioPlayer");
    const title = document.getElementById("songTitle");
    const playAllBtn = document.getElementById("playAllBtn");

    let currentIndex = -1;
    let isPlayingAll = false;

    const mainPlaylist = document.querySelector(".playlist");
    const topPlaylist = document.querySelector(".top-playlist");

    // Move first 3 songs to top box
    const firstThree = Array.from(mainPlaylist.querySelectorAll("li")).slice(0, 3);
    firstThree.forEach(li => topPlaylist.appendChild(li));

    function getSongs() {
        return Array.from(document.querySelectorAll("li[data-file]"));
    }

    function playByIndex(index) {
        const songs = getSongs();
        if (!songs[index]) return;

        const song = songs[index];

        title.textContent = song.dataset.name;
        audio.src = song.dataset.file;
        audio.play();

        songs.forEach(li => li.classList.remove("active"));
        song.classList.add("active");

        currentIndex = index;
    }

    // Click song
    document.addEventListener("click", function (e) {
        const li = e.target.closest("li[data-file]");
        if (!li) return;

        const songs = getSongs();
        const index = songs.indexOf(li);

        isPlayingAll = false;
        playByIndex(index);
    });

    // Play all
    playAllBtn.addEventListener("click", function () {
        const songs = getSongs();
        if (songs.length === 0) return;

        isPlayingAll = true;

        if (currentIndex === -1) {
            playByIndex(0);
        }
    });

    // Auto next
    audio.addEventListener("ended", function () {
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
