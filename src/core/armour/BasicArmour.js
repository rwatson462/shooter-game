import {Armour} from "./Armour.js";
import {ArmourType} from "../data.js";

export class BasicArmour extends Armour {
    constructor() {
        super(ArmourType.Light, 50)
        //
    }

    /**
     * @param {number} delta
     */
    update(delta) {
        // reserved for future use
    }
}