class LavaBlob extends Sprite {
  constructor(config) {
    super(config);
    this.image.src = "image/lava/lava_blob.png";
    this.velocity = { x: 0, y: 0 };
    this.gravity = 0.5;
  }

  init() {
    super.draw();
    this.controller();
    this.checkCollisionHero();
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  controller() {
    groundRoomBlocks.forEach((block) => {
      if (collision({ item1: this, item2: block })) {
        lavaBlobs.length = 0;
        lavaSprayAudio.currentTime = 0;
        lavaSprayAudio.play();
        lavaSprays.push(
          new LavaSpray({
            position: { x: this.position.x - 16, y: this.position.y - 21 },
          })
        );
      }
    });
  }

  checkCollisionHero() {
    if (collision({ item1: this, item2: hero.hitbox })) {
      hero.death = true;
    }
  }
}
