# TICKET-0016: Visual Effects

## Status
[ ] Not Started

## Description
Add juice to the game with particle effects, explosions, and screen shake.

## Acceptance Criteria
- [ ] Particle system for spawning/managing particles
- [ ] Explosion effect when enemies die
- [ ] Screen shake when player takes damage
- [ ] Particles fade out over time

## Technical Notes

### Files to Create

**`src/systems/ParticleSystem.js`**
```javascript
class Particle {
    constructor(x, y, vx, vy, color, life) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.life = life;
        this.maxLife = life;
        this.active = true;
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.life -= dt;
        if (this.life <= 0) this.active = false;
    }
}

export class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    emit(x, y, count, color) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 50 + Math.random() * 100;
            this.particles.push(new Particle(
                x, y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                color,
                0.5 + Math.random() * 0.5
            ));
        }
    }

    update(dt) {
        for (const p of this.particles) {
            p.update(dt);
        }
        this.particles = this.particles.filter(p => p.active);
    }

    render(renderer) {
        for (const p of this.particles) {
            const alpha = p.life / p.maxLife;
            const size = 3 * alpha;
            renderer.drawCircle(p.x, p.y, size, p.color);
        }
    }
}
```

### Screen Shake

```javascript
// In Renderer.js:
shake(intensity) {
    this.shakeAmount = intensity;
}

// In render start:
if (this.shakeAmount > 0) {
    const offsetX = (Math.random() - 0.5) * this.shakeAmount;
    const offsetY = (Math.random() - 0.5) * this.shakeAmount;
    this.ctx.translate(offsetX, offsetY);
    this.shakeAmount *= 0.9;  // Decay
}
```

### Usage
```javascript
// When enemy dies:
this.particleSystem.emit(enemy.position.x, enemy.position.y, 10, '#e74c3c');

// When player hit:
this.renderer.shake(10);
```

## Dependencies
- TICKET-0008: Collision System (for death/damage events)

## Testing
- Particles burst from dead enemies
- Screen shakes when player takes damage
- Particles fade and disappear
- Performance stays smooth with many particles
