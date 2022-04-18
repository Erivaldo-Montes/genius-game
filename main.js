let clickedOrder = [];
let order = [];
let level = 1;
let repeat = true;
let lifes = 3;

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const green = document.querySelector(".green");

const score = document.querySelector(".score");

const repeatBtn = document.querySelector("#repeat-btn");

const life3 = document.querySelector("#life3");
const life2 = document.querySelector("#life2");
const life1 = document.querySelector("#life1");

const gameOverWindow = document.querySelector("#game-over");
const restart = document.querySelector("#restart");
/**
 * 0 = blue
 * 1 = red
 * 2 = yellow
 * 3 = green
 */

blue.addEventListener("click", () => click(0));
red.addEventListener("click", () => click(1));
yellow.addEventListener("click", () => click(2));
green.addEventListener("click", () => click(3));

repeatBtn.addEventListener("click", () => repeatOrder());

const soundsEffects = (color) => {
  const context = new AudioContext();
  let oscilator = context.createOscillator();
  let gainContext = context.createGain();
  gainContext.gain.value = 0.2;

  oscilator.type = "square";
  if (color == 0) {
    oscilator.frequency.value = 82.4068892282175;
  }
  if (color == 1) {
    oscilator.frequency.value = 123.47082531403103;
  }
  if (color === 2) {
    oscilator.frequency.value = 110;
  }
  if (color === 3) {
    oscilator.frequency.value = 97.99885899543733;
  }

  oscilator.connect(gainContext);
  gainContext.connect(context.destination);
  oscilator.start(0);
  setTimeout(() => {
    oscilator.stop();
  }, 200);
};

const activeColor = (color, number) => {
  number = number * 500;
  setTimeout(() => {
    createElementColor(color).classList.add("active");
    soundsEffects(color);
  }, number - 250);
  setTimeout(() => {
    createElementColor(color).classList.remove("active");
    console.log(createElementColor(color));
  }, number);
};

const shuffleColors = () => {
  order[order.length] = Math.floor(Math.random() * 4);
  clickedOrder = [];
  console.log("order.lenght", order.length);
  setTimeout(() => {
    for (i in order) {
      activeColor(order[i], Number(i) + 1);
    }
  }, 200);
};

//cmoço do jogo
const startGame = () => {
  order = [];
  repeat = true;
  life3.style.visibility = "visible";
  life2.style.visibility = "visible";
  life1.style.visibility = "visible";

  const startGame = document.querySelector("#start-game");
  const startBtn = document.querySelector("#start");
  startGame.classList.add("show");

  startBtn.onclick = () => {
    startGame.classList.remove("show");
    setTimeout(() => {
      shuffleColors();
    }, 500);
  };

  score.innerHTML = `Level ${level}`;
};

// fim do jogo
const gameOver = () => {
  gameOverWindow.classList.add("show");
  restart.onclick = () => {
    gameOverWindow.classList.remove("show");
    startGame();
  };

  level = 1;
  lifes = 3;
};

const nextLevel = () => {
  level++;
  repeat = true;
  repeatBtn.style.cursor = "pointer";
  const buttonNextLevel = document.querySelector("#nextLevelButton");
  const nextLevel = document.querySelector(".nextLevel");

  nextLevel.classList.add("show");

  score.innerHTML = `Level ${level}`;

  buttonNextLevel.onclick = () => {
    nextLevel.classList.remove("show");
    setTimeout(() => {
      console.log("chamou shuffleColor");
      shuffleColors();
    }, 1000);
  };
};

const lifesPlayer = () => {
  lifes--;

  if (lifes === 2) {
    alert("vocẽ errou, tente novamente");
    life3.style.visibility = "hidden";
  }
  if (lifes === 1) {
    alert("você errou, é sua ultima chance");
    life2.style.visibility = "hidden";
  }
  if (lifes === 0) {
    life1.style.visibility = "hidden";
    gameOver();
  }
};

// verifica se as cores estão conrrespondentes
const checkWins = (clickedOrderF) => {
  for (i in clickedOrderF) {
    if (clickedOrderF[i] != order[i]) {
      lifesPlayer();
      clickedOrder = [];
      return;
    }
  }
  if (clickedOrderF.length == order.length) {
    nextLevel();
  }
};

// ativa os as cores
const click = (color) => {
  clickedOrder[clickedOrder.length] = color;

  createElementColor(color).classList.add("active");
  soundsEffects(color);

  setTimeout(() => {
    createElementColor(color).classList.remove("active");
    checkWins(clickedOrder);
  }, 500);
};

// retorna as os elementos das cores
const createElementColor = (color) => {
  switch (color) {
    case 0:
      return blue;
    case 1:
      return red;
    case 2:
      return yellow;
    case 3:
      return green;
  }
};

const repeatOrder = () => {
  if (repeat) {
    repeatBtn.style.cursor = "not-allowed";
    repeat = false;
    for (i in order) {
      activeColor(order[i], Number(i) + 1);
    }
  }
};

setTimeout(() => {
  startGame();
}, 400);
