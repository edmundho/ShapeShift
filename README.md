# ShapeShift - a typing game

## Overview

ShapeShift is a typing game that utilizes Canvas and a random word generator. The goal of the game is to "type away" the growing shapes that appear on the screen. The growth rate of the shapes and generated word lengths depend on the selected difficulty of the game. Typing incorrectly causes the shapes to grow bigger. When the shapes reach their size limit, they 'pop' and disappear. The player has a max of 10 'pops' before the game is over.

## Functionality & MVP
* Users will be able to type the word that appears on each shape in order to make the shape disappear from the screen.
* Users will be able to select level of difficulty of the game.


## Wireframes


Fullscreen with a dark background. Shape colors will be vaporwave aesthetic/outrun inspired.

## Architecture & Technologies

* Vanilla `JavaScript` for overall structure and game logic,
* `HTML5 Canvas` for DOM manipulation and rendering,
* `random-words`: Random word generator library
* `Webpack` to bundle and serve up the various scripts.

### Scripts to be used:
* `keybindings.js`: maps keyboard presses to inputs for the game
* `board.js`: handles creating and updating DOM elements (shapes)
* `shape.js`: handles creation of shapes with Canvas
* `game.js`: 

## Implementation Timeline

__Day 1:__ Get overall file structure set up. Webpack & node setup. Implement Shape generator with Canvas. Triangles, circles, squares. Shape animations.

__Day 2:__ Build out game logic such as scoring, increasing difficulty as the game progresses, stats tracking (wpm, accuracy).

__Day 3:__ Construct game board and connect game logic with shape elements.

__Day 4:__ Styling. Game will be simple so its aesthetics will be a crucial in its success/enjoyability.

