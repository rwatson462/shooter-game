import {createStarLayer} from "../utils/starUtils.js";

export class StarField {
    constructor(width, height) {
        // add extra so the stars can wrap nicely around the screen
        this.width = width + 50
        this.height = height + 50

        this.layers = []
        this.parallaxRates = [0.5, 0.3, 0.1]
        this.offsets = [[0,0], [0,0], [0,0]]
    }

    init() {
        this.layers = []
        // each layer has progressively more stars and is darker
        this.layers.push(createStarLayer(20, '#ddd', this.width, this.height))
        this.layers.push(createStarLayer(30, '#aaa', this.width, this.height))
        this.layers.push(createStarLayer(50, '#888', this.width, this.height))
    }

    /**
     * @param {Renderer} renderer
     * @param {Vector2} playerPosition
     */
    render(renderer, playerPosition) {
        let size = this.layers.length + 1
        for (let l = 0; l < this.layers.length; l++) {
            const rate = this.parallaxRates[l]
            const offsetX = playerPosition.x * rate
            const offsetY = playerPosition.y * rate
            this.layers[l].forEach(star => {
                const x = ((star[0] - offsetX) % this.width + this.width) % this.width
                const y = ((star[1] - offsetY) % this.height + this.height) % this.height
                renderer.fillRect(x, y, size, size, star[2])
            })
            size--
        }
    }
}