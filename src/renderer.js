import {Application} from "./core/Application.js";

const canvas = document.getElementById('canvas');

const WIDTH = 1280;
const HEIGHT = 720;

const application = new Application(canvas, WIDTH, HEIGHT)

application.init()
application.start()