import {Renderer} from "../Renderer.js";
import {Screen} from "./Screen.js";

export class PauseScreen extends Screen {
    update() {
        if (this.inputManager.isKeyPressed('Escape')) {
            this.application.setScreen('inGame', false)
        }
        if (this.inputManager.isKeyPressed('KeyQ')) {
            this.application.setScreen('title')
        }
    }

    /**
     * @param {Renderer} renderer
     */
    render(renderer) {
        renderer.clear('#111')
        renderer.drawText(this.width/2, this.height/2, 'Shooter - paused', '#fff', '48', 'center')

        renderer.drawText(this.width/2, this.height/2 + 30, 'Press [esc] to resume', '#99f', '24', 'center')
        renderer.drawText(this.width/2, this.height/2 + 48, 'Press [q] to quit', '#f99', '12', 'center')
    }
}
