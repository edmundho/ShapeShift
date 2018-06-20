import Board from './board';

class Game {
  constructor (ctx) {
    this.ctx = ctx;
    this.board = new Board(ctx, 2);

    this.poppedShapes = [];
    this.currentShape = undefined;
    this.firstKeyPressed = "";
    this.lettersTyped = [];
    this.correctLettersTyped = [];

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
    this.wordComplete();

    requestAnimationFrame(this.animate.bind(this));
  }

  keyListener () {
    document.addEventListener("keypress", (event) => {
      const key = event.code.slice(3).toLowerCase();
      this.lettersTyped.push(key);

      if (this.currentShape === undefined) {
        this.firstKeyPressed = key;
        this.selectCurrentWord();
      }
      if (this.matchesCurrentWord(this.correctLettersTyped, key)) {
        this.correctLettersTyped.push(key);
      }
    });
  }

  selectCurrentWord () {
    this.board.shapes.forEach(shape => {
      if (this.firstKeyPressed === shape.word[0]) {
        this.currentShape = shape;
      }
    });
  }

  matchesCurrentWord (correctLetters, keyPress) {
    if (this.currentShape) {
      const idxToCheck = correctLetters.length;
      const wordLetters = this.currentShape.word.split("");
      if (keyPress === wordLetters[idxToCheck]) {
        return true;
      } else { return false; }
    }
  }

  wordComplete () {
    if (this.correctLettersTyped.length > 0 && this.correctLettersTyped.join("") === this.currentShape.word) {
      this.board.score += 1;
      this.correctLettersTyped = [];
      const currentShapeIdx = this.board.shapes.indexOf(this.currentShape);
      this.board.completedShapes.push(this.currentShape);
      this.board.removeShape(currentShapeIdx);
      this.currentShape = undefined;
    }
  }

  gameOver() {
    if (this.poppedShapes !== 0) {
      return false;
    }
  }

  debugLog () {
    setInterval(() => {
      console.log(this.lettersTyped);
      if (this.currentShape) {
        console.log(this.currentShape.word);
      }
      console.log(this.correctLettersTyped);
    }, 1600);
  }
}

export default Game;