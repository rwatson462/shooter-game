# TICKET-0001: Project Setup

## Status
[x] Complete

## Description
Set up the Electron application shell with a Canvas element ready for game rendering. This establishes the foundation that all other tickets build upon.

## Acceptance Criteria
- [x] `package.json` with Electron dependency and start script
- [x] Electron main process creates a 1280x720 window
- [x] `index.html` contains a full-screen canvas element
- [x] Canvas displays a solid background color (proves rendering works)
- [x] App can be launched with `npm start`
- [x] Window title is "Top-Down Shooter"
- [x] DevTools can be opened with F12 for debugging

## Technical Notes

### Files to Create

**`package.json`**
```json
{
  "name": "shooter",
  "version": "0.1.0",
  "main": "main/main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

**`main/main.js`** - Electron main process
- Create BrowserWindow with 1280x720 dimensions
- Load `src/index.html`
- Enable nodeIntegration for file system access later
- Add F12 shortcut for DevTools

**`src/index.html`**
- Full-viewport canvas element (id="gameCanvas")
- Minimal CSS to remove margins/scrollbars
- Load `main.js` as ES6 module

**`src/main.js`** - Game entry point (minimal for now)
- Get canvas context
- Fill with dark background color (#1a1a2e)
- Console log to confirm JS is running

### Directory Structure After Completion
```
shooter/
├── package.json
├── main/
│   └── main.js
└── src/
    ├── index.html
    └── main.js
```

## Dependencies
None - this is the first ticket.

## Commands
```bash
# Install dependencies
npm install electron --save-dev

# Run the game
npm start
```
