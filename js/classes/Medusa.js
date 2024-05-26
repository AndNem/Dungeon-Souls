class Medusa extends Sprite {
  constructor(config) {
    super(config);
    this.image.src = "image/medusa/Walk.png";
    this.frameMax = 4;
    this.frameDelay = 7;
    this.velocity = { x: 5 };
    this.death = false;

    this.hitbox = {
      position: { x: this.position.x + 32, y: this.position.y + 65 },
      width: 64,
      height: 63,
    };

    this.animations = {
      walk: {
        imageSrc: "image/medusa/Walk.png",
        frameMax: 4,
        frameDelay: 7,
      },
      death: {
        imageSrc: "image/medusa/Death.png",
        frameMax: 6,
        frameDelay: 7,
        noLoop: true,
      },
    };

    // присваиваем каждому свойству image и image.src
    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;
      this.animations[key].image = image;
    }
  }

  init() {
    super.update();

    // context.fillStyle = "rgba(0,0,255,0.2)";
    // context.fillRect(this.position.x, this.position.y, this.width, this.height);

    this.isHitbox();
    // context.fillStyle = "rgba(0,0,255,0.4)";
    // context.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // );

    this.checkCollisionGround();
    if (!this.death) this.checkCollisionHero();
    this.checkCollisionFire();

    if (this.death) {
      this.switchAnimate("death");
      return;
    }

    this.position.x += this.velocity.x * this.direction;
  }

  checkCollisionGround() {
    groundRoomBlocks.forEach((block) => {
      if (collision({ item1: this, item2: block })) {
        this.direction = -this.direction;
      }
    });
  }

  checkCollisionFire() {
    fires.forEach((fire, i) => {
      if (collision({ item1: fire, item2: this.hitbox })) {
        if (fire.direction === 1) {
          fireBangs.push(
            new FireBang({
              position: {
                x: this.hitbox.position.x - fire.width,
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
                x: this.hitbox.position.x + this.hitbox.width - 10,
                y: fire.position.y,
              },
              direction: fire.direction,
            })
          );
        }

        fireBangAudio.currentTime = 0;
        fireBangAudio.play();
        fires.splice(i, 1);
        this.death = true;
      }
    });
  }
  checkCollisionHero() {
    if (collision({ item1: this.hitbox, item2: hero.hitbox })) {
      hero.death = true;
    }
  }

  isHitbox() {
    this.hitbox = {
      position: { x: this.position.x + 32, y: this.position.y + 65 },
      width: 64,
      height: 63,
    };
  }

  switchAnimate(name) {
    this.image = this.animations[name].image;
    this.frameMax = this.animations[name].frameMax;
    this.frameDelay = this.animations[name].frameDelay;
    this.noLoop = this.animations[name].noLoop;
  }
}
