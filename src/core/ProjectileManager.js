import { Renderer } from './Renderer.js'

/**
 * @property {Projectile[]} projectiles
 */
export class ProjectileManager {
    constructor() {
        this.projectiles = []
    }

    clear() {
        this.projectiles = []
    }

    /**
     * @param {Projectile} projectile
     */
    add(projectile) {
        this.projectiles.push(projectile)
    }

    update(delta) {
        this.projectiles = this.projectiles.filter(projectile => {
            if (!projectile.active) {
                projectile.owner.onBulletDeath()
            }

            return projectile.active
        })

        // update any living projectiles
        this.projectiles.forEach(projectile => projectile.update(delta))
    }

    /**
     * @param {Renderer} renderer
     */
    render(renderer) {
        this.projectiles.forEach(projectile => projectile.render(renderer))
    }
}