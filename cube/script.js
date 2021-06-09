const gambar = document.getElementById("gambar");
gambar.style.width = "400px";
gambar.style.height = "auto";

const play = document.getElementsByClassName("button")[3].children[0];
play.innerText = "Play";
play.setAttribute("disabled", "disabled");

const dicoding = document.querySelector("ul li:first-child").childNodes[0];
dicoding.innerHTML = "<i>Belajar Programming di Dicoding</i>";

const google = document.querySelector("ul li:last-child").childNodes[0];
google.innerHTML = "<i>Mencari sesuatu di Google</i>";

document.querySelectorAll("button").forEach((obj) => {
    obj.style.borderRadius = "8px";
    obj.style.padding = "12px";
});
