# TICKET-0017: Fixed Timestep Game Loop

## Status
[ ] Backlog

## Description
Refactor the game loop to use fixed timestep for physics updates. This ensures consistent game behavior regardless of frame rate fluctuations.

## Why
Currently using variable timestep - if a frame takes longer, entities move further. Fixed timestep decouples physics from frame rate.

## Acceptance Criteria
- [ ] Accumulator-based fixed timestep loop
- [ ] Physics updates always receive consistent deltaTime (1/60 second)
- [ ] Rendering still happens every frame
- [ ] Game feels smooth even during frame rate drops

## Technical Notes

```javascript
const FIXED_DT = 1/60;
let accumulator = 0;

function tick(timestamp) {
    const frameTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    accumulator += frameTime;

    // Fixed timestep updates
    while (accumulator >= FIXED_DT) {
        update(FIXED_DT);
        accumulator -= FIXED_DT;
    }

    render();
    requestAnimationFrame(tick);
}
```

## When to Implement
- If we notice physics inconsistencies (bullets moving different distances)
- If game feels different at different frame rates
- Before adding complex physics or multiplayer

## Dependencies
- TICKET-0004: Game Loop & Game Class
