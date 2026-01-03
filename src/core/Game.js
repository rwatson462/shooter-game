import {InputManager} from "./InputManager.js";
import {Player} from "./Player.js";
import {ProjectileManager} from "./ProjectileManager.js";
import {Enemy} from "./Enemy.js";
import {collisionHandler} from "../utils/collisionHandler.js";
import {Screen} from "./screens/Screen.js";

export class Game extends Screen {
    /**
     *
     * @param {Application} application
     * @param {InputManager} inputManager
     * @param {number} width
     * @param {number} height
     */
    constructor(application, inputManager, width, height) {
        super(application, inputManager, width, height)

        this.projectileManager = new ProjectileManager()
        this.score = 0
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

    addScore(scoreValue) {
        this.application.addToScore(scoreValue)
    }

    update(delta) {
        if (this.player.active) {
            this.player.handleUserInput(delta, this.inputManager, this.projectileManager)
        } else {
            this.application.setScreen('gameOver')
            return
        }

        this.projectileManager.update(delta)

        this.enemies.forEach(enemy => {
            if (enemy.active) {
                enemy.update(this.player)
            }
        })

        collisionHandler(this, this.player, this.projectileManager.projectiles, this.enemies)

        if (this.inputManager.isKeyPressed('Escape')) {
            this.application.setScreen('paused')
        }
    }

    render(renderer, delta) {
        renderer.clear('#111')

        if (this.player.active) {
            this.player.render(renderer)
        }

        this.projectileManager.render(renderer)

        this.enemies.forEach(enemy => {
            if (enemy.active) {
                enemy.render(renderer)
            }
        })

        // todo: move this to a separate HUD
        const framerate = Math.round(1000 / delta)
        renderer.drawText(10, 20, `Framerate: ${framerate}`, '#aaa', '20');
        renderer.drawText(10, 50, `Score: ${this.application.getScore()}`, '#fff', '20');
    }
}
