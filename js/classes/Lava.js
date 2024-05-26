class Lava extends Sprite {
  constructor(config) {
    super(config);
    this.image.src = "image/lava/lava.png";
    this.frameMax = 2;
    this.frameDelay = 20;
  }

  init() {
    super.update();
    this.checkCollisionHero();
  }

  checkCollisionHero() {
    if (collision({ item1: this, item2: hero.hitbox })) {
      hero.death = true;
    }
  }
}
