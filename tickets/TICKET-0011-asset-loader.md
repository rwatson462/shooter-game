# TICKET-0011: Asset Loader

## Status
[ ] Not Started

## Description
Create a system to load and cache images for use as sprites. This is the foundation for all graphics work.

## Acceptance Criteria
- [ ] `AssetLoader` class that loads images
- [ ] `load(key, path)` method to queue an image
- [ ] `loadAll()` returns Promise that resolves when all images loaded
- [ ] `get(key)` retrieves a loaded image
- [ ] Error handling for failed loads
- [ ] Test: load a placeholder image and draw it

## Technical Notes

### Files to Create

**`src/core/AssetLoader.js`**
```javascript
export class AssetLoader {
    constructor() {
        this.images = new Map();
        this.toLoad = [];
    }

    load(key, path) {
        this.toLoad.push({ key, path });
        return this;
    }

    loadAll() {
        const promises = this.toLoad.map(({ key, path }) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    this.images.set(key, img);
                    resolve();
                };
                img.onerror = () => reject(new Error(`Failed to load: ${path}`));
                img.src = path;
            });
        });

        return Promise.all(promises);
    }

    get(key) {
        return this.images.get(key);
    }
}
```

### Usage in Game.js

```javascript
import { AssetLoader } from './AssetLoader.js';

// In constructor or init:
this.assets = new AssetLoader();
this.assets
    .load('player', 'assets/images/player.png')
    .load('enemy', 'assets/images/enemy.png');

// Before starting game:
await this.assets.loadAll();
this.gameLoop.start();
```

### Directory Setup
```
shooter/
├── assets/
│   └── images/
│       └── (sprites go here)
```

## Dependencies
- TICKET-0004: Game Loop & Game Class

## Testing
- Create a simple test image (colored square)
- Load it via AssetLoader
- Draw it using ctx.drawImage()
