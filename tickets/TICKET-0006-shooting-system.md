# TICKET-0006: Shooting System

## Status
[~] In Progress

## Description
Add the ability for the player to shoot bullets. Clicking the mouse fires a bullet in the direction the player is facing. Implement a basic weapon system with fire rate limiting.

## Acceptance Criteria
- [ ] `Bullet` class extending Entity with speed, damage, owner
- [ ] Bullets spawn at player position and travel in facing direction
- [ ] Left mouse click fires a bullet
- [ ] Fire rate limited (can't hold mouse to spam - ~3 shots/second for pistol)
- [ ] Bullets despawn when leaving screen bounds
- [ ] Bullets rendered as small colored shapes
- [ ] Game maintains array of active bullets, updates and renders them

## Technical Notes

### Files to Create

**`src/entities/Bullet.js`**
```javascript
export class Bullet extends Entity {
    constructor(x, y, rotation, speed = 500, damage = 1, owner = 'player') {
        super(x, y);
        this.rotation = rotation;
        this.speed = speed;
        this.damage = damage;
        this.owner = owner;  // 'player' or 'enemy'
        this.radius = 5;

        // Set velocity based on rotation
        this.velocity.x = Math.cos(rotation) * speed;
        this.velocity.y = Math.sin(rotation) * speed;
    }

    update(deltaTime, bounds) {
        super.update(deltaTime);

        // Despawn if off screen
        if (this.isOffScreen(bounds)) {
            this.active = false;
        }
    }

    isOffScreen(bounds) {
        return this.position.x < -this.radius ||
               this.position.x > bounds.width + this.radius ||
               this.position.y < -this.radius ||
               this.position.y > bounds.height + this.radius;
    }

    render(renderer) {
        renderer.drawCircle(this.position.x, this.position.y, this.radius, '#ffff00');
    }
}
```

**`src/weapons/Weapon.js`** (optional, can be inline for now)
```javascript
export class Weapon {
    constructor(fireRate = 3) {
        this.fireRate = fireRate;  // shots per second
        this.cooldown = 0;
    }

    canFire() {
        return this.cooldown <= 0;
    }

    fire() {
        this.cooldown = 1 / this.fireRate;
    }

    update(deltaTime) {
        if (this.cooldown > 0) {
            this.cooldown -= deltaTime;
        }
    }
}
```

### Integration with Game.js

```javascript
class Game {
    constructor() {
        // ...
        this.bullets = [];
    }

    spawnBullet(x, y, rotation) {
        this.bullets.push(new Bullet(x, y, rotation));
    }

    update(deltaTime) {
        // Update player (handles shooting input)
        this.player.update(deltaTime, this.input, this);

        // Update bullets
        for (const bullet of this.bullets) {
            bullet.update(deltaTime, this.bounds);
        }

        // Remove inactive bullets
        this.bullets = this.bullets.filter(b => b.active);
    }

    render() {
        this.renderer.clear();

        for (const bullet of this.bullets) {
            bullet.render(this.renderer);
        }

        this.player.render(this.renderer);
    }
}
```

### Player Shooting (in Player.js)

```javascript
update(deltaTime, input, game) {
    // ... movement code ...

    this.weapon.update(deltaTime);

    if (input.isMouseButtonDown(0) && this.weapon.canFire()) {
        game.spawnBullet(this.position.x, this.position.y, this.rotation);
        this.weapon.fire();
    }
}
```

## Dependencies
- TICKET-0005: Player Character

## Testing
- Click to fire, bullet should travel toward mouse
- Hold mouse button, should fire at limited rate (not every frame)
- Bullets should disappear when leaving screen
- Fire in all directions, verify bullet direction matches player facing
