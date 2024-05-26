class LavaSpray extends Sprite {
  constructor(config) {
    super(config);
    this.image.src = "image/lava/lava_spray.png";
    this.frameMax = 4;
    this.frameDelay = 8;
  }

  init() {
    super.update();
    this.controller();
    this.checkCollisionHero();
  }

  controller() {
    lavaSprays.forEach((lavaSpray, i) => {
      if (this.frameCurrent === this.frameMax - 1) {
        lavaSprays.splice(i, 1);
      }
    });
  }

  checkCollisionHero() {
    if (collision({ item1: this, item2: hero.hitbox })) {
      console.log("death");
    }
  }
}
