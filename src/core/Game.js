import {InputManager} from "./InputManager.js";
import {Player} from "./Player.js";
import {ProjectileManager} from "./ProjectileManager.js";
import {Enemy} from "./Enemy.js";
import {collisionHandler} from "../utils/collisionHandler.js";
import {Screen} from "./screens/Screen.js";
import {WaveManager} from "./WaveManager.js";
import {HUD} from "./HUD.js";
import {StarField} from "./StarField.js";

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
        this.waveManager = new WaveManager()
        this.hud = new HUD(application, inputManager, width, height)
        this.starField = new StarField(width, height)
        this.enemies = []
    }

    initLevel() {
        this.player = new Player(this.width / 2, this.height / 2)
        this.starField.init()
        this.projectileManager.clear()
        this.inputManager.clear()
        this.waveManager.init()
        this.hud.setPlayer(this.player)
        this.startNextWave()
    }

    startNextWave() {
        const wave = this.waveManager.getWave()
        const enemyCount = Math.floor(wave * 1.5)

        this.enemies = []
        for (let e = 0; e < enemyCount; e++) {
            const edge = Math.floor(Math.random()*4)
            const leftEdge = this.player.position.x - this.width / 2
            const topEdge = this.player.position.y - this.height / 2
            let x, y
            switch (edge) {
                case 0: // top
                    x = leftEdge + Math.random() * this.width
                    y = topEdge - 50
                    break
                case 1: // right
                    x = leftEdge + this.width +  50
                    y = topEdge + Math.random() * this.height
                    break
                case 2: // bottom
                    x = leftEdge + Math.random() * this.width
                    y = topEdge + this.height + 50
                    break
                case 3: // left
                    x = leftEdge - 50
                    y = topEdge + Math.random() * this.height
                    break
            }
            this.enemies.push(new Enemy(x,y));
        }

        this.hud.addLog(`Wave ${this.waveManager.getWave()} started`)
    }

    addScore(scoreValue) {
        this.application.addToScore(scoreValue)
    }

    update(delta) {
        // remove any dead enemies
        this.enemies = this.enemies.filter(enemy => enemy.active)

        this.waveManager.update(delta)
        if (this.enemies.length === 0) {
            this.waveManager.triggerNextWave()
            if (this.waveManager.nextWaveReady()) {
                this.startNextWave()
                this.waveManager.resetWaveCounter()
            }
        }

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

        // this.starField.update(this.player.position)

        // todo: we could optimise this to update this when the player health changes
        this.hud.update(delta)
    }

    render(renderer) {
        renderer.clear('#111')
        this.starField.render(renderer, this.player.position)

        renderer.lockToPoint(this.player.position)


        if (this.player.active) {
            this.player.render(renderer)
        }

        this.projectileManager.render(renderer)

        this.enemies.forEach(enemy => {
            if (enemy.active) {
                enemy.render(renderer)
            }
        })

        renderer.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.hud.render(renderer)
    }
}
