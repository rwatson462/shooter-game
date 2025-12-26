# TICKET-0007: Basic Enemy

## Status
[x] Complete

## Description
Create a basic enemy that spawns at the edge of the screen and chases the player. This is the foundation for all enemy types.

## Acceptance Criteria
- [x] `Enemy` base class extending Entity with speed
- [x] Enemy chases player (moves toward them)
- [x] Enemies rotate to face their movement direction
- [x] Enemies rendered as distinct colored shapes (different from player)
- [ ] ~~BasicEnemy subclass~~ - deferred (may use behavior trees instead)
- [ ] ~~Edge spawning~~ - deferred to Wave System (TICKET-0021)
- [ ] ~~Enemies array~~ - deferred to Wave System (TICKET-0021)
- [ ] ~~health, damage, scoreValue~~ - deferred to Collision/Health tickets

## Technical Notes

### Files to Create

**`src/entities/Enemy.js`**
```javascript
export class Enemy extends Entity {
    constructor(x, y) {
        super(x, y);
        this.health = 1;
        this.maxHealth = 1;
        this.damage = 10;      // Damage dealt to player on contact
        this.speed = 80;
        this.scoreValue = 100;
    }

    update(deltaTime, player) {
        // Override in subclasses for different behaviors
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.active = false;
        }
    }

    render(renderer) {
        // Override in subclasses
    }
}
```

**`src/enemies/BasicEnemy.js`**
```javascript
export class BasicEnemy extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.speed = 80;
        this.radius = 15;
        this.health = 1;
        this.scoreValue = 100;
    }

    update(deltaTime, player) {
        // Calculate direction to player
        const dx = player.position.x - this.position.x;
        const dy = player.position.y - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            this.velocity.x = (dx / distance) * this.speed;
            this.velocity.y = (dy / distance) * this.speed;
            this.rotation = Math.atan2(dy, dx);
        }

        super.update(deltaTime);
    }

    render(renderer) {
        // Red circle or simple shape
        renderer.drawCircle(
            this.position.x,
            this.position.y,
            this.radius,
            '#e74c3c'
        );
    }
}
```

### Spawning at Screen Edge

```javascript
// In Game.js or a spawn utility
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

    this.enemies.push(new BasicEnemy(x, y));
}
```

### Integration with Game.js

```javascript
class Game {
    constructor() {
        // ...
        this.enemies = [];
    }

    update(deltaTime) {
        // ...existing code...

        // Update enemies
        for (const enemy of this.enemies) {
            enemy.update(deltaTime, this.player);
        }

        // Remove dead enemies
        this.enemies = this.enemies.filter(e => e.active);
    }

    render() {
        // ...
        for (const enemy of this.enemies) {
            enemy.render(this.renderer);
        }
        // Render player last (on top)
    }
}
```

### Testing Helper
Add temporary keyboard shortcut to spawn enemies:
```javascript
if (input.isKeyPressed('KeyE')) {
    this.spawnEnemyAtEdge();
}
```

## Dependencies
- TICKET-0005: Player Character

## Testing
- Press E (or your test key) to spawn enemy
- Enemy should appear at screen edge
- Enemy should move toward player
- Enemy should rotate to face movement direction
- Spawn multiple enemies, all should chase player independently
