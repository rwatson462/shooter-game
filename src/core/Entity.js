import {Vector2} from "../utils/Vector2.js";
import {clamp} from "../utils/clamp.js";
import {Projectile} from "./Projectile.js";

export class Entity {
    constructor(x, y, size, maxSpeed, health) {
        // the world-position of the centre of this entity
        this.position = new Vector2(x, y);

        this.speed = 0
        this.maxSpeed = maxSpeed


        // start pointing up, perhaps make this a parameter later
        this.direction = new Vector2(0,1)
        this.strafe = new Vector2(0, 0)

        // will be used for collision detection and drawing
        this.halfSize = size/2

        this.health = health

        this.maxBullets = 5
        this.currentBullets = 0
    }

    takeDamage(damage) {
        this.health = Math.min(this.health - damage, 0)

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

    /**
     * @param {ProjectileManager} projectileManager
     */
    fire(projectileManager) {
        // check if we're allowed to create a bullet
        // todo: make this so we can only fire once per second or something
        if (this.currentBullets >= this.maxBullets) {
            // not allowed to fire
            return
        }

        // if we are, create a bullet
        // bullet should be created at the gun point
        // direction of bullet should be same as ship direction
        // speed needs to be greater than ship (ship speed + bullet speed?)
        const bullet = new Projectile(
            this.position.x,
            this.position.y,
            this.direction,
            this.speed+10,
            5,
            this
        )

        projectileManager.add(bullet)
        this.currentBullets += 1
    }

    onBulletDeath() {
        this.currentBullets -= 1
    }
}
