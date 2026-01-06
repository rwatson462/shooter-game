import {Vector2} from "../../utils/Vector2.js";

export class Weapon {
    constructor(damage, speed, lifetime, position, weaponType) {
        this.damage = damage
        this.speed = speed
        this.lifetime = lifetime
        this.position = position
        this.direction = new Vector2(0,0)
        this.currentBullets = 0
        this.weaponType = weaponType
    }

    onBulletDeath() {
        this.currentBullets -= 1
    }
}