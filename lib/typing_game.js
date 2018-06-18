const Game = require("./game");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName('canvas')[0];
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;

  const ctx = canvasEl.getContext('2d');

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = "#1e2127";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  const game = new Game(ctx);

  game.animate();
  console.log(window.innerHeight);

});