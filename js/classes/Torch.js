class Torch extends Sprite {
  constructor(config) {
    super(config);
    this.image.src = "image/decor/torch.png";
    this.frameMax = 4;
    this.frameDelay = 8;
  }

  init() {
    super.update();
  }
}
