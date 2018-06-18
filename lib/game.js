const Shape = require('./shape');

class Game {
  constructor (ctx) {
    this.ctx = ctx;
    
    this.shapes = [];
    this.addShapes();
    this.drawShapes();
  }

  addShapes () {

    for (let i = 0; i < Game.NUM_SHAPES; i++) {
      const randomHeight = Math.floor(Math.random() * 150) + 40;
      const randomWidth = Math.floor(Math.random() * 150) + 40;
      const randomPosition = [
        Math.random() * (window.innerWidth - randomWidth),
        Math.random() * (window.innerHeight - randomHeight),
      ];
      this.shapes.push(new Shape({
        color: Game.rectangle.color,
        pos: randomPosition,
        height: randomHeight,
        width: randomWidth
      }));
    }
  }

  drawShapes () {
    this.shapes.forEach(shape => shape.drawRectangle(this.ctx));
  }

  animate () {
    this.shapes.forEach(shape => shape.grow(1));
    this.drawShapes();

    requestAnimationFrame(this.animate.bind(this));
  }
}

Game.NUM_SHAPES = 2;
Game.rectangle = {
  color: "#f5f5f5",

};

module.exports = Game;