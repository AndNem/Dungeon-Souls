class Block {
  constructor(config) {
    this.position = config.position;
    this.width = SIZE_BLOCK;
    this.height = SIZE_BLOCK;
  }

  drawGround() {
    context.fillStyle = "rgba(255,0,0,0.2)";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  drawStair() {
    context.fillStyle = "rgba(0,255,0,0.2)";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
