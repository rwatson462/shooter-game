import {Vector2} from "../utils/Vector2.js";

/**
 * Special keys:
 * "Space" -> space bar
 * "Escape" -> escape
 * "Enter" -> enter
 * "KeyA" -> a
 * "ArrowLeft" -> left arrow, etc
 *
 * 1 -> left mouse
 * 2 -> middle mouse
 * 3 -> right mouse
 */
export class InputManager {
    constructor(canvas) {
        this.canvas = canvas

        this.heldKeys = new Set()
        this.pressedKeys = new Set()
        this.mouseX = 0
        this.mouseY = 0

        document.addEventListener('keydown', evt => this.onKeyDown(evt))
        document.addEventListener('keyup', evt => this.onKeyUp(evt))
        document.addEventListener('mousedown', evt => this.onMouseDown(evt))
        document.addEventListener('mouseup', evt => this.onMouseUp(evt))
        document.addEventListener('mousemove', evt => this.onMouseMove(evt))
    }

    onKeyDown({code}) {
        // if it's not already held, update our lists
        if (!this.heldKeys.has(code)) {
            this.pressedKeys.add(code)
            this.heldKeys.add(code)
        }
    }

    onKeyUp({code}) {
        this.heldKeys.delete(code)
    }

    onMouseDown(evt) {
        this.heldKeys.add(`Mouse${evt.which}`)
    }

    onMouseUp(evt) {
        this.heldKeys.delete(`Mouse${evt.which}`)
    }

    onMouseMove(evt) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = evt.clientX - rect.left
        this.mouseY = evt.clientY - rect.top
    }

    isKeyHeld(code) {
        return this.heldKeys.has(code)
    }

    isKeyPressed(code) {
        return this.pressedKeys.has(code)
    }

    isMouseButtonPressed(button) {
        return this.heldKeys.has(`Mouse${button}`)
    }

    getMousePosition() {
        return new Vector2(this.mouseX, this.mouseY)
    }

    endFrame() {
        this.pressedKeys.clear()
    }
}
