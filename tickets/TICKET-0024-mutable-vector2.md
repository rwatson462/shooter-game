# TICKET-0024: Mutable Vector2 Operations

## Status
[ ] Not Started

## Description
The current Vector2 class is immutable - every operation returns a new instance. This is safe but creates GC pressure with many entities. Add mutable variants for performance-critical code paths.

## Acceptance Criteria
- [ ] Profile current performance to establish baseline
- [ ] Add mutable methods (e.g., `addMut`, `multiplyMut`, `normaliseMut`)
- [ ] Mutable methods modify in place and return `this` for chaining
- [ ] Original immutable methods remain for safety in non-critical code
- [ ] Update hot paths (entity movement, collision) to use mutable variants
- [ ] Measure improvement

## Technical Notes

### Current (Immutable)
```javascript
add(other) {
    return new Vector2(this.x + other.x, this.y + other.y)
}
```

### Proposed (Mutable Variants)
```javascript
// Mutable version - modifies in place
addMut(other) {
    this.x += other.x
    this.y += other.y
    return this  // for chaining
}

// Or use a naming convention like:
addInPlace(other) { ... }
// Or:
iadd(other) { ... }  // Python style
```

### Usage
```javascript
// Safe (allocates)
const newPos = this.position.add(velocity)

// Fast (mutates)
this.position.addMut(velocity)

// Chaining
this.position.addMut(velocity).multiplyMut(deltaTime)
```

### Alternative: Object Pooling
If mutable methods aren't enough, consider a vector pool:
```javascript
const tempVec = VectorPool.get()
tempVec.set(a.x - b.x, a.y - b.y)
// use tempVec...
VectorPool.release(tempVec)
```

## Dependencies
- Should profile with TICKET-0021 (Wave System) complete to have meaningful entity counts

## Notes
- Premature optimization warning: only do this if profiling shows GC is a problem
- Chrome DevTools Performance tab can show GC pauses
- Look for yellow "Minor GC" bars during gameplay
