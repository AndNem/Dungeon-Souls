class Hatch extends Sprite {
  constructor(config) {
    super(config);
    this.image.src = "image/decor/hatch.png";
    this.frameMax = 5;
    this.frameDelay = 10;
    this.noPlay = true;
    this.noLoop = true;
    this.sound = false;
  }

  init() {
    super.update();
    this.controller();
    if (this.noPlay) this.checkCollisionFire();
  }

  controller() {
    if (roomsItems[101].medusa[0].death) {
      roomsItems[101].hatch[0].noPlay = false;
      this.sound = true;
    }
    if (
      roomsItems[101].hatch[0].frameCurrent ===
      roomsItems[101].hatch[0].frameMax - 1
    ) {
      this.sound = false;
    }
    if (this.sound) openHatchAudio.play();
  }

  checkCollisionFire() {
    fires.forEach((fire, i) => {
      if (collision({ item1: fire, item2: this })) {
        if (fire.direction === 1) {
          fireBangs.push(
            new FireBang({
              position: {
                x: this.position.x - fire.width,
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
                x: this.position.x + this.width,
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
  }
}
