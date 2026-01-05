import {Screen} from "./screens/Screen.js";

export class HUD extends Screen {
    constructor(application, inputManager, width, height) {
        super(application, inputManager, width, height);

        this.log = []
        this.framerate = 0
        this.playerHealth = 0
        this.playerArmour = 0
    }

    setPlayerHealth(value) {
        this.playerHealth = value
    }

    setPlayerArmour(value) {
        this.playerArmour = value
    }

    setPlayerMaxHealth(value) {
        this.playerMaxHealth = value
    }

    addLog(text) {
        this.log.push({
            text,
            timeout: 4000, // 4 seconds
            opacity: 1
        });
    }

    update(delta) {
        this.framerate = Math.round(1000 / delta)

        // update and remove expired log entries
        this.log.forEach(log => {
            log.timeout -= delta
            log.opacity = Math.min(log.timeout, 1000) / 1000 // -> create value between 0 and 1 for the last second the log message is due to show
        })
        this.log = this.log.filter(log => log.timeout > 0)
    }

    render(renderer) {
        renderer.drawText(10, 20, `Framerate: ${this.framerate}`, '#aaa', '20');
        renderer.drawText(10, 50, `Score: ${this.application.getScore()}`, '#fff', '20');

        // todo: show player health bar
        renderer.drawText(10, 80, `Health: ${this.playerHealth}`, '#fff', '20');
        renderer.drawText(10, 110, `Armour: ${this.playerArmour}`, '#fff', '20');

        // text is vertically aligned, so "20px" means -10px -> 10px relative to y position
        // first text, therefore needs to be at position:
        let y = this.height - (this.log.length + 1) * 20
        for (const log of this.log) {
            // todo: handle log.opacity
            renderer.drawText(10, y, log.text, '#bbb', '20')
            y += 20
        }
    }
}