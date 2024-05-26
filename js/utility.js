function collision({ item1, item2 }) {
  return (
    item1.position.y + item1.height > item2.position.y &&
    item1.position.y < item2.position.y + item2.height &&
    item1.position.x + item1.width > item2.position.x &&
    item1.position.x < item2.position.x + item2.width
  );
}

function createArray2D(array) {
  const newArray = [];
  for (let i = 0; i < array.length; i += 16) {
    newArray.push(array.slice(i, i + 16));
  }
  return newArray;
}

function createGroundBlocks(array) {
  const newArrayBlocks = [];
  array.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 320) {
        newArrayBlocks.push(
          new Block({
            position: { x: j * SIZE_BLOCK, y: i * SIZE_BLOCK },
          })
        );
      }
    });
  });
  return newArrayBlocks;
}

function createStairBlocks(array) {
  const newArrayBlocks = [];
  array.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 319) {
        newArrayBlocks.push(
          new Block({
            position: { x: j * SIZE_BLOCK, y: i * SIZE_BLOCK },
          })
        );
      }
    });
  });
  return newArrayBlocks;
}

function switchRoom() {
  roomImage = new Sprite({ imageSrc: dataRooms[currentRoom].imageSrc });
  dataRoomBlocks2D = createArray2D(dataRooms[currentRoom].roomBlocks);
  groundRoomBlocks = createGroundBlocks(dataRoomBlocks2D);
  stairRoomBlocks = createStairBlocks(dataRoomBlocks2D);
}
