const audio = document.getElementById("audioPlayer");
const title = document.getElementById("songTitle");
const disc = document.getElementById("disc");

/* ===== HÀM PHÁT NHẠC ===== */
function playSong(name, file) {

    // Đổi tiêu đề
    title.innerText = name;

    // Nếu đang phát bài khác thì reset trước
    audio.pause();
    audio.currentTime = 0;

    // Đổi nguồn nhạc
    audio.src = file;

    // Phát nhạc
    audio.play().catch(error => {
        console.log("Autoplay bị chặn:", error);
    });
}

/* ===== KHI NHẠC CHẠY ===== */
audio.addEventListener("play", () => {
    disc.style.animationPlayState = "running";
    disc.classList.add("playing");
});

/* ===== KHI NHẠC TẠM DỪNG ===== */
audio.addEventListener("pause", () => {
    disc.style.animationPlayState = "paused";
    disc.classList.remove("playing");
});

/* ===== KHI NHẠC KẾT THÚC ===== */
audio.addEventListener("ended", () => {
    disc.style.animationPlayState = "paused";
    disc.classList.remove("playing");
});
