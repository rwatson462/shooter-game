# TICKET-0013: Enemy Sprites

## Status
[ ] Not Started

## Description
Replace enemy wireframes with sprites. Different enemy types should have distinct appearances.

## Acceptance Criteria
- [ ] BasicEnemy sprite created/sourced
- [ ] Sprite loaded via AssetLoader
- [ ] Enemy renders sprite instead of colored circle
- [ ] Sprite rotates to face movement direction
- [ ] Easy to add new enemy sprites later

## Technical Notes

### Enemy.js / BasicEnemy.js Update

```javascript
render(renderer, assets) {
    const sprite = assets.get('enemy_basic');
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
- Size: 48x48 or 64x64 pixels
- Orientation: facing RIGHT at 0 rotation
- Format: PNG with transparency
- Visually distinct from player

### Future Enemy Types
When adding more enemy types, each gets its own sprite key:
- `enemy_basic` - standard chaser
- `enemy_fast` - smaller, sleeker
- `enemy_tank` - larger, bulkier
- `enemy_shooter` - has visible weapon

## Dependencies
- TICKET-0007: Basic Enemy
- TICKET-0011: Asset Loader

## Testing
- Enemies display sprites instead of circles
- Sprites rotate toward player as they chase
