import {Weapon} from "./Weapon.js";
import {Projectile} from "../Projectile.js";
import {Vector2} from "../../utils/Vector2.js";
import {WeaponType} from "../data.js";

export class PlayerWingGuns extends Weapon {
    constructor(position) {
        super(5, 10, 1000, position, WeaponType.Basic)

        // keep track of previous shot so we can limit when the next shot can be
        this.nextShotDelay = 200
        this.nextShotReady = 0
        this.maxBullets = 20

        this.offset = 10 // this weapon sits at the corner of the wings, this far away from the x/y position
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

        const perpendicular = new Vector2(-this.direction.y, this.direction.x)
        const hardPoint1 = this.position.add(this.direction.multiply(-this.offset)).add(perpendicular.multiply(-this.offset))
        const hardPoint2 = this.position.add(this.direction.multiply(-this.offset)).add(perpendicular.multiply(this.offset))

        const bullet1 = new Projectile(
            hardPoint1.x,
            hardPoint1.y,
            this.direction,
            this.speed,
            this.damage,
            this.lifetime,
            this
        )

        const bullet2 = new Projectile(
            hardPoint2.x,
            hardPoint2.y,
            this.direction,
            this.speed,
            this.damage,
            this.lifetime,
            this
        )

        projectileManager.add(bullet1)
        projectileManager.add(bullet2)
        this.currentBullets += 2
        this.nextShotReady = this.nextShotDelay
    }
}