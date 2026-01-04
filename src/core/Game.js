import {InputManager} from "./InputManager.js";
import {Player} from "./Player.js";
import {ProjectileManager} from "./ProjectileManager.js";
import {Enemy} from "./Enemy.js";
import {collisionHandler} from "../utils/collisionHandler.js";
import {Screen} from "./screens/Screen.js";
import {WaveManager} from "./WaveManager.js";
import {HUD} from "./HUD.js";

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
        this.enemies = []
    }

    initLevel() {
        this.player = new Player(this.width / 2, this.height / 2)
        this.waveManager.init()
        this.startNextWave()
    }

    startNextWave() {
        const wave = this.waveManager.getWave()
        const enemyCount = Math.floor(wave * 1.5)

        this.enemies = []
        for (let e = 0; e < enemyCount; e++) {
            const edge = Math.floor(Math.random()*4)
            let x, y
            switch (edge) {
                case 0:
                    x = Math.random() * this.width
                    y = 0
                    break
                case 1:
                    x = this.width
                    y = Math.random() * this.height
                    break
                case 2:
                    x = Math.random() * this.width
                    y = this.height
                    break
                case 3:
                    x = 0
                    y = Math.random() * this.height
                    break
            }
            this.enemies.push(new Enemy(x,y));
        }

        this.projectileManager.clear()

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

        // todo: we could optimise this to update this when the player health changes
        this.hud.setPlayerHealth(this.player.health)
        this.hud.update(delta)
    }

    render(renderer) {
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

        this.hud.render(renderer)
    }
}
