# TICKET-0008: Collision System

## Status
[ ] Not Started

## Description
Implement circle-based collision detection between game entities. Bullets should destroy enemies on hit.

## Acceptance Criteria
- [ ] `CollisionSystem` class with static `checkCollision(a, b)` method
- [ ] Circle-circle collision detection (compare distance vs radii sum)
- [ ] System checks player bullets against enemies each frame
- [ ] Bullets deactivate when hitting an enemy
- [ ] Enemies deactivate when hit (health system comes later)
- [ ] Collision system integrated into Game update loop

## Technical Notes

### Files to Create

**`src/systems/CollisionSystem.js`**
```javascript
export class CollisionSystem {
    static checkCollision(a, b) {
        const dx = a.position.x - b.position.x;
        const dy = a.position.y - b.position.y;
        const distanceSquared = dx * dx + dy * dy;
        const radiiSum = a.radius + b.radius;
        return distanceSquared < radiiSum * radiiSum;
    }

    update(game) {
        this.checkBulletsVsEnemies(game);
    }

    checkBulletsVsEnemies(game) {
        for (const bullet of game.bullets) {
            if (!bullet.active || bullet.owner !== 'player') continue;

            for (const enemy of game.enemies) {
                if (!enemy.active) continue;

                if (CollisionSystem.checkCollision(bullet, enemy)) {
                    enemy.active = false;  // Simple kill for now
                    bullet.active = false;
                    break;
                }
            }
        }
    }
}
```

### Game.js Integration

```javascript
import { CollisionSystem } from '../systems/CollisionSystem.js';

// In constructor:
this.collisionSystem = new CollisionSystem();

// In update():
this.collisionSystem.update(this);
```

## Dependencies
- TICKET-0006: Shooting System
- TICKET-0007: Basic Enemy

## Testing
- Shoot an enemy, both bullet and enemy should disappear
- Bullets that miss should continue off-screen
- Multiple enemies can be shot independently
