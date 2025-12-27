# TICKET-0010: Score System

## Status
[~] In Progress

## Description
Track and display the player's score. Killing enemies awards points.

## Acceptance Criteria
- [ ] Game tracks `score` property
- [ ] `addScore(points)` method on Game
- [ ] Killing enemies awards their `scoreValue`
- [ ] Score displayed on screen (simple text for now)
- [ ] Score persists until game over

## Technical Notes

### Game.js Updates

```javascript
constructor(canvas) {
    // ...existing code...
    this.score = 0;
}

addScore(points) {
    this.score += points;
}

render() {
    // ...existing entity rendering...

    // Draw score (simple text)
    this.renderer.drawText(`Score: ${this.score}`, 10, 30, '24px Arial', '#ffffff');
}
```

### Renderer.js Addition

```javascript
drawText(text, x, y, font, color) {
    this.ctx.font = font;
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y);
}
```

### CollisionSystem.js Update

```javascript
checkBulletsVsEnemies(game) {
    for (const bullet of game.bullets) {
        if (!bullet.active || bullet.owner !== 'player') continue;

        for (const enemy of game.enemies) {
            if (!enemy.active) continue;

            if (CollisionSystem.checkCollision(bullet, enemy)) {
                enemy.active = false;
                bullet.active = false;
                game.addScore(enemy.scoreValue);  // Award points
                break;
            }
        }
    }
}
```

## Dependencies
- TICKET-0008: Collision System

## Testing
- Kill enemy, score increases by enemy's scoreValue (100 for BasicEnemy)
- Score displays in top-left corner
- Score accumulates across multiple kills
