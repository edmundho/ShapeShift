

class Shape {
  constructor(options) {
    this.shapeType = options.shapeType;
    this.pos = options.pos;
    this.color = options.color;
    this.height = options.height;
    this.width = options.width;
    this.word = options.word;
    this.rotation = 0;

    this.triangleCenter = [this.pos[0] + this.width / 2, this.pos[1] + this.width / 4];
  }

  drawShape(ctx, highlightLetters = undefined, color = this.color) {
    if (this.shapeType === 'rectangle') {
      ctx.fillStyle = color;
      ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);

      ctx.textBaseLine = 'middle';
      ctx.textAlign = "center";
      ctx.fillStyle = "#d3d3d3";
      ctx.fillText(this.word, this.pos[0] + this.width / 2, this.pos[1] + this.height / 2);
      
      if (highlightLetters) {
        const wordWidth = ctx.measureText(this.word).width;
        ctx.fillStyle = "#ff0000";
        ctx.textAlign = 'left';
        ctx.fillText(highlightLetters.join(""), (this.pos[0] + this.width/2 - wordWidth / 2), (this.pos[1] + this.height/2));
      } 
    }

    if (this.shapeType === 'circle') {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(
        this.pos[0], this.pos[1], this.width / 2, 0, 2 * Math.PI, true
      );
      ctx.fill();
      
      ctx.textBaseLine = 'middle';
      ctx.textAlign = "center";
      ctx.fillStyle = "#d3d3d3";
      ctx.fillText(this.word, this.pos[0], this.pos[1]);
    
      if (highlightLetters) {
        const wordWidth = ctx.measureText(this.word).width;
        ctx.fillStyle = "#ff0000";
        ctx.textAlign = 'left';
        ctx.fillText(highlightLetters.join(""), this.pos[0] - wordWidth / 2, this.pos[1]);
      }
    }

    if (this.shapeType === 'triangle') {
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(this.pos[0], this.pos[1]);
      ctx.lineTo(this.pos[0] + this.width, this.pos[1]);
      ctx.lineTo(this.pos[0] + this.width/2, this.pos[1] + this.width);
      ctx.fill();
      
      ctx.textAlign = "center";
      ctx.fillStyle = "#d3d3d3";
      ctx.fillText(this.word, this.triangleCenter[0], this.triangleCenter[1]);

      if (highlightLetters) {
        const wordWidth = ctx.measureText(this.word).width;
        ctx.fillStyle = "#ff0000";
        ctx.textAlign = 'left';
        ctx.fillText(highlightLetters.join(""), this.triangleCenter[0] - wordWidth / 2, this.triangleCenter[1]);
      }
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
        this.pos[1] - sizeDelta / 2,
      ];
    }

    this.height += sizeDelta;
    this.width += sizeDelta;
  }

}

export default Shape;