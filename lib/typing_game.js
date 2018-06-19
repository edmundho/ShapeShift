
import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName('canvas')[0];
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;

  const ctx = canvasEl.getContext('2d');

  ctx.font = '22px serif';

  const game = new Game(ctx, 2);

  game.start();
  // console.log(game.shapes);

});