# TICKET-0014: Projectile Graphics

## Status
[ ] Not Started

## Description
Add graphics for bullets and projectiles. Include basic muzzle flash effect when firing.

## Acceptance Criteria
- [ ] Bullet sprite created/sourced
- [ ] Bullets render as sprites instead of circles
- [ ] Bullet sprite oriented in travel direction
- [ ] Optional: muzzle flash effect when firing

## Technical Notes

### Bullet.js Update

```javascript
render(renderer, assets) {
    const sprite = assets.get('bullet_player');
    renderer.drawSprite(
        sprite,
        this.position.x,
        this.position.y,
        this.radius * 2,
        this.radius * 4,  // Elongated bullet
        this.rotation
    );
}
```

### Sprite Requirements
- Bullet: ~8x16 pixels, elongated
- Orientation: pointing RIGHT at 0 rotation
- Format: PNG with transparency
- Player bullets: yellow/green
- Enemy bullets (future): red/orange

### Muzzle Flash (Optional)
Simple approach - draw a bright circle at gun position for 1-2 frames:
```javascript
// In Player, when firing:
this.muzzleFlashTime = 0.05;  // 50ms

// In Player render:
if (this.muzzleFlashTime > 0) {
    renderer.drawCircle(gunX, gunY, 8, '#ffff00');
}
```

## Dependencies
- TICKET-0006: Shooting System
- TICKET-0011: Asset Loader

## Testing
- Bullets display as sprites
- Bullets oriented correctly in flight direction
- Muzzle flash visible briefly when shooting
