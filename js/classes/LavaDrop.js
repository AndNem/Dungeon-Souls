class LavaDrop extends Sprite {
  constructor(config) {
    super(config);
    this.image.src = "image/lava/lava_drop.png";
    this.frameMax = 4;
    this.frameDelay = 30;
  }

  init() {
    super.update();
    this.controller();
  }

  controller() {
    if (this.frameCurrent === 0) this.antiSpamLavaBlob = true;
    if (this.frameCurrent === this.frameMax - 1 && this.antiSpamLavaBlob) {
      this.antiSpamLavaBlob = false;
      lavaBlobs.push(
        new LavaBlob({
          position: { x: this.position.x + 80, y: this.position.y + 130 },
        })
      );
    }
  }
}
