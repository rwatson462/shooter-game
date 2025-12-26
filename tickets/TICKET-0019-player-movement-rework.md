# TICKET-0019: Player Movement Rework

## Status
[ ] Not Started

## Description
Rework player movement controls from mouse-aim to keyboard-based turning. This gives more traditional "tank controls" that may feel more responsive.

## Current Controls
- W/S: Move forward/backward along facing direction
- A/D: Strafe left/right
- Mouse: Player faces mouse cursor

## New Controls
- W/S: Accelerate forward / Brake (reverse)
- A/D: Turn left / Turn right (rotation)
- Q/E: Strafe left / Strafe right
- Mouse: Removed from movement (shooting direction TBD)

## Acceptance Criteria
- [ ] W accelerates player forward (in facing direction)
- [ ] S brakes/reverses the player
- [ ] A/D rotates the player left/right at a defined turn speed
- [ ] Q/E strafe perpendicular to facing direction
- [ ] Mouse no longer affects player rotation
- [ ] Existing friction/deceleration still applies
- [ ] Turn speed feels responsive (not too slow, not instant)

## Technical Notes

### Changes to Entity.js / Player.js
- Add `turnSpeed` property (radians per second)
- Add `turnLeft()` and `turnRight()` methods that modify rotation
- Update `handleUserInput()` to use new key mappings
- Remove `pointAt()` call for mouse position

### Rotation Math
```javascript
// In update, given turnSpeed in radians/sec:
turnLeft() {
    this.rotation -= this.turnSpeed * delta;
}

turnRight() {
    this.rotation += this.turnSpeed * delta;
}

// Direction vector from rotation:
this.direction = new Vector2(Math.cos(this.rotation), Math.sin(this.rotation));
```

## Dependencies
- TICKET-0005: Player Character (complete)

## Open Questions
- Should shooting still fire toward mouse, or fire in facing direction?
