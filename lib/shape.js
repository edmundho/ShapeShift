

class Shape {
  constructor(options) {
    this.shapeType = options.shapeType;
    this.pos = options.pos;
    this.color = options.color;
    this.height = options.height;
    this.width = options.width;
    this.word = options.word;

    this.triangleCenter = [this.pos[0] + this.width / 2, this.pos[1]];
  }

  drawShape (ctx, color = this.color) {
    if (this.shapeType === 'rectangle') {
      ctx.fillStyle = color;
      ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);

      ctx.fillStyle = "#d3d3d3";
      ctx.textBaseLine = 'middle';
      ctx.textAlign = "center";
      ctx.fillText(this.word, this.pos[0] + this.width / 2, this.pos[1] + this.height / 2);
    }

    if (this.shapeType === 'circle') {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(
        this.pos[0], this.pos[1], this.height / 2, 0, 2 * Math.PI, true
      );
      ctx.fill();

      ctx.fillStyle = "#d3d3d3";
      ctx.textBaseLine = 'middle';
      ctx.textAlign = "center";
      ctx.fillText(this.word, this.pos[0], this.pos[1]);
    }

    if (this.shapeType === 'triangle') {
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(this.pos[0], this.pos[1]);
      ctx.lineTo(this.pos[0] + this.width, this.pos[1] + this.width / 2);
      ctx.lineTo(this.pos[0] + this.width, this.pos[1] - this.width / 2);
      ctx.fill();

      ctx.fillStyle = "#d3d3d3";
      ctx.textAlign = "left";
      ctx.fillText(this.word, this.triangleCenter[0], this.triangleCenter[1]);
    }
  }

  grow (sizeDelta) {
    if (this.shapeType === 'rectangle') {
      this.pos = [
        this.pos[0] - (sizeDelta / 2),
        this.pos[1] - (sizeDelta / 2)
      ];
    }

    if (this.shapeType === 'triangle') {
      this.pos = [
        this.pos[0] - sizeDelta / 2,
        this.pos[1]
      ];
    }

    this.height += sizeDelta;
    this.width += sizeDelta;
  }

  rotate () {

  }
}

export default Shape;