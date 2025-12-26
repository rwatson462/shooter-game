import {InputManager} from "./InputManager.js";
import {Renderer} from "./Renderer.js";
import {Player} from "./Player.js";
import {ProjectileManager} from "./ProjectileManager.js";
import {Enemy} from "./Enemy.js";
import {collisionHandler} from "../utils/collisionHandler.js";

export class Game {
    constructor(canvas, width, height) {
        this.lastFrameTime = 0;

        this.width = width
        this.height = height
        this.inputManager = new InputManager(canvas)
        this.projectileManager = new ProjectileManager()
        this.renderer = new Renderer(canvas, width, height)
        this.started = false
    }

    initLevel() {
        this.player = new Player(this.width/2, this.height/2)
        this.enemies = [
            new Enemy(this.width/2, 100, 20),
            new Enemy(this.width/2, this.height-100, 20),
            new Enemy(100, this.height/2, 20),
            new Enemy(this.width-100, this.height/2, 20),
        ]
        this.projectileManager.clear()
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

        if (this.player.active) {
            this.player.handleUserInput(delta, this.inputManager, this.projectileManager)
        }

        this.projectileManager.update(delta)

        this.enemies.forEach(enemy => {
            if (enemy.active) {
                enemy.update(this.player)
            }
        })

        collisionHandler(this.player, this.projectileManager.projectiles, this.enemies)

        /**
         * RENDER
         */
        this.renderer.clear('#111')

        if (this.player.active) {
            this.player.render(this.renderer)
        }

        this.projectileManager.render(this.renderer)

        this.enemies.forEach(enemy => {
            if (enemy.active) {
                enemy.render(this.renderer)
            }
        })

        // draw the framerate
        this.renderer.drawText(10, 10, `Framerate: ${framerate}`, '#aaa');

        /**
         * POST RENDER
         */

        if (this.inputManager.isKeyPressed('Escape')) {
            // potentially change the screen after this
            this.stop()
        }

        // reset the input manager's keyPressed information
        this.inputManager.endFrame()

        this.lastFrameTime = timestamp;
        if (this.started) {
            // only request another frame if we are still running
            requestAnimationFrame(this.render.bind(this));
        }
    }
}