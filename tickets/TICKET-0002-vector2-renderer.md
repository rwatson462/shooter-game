# TICKET-0002: Vector2 & Renderer

## Status
[x] Complete

## Description
Create the Vector2 math utility and Renderer canvas wrapper. These are the building blocks for positioning and drawing everything in the game.

## Acceptance Criteria
- [x] `Vector2` class with: constructor, add, subtract, multiply, magnitude, normalize
- [x] `Vector2.distance(a, b)` static method
- [x] `Renderer` class wrapping the canvas 2D context
- [x] `Renderer.clear(color)` fills screen with background color
- [x] `Renderer.drawCircle(x, y, radius, color)` - replaced with `drawPolygon()` for flexibility
- [x] `Renderer.drawRect(x, y, width, height, color)` draws filled rectangle
- [x] Test: manually draw some shapes on screen to verify renderer works

## Technical Notes

### Files to Create

**`src/utils/Vector2.js`**
```javascript
export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    subtract(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    multiply(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const mag = this.magnitude();
        if (mag > 0) {
            this.x /= mag;
            this.y /= mag;
        }
        return this;
    }

    static distance(a, b) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
```

**`src/core/Renderer.js`**
```javascript
export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
    }

    clear(color = '#1a1a2e') {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawCircle(x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    drawRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }
}
```

### Testing in main.js

```javascript
import { Renderer } from './core/Renderer.js';
import { Vector2 } from './utils/Vector2.js';

const canvas = document.getElementById('gameCanvas');
const renderer = new Renderer(canvas);

// Test Vector2
const a = new Vector2(100, 100);
const b = new Vector2(200, 150);
console.log('Distance:', Vector2.distance(a, b));

// Test Renderer
renderer.clear('#1a1a2e');
renderer.drawCircle(640, 360, 50, '#4ecca3');
renderer.drawRect(100, 100, 80, 80, '#e74c3c');
```

## Dependencies
- TICKET-0001: Project Setup

## Directory Structure
```
src/
├── core/
│   └── Renderer.js
├── utils/
│   └── Vector2.js
├── index.html
└── main.js
```
