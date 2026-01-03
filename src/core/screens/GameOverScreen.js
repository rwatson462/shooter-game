import {Renderer} from "../Renderer.js";
import {Screen} from "./Screen.js";

export class GameOverScreen extends Screen {
    update() {
        if (this.inputManager.isKeyPressed('Space')) {
            // start a new game!
            this.application.setScreen('title')
        }
    }

    /**
     * @param {Renderer} renderer
     */
    render(renderer) {
        renderer.clear('#111')
        renderer.drawText(this.width/2, this.height/2, `Game over, you scored ${this.application.getScore()}`, '#fff', '48', 'center')

        renderer.drawText(this.width/2, this.height/2 + 30, 'Press [space] to go back', '#99f', '24', 'center')
    }
}
