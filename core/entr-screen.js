const enter = document.getElementById("enter");
const site = document.getElementById("site");
const music = document.getElementById("music");

enter.onclick = () => {
    enter.classList.add("disintegrate");
    site.style.display = "block";
    music.volume = 0.4;
    music.play();
};

enter.addEventListener("animationend", () => {
    enter.style.display = "none";
});
