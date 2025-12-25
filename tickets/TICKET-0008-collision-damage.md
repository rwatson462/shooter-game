# TICKET-0008: Collision & Damage

## Status
[ ] Not Started

## Description
Implement collision detection between game entities and a health/damage system. Bullets kill enemies, enemies damage the player on contact.

## Acceptance Criteria
- [ ] Circle-circle collision detection working
- [ ] Player bullets destroy enemies on hit
- [ ] Enemies damage player on contact
- [ ] Player has health (100 HP) and can die
- [ ] Brief invincibility after player takes damage (~1 second)
- [ ] Visual feedback when player is invincible (flashing/transparent)
- [ ] Score increases when enemies die
- [ ] Game tracks score
- [ ] Console log or simple display shows health and score

## Technical Notes

### Files to Create

**`src/systems/CollisionSystem.js`**
```javascript
export class CollisionSystem {
    // Check if two entities are colliding (circle collision)
    static checkCollision(a, b) {
        const dx = a.position.x - b.position.x;
        const dy = a.position.y - b.position.y;
        const distanceSquared = dx * dx + dy * dy;
        const radiiSum = a.radius + b.radius;
        return distanceSquared < radiiSum * radiiSum;
    }

    update(game) {
        this.checkBulletsVsEnemies(game);
        this.checkEnemiesVsPlayer(game);
    }

    checkBulletsVsEnemies(game) {
        for (const bullet of game.bullets) {
            if (!bullet.active || bullet.owner !== 'player') continue;

            for (const enemy of game.enemies) {
                if (!enemy.active) continue;

                if (CollisionSystem.checkCollision(bullet, enemy)) {
                    enemy.takeDamage(bullet.damage);
                    bullet.active = false;

                    if (!enemy.active) {
                        game.addScore(enemy.scoreValue);
                    }
                    break;  // Bullet can only hit one enemy
                }
            }
        }
    }

    checkEnemiesVsPlayer(game) {
        const player = game.player;
        if (player.invincibleTime > 0) return;

        for (const enemy of game.enemies) {
            if (!enemy.active) continue;

            if (CollisionSystem.checkCollision(player, enemy)) {
                player.takeDamage(enemy.damage);
                player.invincibleTime = 1.0;  // 1 second invincibility
                break;  // Only take damage from one enemy per frame
            }
        }
    }
}
```

### Player Health Updates (in Player.js)

```javascript
export class Player extends Entity {
    constructor(x, y) {
        super(x, y);
        // ...existing code...
        this.health = 100;
        this.maxHealth = 100;
        this.invincibleTime = 0;
    }

    update(deltaTime, input, game) {
        // ...existing code...

        // Tick down invincibility
        if (this.invincibleTime > 0) {
            this.invincibleTime -= deltaTime;
        }
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.active = false;
            // Game over will be handled by Game.js
        }
    }

    render(renderer) {
        // Flash when invincible
        if (this.invincibleTime > 0 && Math.floor(this.invincibleTime * 10) % 2 === 0) {
            return;  // Skip rendering every other frame for flash effect
        }

        // ...existing render code...
    }
}
```

### Game.js Integration

```javascript
class Game {
    constructor() {
        // ...
        this.collisionSystem = new CollisionSystem();
        this.score = 0;
    }

    addScore(points) {
        this.score += points;
        console.log('Score:', this.score);  // Temporary, HUD comes later
    }

    update(deltaTime) {
        // ...update player, bullets, enemies...

        // Check collisions
        this.collisionSystem.update(this);

        // Check game over
        if (!this.player.active) {
            console.log('Game Over! Final Score:', this.score);
            // Full game over handling comes in TICKET-09
        }

        // ...cleanup inactive entities...
    }
}
```

### Why Circle Collision?

Circle collision is simple and fast:
```javascript
// Instead of this (slower):
const distance = Math.sqrt(dx*dx + dy*dy);
return distance < a.radius + b.radius;

// Use this (faster, no sqrt):
const distanceSquared = dx*dx + dy*dy;
const radiiSum = a.radius + b.radius;
return distanceSquared < radiiSum * radiiSum;
```

## Dependencies
- TICKET-0006: Shooting System
- TICKET-0007: Basic Enemy

## Testing
- Shoot an enemy, it should disappear and score should increase
- Let enemy touch player, player should take damage and flash
- During flash, enemies shouldn't deal additional damage
- Reduce player health to 0, should trigger game over log
- Verify bullets pass through dead enemies
