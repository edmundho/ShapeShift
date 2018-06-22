# ShapeShift - a typing game

## Overview

ShapeShift is a typing game that utilizes Canvas and a random word generator. The goal of the game is to "type away" the growing shapes that appear on the screen. The growth rate of the shapes and generated word lengths depend on the selected difficulty of the game. Typing incorrectly causes the shapes to grow bigger. When the shapes reach their size limit, they 'pop' and disappear. The player has a max of 10 'pops' before the game is over.

## Functionality & MVP
* Users will be able to type the word that appears on each shape in order to make the shape disappear from the screen.
* Users will be able to select level of difficulty of the game.


## Wireframes
![](https://raw.githubusercontent.com/edmundho/ShapeShift/master/docs/shape_shift_wireframe1.png)

Fullscreen with a dark background and colorful shapes. 

## Architecture & Technologies

* Vanilla `JavaScript` for overall structure and game logic,
* `HTML5 Canvas` for DOM manipulation and rendering,
* `random-words`: Random word generator library
* `Webpack` to bundle and serve up the various scripts.
* `keymaster.js`: for mapping keyboard inputs

### Scripts to be used:
* `keybindings.js`: maps keyboard presses to inputs for the game
* `board.js`: handles creating and updating DOM elements (shapes)
* `shape.js`: handles creation of shapes with Canvas
* `game.js`: handles game logic like scoring, shape growth

## Implementation Timeline

__Day 1:__ Get overall file structure set up. Webpack & node setup. Draw shapes/implement shape generator with Canvas. Start with circles first, and add other shapes down the line.

__Day 2:__ Build out game logic such as scoring, shape animations, increasing difficulty as the game progresses, stats tracking (wpm, accuracy).

__Day 3:__ Construct game board and connect game logic with shape elements. Implement difficulty setting.

__Day 4:__ Styling. Game will be simple so its aesthetics will be crucial in its success/enjoyability.

