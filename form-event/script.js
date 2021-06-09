const captcha = document.getElementById("inputCaptcha");
const inputNama = document.getElementById("inputNamaPanggilan");
const notifikasi = document.getElementById("notifikasiSisaKarakter");
const form = document.querySelector("form");
const submitBtn = document.getElementById("submitButton");
const inputCopy = document.getElementById("inputCopy");
const inputPaste = document.getElementById("inputPaste");

notifikasi.style.visibility = "hidden";

inputNama.addEventListener("input", () => {
    const cntKarakter = document.getElementById("sisaKarakter");
    const sisa =
        parseInt(inputNama.maxLength) - parseInt(inputNama.value.length);
    cntKarakter.innerText = sisa;

    if (sisa < 5) {
        notifikasi.style.color = "red";
    } else {
        notifikasi.style.color = "black";
    }

    if (sisa == 0) {
        cntKarakter.innerText = "Sudah mencapai batas!";
    }
});

inputNama.addEventListener("focus", () => {
    notifikasi.style.visibility = "visible";
});

inputNama.addEventListener("blur", () => {
    notifikasi.style.visibility = "hidden";
});

captcha.addEventListener("input", () => {
    submitBtn.removeAttribute("disabled");
    if (captcha.value !== "PRNU") {
        captcha.setCustomValidity("Captcha yang dimasukkan masih salah");
    } else {
        captcha.setCustomValidity("");
    }
});

form.addEventListener("submit", (e) => {
    if (captcha.validity.customError) {
        submitBtn.setAttribute("disabled", "disabled");
        e.preventDefault();
    } else {
        alert("Data berhasil dikirimkan (Pura-puranya) :D");
    }
});

inputCopy.addEventListener("copy", (e) => {
    const data = document.getSelection().toString();
    e.clipboardData.setData("text/plain", data.toUpperCase());
    alert("Anda mengkopi sesuatu");
    e.preventDefault();
});

inputPaste.addEventListener("paste", (e) => {
    const pesan = (e.clipboardData || window.clipboardData).getData(
        "text/plain"
    );
    alert(`Anda Mempaste sesuatu : ${pesan}`);
});
