import { Renderer} from "./Renderer.js";
import {Entity} from "./Entity.js";
import {Vector2} from "../utils/Vector2.js";
import {Player} from "./Player.js";

export class Enemy extends Entity {
    constructor(x, y) {
        super(x, y, 50, 2, 20)

        // when killed, this entity is worth these points
        this.scoreValue = 10
        this.speed = 2
    }

    /**
     * @param {Player} player
     */
    update(player) {
        // always point at the player
        this.pointAt(player.position.x, player.position.y)

        this.move()
    }

    /**
     * @param {Renderer} renderer
     */
    render(renderer) {
        const perpendicular = new Vector2(-this.direction.y, this.direction.x)
        const nose = this.position.add(this.direction.multiply(this.halfSize * 1.5));
        const points = [
            nose,
            this.position.add(this.direction.multiply(-this.halfSize)).add(perpendicular.multiply(-this.halfSize)),
            this.position.add(this.direction.multiply(-this.halfSize)).add(perpendicular.multiply(this.halfSize)),
        ]
        renderer.drawPolygon(points, '#66f')

        // mark the nose so we can clearly see which way we're facing
        renderer.drawLine(
            this.position.x,
            this.position.y,
            nose.x,
            nose.y,
            '#66f'
        )

        renderer.drawText(this.position.x, this.position.y, `${this.health}`, '#fff')
    }
}