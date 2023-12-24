const header = document.querySelector("header");
const playerForm = document.querySelector(".player__form");
const playButtonsEl = document.querySelector("#btn--play__wrapper");
const gameContainerEl = document.querySelector(".game__container");
const gameArenaEl = document.querySelector(".game__arena");
const playerTurnEl = document.querySelector(".player__turn");
let currentPlayer = "x";
const playerOptions = [...document.querySelectorAll("input[type='radio']")];

const player1 = {
  name: "",
  number: "1",
  mark: "",
  score: "",
};

const player2 = {
  name: "",
  number: "2",
  mark: "",
  score: "",
};

const gameMaps = {
  row0: [],
  col0: [],
  row1: [],
  col1: [],
  row2: [],
  col2: [],
  slash: [],
  backslash: [],
};

const displayGame = function () {
  header.classList.add("active");
  playerForm.classList.remove("active");
  gameContainerEl.classList.add("active");
};

const playerSelection = function (player) {
  if (player) {
    player1.name = "p1";
    player2.name = "p2";
  } else {
    player1.name = "you";
    player2.name = "cpu";
  }
  player1.mark = playerOptions.find(option => option.checked).value;
  player2.mark = playerOptions.find(option => !option.checked).value;
  const p1Board = document.querySelector(`#board-${player1.mark}`);
  const challengerBoard = document.querySelector(`#board-${player2.mark}`);
  p1Board.textContent = `${player1.mark} (${player1.name})`;
  challengerBoard.textContent = `${player2.mark} (${player2.name})`;
};

const gameCheck = function () {
  Object.entries(gameMaps).forEach(entry => {
    const [_, value] = entry;
    if (value.length === 3 && new Set(value).size === 1) {
      console.log("GAME END!!");
    }
  });
};

const inputOrganize = function (element) {
  const symbol = element.querySelector("img").alt;
  gameMaps[element.dataset.row].push(symbol);
  gameMaps[element.dataset.column].push(symbol);
  gameMaps[element.dataset.slash] &&
    gameMaps[element.dataset.slash].push(symbol);
  gameMaps[element.dataset.backslash] &&
    gameMaps[element.dataset.backslash].push(symbol);
};

const changeTurn = function () {
  gameArenaEl.classList.toggle("o");
  currentPlayer = gameArenaEl.classList[gameArenaEl.classList.length - 1];
  playerTurnEl.style.backgroundImage = `url("./assets/icon-${currentPlayer}.svg")`;
};

const placeMark = function (element) {
  const mark = `<img src="./assets/icon-${currentPlayer}.svg" alt="${currentPlayer}">`;
  element.insertAdjacentHTML("beforeend", mark);

  element.disabled = true;

  inputOrganize(element);
  gameCheck();
};

playButtonsEl.addEventListener("click", function (e) {
  const element = e.target;

  displayGame();

  if (element.classList.contains("btn") && element.id === "cpu") {
    playerSelection();
  }

  if (element.classList.contains("btn") && element.id === "other--player") {
    playerSelection(true);
  }
});

gameArenaEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn")) {
    placeMark(e.target);
    changeTurn();
  }
});
