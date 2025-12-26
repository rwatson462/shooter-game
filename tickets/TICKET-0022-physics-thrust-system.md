# TICKET-0022: Physics & Thrust System

## Status
[ ] Not Started

## Description
Refactor entity movement to use a proper physics model with forces, velocity, and mass. This enables recoil when firing, knockback when hit, and collision impulses.

## Acceptance Criteria
- [ ] Entities have `velocity` (Vector2), `mass`, and `acceleration`
- [ ] Movement uses: acceleration → velocity → position (integrated over delta)
- [ ] `applyForce(force)` method adds to acceleration (F = ma)
- [ ] Firing a bullet applies recoil force to the shooter
- [ ] Bullet impact applies knockback force to the target
- [ ] Entity-entity collisions apply separation impulses
- [ ] Friction/drag still applies to slow entities over time

## Technical Notes

### Physics Model
```javascript
class Entity {
    constructor() {
        this.position = new Vector2();
        this.velocity = new Vector2();
        this.acceleration = new Vector2();
        this.mass = 1;
        this.drag = 0.98; // velocity multiplier per frame
    }

    applyForce(force) {
        // F = ma, so a = F/m
        this.acceleration = this.acceleration.add(force.divide(this.mass));
    }

    update(delta) {
        // Apply acceleration to velocity
        this.velocity = this.velocity.add(this.acceleration.multiply(delta));

        // Apply drag
        this.velocity = this.velocity.multiply(this.drag);

        // Apply velocity to position
        this.position = this.position.add(this.velocity.multiply(delta));

        // Reset acceleration for next frame
        this.acceleration = new Vector2();
    }
}
```

### Recoil on Fire
```javascript
fire() {
    const bulletForce = 500;
    const recoilForce = bulletForce * 0.1; // 10% recoil

    // Bullet goes forward
    this.spawnBullet(this.direction.multiply(bulletForce));

    // Shooter pushed backward
    this.applyForce(this.direction.multiply(-recoilForce));
}
```

### Knockback on Hit
```javascript
// In collision system
if (bullet hits enemy) {
    const knockbackForce = bullet.direction.multiply(bullet.damage * 50);
    enemy.applyForce(knockbackForce);
}
```

### Collision Impulse
```javascript
// When two entities collide, push them apart
const normal = b.position.subtract(a.position).normalise();
const separationForce = 200;
a.applyForce(normal.multiply(-separationForce));
b.applyForce(normal.multiply(separationForce));
```

## Dependencies
- TICKET-0008: Collision System (needs collision detection first)

## Impact
This is a significant refactor touching Entity, Player, Enemy, Projectile, and collision handling. Consider doing this during a "polish" phase rather than blocking core gameplay.

## Testing
- Fire weapon while stationary - ship should drift backward slightly
- Get hit by enemy bullet - player should be pushed back
- Collide with enemy - both should bounce apart
- Heavy entities (high mass) should be harder to push
- Light entities should zoom around more
