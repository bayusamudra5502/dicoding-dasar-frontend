//inisialiasi variabel untuk menampung elemen dokumen
const localTotalVictoryField = document.getElementById(
    "local-total-victory-field"
);

const localMaximumAttempField = document.getElementById(
    "local-maximum-attemp-field"
);

const destroyDataButton = document.getElementById("destroy-data-button");
const playButton = document.getElementById("play-button");
const beforeGameDisplay = document.getElementById("before-game-display");
const duringGameDisplay = document.getElementById("during-game-display");
const afterGameDisplay = document.getElementById("after-game-display");
const answerButtons = document.querySelectorAll(".answer-button");

const sessionUserAnswerField = document.getElementById(
    "session-user-answer-field"
); // JAWABAN USER YANG DIAMBIL SAAT INI

const sessionUserWrongAnswerField = document.getElementById(
    "session-user-wrong-answer-field"
); // Jawaban yang sebelumnya salah

const sessionTrueAnswerField = document.getElementById(
    "session-true-answer-field"
); // JAWABAN BENERNYA

const sessionUserAttempsField = document.getElementById(
    "session-user-attemps-amount-field"
); // jumlah user berapa kali salah

//inisialisasi fungsi untuk menghasilkan jawaban permainan
function getAnswer() {
    let answer = "123".split("");
    for (let i = 0; i < answer.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = answer[i];
        answer[i] = answer[j];
        answer[j] = tmp;
    }
    return answer.join("");
}

//inisialiasi key untuk session storage
const sessionAnswerKey = "SESSION_ANSWER";
const sessionUserAttempsKey = "SESSION_USER_ATTEMPS";
const sessionUserIsPlayingKey = "SESSION_USER_IS_PLAYING";

//inisialisasi key untuk local storage
const localTotalVictoryKey = "LOCAL_TOTAL_VICTORIES_PLAYED";
const localMaximumAttempsKey = "LOCAL_MAXIMUM_ATTEMPTS";

window.addEventListener("load", () => {
    try {
        if (
            sessionStorage.getItem(sessionAnswerKey) === null ||
            sessionStorage.getItem(sessionUserIsPlayingKey) === "false"
        )
            sessionStorage.setItem(sessionAnswerKey, getAnswer());

        !sessionStorage.getItem(sessionUserAttempsKey) &&
            sessionStorage.setItem(sessionUserAttempsKey, 0);

        !sessionStorage.getItem(sessionUserIsPlayingKey) &&
            sessionStorage.setItem(sessionUserIsPlayingKey, false);

        !localStorage.getItem(localTotalVictoryKey) &&
            localStorage.setItem(localTotalVictoryKey, 0);

        !localStorage.getItem(localMaximumAttempsKey) &&
            localStorage.setItem(localMaximumAttempsKey, 0);

        updateStatus();
        if (sessionStorage.getItem(sessionUserIsPlayingKey) === "true") {
            playGame(false);
        }
    } catch (e) {
        alert("Mohon maaf, Anda tidak bisa memainkan permainan ini.");
    }
});

playButton.addEventListener("click", () => {
    playGame();
});

for (const button of answerButtons) {
    button.addEventListener("click", function () {
        const value = this.innerText;
        sessionUserAnswerField.innerText += value;
        this.setAttribute("disabled", "disabled");

        if (sessionUserAnswerField.innerText.length === 3) {
            const userAns = sessionUserAnswerField.innerText;

            if (checkAnswer(userAns)) {
                stopGame();
            } else {
                wrongAnswer(userAns);
            }
        }
    });
}

function checkAnswer(test) {
    return test === sessionStorage.getItem(sessionAnswerKey);
}

function playGame(resetAttemp = true) {
    beforeGameDisplay.setAttribute("hidden", "hidden");
    sessionStorage.setItem(sessionUserIsPlayingKey, true);
    duringGameDisplay.removeAttribute("hidden");

    if (resetAttemp) sessionStorage.setItem(sessionUserAttempsKey, 0);
}

function stopGame() {
    duringGameDisplay.setAttribute("hidden", "hidden");
    sessionStorage.setItem(sessionUserIsPlayingKey, false);
    afterGameDisplay.removeAttribute("hidden");

    sessionTrueAnswerField.innerText = sessionStorage.getItem(sessionAnswerKey);

    const numAttemps = parseInt(sessionStorage.getItem(sessionUserAttempsKey));
    const maxAttemps = parseInt(localStorage.getItem(localMaximumAttempsKey));
    const numVictory = parseInt(localStorage.getItem(localTotalVictoryKey));

    if (numAttemps > maxAttemps)
        localStorage.setItem(localMaximumAttempsKey, numAttemps);

    localStorage.setItem(localTotalVictoryKey, numVictory + 1);
    updateStatus();
    sessionStorage.setItem(sessionUserAttempsKey, 0);
}

function updateStatus() {
    if (localStorage.getItem(localTotalVictoryKey))
        localTotalVictoryField.innerText =
            localStorage.getItem(localTotalVictoryKey);
    else localTotalVictoryField.innerText = 0;

    if (localStorage.getItem(localMaximumAttempsKey))
        localMaximumAttempField.innerText = localStorage.getItem(
            localMaximumAttempsKey
        );
    else localMaximumAttempField.innerText = 0;

    sessionUserAttempsField.innerText = sessionStorage.getItem(
        sessionUserAttempsKey
    );
}

function wrongAnswer(ans) {
    sessionUserWrongAnswerField.innerText = ans;
    const numAttemps = parseInt(sessionStorage.getItem(sessionUserAttempsKey));

    sessionStorage.setItem(sessionUserAttempsKey, numAttemps + 1);
    updateStatus();

    for (const button of answerButtons) {
        button.removeAttribute("disabled");
    }

    sessionUserAnswerField.innerText = "";
}

destroyDataButton.addEventListener("click", () => {
    localStorage.setItem(localTotalVictoryKey, 0);
    localStorage.setItem(localMaximumAttempsKey, 0);
    updateStatus();
});
