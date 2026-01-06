import {DamageMultiplierMatrix} from "../data.js";

export class Armour {
    /**
     *
     * @param {number} armourType
     * @param {number} hitPoints
     */
    constructor(armourType, hitPoints) {
        this.armourType = armourType
        this.hitPoints = hitPoints
    }

    /**
     * @param {number} damageAmount
     * @param {number} weaponType
     * @return {number} any damage not taken by the armour
     */
    takeDamage(damageAmount, weaponType) {
        const damageMultiplier = DamageMultiplierMatrix[weaponType][this.armourType]
        const reducedDamage = damageAmount * damageMultiplier

        // armour can tank all the damage
        if (this.hitPoints > reducedDamage) {
            this.hitPoints -= reducedDamage

            // no damage returned to the player
            return 0
        }

        // armour cannot tank all the damage, deplete the armour
        const overflow = damageAmount - (this.hitPoints / damageMultiplier)
        this.hitPoints = 0
        // return any damage the armour couldn't handle
        return overflow
    }
}