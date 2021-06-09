const langkah3 = document.createElement("li");
langkah3.innerText = "Selamat Menikmati!";

const ol = document.querySelector("ol");
ol.appendChild(langkah3);

const langkahAwal = document.createElement("li");
langkahAwal.innerText = "Nyalakan Kompor.";

const liAwal = document.querySelector("li");
ol.insertBefore(langkahAwal, liAwal);
