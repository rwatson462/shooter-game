import {Entity} from "./Entity.js";
import {Vector2} from "../utils/Vector2.js";
import {PlayerNoseGun} from "./weapons/PlayerNoseGun.js";
import {PlayerWingGuns} from "./weapons/PlayerWingGuns.js";
import {PlayerRearGun} from "./weapons/PlayerRearGun.js";
import {BasicArmour} from "./armour/BasicArmour.js";

export class Player extends Entity {
    constructor(x, y) {
        super(x, y, 20, 5, 100, new BasicArmour());

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

    /**
     * @param {number} delta
     * @param {InputManager} inputManager
     * @param {ProjectileManager} projectileManager
     */
    handleUserInput(delta, inputManager, projectileManager) {
        this.strafe = new Vector2(0, 0)
        this.turningLeft = false
        this.turningRight = false

        // reduce previous velocities before applying any new modifiers
        this.applyFriction(delta)

        // handle movement
        if (inputManager.isKeyHeld('KeyW')) {
            this.accelerate()
        }
        if (inputManager.isKeyHeld('KeyS')) {
            this.brake()
        }
        if (inputManager.isKeyHeld('KeyA')) {
            this.turnLeft(delta)
        }
        if (inputManager.isKeyHeld('KeyD')) {
            this.turnRight(delta)
        }
        if (inputManager.isKeyHeld('KeyE')) {
            this.strafeRight()
        }
        if (inputManager.isKeyHeld('KeyQ')) {
            this.strafeLeft()
        }

        if (inputManager.isKeyPressed('KeyC')) {
            this.switchWeapons()
        }

        // update direction vector based on current angle
        this.direction = new Vector2(Math.cos(this.angle), Math.sin(this.angle))

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
        const distFromCenter = this.halfSize * 1.25
        const nose = this.position.add(this.direction.multiply(distFromCenter));
        const wing1 = this.position.add(this.direction.multiply(-distFromCenter)).add(perpendicular.multiply(-this.halfSize));
        const wing2 = this.position.add(this.direction.multiply(-distFromCenter)).add(perpendicular.multiply(this.halfSize));

        const points = [nose, wing1, wing2]
        renderer.drawPolygon(points, '#ff0')

        // mark the nose so we can clearly see which way we're facing
        renderer.drawLine(
            this.position.x,
            this.position.y,
            nose.x,
            nose.y,
            '#ff0'
        )
        renderer.drawLine(
            this.position.x,
            this.position.y,
            wing1.x,
            wing1.y,
            '#66f'
        )
        renderer.drawLine(
            this.position.x,
            this.position.y,
            wing2.x,
            wing2.y,
            '#66f'
        )
    }
}
