import {Renderer} from "../Renderer.js";
import {Screen} from "./Screen.js";

export class PauseScreen extends Screen {
    /**
     *
     * @param {Application} application
     * @param {InputManager} inputManager
     * @param {number} width
     * @param {number} height
     */
    constructor(application, inputManager, width, height) {
        super(application, inputManager, width, height)
    }

    update() {
        if (this.inputManager.isKeyPressed('Space')) {
            this.application.setScreen('inGame', false)
        }
        if (this.inputManager.isKeyPressed('Escape')) {
            this.application.setScreen('title')
        }
    }

    /**
     * @param {Renderer} renderer
     */
    render(renderer) {
        renderer.clear('#111')
        renderer.drawText(this.width/2, this.height/2, 'Shooter - paused', '#fff', '48', 'center')

        renderer.drawText(this.width/2, this.height/2 + 30, 'Press [space] to resume', '#99f', '24', 'center')
        renderer.drawText(this.width/2, this.height/2 + 48, 'Press [esc] to quit', '#f99', '12', 'center')
    }
}
