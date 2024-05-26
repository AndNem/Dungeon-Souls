const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const start = document.querySelector(".start");
const gameLose = document.querySelector(".game-lose");
const gameWin = document.querySelector(".game-win");

canvas.width = 1024; // 16 тайлов по 64 пикселя
canvas.height = 768; // 12 тайлов по 64 пикселя

let winGame = false;
let loseGame = false;

const SIZE_BLOCK = 64; // размер блока
const SPEED = 8; // скорость героя
let currentRoom = 0; // текущая комната

const fires = []; // масив огненных снарядов
const fireBangs = []; // масив взрывов снаряда
const lavaBlobs = []; // масив капель лавы
const lavaSprays = []; // масив брызг лавы

let roomImage = null; // изображение текущей комнаты
let dataRoomBlocks2D = []; // все блоки текущей комнаты
let groundRoomBlocks = []; // блоки земли текущей комнаты
let stairRoomBlocks = []; // блоки лестницы текущей комнаты

// загрузка данных комнаты
switchRoom();

// элементы комнат
const roomsItems = {
  0: {
    torch: [new Torch({ position: { x: 400, y: 320 } })],
  },
  1: {
    torch: [
      new Torch({ position: { x: 270, y: 576 } }),
      new Torch({ position: { x: 750, y: 576 } }),
    ],
    medusa: [new Medusa({ position: { x: 400, y: 575 } })],
  },
  100: {
    lavaDrop: [new LavaDrop({ position: { x: 390, y: 275 } })],
    lava: [
      new Lava({ position: { x: 384, y: 256 } }),
      new Lava({ position: { x: 448, y: 256 } }),
      new Lava({ position: { x: 512, y: 256 } }),
    ],
  },
  101: {
    torch: [new Torch({ position: { x: 300, y: 192 } })],
    hatch: [new Hatch({ position: { x: 530, y: 192 } })],
    medusa: [new Medusa({ position: { x: 400, y: 575 } })],
    princess: [new Princess({ position: { x: 800, y: 192 } })],
  },
};

// герой
const hero = new Mage({
  position: { x: 264, y: 64 },
});

const background = new Sprite({
  imageSrc: "image/background/background.png",
});

// -------------
// цикл анимации
// -------------

function mainAnimateLoop() {
  requestAnimationFrame(mainAnimateLoop);

  //убираем кнопку "Старт" при запуске игры
  start.style.display = "none";

  // конец игры и надпись "Lose"
  if (loseGame) {
    gameLose.style.display = "block";
    return;
  }

  // конец игры и надпись "Lose"
  if (winGame) {
    gameWin.style.display = "block";
    return;
  }

  // задний фон
  background.draw();

  // изображение текущей комнаты
  roomImage.draw();

  // отрисовка элементов текущей комнаты
  Object.keys(roomsItems).forEach((room) => {
    if (room == currentRoom) {
      Object.keys(roomsItems[room]).forEach((items) => {
        Object.keys(roomsItems[room][items]).forEach((item) => {
          roomsItems[room][items][item].init();
        });
      });
    }
  });

  // обновление данных текущей комнаты
  switchRoom();

  // отрисовка блоков коллизии
  // groundRoomBlocks.forEach((block) => {
  //   block.drawGround();
  // });
  // stairRoomBlocks.forEach((block) => {
  //   block.drawStair();
  // });

  // инициализация героя
  hero.init();

  // инициализация огненных снарядов героя
  fires.forEach((fire) => {
    fire.init();
  });

  // инициализация взрыва от выстрела
  fireBangs.forEach((fireBang) => {
    fireBang.init();
  });

  // инициализация капель лавы
  lavaBlobs.forEach((lavaBlob) => {
    lavaBlob.init();
  });

  // инициализация брызг лавы
  lavaSprays.forEach((lavaSpray) => {
    lavaSpray.init();
  });
}

//mainAnimateLoop();
