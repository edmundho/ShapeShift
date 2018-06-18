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
      const randomColor = Object.values(Game.colors)[Math.floor(Math.random() * Object.values(Game.colors).length)];
      const randomShape = Game.shapes[Math.floor(Math.random() * Game.shapes.length)];
      this.shapes.push(new Shape({
        shapeType: randomShape,
        color: randomColor,
        pos: randomPosition,
        height: randomHeight,
        width: randomWidth
      }));
    }
  }

  drawShapes () {
    this.shapes.forEach(shape => shape.drawShape(this.ctx));
  }

  animate () {
    this.shapes.forEach(shape => shape.grow(1));
    this.drawShapes();

    requestAnimationFrame(this.animate.bind(this));
  }
}

Game.NUM_SHAPES = 3;
Game.colors = {
  blue: "#64e4f6",
  magenta: "#ca3267"
};

Game.shapes = [
  "circle",
  "rectangle",
];

module.exports = Game;