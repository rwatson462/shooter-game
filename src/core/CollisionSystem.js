import {Vector2} from "../utils/Vector2.js";
import {Player} from "./Player.js";
import {Projectile} from "./Projectile.js";
import {Enemy} from './Enemy.js'

export class CollisionSystem {
    constructor() {

    }

    /**
     * @param {Player} player
     * @param {Projectile[]} projectiles
     * @param {Enemy[]} enemies
     */
    update(player, projectiles, enemies) {
        for (const p of projectiles) {
            for (const e of enemies) {
                if (! e.active) {
                    continue
                }

                if (Vector2.distance(p.position, e.position) < e.halfSize) {
                    e.takeDamage(p.damage)
                    p.active = false
                }
            }
        }
    }
}