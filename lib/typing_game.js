
import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName('canvas')[0];
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;

  const ctx = canvasEl.getContext('2d');
  ctx.font = '22px Menlo';

  // Game (canvasContext, shapePixelGrowRate, newShapeInterval)
  const game = new Game(ctx, 1, 1);

  game.start();
});