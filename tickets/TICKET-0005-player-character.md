# TICKET-0005: Player Character

## Status
[ ] Not Started

## Description
Create the player character with WASD movement and mouse aiming. The player should be rendered as a simple shape (triangle or circle with direction indicator) that moves smoothly and rotates to face the mouse cursor.

## Acceptance Criteria
- [ ] `Entity` base class with position, velocity, rotation, radius, active flag
- [ ] `Player` class extending Entity
- [ ] Player moves with WASD or Arrow keys at 200 pixels/second
- [ ] Player rotates to face mouse cursor
- [ ] Player stays within screen bounds (can't move off-screen)
- [ ] Player rendered as a colored shape with clear facing direction
- [ ] Diagonal movement is normalized (not faster than cardinal)

## Technical Notes

### Files to Create

**`src/entities/Entity.js`**
```javascript
export class Entity {
    constructor(x, y) {
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(0, 0);
        this.rotation = 0;  // radians, 0 = facing right
        this.radius = 16;
        this.active = true;
    }

    update(deltaTime) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
    }

    render(renderer) { /* override */ }
}
```

**`src/entities/Player.js`**
```javascript
export class Player extends Entity {
    constructor(x, y) {
        super(x, y);
        this.speed = 200;
        this.radius = 20;
    }

    update(deltaTime, input, bounds) {
        // Build movement vector from input
        // Normalize diagonal movement
        // Apply velocity
        // Rotate toward mouse
        // Clamp to screen bounds
    }

    render(renderer) {
        // Draw triangle or circle with line showing direction
    }
}
```

### Movement Math

**Normalized diagonal:**
```javascript
const dir = new Vector2(0, 0);
if (input.isKeyHeld('KeyW')) dir.y -= 1;
if (input.isKeyHeld('KeyS')) dir.y += 1;
if (input.isKeyHeld('KeyA')) dir.x -= 1;
if (input.isKeyHeld('KeyD')) dir.x += 1;

dir.normalize();  // Makes diagonal same speed as cardinal
this.velocity = dir.multiply(this.speed);
```

**Face mouse:**
```javascript
const mouse = input.getMousePosition();
this.rotation = Math.atan2(
    mouse.y - this.position.y,
    mouse.x - this.position.x
);
```

**Screen bounds:**
```javascript
this.position.x = Math.max(this.radius, Math.min(bounds.width - this.radius, this.position.x));
this.position.y = Math.max(this.radius, Math.min(bounds.height - this.radius, this.position.y));
```

### Rendering a Triangle (facing right at rotation 0)
```javascript
ctx.save();
ctx.translate(this.position.x, this.position.y);
ctx.rotate(this.rotation);

ctx.beginPath();
ctx.moveTo(this.radius, 0);           // Tip (front)
ctx.lineTo(-this.radius, -this.radius * 0.6);  // Back left
ctx.lineTo(-this.radius, this.radius * 0.6);   // Back right
ctx.closePath();
ctx.fillStyle = '#4ecca3';
ctx.fill();

ctx.restore();
```

## Dependencies
- TICKET-0004: Game Loop & Game Class

## Testing
- Move in all 8 directions, verify consistent speed
- Move mouse around, player should always point at cursor
- Try to move off-screen in all directions, should be blocked
