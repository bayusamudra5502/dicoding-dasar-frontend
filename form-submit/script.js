const form = document.getElementById("formDataDiri");

form.addEventListener("submit", (e) => {
    const nama = document.getElementById("nama").value;
    const domisili = document.getElementById("domisili").value;

    const pesan = document.getElementById("messageAfterSubmit");
    pesan.innerText = `Hai ${nama}, kamu tinggal di ${domisili}. Salam kenal..`;
    e.preventDefault();
});
