window.addEventListener("load", () => {
    alert("Sim salabim munculah elemen-elemenku..");
    const konten = document.getElementsByClassName("contents")[0];
    konten.removeAttribute("hidden");
});

const incrementBtn = document.querySelector("#incrementButton");
let clicked = 0;
let isResized = false;

incrementBtn.onclick = () => {
    const count = document.getElementById("count");
    count.innerText = ++clicked;

    if (isResized && clicked > 7) {
        const hiddenMsg = document.createElement("h4");
        hiddenMsg.innerText = "Selamat! Kamu menemukan sesuatu...";

        const image = document.createElement("img");
        image.src = "https://i.ibb.co/0V49VRZ/catto.jpg";

        document
            .querySelector(".contents")
            .appendChild(hiddenMsg)
            .appendChild(image);
    }
};

document.body.onresize = function () {
    document.body.style.backgroundColor = "cyan";
    isResized = true;
};
