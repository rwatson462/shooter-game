/**
 * @param {number} count
 * @param {string} colour
 * @param {number} maxX
 * @param {number} maxY
 * @return {Array<int>}
 */
export const createStarLayer = (count, colour, maxX, maxY) => {
    const stars = []
    for (let s = 0; s < count; s++) {
        // create star at random position
        // todo: not overlapping another star in this layer
        stars.push([
            Math.random() * maxX,
            Math.random() * maxY,
            colour,
        ])
    }
    return stars
}