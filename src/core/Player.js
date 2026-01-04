import {Entity} from "./Entity.js";
import {Vector2} from "../utils/Vector2.js";
import {PlayerNoseGun} from "./weapons/PlayerNoseGun.js";
import {PlayerWingGuns} from "./weapons/PlayerWingGuns.js";
import {PlayerRearGun} from "./weapons/PlayerRearGun.js";

export class Player extends Entity {
    constructor(x, y) {
        super(x, y, 20, 5, 100);

        this.weapons = [
            new PlayerNoseGun(this.position),
            new PlayerWingGuns(this.position),
            new PlayerRearGun(this.position),
        ]
        this.weaponIndex = 0
        this.weapon = this.weapons[this.weaponIndex]
    }

    switchWeapons() {
        this.weaponIndex ++
        if (this.weaponIndex >= this.weapons.length) {
            this.weaponIndex = 0
        }

        this.weapon = this.weapons[this.weaponIndex]
    }

    takeDamage(damage) {
        this.health = Math.max(this.health - damage, 0)

        if (this.health === 0) {
            this.active = false
        }
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

        if (inputManager.isKeyPressed('KeyC')) {
            this.switchWeapons()
        }

        // apply previous movement changes to current position
        this.move()

        // after moving, see if we're shooting
        if (inputManager.isKeyHeld('Space') || inputManager.isMouseButtonHeld(1)) {
            this.weapon.fire(projectileManager)
        }

        // update the current weapon with whatever it needs
        this.weapon.position = this.position
        this.weapon.direction = this.direction
        this.weapon.update(delta)
    }

    render(renderer) {
        const perpendicular = new Vector2(-this.direction.y, this.direction.x)
        const nose = this.position.add(this.direction.multiply(this.halfSize * 1.5));
        const points = [
            nose,
            this.position.add(this.direction.multiply(-this.halfSize)).add(perpendicular.multiply(-this.halfSize)),
            this.position.add(this.direction.multiply(-this.halfSize)).add(perpendicular.multiply(this.halfSize)),
        ]
        renderer.drawPolygon(points, '#ff0')

        // mark the nose so we can clearly see which way we're facing
        renderer.drawLine(
            this.position.x,
            this.position.y,
            nose.x,
            nose.y,
            '#ff0'
        )
    }
}
