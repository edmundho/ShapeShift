import Board from './board';

class Game {
  constructor (ctx) {
    this.ctx = ctx;
    this.board = new Board(ctx, 2);

    this.poppedShapes = [];
    this.currentShape = undefined;
    this.firstKeyPressed = "";
    this.lettersTyped = [];
  }

  start () {
    this.debugLog();
    this.keyListener();
    this.board.drawShapes();
    this.board.drawGUI();
    setInterval(() => this.board.addShape(), 2500);
    this.animate();
  }

  animate () {
    this.board.shapes.forEach(shape => shape.grow(0.5));
    this.board.drawShapes();
    this.board.drawGUI();
    this.selectCurrentWord();

    requestAnimationFrame(this.animate.bind(this));
  }

  keyListener () {
    document.addEventListener("keypress", (event) => {
      const key = event.code.slice(3).toLowerCase();

      this.firstKeyPressed = key;
      this.lettersTyped.push(key);
      // if (this.currentShape.word)
      this.correctLettersTyped.push(key);
    });
  }

  selectCurrentWord () {
    this.board.shapes.forEach(shape => {
      if (this.firstKeyPressed === shape.word[0]) {
        this.currentShape = shape;
      }
    });
  }

  gameOver () {
    if (this.poppedShapes !== 0) {
      return false;
    }
  }

  matchCurrentWord () {

  }
  
  debugLog () {
    setInterval(() => {
      console.log(this.lettersTyped);
      console.log(this.currentShape.word);
    }, 1600);
  }
}

export default Game;