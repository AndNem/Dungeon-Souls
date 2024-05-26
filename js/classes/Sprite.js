class Sprite {
  constructor(config) {
    this.position = config.position || { x: 0, y: 0 };
    this.image = new Image();
    this.image.src = config.imageSrc;

    this.image.onload = () => {
      this.width = this.image.width / this.frameMax;
      this.height = this.image.height;
      this.imageOnload = true;
    };

    this.direction = config.direction || 1;
    this.frameMax = config.frameMax || 1;
    this.frameDelay = config.frameDelay || 1;
    this.noPlay = config.noPlay || false;
    this.noLoop = config.noLoop || false;
    this.frameCount = 0;
    this.frameCurrent = 0;
  }

  draw() {
    if (!this.imageOnload) return;
    context.scale(this.direction, 1);
    context.drawImage(
      this.image,
      this.frameCurrent * this.width,
      0,
      this.width,
      this.height,
      this.position.x * this.direction,
      this.position.y,
      this.width * this.direction,
      this.height
    );
    context.setTransform(1, 0, 0, 1, 0, 0);
  }

  update() {
    this.draw();
    if (this.noPlay) return;
    this.frameCount++;
    if (this.frameCount % this.frameDelay === 0) {
      if (this.frameCurrent < this.frameMax - 1) this.frameCurrent++;
      else if (!this.noLoop) this.frameCurrent = 0;
    }
  }
}
