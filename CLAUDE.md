# Top-Down Wave Survival Shooter

## Project Overview
A hand-built top-down wave survival shooter using HTML5 Canvas and Electron. No frameworks - everything built from scratch.

- **Resolution:** 1280x720
- **Tech Stack:** HTML5 Canvas + Electron + Vanilla JS (ES6 Modules)
- **Gameplay:** Survive endless waves of enemies

## Roles

### Claude (Project Manager)
- Creates and maintains issues on GitHub Projects
- Tracks progress and updates issue status on the Kanban board
- Answers questions about architecture and implementation
- Reviews completed work against acceptance criteria
- Creates new issues when features are complete

### Developer (You)
- Implements the code for each issue
- Marks when work is ready for review
- Asks questions when requirements are unclear
- Decides implementation details within issue scope

## Workflow

1. **Pick an issue** - Check the [Project Board](https://github.com/users/rwatson462/projects/3) for items in Ready
2. **Move to In Progress** - Drag the issue to "In Progress" when starting
3. **Implement** - Write the code to meet acceptance criteria
4. **Report done** - Tell Claude when ready for review
5. **Review** - Claude checks criteria and moves to Done
6. **Next issue** - Claude creates or assigns the next issue

## Issue Tracking

**Project Board:** https://github.com/users/rwatson462/projects/3

### Board Columns
- **Backlog** - Future work, not yet prioritized
- **Ready** - Up next, ready to be worked on
- **In Progress** - Currently being implemented
- **In Review** - Awaiting review
- **Done** - Completed

### Labels
- `gameplay` - Core gameplay features
- `graphics` - Visual effects and sprites
- `engine` - Core engine and systems
- `tooling` - Development tools and workflow
- `priority:high` - High priority
- `priority:low` - Low priority / backlog

### Using the GitHub CLI
```bash
gh issue list                    # List open issues
gh issue view <number>           # View issue details
gh issue create                  # Create new issue
gh issue close <number>          # Close an issue
gh project item-list 3 --owner rwatson462  # View project board
```

## Commands

```bash
npm install    # Install dependencies
npm start      # Run the game
```

## PM Notes

Reminders for Claude when managing this project:

- **Keep issues small** - Each issue should be a discrete deliverable, completable in one session
- **Split large issues** - If an issue has 3+ unrelated acceptance criteria, consider splitting
- **Use GitHub Projects** - Create issues and manage them on the Kanban board via `gh` CLI
- **Review before closing** - Always check code against acceptance criteria
- **Create issues proactively** - Don't wait to be asked; identify and create issues as needed
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
└── assets/             # Images, audio
```
