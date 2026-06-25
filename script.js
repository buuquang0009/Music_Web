document.addEventListener("DOMContentLoaded", function () {

    const audio = document.getElementById("audioPlayer");
    const video = document.getElementById("videoPlayer");
    const title = document.getElementById("songTitle");
    const playAllBtn = document.getElementById("playAllBtn");

    let currentIndex = -1;
    let isPlayingAll = false;

/* ===== COPY BÀI TỪ all-songs SANG TỪNG NĂM ===== */
const sourceContainer = document.querySelector(".all-songs");
const sourceSongs = sourceContainer.querySelectorAll("li");

sourceSongs.forEach(song => {
    const year = song.dataset.year;
    const clone = song.cloneNode(true);
    const target = document.querySelector(".playlist-" + year);
    if (target) target.appendChild(clone);
});

/* ===== XÓA DANH SÁCH GỐC SAU KHI CLONE ===== */
sourceContainer.remove();

    /* ===== CHỈ LẤY BÀI ĐANG HIỂN THỊ ===== */
function getSongs() {
    return Array.from(
        document.querySelectorAll(".playlist-2025 li, .playlist-2004 li")
    );
}


    /* ===== PHÁT THEO INDEX ===== */
function playByIndex(index) {
    const songs = getSongs();
    if (!songs[index]) return;

    currentIndex = index;
    const song = songs[currentIndex];

    title.textContent = song.dataset.name;

    if (song.dataset.video) {
        // Phát video
        audio.pause();
        audio.style.display = "none";

        video.querySelector("source").src = song.dataset.video;
        video.style.display = "block";
        video.load();
        video.play();
    } else {
        // Phát audio
        video.pause();
        video.style.display = "none";

        audio.src = song.dataset.file;
        audio.style.display = "block";
        audio.play();
    }

    songs.forEach(li => li.classList.remove("active"));
    song.classList.add("active");
}

    /* ===== CLICK TỪNG BÀI ===== */
    document.addEventListener("click", function (e) {

        const li = e.target.closest(".playlist li[data-file]");
        if (!li) return;

        const songs = getSongs();
        const index = songs.indexOf(li);

        isPlayingAll = false;
        playByIndex(index);
    });

    /* ===== PLAY ALL ===== */
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

    /* ===== TỰ ĐỘNG PHÁT BÀI TIẾP ===== */
    audio.addEventListener("ended", function () {

        if (!isPlayingAll) return;

        const songs = getSongs();

        if (currentIndex < songs.length - 1) {
            playByIndex(currentIndex + 1);
        } else {
            isPlayingAll = false;
            currentIndex = -1; // reset khi phát xong hết list
        }
    });
    video.addEventListener("ended", function () {
    if (!isPlayingAll) return;

    const songs = getSongs();

    if (currentIndex < songs.length - 1) {
        playByIndex(currentIndex + 1);
    } else {
        isPlayingAll = false;
        currentIndex = -1; // reset khi phát xong hết list
    }
});

   // ===== HIỆU ỨNG DISC QUAY =====
    audio.addEventListener("play", () => disc.classList.add("spinning"));
    audio.addEventListener("pause", () => disc.classList.remove("spinning"));
    audio.addEventListener("ended", () => disc.classList.remove("spinning"));

    // ===== HIỆU ỨNG NỐT NHẠC BAY =====
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
