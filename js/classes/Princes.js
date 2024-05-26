class Princess extends Sprite {
  constructor(config) {
    super(config);
    this.image.src = "image/princess/Idle.png";
    this.frameMax = 5;
    this.frameDelay = 7;
    this.direction = -1;
  }

  init() {
    super.update();
    this.isHitbox();
    this.checkCollisionHero();

    // context.fillStyle = "rgba(0,0,255,0.2)";
    // context.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // );
  }

  checkCollisionHero() {
    if (collision({ item1: hero.hitbox, item2: this.hitbox })) {
      hero.win = true;
    }
  }

  isHitbox() {
    this.hitbox = {
      position: { x: this.position.x + 35, y: this.position.y + 50 },
      width: 58,
      height: 78,
    };
  }
}
