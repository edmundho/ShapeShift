# shapeShift

[Visit the Live Site!](https://edmundho.github.io/ShapeShift/)

## Overview
shapeShift is a typing game where the player's goal is to try to score as many points as possible by typing the words inside the shapes before the shape 'pops'. The player gets ten lives; on the tenth popped shape, the game is over.

## Technologies
* JavaScript
* HTML5 Canvas

## Features
* Easy, medium, and hard difficulty settings. The shapes grow faster and spawn more often as the difficulty increases.
* WPM and accuracy stats updated throughout gameplay.
* Subtle pulsing background
* ### Real-time dynamic highlighting of letters being typed.

If the shape's word is the current word being typed, pass in the letters being typed and this condition will trigger:
```javascript
  if (highlightLetters) {
    const wordWidth = ctx.measureText(this.word).width;
    ctx.fillStyle = "#ff0000";
    ctx.textAlign = 'left';
    ctx.fillText(
      highlightLetters.join(""), 
      (this.pos[0] + this.width/2 - wordWidth / 2), 
      (this.pos[1] + this.height/2));
} 
```


* ### +1 and -1 animations for each point scored and each life lost.

![](https://raw.githubusercontent.com/edmundho/ShapeShift/master/docs/shapeshift_demo.gif)

```javascript
drawPointAnimation () {
  let lastPlus = this.completedShapes[this.completedShapes.length - 1];
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
          this.ctx.fillText(`+1`, 
            lastPlus.pos[0] + lastPlus.width / 2, 
            lastPlusAnimationY + lastPlus.height / 2);
        }
        this.plusPosDelta += 1;
      } else {
        lastPlus.animatePoint = false;
        this.plusPosDelta = 1;
      }
    }
  }
```

## Future Plans
* Implement music/sound effects
* Implement a simple backend to keep track of high scores for each difficulty setting.