// Membuat Event Custom
const customEvent = new Event("customEvent");

window.addEventListener("load", () => {
    const tombol = document.querySelector("#tombol");
    tombol.addEventListener("customEvent", customEventHandler);
    tombol.addEventListener("click", () => {
        tombol.dispatchEvent(customEvent);
    });
});

function customEventHandler(e) {
    console.log(`Event tipe ${e.type} berhasil dijalankan.`);

    const caption = document.querySelector("#caption");
    caption.innerHTML = "Waw.. Anda membangkitkan Custom Event.";
}
