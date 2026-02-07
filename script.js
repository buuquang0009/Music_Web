const audio = document.getElementById("audioPlayer");
const disc = document.getElementById("disc");
const title = document.getElementById("songTitle");

function playSong(name, url) {
    title.innerText = name;
    audio.src = url;
    audio.play();
    disc.style.animationPlayState = "running";
}

audio.onpause = function() {
    disc.style.animationPlayState = "paused";
};

audio.onended = function() {
    disc.style.animationPlayState = "paused";
};
