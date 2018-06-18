

class Shape {
  constructor(options) {
    // this.shapeType = options.shapeType;
    this.pos = options.pos;
    this.color = options.color;
    this.height = options.height;
    this.width = options.width;
  }

  drawRectangle(ctx) {
    ctx.fillStyle = this.color;

    ctx.fillRect(this.pos[0], this.pos[1], this.height, this.width);
  }

  grow(sizeDelta) {
    this.pos = [
      this.pos[0] - (sizeDelta / 2),
      this.pos[1] - (sizeDelta / 2)
    ];

    this.height += sizeDelta;
    this.width += sizeDelta;
  }
}

module.exports = Shape;