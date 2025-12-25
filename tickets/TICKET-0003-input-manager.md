# TICKET-0003: Input Manager

## Status
[ ] Not Started

## Description
Create the InputManager to track keyboard and mouse state. Uses a polling approach - check input state each frame rather than reacting to events directly.

## Acceptance Criteria
- [ ] `InputManager` class that listens for keyboard and mouse events
- [ ] `isKeyHeld(code)` returns true while key is pressed
- [ ] `isKeyPressed(code)` returns true only on the first frame key is pressed
- [ ] `getMousePosition()` returns {x, y} relative to canvas
- [ ] `isMouseButtonDown(button)` returns true while mouse button is held
- [ ] `endFrame()` method to reset per-frame state
- [ ] Test: log key presses and mouse position to console

## Technical Notes

### Files to Create

**`src/core/InputManager.js`**
```javascript
export class InputManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.keys = {};           // Currently held keys
        this.keysPressed = {};    // Just pressed this frame
        this.mouse = { x: 0, y: 0 };
        this.mouseButtons = {};

        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
        canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
    }

    onKeyDown(e) {
        if (!this.keys[e.code]) {
            this.keysPressed[e.code] = true;
        }
        this.keys[e.code] = true;
    }

    onKeyUp(e) {
        this.keys[e.code] = false;
    }

    onMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }

    onMouseDown(e) {
        this.mouseButtons[e.button] = true;
    }

    onMouseUp(e) {
        this.mouseButtons[e.button] = false;
    }

    isKeyHeld(code) {
        return !!this.keys[code];
    }

    isKeyPressed(code) {
        return !!this.keysPressed[code];
    }

    getMousePosition() {
        return { x: this.mouse.x, y: this.mouse.y };
    }

    isMouseButtonDown(button) {
        return !!this.mouseButtons[button];
    }

    endFrame() {
        this.keysPressed = {};
    }
}
```

### Key Codes
Use `event.code` not `event.key`:
- `KeyW`, `KeyA`, `KeyS`, `KeyD` for WASD
- `ArrowUp`, `ArrowLeft`, etc. for arrows
- `Space`, `Enter`, `Escape`

### Mouse Buttons
- `0` = Left click
- `1` = Middle click
- `2` = Right click

### Testing in main.js
```javascript
import { InputManager } from './core/InputManager.js';

const canvas = document.getElementById('gameCanvas');
const input = new InputManager(canvas);

function testLoop() {
    if (input.isKeyHeld('KeyW')) console.log('W held');
    if (input.isKeyPressed('Space')) console.log('Space pressed!');
    if (input.isMouseButtonDown(0)) {
        const pos = input.getMousePosition();
        console.log('Click at', pos.x, pos.y);
    }

    input.endFrame();
    requestAnimationFrame(testLoop);
}

testLoop();
```

## Dependencies
- TICKET-0001: Project Setup

## Directory Structure
```
src/
├── core/
│   ├── Renderer.js
│   └── InputManager.js
├── utils/
│   └── Vector2.js
└── ...
```
