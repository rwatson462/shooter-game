import {Vector2} from "../utils/Vector2.js";
import {clamp} from "../utils/clamp.js";
import {ArmourType, DamageMultiplierMatrix} from "./data.js";

export class Entity {
    constructor(x, y, size, maxSpeed, health, armour) {
        // the world-position of the centre of this entity
        this.position = new Vector2(x, y);

        this.speed = 0
        this.maxSpeed = maxSpeed
        this.angle = 0.0
        // todo will use these when we have a spiffy sprite to show banking
        this.turningLeft = false
        this.turningRight = false

        // start pointing up, perhaps make this a parameter later
        this.direction = new Vector2(1,0)
        this.strafe = new Vector2(0, 0)

        // will be used for collision detection and drawing
        this.size = size
        this.halfSize = size/2

        this.active = true
        this.health = health
        this.armour = armour
    }

    /**
     *
     * @param {number} damage
     * @param {number} weaponType
     */
    takeDamage(damage, weaponType) {
        const playerDamage = this.armour.takeDamage(damage, weaponType)

        // also scale damage to player ship
        const damageMultiplier = DamageMultiplierMatrix[weaponType][ArmourType.None]
        const reducedDamage = playerDamage * damageMultiplier

        this.health = Math.max(this.health - reducedDamage, 0)

        if (this.health === 0) {
            this.active = false
        }
    }

    pointAt(x, y) {
        this.direction = new Vector2(
            x-this.position.x,
            y-this.position.y,
        ).normalise()
    }

    accelerate() {
        this.speed = clamp(this.speed + 1, -this.maxSpeed, this.maxSpeed)
    }

    brake() {
        this.speed = clamp(this.speed - 1, -this.maxSpeed, this.maxSpeed)
    }

    turnLeft(delta) {
        this.turningLeft = true
        // todo we might need to tweak this value over time
        this.angle -= 1/delta

        // ensure we don't do below zero
        while(this.angle <= 0) {
            this.angle += 2 * Math.PI
        }
    }

    turnRight(delta) {
        this.turningRight = true
        // todo we might need to tweak this value over time
        this.angle += 1/delta

        // ensure we don't go above 360 degrees
        while(this.angle >= 2 * Math.PI) {
            this.angle -= 2 * Math.PI
        }
    }

    strafeLeft() {
        // the perpendicular vector, by default, points to the right.
        // so to strafe left we need to reverse that vector
        this.strafe = new Vector2(-this.direction.y, this.direction.x).multiply(-1)
    }

    strafeRight() {
        this.strafe = new Vector2(-this.direction.y, this.direction.x)
    }

    applyFriction(delta) {
        // much more gradual deceleration at rate of 1 "speed" per second
        if (this.speed > 0) {
            // moving forwards, subtract from speed
            this.speed -= 1/delta
            if (this.speed < 0.05) {
                this.speed = 0
            }
        }
        if (this.speed < 0) {
            // moving backwards, add to speed
            this.speed += 1/delta
            if (this.speed > -0.05) {
                this.speed = 0
            }
        }
    }

    move() {
        this.position = this.position
            .add(this.direction.multiply(this.speed))
            .add(this.strafe.multiply(3))
    }
}
