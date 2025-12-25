import { Renderer } from './utils/Renderer.js';
import {InputManager} from "./core/InputManager.js";

const canvas = document.getElementById('canvas');

const WIDTH = 1280;
const HEIGHT = 720;

const inputManager = new InputManager(canvas)
const renderer = new Renderer(canvas, WIDTH, HEIGHT)

renderer.clear('#000')
renderer.drawRect(WIDTH / 4, HEIGHT / 4, 100, 50, '#c96')
