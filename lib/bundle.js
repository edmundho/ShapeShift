/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/typing_game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var random_words__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! random-words */ "./node_modules/random-words/index.js");
/* harmony import */ var random_words__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(random_words__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shape */ "./lib/shape.js");



class Board {
  constructor (ctx, numInitialShapes) {
    this.ctx = ctx;
    this.numInitialShapes = numInitialShapes;
    this.startTime = new Date();
    this.gradientValue = 350;
    this.gradientDirection = "increasing";
    
    this.shapes = [];
    this.addInitialShapes();

    this.score = 0;
    this.accuracy = "";

    this.poppedShapes = [];
    this.completedShapes = [];
    this.pastWords = [];

    this.plusPosDelta = 1;
    this.minusPosDelta = 1;

    this.mute = false;
  }
  
  addShape() {
    const randomWidth = Math.floor(Math.random() * 150) + 90;
    const randomHeight = Math.floor(Math.random() * 150) + 50;
    const randomPosition = [
      90 + Math.random() * (window.innerWidth - 300),
      90 + Math.random() * (window.innerHeight - 300),
    ];
    const randomColor = Object.values(COLORS)[Math.floor(Math.random() * Object.values(COLORS).length)];
    const randomShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];

    this.shapes.unshift(new _shape__WEBPACK_IMPORTED_MODULE_1__["default"]({
      shapeType: randomShape,
      color: randomColor,
      pos: randomPosition,
      width: randomWidth,
      height: randomHeight,
      word: random_words__WEBPACK_IMPORTED_MODULE_0___default()({
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

  pulseBackground () {
    if (this.gradientValue < 350 ) {
      this.gradientValue += 2;
      this.gradientDirection = 'increasing';
    } else if (this.gradientValue > 1200) {
      this.gradientValue -= 2;
      this.gradientDirection = 'decreasing';
    } else if (this.gradientDirection === 'increasing') {
      this.gradientValue += 2;
    } else if (this.gradientDirection === 'decreasing') {
      this.gradientValue -= 2;
    }
  }

  drawBackground () {
    this.pulseBackground();
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const gradient = this.ctx.createRadialGradient(window.innerWidth/2, window.innerHeight/2, 2, window.innerWidth/2 + 1, window.innerHeight/2 + 10, this.gradientValue);
    gradient.addColorStop(0, "#333333");
    gradient.addColorStop(1, "#191919");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }

  drawPregame () {
    // Draw background image before drawing rest of pregame screen
    const img = document.getElementById('pregame-bg');
    this.ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);

    this.ctx.fillStyle = '#e1e1e1';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseLine = 'middle';
    this.ctx.font = '50px PT Mono';
    this.ctx.fillText(`shapeShift`, window.innerWidth / 2, 150);
    this.ctx.font = '15px PT Mono';
    this.ctx.fillText(`* Optimal gameplay is in fullscreen or with max window size. *`, window.innerWidth/2, 200);
    this.ctx.font = '20px Menlo';
    this.ctx.fillText(`Score as many points as you can`, window.innerWidth / 2, window.innerHeight / 2 - 100);
    this.ctx.fillText(`by typing the word before the growing shape pops!`, window.innerWidth / 2, window.innerHeight / 2 - 70);
    this.ctx.fillText(`Game over after 10 missed shapes!`, window.innerWidth / 2, window.innerHeight / 2 - 40);
    this.ctx.fillText(`Select difficulty:`, window.innerWidth / 2, window.innerHeight / 2 + 40);
  }

  drawGameOver () {
    // Draw background image
    const img = document.getElementById('pregame-bg');
    this.ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);

    this.ctx.fillStyle = '#e1e1e1';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseLine = 'middle';
    this.ctx.font = '50px PT Mono';

    this.ctx.fillText(`Game Over...`, window.innerWidth/2, 150);
    this.ctx.font = '20px PT Mono';

    this.ctx.fillText(`You completed ${this.score} words!`, window.innerWidth/2, window.innerHeight/2 + 20);
    this.ctx.fillText(`Your final accuracy: ${this.accuracy}%`, window.innerWidth/2, window.innerHeight/2 + 50);
    this.ctx.fillText(`Your final WPM: ${this.wpm}`, window.innerWidth/2, window.innerHeight/2 + 80);
  }

  drawShapes(currentShape, typedLetters) {
    this.shapes.forEach((shape, idx) => {
      if (shape.height > 300 || shape.width > 400) {
        this.removeShape(shape, idx);
        this.poppedShapes.push(shape);
        if (!this.mute) {
          const loseLifeSound = document.getElementById('lose-life-sound');
          loseLifeSound.load();
          loseLifeSound.volume = 0.2;
          loseLifeSound.play();
        }
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
    let count = 0;
    const allCorrectLetters = this.pastWords.join("").split("");
    let keystrokesArray = keystrokes.slice();

    for (let i = 0; i < allCorrectLetters.length; i++) {
      if (allCorrectLetters[i] !== keystrokesArray[i]) {
        count += 1;
        keystrokesArray = keystrokesArray.slice(0, i).concat(keystrokesArray.slice(i + 1));
      }
    }
 
    if (keystrokes.length === 0) { 
      this.accuracy = 0; 
    } else if (wrongKeystrokes.length === 0) {
      this.accuracy = 100;
    } else {
      this.accuracy = ((allCorrectLetters.length - count)/allCorrectLetters.length * 100).toFixed(1);
    }
  }

  drawGUI() {
    const currentTime = new Date();
    const timeElapsedInMinutes = (currentTime - this.startTime) / 1000 / 60;
    this.wpm = Math.round(this.completedShapes.length / timeElapsedInMinutes);
    this.ctx.fillStyle = "#f5f5f5";
    this.ctx.textAlign = "left";
    this.ctx.textBaseLine = "hanging";
    this.ctx.fillText(`Lives:   ${10 - this.poppedShapes.length}`, 50, 35);
    this.ctx.fillText(
      `WPM:   ${this.wpm}`, 
      210, 35
    );
    this.ctx.fillText(`Accuracy:    ${this.accuracy}%`, 375, 35);
    this.ctx.fillText(`Score:   ${this.score}`, 635, 35);
    this.ctx.fillText(`shapeShift`, 50, window.innerHeight - 35);

    this.ctx.textAlign = "center";
    this.ctx.fillText(`Type the words before the growing shapes 'pop'!`, window.innerWidth / 2, window.innerHeight - 35);
  }

  drawPointAnimation () {
    let lastPlus = this.completedShapes[this.completedShapes.length - 1];
    let lastMinus = this.poppedShapes[this.poppedShapes.length - 1];
    this.ctx.textAlign = "center";
    this.ctx.textBaseLine = "middle";
    if (this.completedShapes.length > 0) {
      if (lastPlus.animatePoint) {
        let lastPlusAnimationY = lastPlus.pos[1] - this.plusPosDelta;
        if (lastPlusAnimationY > lastPlus.pos[1] - 30) {
          this.ctx.fillStyle = '#32cd32';
          if (lastPlus.shapeType === 'circle') {
            this.ctx.fillText(`+1`, lastPlus.pos[0], lastPlusAnimationY);
          } else {
            this.ctx.fillText(`+1`, lastPlus.pos[0] + lastPlus.width / 2, lastPlusAnimationY + lastPlus.height / 2);
          }
          this.plusPosDelta += 1;
        } else {
          lastPlus.animatePoint = false;
          this.plusPosDelta = 1;
        }
      }
    }
    if (this.poppedShapes.length > 0) {
      if (lastMinus.animatePoint) {
        let lastMinusAnimationY = lastMinus.pos[1] + this.minusPosDelta;
        if (lastMinusAnimationY < lastMinus.pos[1] + 30) {
          this.ctx.fillStyle = 'red';
          if (lastMinus.shapeType === 'circle') {
            this.ctx.fillText(`-1`, lastMinus.pos[0], lastMinusAnimationY);
          } else {
            this.ctx.fillText(`-1`, lastMinus.pos[0] + lastMinus.width / 2, lastMinusAnimationY + lastMinus.height / 2);
          }
          this.minusPosDelta += 1;
        } else {
          lastMinus.animatePoint = false;
          this.minusPosDelta = 1;
        }
      }
    }
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

/* harmony default export */ __webpack_exports__["default"] = (Board);

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./lib/board.js");


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
    this.board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"](this.ctx, 1);
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



/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./lib/shape.js":
/*!**********************!*\
  !*** ./lib/shape.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


class Shape {
  constructor(options) {
    this.shapeType = options.shapeType;
    this.pos = options.pos;
    this.color = options.color;
    this.height = options.height;
    this.width = options.width;
    this.word = options.word;
    this.rotation = 0;

    this.animatePoint = true;

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

/* harmony default export */ __webpack_exports__["default"] = (Shape);

/***/ }),

/***/ "./lib/typing_game.js":
/*!****************************!*\
  !*** ./lib/typing_game.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./lib/game.js");



document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName('canvas')[0];
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;

  const ctx = canvasEl.getContext('2d');
  ctx.font = '20px Menlo';

  window.onload = function () {
    var img = document.getElementById("pregame-bg");
    ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
    const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);
    game.pregame();
  };


});

/***/ }),

/***/ "./node_modules/random-words/index.js":
/*!********************************************!*\
  !*** ./node_modules/random-words/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var wordList = [
  // Borrowed from xkcd password generator which borrowed it from wherever
  "ability","able","aboard","about","above","accept","accident","according",
  "account","accurate","acres","across","act","action","active","activity",
  "actual","actually","add","addition","additional","adjective","adult","adventure",
  "advice","affect","afraid","after","afternoon","again","against","age",
  "ago","agree","ahead","aid","air","airplane","alike","alive",
  "all","allow","almost","alone","along","aloud","alphabet","already",
  "also","although","am","among","amount","ancient","angle","angry",
  "animal","announced","another","answer","ants","any","anybody","anyone",
  "anything","anyway","anywhere","apart","apartment","appearance","apple","applied",
  "appropriate","are","area","arm","army","around","arrange","arrangement",
  "arrive","arrow","art","article","as","aside","ask","asleep",
  "at","ate","atmosphere","atom","atomic","attached","attack","attempt",
  "attention","audience","author","automobile","available","average","avoid","aware",
  "away","baby","back","bad","badly","bag","balance","ball",
  "balloon","band","bank","bar","bare","bark","barn","base",
  "baseball","basic","basis","basket","bat","battle","be","bean",
  "bear","beat","beautiful","beauty","became","because","become","becoming",
  "bee","been","before","began","beginning","begun","behavior","behind",
  "being","believed","bell","belong","below","belt","bend","beneath",
  "bent","beside","best","bet","better","between","beyond","bicycle",
  "bigger","biggest","bill","birds","birth","birthday","bit","bite",
  "black","blank","blanket","blew","blind","block","blood","blow",
  "blue","board","boat","body","bone","book","border","born",
  "both","bottle","bottom","bound","bow","bowl","box","boy",
  "brain","branch","brass","brave","bread","break","breakfast","breath",
  "breathe","breathing","breeze","brick","bridge","brief","bright","bring",
  "broad","broke","broken","brother","brought","brown","brush","buffalo",
  "build","building","built","buried","burn","burst","bus","bush",
  "business","busy","but","butter","buy","by","cabin","cage",
  "cake","call","calm","came","camera","camp","can","canal",
  "cannot","cap","capital","captain","captured","car","carbon","card",
  "care","careful","carefully","carried","carry","case","cast","castle",
  "cat","catch","cattle","caught","cause","cave","cell","cent",
  "center","central","century","certain","certainly","chain","chair","chamber",
  "chance","change","changing","chapter","character","characteristic","charge","chart",
  "check","cheese","chemical","chest","chicken","chief","child","children",
  "choice","choose","chose","chosen","church","circle","circus","citizen",
  "city","class","classroom","claws","clay","clean","clear","clearly",
  "climate","climb","clock","close","closely","closer","cloth","clothes",
  "clothing","cloud","club","coach","coal","coast","coat","coffee",
  "cold","collect","college","colony","color","column","combination","combine",
  "come","comfortable","coming","command","common","community","company","compare",
  "compass","complete","completely","complex","composed","composition","compound","concerned",
  "condition","congress","connected","consider","consist","consonant","constantly","construction",
  "contain","continent","continued","contrast","control","conversation","cook","cookies",
  "cool","copper","copy","corn","corner","correct","correctly","cost",
  "cotton","could","count","country","couple","courage","course","court",
  "cover","cow","cowboy","crack","cream","create","creature","crew",
  "crop","cross","crowd","cry","cup","curious","current","curve",
  "customs","cut","cutting","daily","damage","dance","danger","dangerous",
  "dark","darkness","date","daughter","dawn","day","dead","deal",
  "dear","death","decide","declared","deep","deeply","deer","definition",
  "degree","depend","depth","describe","desert","design","desk","detail",
  "determine","develop","development","diagram","diameter","did","die","differ",
  "difference","different","difficult","difficulty","dig","dinner","direct","direction",
  "directly","dirt","dirty","disappear","discover","discovery","discuss","discussion",
  "disease","dish","distance","distant","divide","division","do","doctor",
  "does","dog","doing","doll","dollar","done","donkey","door",
  "dot","double","doubt","down","dozen","draw","drawn","dream",
  "dress","drew","dried","drink","drive","driven","driver","driving",
  "drop","dropped","drove","dry","duck","due","dug","dull",
  "during","dust","duty","each","eager","ear","earlier","early",
  "earn","earth","easier","easily","east","easy","eat","eaten",
  "edge","education","effect","effort","egg","eight","either","electric",
  "electricity","element","elephant","eleven","else","empty","end","enemy",
  "energy","engine","engineer","enjoy","enough","enter","entire","entirely",
  "environment","equal","equally","equator","equipment","escape","especially","essential",
  "establish","even","evening","event","eventually","ever","every","everybody",
  "everyone","everything","everywhere","evidence","exact","exactly","examine","example",
  "excellent","except","exchange","excited","excitement","exciting","exclaimed","exercise",
  "exist","expect","experience","experiment","explain","explanation","explore","express",
  "expression","extra","eye","face","facing","fact","factor","factory",
  "failed","fair","fairly","fall","fallen","familiar","family","famous",
  "far","farm","farmer","farther","fast","fastened","faster","fat",
  "father","favorite","fear","feathers","feature","fed","feed","feel",
  "feet","fell","fellow","felt","fence","few","fewer","field",
  "fierce","fifteen","fifth","fifty","fight","fighting","figure","fill",
  "film","final","finally","find","fine","finest","finger","finish",
  "fire","fireplace","firm","first","fish","five","fix","flag",
  "flame","flat","flew","flies","flight","floating","floor","flow",
  "flower","fly","fog","folks","follow","food","foot","football",
  "for","force","foreign","forest","forget","forgot","forgotten","form",
  "former","fort","forth","forty","forward","fought","found","four",
  "fourth","fox","frame","free","freedom","frequently","fresh","friend",
  "friendly","frighten","frog","from","front","frozen","fruit","fuel",
  "full","fully","fun","function","funny","fur","furniture","further",
  "future","gain","game","garage","garden","gas","gasoline","gate",
  "gather","gave","general","generally","gentle","gently","get","getting",
  "giant","gift","girl","give","given","giving","glad","glass",
  "globe","go","goes","gold","golden","gone","good","goose",
  "got","government","grabbed","grade","gradually","grain","grandfather","grandmother",
  "graph","grass","gravity","gray","great","greater","greatest","greatly",
  "green","grew","ground","group","grow","grown","growth","guard",
  "guess","guide","gulf","gun","habit","had","hair","half",
  "halfway","hall","hand","handle","handsome","hang","happen","happened",
  "happily","happy","harbor","hard","harder","hardly","has","hat",
  "have","having","hay","he","headed","heading","health","heard",
  "hearing","heart","heat","heavy","height","held","hello","help",
  "helpful","her","herd","here","herself","hidden","hide","high",
  "higher","highest","highway","hill","him","himself","his","history",
  "hit","hold","hole","hollow","home","honor","hope","horn",
  "horse","hospital","hot","hour","house","how","however","huge",
  "human","hundred","hung","hungry","hunt","hunter","hurried","hurry",
  "hurt","husband","ice","idea","identity","if","ill","image",
  "imagine","immediately","importance","important","impossible","improve","in","inch",
  "include","including","income","increase","indeed","independent","indicate","individual",
  "industrial","industry","influence","information","inside","instance","instant","instead",
  "instrument","interest","interior","into","introduced","invented","involved","iron",
  "is","island","it","its","itself","jack","jar","jet",
  "job","join","joined","journey","joy","judge","jump","jungle",
  "just","keep","kept","key","kids","kill","kind","kitchen",
  "knew","knife","know","knowledge","known","label","labor","lack",
  "lady","laid","lake","lamp","land","language","large","larger",
  "largest","last","late","later","laugh","law","lay","layers",
  "lead","leader","leaf","learn","least","leather","leave","leaving",
  "led","left","leg","length","lesson","let","letter","level",
  "library","lie","life","lift","light","like","likely","limited",
  "line","lion","lips","liquid","list","listen","little","live",
  "living","load","local","locate","location","log","lonely","long",
  "longer","look","loose","lose","loss","lost","lot","loud",
  "love","lovely","low","lower","luck","lucky","lunch","lungs",
  "lying","machine","machinery","mad","made","magic","magnet","mail",
  "main","mainly","major","make","making","man","managed","manner",
  "manufacturing","many","map","mark","market","married","mass","massage",
  "master","material","mathematics","matter","may","maybe","me","meal",
  "mean","means","meant","measure","meat","medicine","meet","melted",
  "member","memory","men","mental","merely","met","metal","method",
  "mice","middle","might","mighty","mile","military","milk","mill",
  "mind","mine","minerals","minute","mirror","missing","mission","mistake",
  "mix","mixture","model","modern","molecular","moment","money","monkey",
  "month","mood","moon","more","morning","most","mostly","mother",
  "motion","motor","mountain","mouse","mouth","move","movement","movie",
  "moving","mud","muscle","music","musical","must","my","myself",
  "mysterious","nails","name","nation","national","native","natural","naturally",
  "nature","near","nearby","nearer","nearest","nearly","necessary","neck",
  "needed","needle","needs","negative","neighbor","neighborhood","nervous","nest",
  "never","new","news","newspaper","next","nice","night","nine",
  "no","nobody","nodded","noise","none","noon","nor","north",
  "nose","not","note","noted","nothing","notice","noun","now",
  "number","numeral","nuts","object","observe","obtain","occasionally","occur",
  "ocean","of","off","offer","office","officer","official","oil",
  "old","older","oldest","on","once","one","only","onto",
  "open","operation","opinion","opportunity","opposite","or","orange","orbit",
  "order","ordinary","organization","organized","origin","original","other","ought",
  "our","ourselves","out","outer","outline","outside","over","own",
  "owner","oxygen","pack","package","page","paid","pain","paint",
  "pair","palace","pale","pan","paper","paragraph","parallel","parent",
  "park","part","particles","particular","particularly","partly","parts","party",
  "pass","passage","past","path","pattern","pay","peace","pen",
  "pencil","people","per","percent","perfect","perfectly","perhaps","period",
  "person","personal","pet","phrase","physical","piano","pick","picture",
  "pictured","pie","piece","pig","pile","pilot","pine","pink",
  "pipe","pitch","place","plain","plan","plane","planet","planned",
  "planning","plant","plastic","plate","plates","play","pleasant","please",
  "pleasure","plenty","plural","plus","pocket","poem","poet","poetry",
  "point","pole","police","policeman","political","pond","pony","pool",
  "poor","popular","population","porch","port","position","positive","possible",
  "possibly","post","pot","potatoes","pound","pour","powder","power",
  "powerful","practical","practice","prepare","present","president","press","pressure",
  "pretty","prevent","previous","price","pride","primitive","principal","principle",
  "printed","private","prize","probably","problem","process","produce","product",
  "production","program","progress","promised","proper","properly","property","protection",
  "proud","prove","provide","public","pull","pupil","pure","purple",
  "purpose","push","put","putting","quarter","queen","question","quick",
  "quickly","quiet","quietly","quite","rabbit","race","radio","railroad",
  "rain","raise","ran","ranch","range","rapidly","rate","rather",
  "raw","rays","reach","read","reader","ready","real","realize",
  "rear","reason","recall","receive","recent","recently","recognize","record",
  "red","refer","refused","region","regular","related","relationship","religious",
  "remain","remarkable","remember","remove","repeat","replace","replied","report",
  "represent","require","research","respect","rest","result","return","review",
  "rhyme","rhythm","rice","rich","ride","riding","right","ring",
  "rise","rising","river","road","roar","rock","rocket","rocky",
  "rod","roll","roof","room","root","rope","rose","rough",
  "round","route","row","rubbed","rubber","rule","ruler","run",
  "running","rush","sad","saddle","safe","safety","said","sail",
  "sale","salmon","salt","same","sand","sang","sat","satellites",
  "satisfied","save","saved","saw","say","scale","scared","scene",
  "school","science","scientific","scientist","score","screen","sea","search",
  "season","seat","second","secret","section","see","seed","seeing",
  "seems","seen","seldom","select","selection","sell","send","sense",
  "sent","sentence","separate","series","serious","serve","service","sets",
  "setting","settle","settlers","seven","several","shade","shadow","shake",
  "shaking","shall","shallow","shape","share","sharp","she","sheep",
  "sheet","shelf","shells","shelter","shine","shinning","ship","shirt",
  "shoe","shoot","shop","shore","short","shorter","shot","should",
  "shoulder","shout","show","shown","shut","sick","sides","sight",
  "sign","signal","silence","silent","silk","silly","silver","similar",
  "simple","simplest","simply","since","sing","single","sink","sister",
  "sit","sitting","situation","six","size","skill","skin","sky",
  "slabs","slave","sleep","slept","slide","slight","slightly","slip",
  "slipped","slope","slow","slowly","small","smaller","smallest","smell",
  "smile","smoke","smooth","snake","snow","so","soap","social",
  "society","soft","softly","soil","solar","sold","soldier","solid",
  "solution","solve","some","somebody","somehow","someone","something","sometime",
  "somewhere","son","song","soon","sort","sound","source","south",
  "southern","space","speak","special","species","specific","speech","speed",
  "spell","spend","spent","spider","spin","spirit","spite","split",
  "spoken","sport","spread","spring","square","stage","stairs","stand",
  "standard","star","stared","start","state","statement","station","stay",
  "steady","steam","steel","steep","stems","step","stepped","stick",
  "stiff","still","stock","stomach","stone","stood","stop","stopped",
  "store","storm","story","stove","straight","strange","stranger","straw",
  "stream","street","strength","stretch","strike","string","strip","strong",
  "stronger","struck","structure","struggle","stuck","student","studied","studying",
  "subject","substance","success","successful","such","sudden","suddenly","sugar",
  "suggest","suit","sum","summer","sun","sunlight","supper","supply",
  "support","suppose","sure","surface","surprise","surrounded","swam","sweet",
  "swept","swim","swimming","swing","swung","syllable","symbol","system",
  "table","tail","take","taken","tales","talk","tall","tank",
  "tape","task","taste","taught","tax","tea","teach","teacher",
  "team","tears","teeth","telephone","television","tell","temperature","ten",
  "tent","term","terrible","test","than","thank","that","thee",
  "them","themselves","then","theory","there","therefore","these","they",
  "thick","thin","thing","think","third","thirty","this","those",
  "thou","though","thought","thousand","thread","three","threw","throat",
  "through","throughout","throw","thrown","thumb","thus","thy","tide",
  "tie","tight","tightly","till","time","tin","tiny","tip",
  "tired","title","to","tobacco","today","together","told","tomorrow",
  "tone","tongue","tonight","too","took","tool","top","topic",
  "torn","total","touch","toward","tower","town","toy","trace",
  "track","trade","traffic","trail","train","transportation","trap","travel",
  "treated","tree","triangle","tribe","trick","tried","trip","troops",
  "tropical","trouble","truck","trunk","truth","try","tube","tune",
  "turn","twelve","twenty","twice","two","type","typical","uncle",
  "under","underline","understanding","unhappy","union","unit","universe","unknown",
  "unless","until","unusual","up","upon","upper","upward","us",
  "use","useful","using","usual","usually","valley","valuable","value",
  "vapor","variety","various","vast","vegetable","verb","vertical","very",
  "vessels","victory","view","village","visit","visitor","voice","volume",
  "vote","vowel","voyage","wagon","wait","walk","wall","want",
  "war","warm","warn","was","wash","waste","watch","water",
  "wave","way","we","weak","wealth","wear","weather","week",
  "weigh","weight","welcome","well","went","were","west","western",
  "wet","whale","what","whatever","wheat","wheel","when","whenever",
  "where","wherever","whether","which","while","whispered","whistle","white",
  "who","whole","whom","whose","why","wide","widely","wife",
  "wild","will","willing","win","wind","window","wing","winter",
  "wire","wise","wish","with","within","without","wolf","women",
  "won","wonder","wonderful","wood","wooden","wool","word","wore",
  "work","worker","world","worried","worry","worse","worth","would",
  "wrapped","write","writer","writing","written","wrong","wrote","yard",
  "year","yellow","yes","yesterday","yet","you","young","younger",
  "your","yourself","youth","zero","zebra","zipper","zoo","zulu"
];

function words(options) {

  function word() {
    if (options && options.maxLength > 1) {
      return generateWordWithMaxLength();
    } else {
      return generateRandomWord();
    }
  }

  function generateWordWithMaxLength() {
    let rightSize = false;
    let wordUsed;
    while (!rightSize) {  
      wordUsed = generateRandomWord();
      if(wordUsed.length <= options.maxLength) {
        rightSize = true;
      }

    }
    return wordUsed;
  }

  function generateRandomWord() {
    return wordList[randInt(wordList.length)];
  }

  function randInt(lessThan) {
    return Math.floor(Math.random() * lessThan);
  }

  // No arguments = generate one word
  if (typeof(options) === 'undefined') {
    return word();
  }

  // Just a number = return that many words
  if (typeof(options) === 'number') {
    options = { exactly: options };
  }

  // options supported: exactly, min, max, join
  if (options.exactly) {
    options.min = options.exactly;
    options.max = options.exactly;
  }
  
  // not a number = one word par string
  if (typeof(options.wordsPerString) !== 'number') {
    options.wordsPerString = 1;
  }

  //not a function = returns the raw word
  if (typeof(options.formatter) !== 'function') {
    options.formatter = (word) => word;
  }

  //not a string = separator is a space
  if (typeof(options.separator) !== 'string') {
    options.separator = ' ';
  }

  var total = options.min + randInt(options.max + 1 - options.min);
  var results = [];
  var token = '';
  var relativeIndex = 0;

  for (var i = 0; (i < total * options.wordsPerString); i++) {
    if (relativeIndex === options.wordsPerString - 1) {
      token += options.formatter(word(), relativeIndex);
    }
    else {
      token += options.formatter(word(), relativeIndex) + options.separator;
    }
    relativeIndex++;
    if ((i + 1) % options.wordsPerString === 0) {
      results.push(token);
      token = ''; 
      relativeIndex = 0;
    }
   
  }
  if (options.join) {
    results = results.join(options.join);
  }

  return results;
}

module.exports = words;
// Export the word list as it is often useful
words.wordList = wordList;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map