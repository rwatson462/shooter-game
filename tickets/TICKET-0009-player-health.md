# TICKET-0009: Player Health & Damage

## Status
[x] Complete

## Description
Add health system to the player. Enemies damage the player on contact, with brief invincibility after taking damage.

## Acceptance Criteria
- [x] Player has `health` property (100)
- [x] Player has `takeDamage(amount)` method
- [x] Enemies damage player on contact
- [x] Collision pushes player away from enemy (prevents damage stacking)
- [x] Both player and enemy take damage on contact
- [x] Player deactivates when health reaches 0
- [x] Console log "Game Over" when player dies

## Technical Notes

### Player.js Updates

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

        if (this.invincibleTime > 0) {
            this.invincibleTime -= deltaTime;
        }
    }

    takeDamage(amount) {
        if (this.invincibleTime > 0) return;

        this.health -= amount;
        this.invincibleTime = 1.0;

        if (this.health <= 0) {
            this.health = 0;
            this.active = false;
        }
    }

    render(renderer) {
        // Flash when invincible
        if (this.invincibleTime > 0 && Math.floor(this.invincibleTime * 10) % 2 === 0) {
            return;
        }
        // ...existing render code...
    }
}
```

### CollisionSystem.js Addition

```javascript
checkEnemiesVsPlayer(game) {
    const player = game.player;
    if (!player.active || player.invincibleTime > 0) return;

    for (const enemy of game.enemies) {
        if (!enemy.active) continue;

        if (CollisionSystem.checkCollision(player, enemy)) {
            player.takeDamage(enemy.damage);
            break;
        }
    }
}

update(game) {
    this.checkBulletsVsEnemies(game);
    this.checkEnemiesVsPlayer(game);
}
```

### Game.js Addition

```javascript
update(deltaTime) {
    // ...existing code...

    if (!this.player.active) {
        console.log('Game Over!');
    }
}
```

## Dependencies
- TICKET-0008: Collision System

## Testing
- Let enemy touch player, health should decrease
- Player should flash during invincibility
- During flash, no additional damage taken
- When health hits 0, game over logged
