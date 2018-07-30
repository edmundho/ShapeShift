import Board from './board';

class Game {
  constructor (ctx) {
    this.ctx = ctx;
    this.growRate = undefined;
    this.newShapeInterval = undefined;
    
    this.currentShape = undefined;
    this.firstKeyPressed = undefined;
    this.lettersTyped = [];
    this.correctLettersTyped = [];
    this.incorrectLettersTyped = [];

    this.mute = false;

    this.toggleSound = this.toggleSound.bind(this);
    this.wordComplete = this.wordComplete.bind(this);
    this.registerListeners();
  }
  
  registerListeners () {
    // This function registers event listeners on all GUI buttons
    const gameButtons = document.getElementsByClassName('game-buttons');
    for (let i = 0; i < gameButtons.length; i++) {
      if (gameButtons[i].id === 'easy-button') {  
        gameButtons[i].addEventListener('click', () => {
          for (let j = 0; j < gameButtons.length; j++) {
            gameButtons[j].className += " hidden";
          }
          this.growRate = 0.6;
          this.newShapeInterval = 1.75;
          this.start();
        });
      }
      if (gameButtons[i].id === 'medium-button') {
        gameButtons[i].addEventListener('click', () => {
          for (let j = 0; j < gameButtons.length; j++) {
            gameButtons[j].className += " hidden";
          }
          this.growRate = 0.85;
          this.newShapeInterval = 1.35;
          this.start();
        });
      }
      if (gameButtons[i].id === 'hard-button') {
        gameButtons[i].addEventListener('click', () => {
          for (let j = 0; j < gameButtons.length; j++) {
            gameButtons[j].className += " hidden";
          }
          this.growRate = 1.5;
          this.newShapeInterval = 0.8;
          this.start();
        });
      }
      if (gameButtons[i].id === 'restart-button') {
        gameButtons[i].addEventListener('click', () => {
          for (let j = 0; j < gameButtons.length; j++) {
            gameButtons[j].className += " hidden";
          }
          this.resetGame();
        });
      }
    }

    document.getElementById('audio-buttons').addEventListener('click', this.toggleSound);

    // Register keypress listener
    document.addEventListener('keypress', event => this.ingameKeyListener(event));
  }
  
  pregame () {
    this.board = new Board(this.ctx, 1);
    this.board.drawPregame();
    if (this.mute) this.board.mute = true;
    document.getElementById('easy-button').className = "game-buttons";
    document.getElementById('medium-button').className = "game-buttons";
    document.getElementById('hard-button').className = "game-buttons";
    document.getElementById('author-info').className = '';
  }
  
  start () {
    // Hide creator links when game starts
    document.getElementById('author-info').className = 'hidden';
    // Un-hide mute button when game starts
    document.getElementById('audio-buttons').className = '';
    // Play background song
    this.bgSong = document.getElementById('bg-music');
    if (!this.mute) {
      this.bgSong.volume = 0.05;
      this.bgSong.play();
    }
    // Draw initial shapes & GUI when game starts
    this.board.drawShapes();
    this.board.drawGUI();

    // Add shapes as game progresses
    this.shapeInterval = setInterval(() => {
      this.board.addShape();
    }, this.newShapeInterval * 1000);
    this.animate();
  }

  toggleSound () {
    if (!this.mute) {
      document.getElementById('bg-music').volume = 0;
      document.getElementById('mute-button').className = "";
      document.getElementById('unmute-button').className = "hidden";
    } else {
      document.getElementById('bg-music').volume = 0.05;
      document.getElementById('mute-button').className = "hidden";
      document.getElementById('unmute-button').className = "";
    }
    this.mute = !this.mute;
    this.board.mute = !this.board.mute;
  }

  animate () {
    if (this.gameOver()) {
      this.board.calculateAccuracy(this.lettersTyped, this.incorrectLettersTyped);
      this.board.drawGameOver();
      document.getElementById('restart-button').className = "game-buttons";
      document.getElementById('author-info').className = '';
    } else {
      this.board.shapes.forEach(shape => shape.grow(this.growRate));
      this.board.drawBackground();
      this.board.drawShapes(this.currentShape, this.correctLettersTyped);
      this.board.drawGUI();
      this.shapeAlreadyPopped(this.currentShape);
      this.wordComplete();
      this.board.drawPointAnimation();
  
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  ingameKeyListener (event) {
    // This function logs every letter that is typed
    // const key = event.code.slice(3).toLowerCase();
    const key = event.key;
    // console.log(event.key);
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
      if (!this.mute) {
        const scorePointSound = document.getElementById('score-point-sound');
        scorePointSound.load();
        scorePointSound.volume = 0.2;
        scorePointSound.play();
      }
      this.board.calculateAccuracy(this.lettersTyped, this.incorrectLettersTyped);
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