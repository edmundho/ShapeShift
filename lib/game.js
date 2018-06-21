import Board from './board';

class Game {
  constructor (ctx, growRate, newShapeInterval) {
    this.ctx = ctx;
    this.growRate = growRate;
    this.newShapeInterval = newShapeInterval;
    
    this.currentShape = undefined;
    this.firstKeyPressed = undefined;
    this.lettersTyped = [];
    this.correctLettersTyped = [];
    this.incorrectLettersTyped = [];

    this.registerButtons();
  }
  
  registerButtons () {
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    startButton.addEventListener('click', () => {
      this.start();
      startButton.className = 'hidden';
    });
    restartButton.addEventListener('click', () => this.resetGame());
  }
  
  pregame () {
    this.board = new Board(this.ctx, 1);
    this.board.drawPregame();
    document.getElementById('start-button').className = "";
  }

  start () {
    document.addEventListener('keypress', event => this.ingameKeyListener(event));
    this.board.drawShapes();
    this.board.drawGUI();
    this.shapeInterval = setInterval(() => {
      this.board.addShape();
    }, this.newShapeInterval * 1000);
    this.animate();
  }

  animate () {
    if (this.gameOver()) {
      this.board.drawGameOver();
      document.getElementById('restart-button').className = "";
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

  ingameKeyListener (event) {
    const key = event.code.slice(3).toLowerCase();
    this.lettersTyped.push(key);

    if (this.currentShape === undefined) {
      this.firstKeyPressed = key;
      this.selectCurrentWord();
    }
    if (this.matchesCurrentWord(this.correctLettersTyped, key)) {
      this.correctLettersTyped.push(key);
    } else { this.incorrectLettersTyped.push(key); }
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

  resetGame () {
    clearInterval(this.shapeInterval);
    document.getElementById('restart-button').className = 'hidden';
    this.currentShape = undefined;
    this.firstKeyPressed = undefined;
    this.lettersTyped = [];
    this.correctLettersTyped = [];
    this.incorrectLettersTyped = [];
    this.pregame();
  }
}

export default Game;