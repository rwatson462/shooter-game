# TICKET-0020: Game States

## Status
[~] In Progress

## Description
Implement a state machine to manage game flow: title screen, playing, paused, and game over. This provides the structure for a proper game loop with win/lose conditions.

## Acceptance Criteria
- [ ] `GameState` enum or constants (TITLE, PLAYING, PAUSED, GAME_OVER)
- [ ] Title screen with "Press SPACE to Start" or similar
- [ ] Transition from TITLE → PLAYING initializes game (spawns player, starts waves)
- [ ] ESC key pauses/unpauses during PLAYING
- [ ] Paused state shows overlay, freezes gameplay
- [ ] Game Over triggers when player health reaches 0
- [ ] Game Over screen shows final score, "Press SPACE to Restart"
- [ ] Restart returns to TITLE or starts new game

## Technical Notes

### State Machine Pattern
```javascript
// In Game.js
const GameState = {
    TITLE: 'title',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'gameOver'
};

class Game {
    constructor() {
        this.state = GameState.TITLE;
    }

    update(delta) {
        switch (this.state) {
            case GameState.TITLE:
                this.updateTitle(delta);
                break;
            case GameState.PLAYING:
                this.updatePlaying(delta);
                break;
            case GameState.PAUSED:
                this.updatePaused(delta);
                break;
            case GameState.GAME_OVER:
                this.updateGameOver(delta);
                break;
        }
    }

    render() {
        switch (this.state) {
            case GameState.TITLE:
                this.renderTitle();
                break;
            // ... etc
        }
    }
}
```

### State Transitions
```
TITLE --[Space]--> PLAYING
PLAYING --[Esc]--> PAUSED
PAUSED --[Esc]--> PLAYING
PLAYING --[player dies]--> GAME_OVER
GAME_OVER --[Space]--> TITLE
```

## Dependencies
- TICKET-0009: Player Health & Damage (need health for game over condition)
- TICKET-0010: Score System (need score for game over screen)

## Testing
- Game starts on title screen
- Space starts the game
- ESC pauses and unpauses
- When player dies, game over screen appears
- Can restart from game over
