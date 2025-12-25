# TICKET-0015: HUD

## Status
[ ] Not Started

## Description
Create a proper heads-up display showing health bar, score, and wave information.

## Acceptance Criteria
- [ ] Health bar displayed (not just number)
- [ ] Health bar changes color based on health level (green > yellow > red)
- [ ] Score displayed prominently
- [ ] Wave number displayed (when wave system exists)
- [ ] HUD doesn't interfere with gameplay area

## Technical Notes

### Files to Create

**`src/ui/HUD.js`**
```javascript
export class HUD {
    constructor(renderer) {
        this.renderer = renderer;
    }

    render(game) {
        this.drawHealthBar(game.player);
        this.drawScore(game.score);
        this.drawWave(game.currentWave);
    }

    drawHealthBar(player) {
        const x = 10;
        const y = 10;
        const width = 200;
        const height = 20;
        const healthPercent = player.health / player.maxHealth;

        // Background
        this.renderer.drawRect(x, y, width, height, '#333333');

        // Health fill
        let color = '#4ecca3';  // Green
        if (healthPercent < 0.6) color = '#f1c40f';  // Yellow
        if (healthPercent < 0.3) color = '#e74c3c';  // Red

        this.renderer.drawRect(x, y, width * healthPercent, height, color);

        // Border
        this.renderer.ctx.strokeStyle = '#ffffff';
        this.renderer.ctx.strokeRect(x, y, width, height);
    }

    drawScore(score) {
        this.renderer.drawText(`Score: ${score}`, 10, 50, '20px Arial', '#ffffff');
    }

    drawWave(wave) {
        if (wave) {
            this.renderer.drawText(`Wave ${wave}`, 1180, 30, '24px Arial', '#ffffff');
        }
    }
}
```

### Game.js Integration

```javascript
import { HUD } from '../ui/HUD.js';

// In constructor:
this.hud = new HUD(this.renderer);

// In render(), after entities:
this.hud.render(this);
```

## Dependencies
- TICKET-0009: Player Health
- TICKET-0010: Score System

## Testing
- Health bar visible and accurate
- Bar color changes as health decreases
- Score updates in real-time
- HUD stays in fixed screen position
