
export class Armour {
    /**
     *
     * @param {number} hitPoints
     * @param {number} reductionMultiplier Number between 0 and 1
     */
    constructor(hitPoints, reductionMultiplier) {
        this.hitPoints = hitPoints
        this.reductionMultiplier = reductionMultiplier
    }

    /**
     * @param {number} damageAmount
     * @return {number} any damage not taken by the armour
     */
    takeDamage(damageAmount) {
        const reducedDamage = damageAmount * this.reductionMultiplier

        // armour can tank all the damage
        if (this.hitPoints > reducedDamage) {
            this.hitPoints -= reducedDamage

            // no damage returned to the player
            return 0
        }

        // armour cannot tank all the damage, deplete the armour
        const overflow = damageAmount - (this.hitPoints / this.reductionMultiplier)
        this.hitPoints = 0
        // return any damage the armour couldn't handle
        return overflow
    }
}