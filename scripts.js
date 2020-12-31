const cards = document.querySelectorAll(".memory-card");
cards.forEach((card) => card.addEventListener("click", flipCard));

let isflip = false;
let firstCard;
let secondCard;
let lockBoard = false;
let successAttempts = 0;
let failedAttempts = 0;
let seconds = 0;
let cancel = 0;
let el = document.getElementById("seconds-counter");
let bestscore = 0;
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (isflip !== true) {
    isflip = true;
    firstCard = this;
  } else {
    secondCard = this;
    checkForMatch();
  }
  function checkForMatch() {
    firstCard.dataset.name === secondCard.dataset.name
      ? disableCards()
      : unflipCards();
  }
  function disableCards() {
    successAttempts++;
    if (successAttempts === 8) {
      if (bestscore > seconds) {
        updateValues();
        document.getElementById("best").innerText = "Best Score : " + seconds;
        bestscore = seconds;
        clearInterval(cancel);
      }
    }
    updateValues();
    // document.getElementById("suc").innerText = "Success : " + successAttempts;
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    console.log("removed click");
    resetBoard();
  }
  function unflipCards() {
    failedAttempts++;
    updateValues();
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 1500);
  }
  function resetBoard() {
    firstCard = null;
    secondCard = null;
    isflip = false;
    lockBoard = false;
    // console.log(object);
    attemptData();
  }
}
function shuffle() {
  cards.forEach((card) => {
    const randomPosition = Math.floor(Math.random() * 12);
    // console.log(randomPosition)
    card.style.order = randomPosition;
  });
}
window.onload = shuffle();
function attemptData() {
  console.log("sucess : " + successAttempts);
  console.log("failed: " + failedAttempts);
}
document.getElementById("start").onclick = function () {
  shuffle();
  cards.forEach((card) => card.addEventListener("click", flipCard));
  unflipall();
  clearInterval(cancel);
  successAttempts = 0;
  failedAttempts = 0;
  seconds = 0;
  updateValues();
  setTimeout(function () {
    flipall();
    timer();
  }, 4000);
};
function timer() {
  function incrementSeconds() {
    seconds += 1;
    el.innerHTML = seconds + "s";
  }

  cancel = setInterval(incrementSeconds, 1000);
}
document.getElementById("clear").onclick = function () {
  cards.forEach((card) => card.addEventListener("click", flipCard));
  shuffle();
  clearInterval(cancel);
  seconds = 0;
  el.innerHTML = "";
  successAttempts = 0;
  failedAttempts = 0;
  updateValues();
  flipall();
};

document.getElementById("exit").onclick = function () {
  window.open("", "_self").close();
};

function unflipall() {
  let x = document.querySelectorAll(".memory-card");
  for (let index = 0; index < 16; index++) {
    x[index].classList.add("flip");
  }
}

function flipall() {
  let x = document.querySelectorAll(".memory-card");
  for (let index = 0; index < 16; index++) {
    x[index].classList.remove("flip");
  }
}
function updateValues() {
  document.getElementById("suc").innerText = "Success : " + successAttempts;
  document.getElementById("fail").innerText = "Fails : " + failedAttempts;
}
