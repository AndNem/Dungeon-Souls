class Fire extends Sprite {
  constructor(config) {
    super(config);
    this.image.src = "image/hero/fire.png";
    this.frameMax = 4;
    this.frameDelay = 5;

    this.direction = hero.direction;
    this.velocity = { x: 10 };

    if (this.direction === 1)
      this.position = { x: hero.position.x + 100, y: hero.position.y + 60 };
    if (this.direction === -1)
      this.position = { x: hero.position.x - 6, y: hero.position.y + 60 };
  }

  init() {
    super.update();
    this.position.x += this.velocity.x * this.direction;
    this.controller();
  }

  controller() {
    // выстрел
    fires.forEach((fire, i) => {
      // удаление выстрела за пределом канвас
      if (fire.position.x > canvas.width || fire.position.x + fire.width < 0) {
        fires.splice(i, 1);
      }
      // удаление выстрела при коллизии с блоком
      groundRoomBlocks.forEach((block) => {
        if (collision({ item1: fire, item2: block })) {
          if (fire.direction === 1) {
            fireBangs.push(
              new FireBang({
                position: {
                  x: block.position.x - fire.width,
                  y: fire.position.y,
                },
                direction: fire.direction,
              })
            );
          }

          if (fire.direction === -1) {
            fireBangs.push(
              new FireBang({
                position: {
                  x: block.position.x + block.width,
                  y: fire.position.y,
                },
                direction: fire.direction,
              })
            );
          }

          fireBangAudio.currentTime = 0;
          fireBangAudio.play();
          fires.splice(i, 1);
        }
      });
    });
  }
}
