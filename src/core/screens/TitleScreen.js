import {Renderer} from "../Renderer.js";
import {Screen} from "./Screen.js";

export class TitleScreen extends Screen {
    update() {
        if (this.inputManager.isKeyPressed('Space')) {
            this.application.startNewGame()
        }
    }

    /**
     * @param {Renderer} renderer
     */
    render(renderer) {
        renderer.clear('#111')
        renderer.drawText(this.width/2, this.height/2, 'Shooter', '#fff', '48', 'center')

        renderer.drawText(this.width/2, this.height/2 + 30, 'Press [space] to start', '#99f', '24', 'center')
    }
}
