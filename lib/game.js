import Shape from './shape';
import keymaster from 'keymaster';
import randomWords from 'random-words';

class Game {
  constructor (ctx, numShapes) {
    this.ctx = ctx;
    this.numShapes = numShapes;
    
    this.shapes = [];
    this.addShapes();
    this.drawShapes();

    this.poppedShapes = [];
  }

  addShape () {
    setInterval(() => {
      const randomWidth = Math.floor(Math.random() * 150) + 80;
      const randomHeight = Math.floor(Math.random() * 150) + 50;
      const randomPosition = [
        Math.random() * (window.innerWidth - 2 * randomWidth),
        Math.random() * (window.innerHeight - 2 * randomHeight),
      ];
      const randomColor = Object.values(Game.colors)[Math.floor(Math.random() * Object.values(Game.colors).length)];
      const randomShape = Game.shapes[Math.floor(Math.random() * Game.shapes.length)];
      this.shapes.push(new Shape({
        shapeType: randomShape,
        color: randomColor,
        pos: randomPosition,
        width: randomWidth,
        height: randomHeight,
        word: randomWords({ exactly: 1, maxLength: 7 })[0]
      }));
    }, 3100);
  }

  addShapes () {

    for (let i = 0; i < this.numShapes; i++) {
      const randomWidth = Math.floor(Math.random() * 150) + 80;
      const randomHeight = Math.floor(Math.random() * 150) + 50;
      const randomPosition = [
        Math.random() * (window.innerWidth - 2 * randomWidth),
        Math.random() * (window.innerHeight - 2 * randomHeight),
      ];
      const randomColor = Object.values(Game.colors)[Math.floor(Math.random() * Object.values(Game.colors).length)];
      const randomShape = Game.shapes[Math.floor(Math.random() * Game.shapes.length)];

      this.shapes.push(new Shape({
        shapeType: randomShape,
        color: randomColor,
        pos: randomPosition,
        width: randomWidth,
        height: randomHeight,
        word: randomWords({ exactly: 1, maxLength: 7 })[0]
      }));
    }
  }

  drawShapes () {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.fillStyle = "#1e2127";
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    this.shapes.forEach((shape, idx) => {
      if (shape.height > 300 || shape.width > 300) {
        shape.drawShape(this.ctx, "#1e2127");
        this.shapes = this.shapes.slice(0, idx).concat(this.shapes.slice(idx + 1));
        this.poppedShapes.push(shape);
      } else {
        shape.drawShape(this.ctx);
      }
    });
  }

  // drawGUI () {

  // }

  start () {
    this.drawShapes();
    this.addShape();
    this.animate();
  }

  animate () {
    this.shapes.forEach(shape => shape.grow(1));
    this.drawShapes();
    requestAnimationFrame(this.animate.bind(this));
  }
}

Game.colors = {
  blue: "#64e4f6",
  magenta: "#ca3267",
  purple: "#646496",
  orange: "#ed9260"
};

Game.shapes = [
  "circle",
  "rectangle",
  "triangle",
];


export default Game;