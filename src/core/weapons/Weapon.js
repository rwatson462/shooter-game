import {Vector2} from "../../utils/Vector2.js";

export class Weapon {
    constructor(damage, speed, lifetime, position) {
        this.damage = damage
        this.speed = speed
        this.lifetime = lifetime
        this.position = position
        this.direction = new Vector2(0,0)
        this.currentBullets = 0
    }

    onBulletDeath() {
        this.currentBullets -= 1
    }
}