

class Shape {
  constructor(options) {
    this.shapeType = options.shapeType;
    this.pos = options.pos;
    this.color = options.color;
    this.height = options.height;
    this.width = options.width;
  }

  drawRectangle(ctx) {
    ctx.fillStyle = this.color;

    ctx.fillRect(this.pos[0], this.pos[1], this.height, this.width);
  }

  
}