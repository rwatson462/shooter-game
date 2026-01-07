import {Weapon} from "./Weapon.js";
import {Projectile} from "../Projectile.js";
import {WeaponType} from "../data.js";

export class PlayerNoseGun extends Weapon {
    constructor(position) {
        super(5, 10, 750, position, WeaponType.Basic)

        // keep track of previous shot so we can limit when the next shot can be
        this.nextShotDelay = 200
        this.nextShotReady = 0
        this.maxBullets = 10
        this.offset = 10
    }

    update(delta) {
        this.nextShotReady = Math.max(0, this.nextShotReady - delta)
    }

    /**
     * @param {ProjectileManager} projectileManager
     */
    fire(projectileManager) {
        // only fire if we're ready and have bullets available
        if (this.nextShotReady > 0 || this.currentBullets >= this.maxBullets) {
            return
        }

        // if we are, create a bullet
        // bullet should be created at the gun point
        // direction of bullet should be same as ship direction
        // speed needs to be greater than ship (ship speed + bullet speed?)
        const nosePosition = this.position.add(this.direction.multiply(this.offset * 1.5))
        const bullet = new Projectile(
            nosePosition.x,
            nosePosition.y,
            this.direction,
            this.speed,
            this.damage,
            this.lifetime,
            this
        )

        projectileManager.add(bullet)
        this.currentBullets += 1
        this.nextShotReady = this.nextShotDelay
    }
}