import {Vector2} from "./Vector2.js";
import {Player} from "../core/Player.js";
import {Projectile} from "../core/Projectile.js";
import {Enemy} from '../core/Enemy.js'

/**
 * @param {Game} game
 * @param {Player} player
 * @param {Projectile[]} projectiles
 * @param {Enemy[]} enemies
 */
export const collisionHandler = (game, player, projectiles, enemies) => {
    for (const p of projectiles) {
        for (const e of enemies) {
            if (!e.active) {
                continue
            }

            if (Vector2.distance(p.position, e.position) < e.halfSize) {
                e.takeDamage(p.damage)
                if (! e.active) {
                    // enemy just died
                    game.addScore(e.scoreValue)
                }
                p.active = false
            }
        }
    }

    for (const e of enemies) {
        if (!e.active || !player.active) {
            continue
        }

        if (Vector2.distance(player.position, e.position) < e.halfSize + player.halfSize) {
            // player colliding with enemy
            // move player away from enemy so they are no longer colliding
            // take damage on both player and enemy
            player.takeDamage(10)
            e.takeDamage(5)

            // move player directly away from the thing it's colliding with
            player.position = player.position.add(e.position.subtract(player.position).normalise().multiply(-10))
        }
    }
}
