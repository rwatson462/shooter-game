# Top-Down Wave Survival Shooter

## Project Overview
A hand-built top-down wave survival shooter using HTML5 Canvas and Electron. No frameworks - everything built from scratch.

- **Resolution:** 1280x720
- **Tech Stack:** HTML5 Canvas + Electron + Vanilla JS (ES6 Modules)
- **Gameplay:** Survive endless waves of enemies

## Roles

### Claude (Project Manager)
- Creates and maintains tickets in `/tickets/`
- Tracks progress and updates ticket status
- Answers questions about architecture and implementation
- Reviews completed work against acceptance criteria
- Creates new tickets when features are complete

### Developer (You)
- Implements the code for each ticket
- Marks when work is ready for review
- Asks questions when requirements are unclear
- Decides implementation details within ticket scope

## Workflow

1. **Pick a ticket** - Check `/tickets/` for the next available ticket
2. **Implement** - Write the code to meet acceptance criteria
3. **Report done** - Tell Claude when ready for review
4. **Review** - Claude checks criteria and updates ticket status
5. **Next ticket** - Claude creates or assigns the next ticket

## Ticket Format

Tickets live in `/tickets/` as markdown files:
- `TICKET-XXXX-short-name.md` (4-digit numbering)
- Status: `[ ] Not Started` / `[~] In Progress` / `[x] Complete`
- Each has acceptance criteria that must pass

## Current Ticket

**TICKET-0004: Game Loop & Game Class** - Fixed timestep loop and main Game orchestrator

## Commands

```bash
npm install    # Install dependencies
npm start      # Run the game
```

## PM Notes

Reminders for Claude when managing this project:

- **Keep tickets small** - Each ticket should be a discrete deliverable, completable in one session
- **Split large tickets** - If a ticket has 3+ unrelated acceptance criteria, consider splitting
- **Update BOARD.md** - Keep the board in sync when tickets change status
- **Review before approving** - Always check code against acceptance criteria
- **Create tickets proactively** - Don't wait to be asked; identify and create tickets as needed
- **Graphics come after wireframes** - Get gameplay working with shapes first, polish later

## Project Structure

```
shooter/
├── main/main.js        # Electron main process
├── src/
│   ├── index.html      # Canvas container
│   ├── main.js         # Game entry point
│   ├── core/           # Engine (Game, Loop, Renderer, Input)
│   ├── entities/       # Player, Enemy, Bullet, Pickup
│   ├── systems/        # Collision, Waves, Particles
│   ├── enemies/        # Enemy type definitions
│   ├── weapons/        # Weapon definitions
│   ├── ui/             # HUD, Menus
│   └── utils/          # Vector2, helpers
├── assets/             # Images, audio
└── tickets/            # Project tickets
```
