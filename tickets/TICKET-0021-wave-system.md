# TICKET-0021: Wave System

## Status
[ ] Not Started

## Description
Implement a wave-based enemy spawning system. Enemies spawn at screen edges in waves of increasing difficulty. Each wave must be cleared before the next begins.

## Acceptance Criteria
- [ ] Game maintains `enemies[]` array
- [ ] `WaveManager` or similar tracks current wave number
- [ ] Enemies spawn at random positions along screen edges
- [ ] Wave starts with X enemies (scaling with wave number)
- [ ] "Wave X" announcement when wave starts
- [ ] Next wave triggers when all enemies are dead
- [ ] Brief pause between waves
- [ ] Difficulty scales (more enemies, faster, etc.)

## Technical Notes

### Edge Spawning
```javascript
spawnEnemyAtEdge() {
    const side = Math.floor(Math.random() * 4);
    let x, y;
    const margin = 20;

    switch (side) {
        case 0: // Top
            x = Math.random() * this.width;
            y = -margin;
            break;
        case 1: // Right
            x = this.width + margin;
            y = Math.random() * this.height;
            break;
        case 2: // Bottom
            x = Math.random() * this.width;
            y = this.height + margin;
            break;
        case 3: // Left
            x = -margin;
            y = Math.random() * this.height;
            break;
    }

    this.enemies.push(new Enemy(x, y));
}
```

### Wave Configuration
```javascript
class WaveManager {
    constructor() {
        this.waveNumber = 0;
        this.enemiesRemaining = 0;
        this.betweenWaves = false;
        this.betweenWaveTimer = 0;
    }

    getEnemyCount(waveNumber) {
        // Simple scaling: 3 + 2 per wave
        return 3 + (waveNumber * 2);
    }

    startWave(waveNumber) {
        this.waveNumber = waveNumber;
        this.enemiesRemaining = this.getEnemyCount(waveNumber);
        // Spawn enemies...
    }

    onEnemyDeath() {
        this.enemiesRemaining--;
        if (this.enemiesRemaining <= 0) {
            this.betweenWaves = true;
            this.betweenWaveTimer = 2; // 2 second pause
        }
    }
}
```

## Dependencies
- TICKET-0007: Basic Enemy (complete)
- TICKET-0008: Collision System (enemies need to be killable)
- TICKET-0020: Game States (waves start when game starts)

## Testing
- Start game, wave 1 begins with enemies spawning at edges
- Kill all enemies, brief pause, wave 2 starts
- Wave 2 has more enemies than wave 1
- Wave counter visible on HUD
