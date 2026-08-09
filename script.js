document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audioPlayer");
    const title = document.getElementById("songTitle");
    const playAllBtn = document.getElementById("playAllBtn");

    let currentIndex = -1;
    let isPlayingAll = false;

    // Copy bài từ all-songs sang từng năm
    const sourceContainer = document.querySelector(".all-songs");
    const sourceSongs = sourceContainer.querySelectorAll("li");
    sourceSongs.forEach(song => {
        const year = song.dataset.year;
        const clone = song.cloneNode(true);
        const target = document.querySelector(".playlist-" + year);
        if (target) target.appendChild(clone);
    });
    sourceContainer.remove();

    // Lấy danh sách bài hát
    function getSongs() {
        return Array.from(
            document.querySelectorAll(".playlist-2025 li, .playlist-2004 li, .playlist-2026 li")
        );
    }

    // Phát theo index
    function playByIndex(index) {
        const songs = getSongs();
        if (!songs[index]) return;

        currentIndex = index;
        const song = songs[currentIndex];

        title.textContent = song.dataset.name;
        audio.src = song.dataset.file;
        audio.play();

        songs.forEach(li => li.classList.remove("active"));
        song.classList.add("active");
    }

    // Click từng bài
    document.addEventListener("click", function (e) {
        const li = e.target.closest(".playlist li[data-file]");
        if (!li) return;

        const songs = getSongs();
        const index = songs.indexOf(li);

        isPlayingAll = false;
        playByIndex(index);
    });

    // Play All
    playAllBtn.addEventListener("click", function () {
        const songs = getSongs();
        if (!songs.length) return;

        isPlayingAll = true;

        if (currentIndex === -1) {
            playByIndex(0);
        } else {
            audio.play();
        }
    });

    // Tự động phát bài tiếp
    audio.addEventListener("ended", function () {
        if (!isPlayingAll) return;

        const songs = getSongs();
        if (currentIndex < songs.length - 1) {
            playByIndex(currentIndex + 1);
        } else {
            isPlayingAll = false;
            currentIndex = -1;
        }
    });

    // Hiệu ứng disc quay
    audio.addEventListener("play", () => disc.classList.add("spinning"));
    audio.addEventListener("pause", () => disc.classList.remove("spinning"));
    audio.addEventListener("ended", () => disc.classList.remove("spinning"));

    // Hiệu ứng nốt nhạc bay
    audio.addEventListener("play", () => {
        const notes = ["🎵","🎶","♫"];
        const note = document.createElement("span");
        note.className = "note";
        note.textContent = notes[Math.floor(Math.random()*notes.length)];
        note.style.left = Math.random()*200 + "px";
        notesArea.appendChild(note);
        setTimeout(() => note.remove(), 3000);
    });
});
