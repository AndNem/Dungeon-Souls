class Mage extends Sprite {
  constructor(config) {
    super(config);
    this.image.src = "image/hero/mage.png";
    this.velocity = { x: 0, y: 0 };
    this.gravity = 0.5;
    this.death = false;

    this.jump = false; // новый прыжок после того как герой приземлится
    this.newAttack = true; // новая атака после того как закончится предыдущая
    this.noSpamJump = true; // новый прыжок после отпускания клавиши прыжка
    this.noSpamAttack = true; // новая атака после отпускания клавиши атаки

    this.hitbox = {
      position: { x: this.position.x + 35, y: this.position.y + 50 },
      width: 58,
      height: 61,
    };

    this.keys = {
      d: false,
      a: false,
      w: false,
      s: false,
      space: false,
      enter: false,
    };

    this.animations = {
      mage: {
        imageSrc: "image/hero/mage.png",
        frameMax: 1,
        frameDelay: 1,
      },
      run: {
        imageSrc: "image/hero/run.png",
        frameMax: 8,
        frameDelay: 4,
      },
      jump: {
        imageSrc: "image/hero/jump.png",
        frameMax: 1,
        frameDelay: 1,
      },
      fall: {
        imageSrc: "image/hero/fall.png",
        frameMax: 1,
        frameDelay: 1,
      },
      climb: {
        imageSrc: "image/hero/climb.png",
        frameMax: 3,
        frameDelay: 5,
      },
      attack: {
        imageSrc: "image/hero/attack.png",
        frameMax: 7,
        frameDelay: 3,
      },
      death: {
        imageSrc: "image/hero/death.png",
        frameMax: 10,
        frameDelay: 6,
        noLoop: true,
      },
    };

    // присваиваем каждому свойству image и image.src
    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;
      this.animations[key].image = image;
    }

    this.keyboardControl();
  }

  init() {
    super.update();
    // context.fillStyle = "rgba(0,0,255,0.2)";
    // context.fillRect(this.position.x, this.position.y, this.width, this.height);

    this.checkStair = false; // персонаж на лестнице
    this.checkBlock = false; // персонаж на земле
    this.stairPositionX = null; // выравнивание персонажа на лестнице при движении вверх или низ

    this.isHitbox();
    // context.fillStyle = "rgba(0,0,255,0.4)";
    // context.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // );

    this.checkStairCollision();
    this.checkHorizontalCollision();
    this.velocity.y += this.gravity;
    if (!(this.checkBlock || this.checkStair))
      this.position.y += this.velocity.y;
    this.isHitbox();
    this.checkVerticalCollision();
    if (roomsItems[101].hatch[0].noPlay) this.checkCollisionHatch();
    this.changeRoom();

    // атака
    if (this.newAttack) {
      if (this.keys.enter && this.noSpamAttack) {
        this.newAttack = false;
        this.noSpamAttack = false;
        this.frameCurrent = 0;
        this.switchAnimate("attack");
      }
    }
    if (this.image === this.animations.attack.image)
      if (this.frameCurrent < this.frameMax - 1) return;
      else {
        fires.push(new Fire({}));
        this.newAttack = true;
        attackAudio.currentTime = 0;
        attackAudio.play();
      }

    // лестница
    if (this.checkStair) {
      this.velocity.y = 0;
      // вверх
      if (this.keys.w) {
        this.position.y -= SPEED;
        this.position.x = this.stairPositionX - 32;
        this.switchAnimate("climb");
        return;
      }
      // вниз
      if (this.keys.s) {
        this.position.y += SPEED;
        this.position.x = this.stairPositionX - 32;
        this.switchAnimate("climb");
        return;
      }
    }

    // бездействие
    this.velocity.x = 0;
    this.switchAnimate("mage");

    // победа
    if (this.win) {
      winGame = true;
      return;
    }

    // смерть
    if (this.death) {
      this.switchAnimate("death");
      if (this.frameCurrent === this.frameMax - 1) {
        loseGame = true;
      }
      return;
    }

    // перемещение
    if (this.keys.d || this.keys.a) {
      this.velocity.x = SPEED;
      this.switchAnimate("run");
    }

    // прыжок
    if (
      this.keys.space &&
      this.jump &&
      this.noSpamJump &&
      this.velocity.y === 0
    ) {
      this.velocity.y = -14;
      this.jump = false;
      this.noSpamJump = false;
    }
    if (this.velocity.y < 0) {
      this.switchAnimate("jump");
    } else if (this.velocity.y > 0) {
      this.switchAnimate("fall");
    }

    // перемещение
    this.velocity.x *= this.direction;
    this.position.x += this.velocity.x;
  }

  keyboardControl() {
    document.addEventListener("keydown", (e) => {
      //console.log(e);
      switch (e.keyCode) {
        // вправо
        case 68:
          this.keys.d = true;
          this.direction = 1;
          break;
        // влево
        case 65:
          this.keys.a = true;
          this.direction = -1;
          break;
        // вверх
        case 87:
          this.keys.w = true;
          break;
        // вниз
        case 83:
          this.keys.s = true;
          break;
        // прыжок
        case 32:
          this.keys.space = true;
          break;
        // атака
        case 13:
          this.keys.enter = true;
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        // вправо
        case 68:
          this.keys.d = false;
          break;
        // влево
        case 65:
          this.keys.a = false;
          break;
        // вверх
        case 87:
          this.keys.w = false;
          break;
        // вниз
        case 83:
          this.keys.s = false;
          break;
        // прыжок
        case 32:
          this.keys.space = false;
          this.noSpamJump = true;
          break;
        // атака
        case 13:
          this.keys.enter = false;
          this.noSpamAttack = true;
          break;
      }
    });
  }

  changeRoom() {
    // смена комнат
    if (this.hitbox.position.y + this.hitbox.height > canvas.height) {
      currentRoom += 1;
      this.position.y = 0;
      this.nullDataChangeRoom();
    }
    if (this.hitbox.position.y < 0) {
      currentRoom -= 1;
      this.position.y = canvas.height - this.height;
      this.nullDataChangeRoom();
    }
    if (this.hitbox.position.x + this.hitbox.width > canvas.width) {
      currentRoom += 100;
      this.position.x = 0;
      this.nullDataChangeRoom();
    }
    if (this.hitbox.position.x < 0) {
      currentRoom -= 100;
      this.position.x = canvas.width - this.width;
      this.nullDataChangeRoom();
    }
  }

  nullDataChangeRoom() {
    fires.length = 0;
    fireBangs.length = 0;
    lavaBlobs.length = 0;
    lavaSprays.length = 0;
  }

  isHitbox() {
    this.hitbox = {
      position: { x: this.position.x + 35, y: this.position.y + 50 },
      width: 58,
      height: 61,
    };
  }

  checkStairCollision() {
    stairRoomBlocks.forEach((block) => {
      if (collision({ item1: this.hitbox, item2: block })) {
        this.checkStair = true;
        this.stairPositionX = block.position.x;
        this.jump = false;
      }
    });
  }

  checkHorizontalCollision() {
    groundRoomBlocks.forEach((block) => {
      if (collision({ item1: this.hitbox, item2: block })) {
        if (this.velocity.x > 0) {
          const count =
            this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = block.position.x - count;
        }
        if (this.velocity.x < 0) {
          const count = this.hitbox.position.x - this.position.x;
          this.position.x = block.position.x + block.width - count;
        }
      }
    });
  }

  checkVerticalCollision() {
    groundRoomBlocks.forEach((block) => {
      if (collision({ item1: this.hitbox, item2: block })) {
        if (this.velocity.y > 0) {
          const count =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = block.position.y - count;
          this.velocity.y = 0;
          this.checkBlock = true;
          this.jump = true;
        }
        if (this.velocity.y < 0) {
          const count = this.hitbox.position.y - this.position.y;
          this.position.y = block.position.y + block.height - count;
          this.velocity.y = 0;
        }
      }
    });
  }

  checkCollisionHatch() {
    const door = roomsItems[101].hatch[0];
    if (currentRoom === 101) {
      if (collision({ item1: this.hitbox, item2: door })) {
        if (this.velocity.x > 0) {
          const count =
            this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = door.position.x - count;
        }
        if (this.velocity.x < 0) {
          const count = this.hitbox.position.x - this.position.x;
          this.position.x = door.position.x + door.width - count;
        }
      }
    }
  }

  switchAnimate(name) {
    this.image = this.animations[name].image;
    this.frameMax = this.animations[name].frameMax;
    this.frameDelay = this.animations[name].frameDelay;
    this.noLoop = this.animations[name].noLoop;
  }
}
