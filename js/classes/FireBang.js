class FireBang extends Sprite {
  constructor(config) {
    super(config);
    this.image.src = "image/hero/fireBang.png";
    this.frameMax = 5;
    this.frameDelay = 3;
  }

  init() {
    super.update();
    this.controller();
  }

  controller() {
    fireBangs.forEach((i) => {
      if (this.frameCurrent === this.frameMax - 1) {
        fireBangs.splice(i, 1);
      }
    });
  }
}
