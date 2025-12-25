# TICKET-0004: Game Loop & Game Class

## Status
[x] Not Started

## Description
Create the fixed-timestep game loop and the Game class that ties all systems together. This establishes the update/render cycle that runs the game.

## Acceptance Criteria
- [ ] `GameLoop` class with fixed timestep targeting 60 FPS
- [ ] Loop calls `update(deltaTime)` with consistent time step (in seconds)
- [x] Loop calls `render()` every frame
- [x] `Game` class initializes Renderer and InputManager
- [x] Game clears and redraws each frame
- [x] `start()` and `stop()` methods on GameLoop
- [ ] Console log shows loop is running (e.g., log every 60 frames)

## Technical Notes

### Files to Create

**`src/core/GameLoop.js`**
```javascript
export class GameLoop {
    constructor(updateFn, renderFn) {
        this.update = updateFn;
        this.render = renderFn;
        this.running = false;
        this.lastTime = 0;
        this.accumulator = 0;
        this.fixedDeltaTime = 1 / 60;  // 60 FPS in seconds
    }

    start() {
        this.running = true;
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.tick(t));
    }

    stop() {
        this.running = false;
    }

    tick(currentTime) {
        if (!this.running) return;

        const deltaTime = (currentTime - this.lastTime) / 1000;  // Convert to seconds
        this.lastTime = currentTime;
        this.accumulator += deltaTime;

        // Fixed timestep updates
        while (this.accumulator >= this.fixedDeltaTime) {
            this.update(this.fixedDeltaTime);
            this.accumulator -= this.fixedDeltaTime;
        }

        this.render();
        requestAnimationFrame((t) => this.tick(t));
    }
}
```

**`src/core/Game.js`**
```javascript
import { GameLoop } from './GameLoop.js';
import { Renderer } from './Renderer.js';
import { InputManager } from './InputManager.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.renderer = new Renderer(canvas);
        this.input = new InputManager(canvas);
        this.gameLoop = new GameLoop(
            (dt) => this.update(dt),
            () => this.render()
        );

        this.frameCount = 0;
    }

    start() {
        this.gameLoop.start();
    }

    update(deltaTime) {
        this.frameCount++;

        // Log every second (60 frames)
        if (this.frameCount % 60 === 0) {
            console.log('Running... frame', this.frameCount);
        }

        // Placeholder: will add player/enemy updates here

        this.input.endFrame();
    }

    render() {
        this.renderer.clear('#1a1a2e');

        // Placeholder: will add entity rendering here
        // Draw a test circle to prove rendering works
        this.renderer.drawCircle(640, 360, 30, '#4ecca3');
    }
}
```

### Update main.js

```javascript
import { Game } from './core/Game.js';

const canvas = document.getElementById('gameCanvas');
const game = new Game(canvas);
game.start();
```

### Why Fixed Timestep?

**Problem:** `requestAnimationFrame` timing varies (16ms, 17ms, etc.)

**Solution:** Accumulate time and update in fixed increments:
- Physics/logic always see the same deltaTime (1/60 second)
- Game behaves identically regardless of frame rate
- Rendering happens as fast as possible

### Verify It's Working
- Console should log "Running... frame 60" every second
- Green circle should appear on screen
- No jitter or stuttering

## Dependencies
- TICKET-0002: Vector2 & Renderer
- TICKET-0003: Input Manager

## Directory Structure
```
src/
├── core/
│   ├── Game.js
│   ├── GameLoop.js
│   ├── Renderer.js
│   └── InputManager.js
├── utils/
│   └── Vector2.js
├── index.html
└── main.js
```
