

class Shape {
  constructor(options) {
    this.shapeType = options.shapeType;
    this.pos = options.pos;
    this.color = options.color;
    this.height = options.height;
    this.width = options.width;
  }

  // drawRectangle(ctx) {
  //   ctx.fillStyle = this.color;

  //   ctx.fillRect(this.pos[0], this.pos[1], this.height, this.width);
  // }

  // drawCircle (ctx) {
  //   ctx.fillStyle = this.color;

  //   ctx.beginPath();
  //   ctx.arc(
  //     this.pos[0], this.pos[1], this.height / 2, 0, 2 * Math.PI, true
  //   );
  //   ctx.fill();
  // }

  drawShape (ctx) {
    if (this.shapeType === 'rectangle') {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.pos[0], this.pos[1], this.height, this.width);
    }
    if (this.shapeType === 'circle') {
      ctx.fillStyle = this.color;

      ctx.beginPath();
      ctx.arc(
        this.pos[0], this.pos[1], this.height / 2, 0, 2 * Math.PI, true
      );
      ctx.fill();
    }
  }

  grow(sizeDelta) {
    if (this.shapeType === 'rectangle') {
      this.pos = [
        this.pos[0] - (sizeDelta / 2),
        this.pos[1] - (sizeDelta / 2)
      ];
    }

    this.height += sizeDelta;
    this.width += sizeDelta;
  }
}

module.exports = Shape;