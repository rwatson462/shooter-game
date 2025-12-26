import {Game} from "./core/Game.js";

const canvas = document.getElementById('canvas');

const WIDTH = 1280;
const HEIGHT = 720;

const game = new Game(canvas, WIDTH, HEIGHT)

game.initLevel()
game.start()
