
export const WeaponType = {
    Basic: 0,
    ArmourPiercing: 1,
    Explosive: 2,
    Collision: 3
}

export const ArmourType = {
    None: 0, // this armour type applies when the player ship is taking damage directly
    Light: 1,
    Medium: 2,
    Heavy: 3,
    Shield: 4,
}

/**
 * Index by weapon type FIRST, then armour type SECOND.
 * The values here are multipliers against incoming damage:
 * - larger is better for weapon
 * - smaller is better for armour
 */
export const DamageMultiplierMatrix = [
    [1, 1, 0.9, 0.75, 1],  // basic weapon
    [2, 1, 1.1, 1.5, 0.75], // armour piercing
    [5, 1.25, 1.25, 1, 0.5], // explosive
    [5, 1, 1, 1, 0.5], // collision
]
