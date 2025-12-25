import {InputManager} from "./InputManager.js";
import {Renderer} from "../utils/Renderer.js";

export class Game {
    constructor(canvas, width, height) {
        this.lastFrameTime = 0;

        this.width = width
        this.height = height
        this.inputManager = new InputManager(canvas)
        this.renderer = new Renderer(canvas, width, height)
        this.started = false
    }

    start() {
        this.lastFrameTime = Date.now();
        this.started = true
        requestAnimationFrame(this.render.bind(this));
    }

    stop() {
        this.started = false
    }

    render(timestamp) {
        // for 60 frames per second, this is roughly 16.666667
        const delta = timestamp - this.lastFrameTime;
        const framerate = Math.round(1000 / delta)

        /**
         * UPDATE
         */

        // any updating required here

        /**
         * RENDER
         */
        this.renderer.clear('#000')
        this.renderer.drawRect(this.width / 4, this.height / 4, 100, 50, '#c96')

        this.renderer.drawText(10, 10, `Framerate: ${framerate}`, '#aaa');

        /**
         * POST RENDER
         */

        if (this.inputManager.isKeyPressed('Escape')) {
            // potentially change the screen after this
            this.stop()
        }

        this.lastFrameTime = timestamp;
        if (this.started) {
            // only request another frame if we are still running
            requestAnimationFrame(this.render.bind(this));
        }
    }
}