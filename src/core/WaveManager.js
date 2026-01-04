
export class WaveManager {
    constructor() {
        this.init()

        this.timeout = 1000 // 1 second
    }

    init() {
        // reset all internal state
        this.wave = 1
        this.timer = 0
        this.active = false
    }

    getWave() {
        return this.wave
    }

    triggerNextWave() {
        this.active = true
    }

    nextWaveReady() {
        return this.timer >= this.timeout
    }

    resetWaveCounter() {
        this.active = false
        this.timer = 0
    }

    update(delta) {
        if (this.active) {
            this.timer += delta
        }

        if (this.timer >= this.timeout) {
            this.wave ++
            this.active = false
        }
    }
}