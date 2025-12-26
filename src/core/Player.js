import {Entity} from "./Entity.js";
import {Vector2} from "../utils/Vector2.js";

export class Player extends Entity {
    constructor(x, y) {
        super(x, y, 20, 5, 50);
    }

    /**
     * @param {number} delta
     * @param {InputManager} inputManager
     * @param {ProjectileManager} projectileManager
     */
    handleUserInput(delta, inputManager, projectileManager) {
        // todo: introduce a minimum turning circle so the Player doesn't "snap" to point at the mouse
        this.strafe = new Vector2(0, 0)
        this.pointAt(inputManager.mouseX, inputManager.mouseY)

        // reduce previous velocities before applying any new modifiers
        this.applyFriction(delta)

        // handle movement
        if (inputManager.isKeyHeld('KeyW')) {
            this.accelerate()
        }
        if (inputManager.isKeyHeld('KeyS')) {
            this.brake()
        }
        // handle strafing
        if (inputManager.isKeyHeld('KeyD')) {
            this.strafeRight()
        }
        if (inputManager.isKeyHeld('KeyA')) {
            this.strafeLeft()
        }

        if (inputManager.isKeyPressed('Space') || inputManager.isMouseButtonPressed(1)) {
            this.fire(projectileManager)
        }

        // apply previous movement changes to current position
        this.move()
    }

    render(renderer) {
        const perpendicular = new Vector2(-this.direction.y, this.direction.x)
        const nose = this.position.add(this.direction.multiply(this.halfSize * 1.5));
        const points = [
            nose,
            this.position.add(this.direction.multiply(-this.halfSize)).add(perpendicular.multiply(-this.halfSize)),
            this.position.add(this.direction.multiply(-this.halfSize)).add(perpendicular.multiply(this.halfSize)),
        ]
        renderer.drawPolygon(points, '#f66')

        // mark the nose so we can clearly see which way we're facing
        renderer.drawLine(
            this.position.x,
            this.position.y,
            nose.x,
            nose.y,
            '#f66'
        )

        renderer.drawText(this.position.x, this.position.y, `${this.health}`, '#fff')
    }
}
