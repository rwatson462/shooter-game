# TICKET-0012: Player Sprite

## Status
[ ] Not Started

## Description
Replace the player wireframe with an actual sprite. The sprite should rotate to face the mouse cursor.

## Acceptance Criteria
- [ ] Player sprite image created/sourced (top-down ship or character)
- [ ] Sprite loaded via AssetLoader
- [ ] Player renders sprite instead of wireframe shape
- [ ] Sprite rotates correctly to face mouse
- [ ] Sprite centered on player position

## Technical Notes

### Renderer.js Addition

```javascript
drawSprite(image, x, y, width, height, rotation = 0) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    this.ctx.drawImage(image, -width / 2, -height / 2, width, height);
    this.ctx.restore();
}
```

### Player.js Update

```javascript
render(renderer, assets) {
    if (this.invincibleTime > 0 && Math.floor(this.invincibleTime * 10) % 2 === 0) {
        return;
    }

    const sprite = assets.get('player');
    renderer.drawSprite(
        sprite,
        this.position.x,
        this.position.y,
        this.radius * 2,
        this.radius * 2,
        this.rotation
    );
}
```

### Sprite Requirements
- Size: 64x64 pixels recommended
- Orientation: facing RIGHT at 0 rotation
- Format: PNG with transparency
- Style: top-down view

## Dependencies
- TICKET-0005: Player Character
- TICKET-0011: Asset Loader

## Testing
- Player displays sprite instead of shape
- Sprite rotates smoothly with mouse movement
- Invincibility flash still works
