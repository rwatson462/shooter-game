import {Vector2} from "../utils/Vector2.js";
import { Renderer } from "./Renderer.js"

export class Projectile {
    /**
     * @param {number} x
     * @param {number} y
     * @param {Vector2} direction
     * @param {number} speed
     * @param {number} damage
     * @param {Entity} owner
     */
    constructor(x, y, direction, speed, damage, owner) {
        this.position = new Vector2(x, y)
        this.direction = direction
        this.speed = speed

        this.damage = damage

        // I guess we'll need to know who fired the shot to give them points
        this.owner = owner

        // Given a lack of collision system, we'll give bullets a lifetime that when they hit, they'll die
        this.lifetime = 1000
        this.active = true
    }

    /**
     * @param {number} delta
     */
    update(delta) {
        if (!this.active) {
            return
        }

        // todo: move by delta
        this.position = this.position.add(this.direction.multiply(this.speed))

        this.lifetime -= delta
        if (this.lifetime <= 0) {
            this.active = false
        }
    }

    /**
     * @param {Renderer} renderer
     */
    render(renderer) {
        // if we're dead, no need to draw ourselves
        if (!this.active) {
            return
        }

        renderer.drawRect(this.position.x, this.position.y, 1, 1, '#ff0')
    }
}