# TICKET-0018: Camera System

## Status
[ ] Backlog

## Description
Implement a camera that follows the player, allowing for an infinite/larger world. The player stays centered on screen while the world moves around them.

## Why
Currently the game world is fixed to screen bounds. A camera system enables:
- Larger or infinite play areas
- More interesting level designs
- Scrolling/panning effects
- Screen shake (camera offset)

## Acceptance Criteria
- [ ] Camera class with position (Vector2)
- [ ] Camera follows player (centered or with smoothing/lag)
- [ ] All entity rendering offset by camera position
- [ ] Enemy spawning relative to camera viewport
- [ ] Optional: camera bounds (soft or hard limits on how far it can go)
- [ ] Optional: smooth follow with lerp/easing

## Technical Notes

### Camera Class
```javascript
export class Camera {
    constructor(x, y, width, height) {
        this.position = new Vector2(x, y);
        this.width = width;
        this.height = height;
    }

    follow(target) {
        // Center on target
        this.position.x = target.position.x - this.width / 2;
        this.position.y = target.position.y - this.height / 2;
    }

    // Convert world position to screen position
    worldToScreen(worldPos) {
        return new Vector2(
            worldPos.x - this.position.x,
            worldPos.y - this.position.y
        );
    }
}
```

### Rendering with Camera
```javascript
render() {
    this.camera.follow(this.player);

    // Render entities at screen position
    for (const enemy of this.enemies) {
        const screenPos = this.camera.worldToScreen(enemy.position);
        enemy.renderAt(renderer, screenPos);
    }
}
```

### Enemy Spawning
Spawn at edges of viewport, not world:
```javascript
spawnEnemyAtEdge() {
    const cam = this.camera;
    // Spawn just outside visible area
    const margin = 50;
    // ... spawn relative to cam.position and cam.width/height
}
```

### Smooth Follow (Optional)
```javascript
follow(target, smoothing = 0.1) {
    const targetX = target.position.x - this.width / 2;
    const targetY = target.position.y - this.height / 2;

    // Lerp toward target
    this.position.x += (targetX - this.position.x) * smoothing;
    this.position.y += (targetY - this.position.y) * smoothing;
}
```

## Dependencies
- TICKET-0005: Player Character
- TICKET-0007: Basic Enemy (for viewport-relative spawning)

## When to Implement
- After basic gameplay loop is working (shooting, enemies, collision)
- When we want larger levels or infinite survival mode
