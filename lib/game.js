import Board from './board';

class Game {
  constructor (ctx, growRate, newShapeInterval) {
    this.board = new Board(ctx, 1);
    this.growRate = growRate;
    this.newShapeInterval = newShapeInterval;

    this.currentShape = undefined;
    this.firstKeyPressed = undefined;
    this.lettersTyped = [];
    this.correctLettersTyped = [];
    this.incorrectLettersTyped = [];
  }

  start () {
    // this.debugLog();
    this.keyListener();
    this.board.drawShapes();
    this.board.drawGUI();
    setInterval(() => this.board.addShape(), this.newShapeInterval*1000);
    this.animate();
  }

  animate () {
    if (this.gameOver()) {
      console.log("Game over");
    } else {
      this.board.shapes.forEach(shape => shape.grow(this.growRate));
      this.board.drawBackground();
      this.board.drawShapes(this.currentShape, this.correctLettersTyped);
      this.board.drawGUI();
      this.shapeAlreadyPopped(this.currentShape);
      this.wordComplete();
      this.board.calculateAccuracy(this.lettersTyped, this.incorrectLettersTyped);
  
      requestAnimationFrame(this.animate.bind(this));
    }
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
      } else { this.incorrectLettersTyped.push(key); }
    });
  }

  selectCurrentWord () {
    this.board.shapes.forEach(shape => {
      if (this.firstKeyPressed === shape.word[0]) {
        this.currentShape = shape;
      }
    });
  }

  shapeAlreadyPopped (shape) {
    if (this.currentShape && !this.board.shapes.includes(shape)) {
      this.currentShape = undefined;
      this.correctLettersTyped = [];
    }
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
      this.firstKeyPressed = undefined;
      const currentShapeIdx = this.board.shapes.indexOf(this.currentShape);
      this.board.completedShapes.push(this.currentShape);
      this.board.removeShape(this.currentShape, currentShapeIdx);
      this.currentShape = undefined;
    }
  }

  gameOver() {
    if (this.board.poppedShapes.length === 10) {
      return true;
    }
  }

  // debugLog () {
  //   setInterval(() => {
  //     console.log('hello');
  //     // console.log(this.lettersTyped);
  //     // if (this.currentShape) {
  //     //   console.log(this.currentShape.word);
  //     // }
  //     // console.log(this.incorrectLettersTyped);
  //     // console.log(this.correctLettersTyped);
  //   }, 1600);
  // }
}

export default Game;