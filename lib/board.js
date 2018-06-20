import randomWords from 'random-words';
import Shape from './shape';

class Board {
  constructor (ctx, numInitialShapes) {
    this.ctx = ctx;
    this.numInitialShapes = numInitialShapes;
    this.startTime = new Date();

    this.shapes = [];
    this.addInitialShapes();
    this.drawShapes();
    this.poppedShapes = [];
    this.score = 0;
    this.completedShapes = [];
    this.pastWords = [];
    this.accuracy = "";
  }
  
  addShape() {
    const randomWidth = Math.floor(Math.random() * 150) + 90;
    const randomHeight = Math.floor(Math.random() * 150) + 50;
    const randomPosition = [
      90 + Math.random() * (window.innerWidth - 200), // - 150,
      90 + Math.random() * (window.innerHeight - 200),
    ];
    const randomColor = Object.values(COLORS)[Math.floor(Math.random() * Object.values(COLORS).length)];
    const randomShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];

    this.shapes.unshift(new Shape({
      shapeType: randomShape,
      color: randomColor,
      pos: randomPosition,
      width: randomWidth,
      height: randomHeight,
      word: randomWords({
        exactly: 1,
        maxLength: 7
      })[0]
    }));
  }

  addInitialShapes() {
    for (let i = 0; i < this.numInitialShapes; i++) {
      this.addShape();
    }
  }

  drawBackground () {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.fillStyle = "#1e2127";
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }

  drawShapes(currentShape, typedLetters) {
    this.shapes.forEach((shape, idx) => {
      if (shape.height > 300 || shape.width > 400) {
        this.removeShape(shape, idx);
        this.poppedShapes.push(shape);
      } else if (shape === currentShape) {
        shape.drawShape(this.ctx, typedLetters);
      } else {
        shape.drawShape(this.ctx);
      }
    });
  }

  removeShape(shape, shapeIdx) {
    this.shapes = this.shapes.slice(0, shapeIdx).concat(this.shapes.slice(shapeIdx + 1));
    this.pastWords.push(shape.word);
  }

  calculateAccuracy (keystrokes, wrongKeystrokes) {
    const allCorrectLetters = this.pastWords.join("").split("");
    const correctKeystrokes = keystrokes.length - wrongKeystrokes.length;
    const correctPercentage = (correctKeystrokes / allCorrectLetters.length * 100);
    console.log(correctPercentage);
    const incorrectPercentage = (wrongKeystrokes.length / allCorrectLetters.length * 100);
    console.log(incorrectPercentage);

    if (keystrokes.length === 0) { 
      this.accuracy = 0; 
    } else if (wrongKeystrokes.length === 0) {
      this.accuracy = 100;
    } else {
      this.accuracy = (correctPercentage - incorrectPercentage).toFixed(1);
    }
  }

  drawGUI() {
    const currentTime = new Date();
    const timeElapsedInMinutes = (currentTime - this.startTime) / 1000 / 60;
    this.ctx.fillStyle = "#f5f5f5";
    this.ctx.textAlign = "left";
    this.ctx.textBaseLine = "hanging";
    this.ctx.fillText(`Lives:   ${10 - this.poppedShapes.length}`, 50, 35);
    this.ctx.fillText(
      `WPM:   ${Math.round(this.completedShapes.length/timeElapsedInMinutes)}`, 
      210, 35
    );
    this.ctx.fillText(`Accuracy:    ${this.accuracy}%`, 375, 35);
    this.ctx.fillText(`Score:   ${this.score}`, 635, 35);
    this.ctx.fillText(`shapeShift`, 50, window.innerHeight - 35);

    this.ctx.textAlign = "center";
    this.ctx.fillText(`Type the words before the growing shapes 'pop'!`, window.innerWidth / 2, window.innerHeight - 35);
  }
}

const COLORS = {
  magenta: "#ca3267",
  purple: "#646496",
  orange: "#ed9260",
  pinkish: "#cd4bb4",
  blue: "#50b4dc",
  violet: "#32288c",
  maroony: "#82555f",
  tealish: "#6496a0",
};

const SHAPES = [
  "circle",
  "rectangle",
  "triangle",
];

export default Board;