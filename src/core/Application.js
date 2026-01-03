import {Game} from "./Game.js";
import {TitleScreen} from "./screens/TitleScreen.js";
import {Renderer} from "./Renderer.js";
import {InputManager} from "./InputManager.js";
import {PauseScreen} from "./screens/PauseScreen.js";
import {GameOverScreen} from "./screens/GameOverScreen.js";

/**
 * @property {number} lastTimestamp
 * @property {boolean} started
 */
export class Application {
    /**
     *
     * @param {HTMLElement} canvas
     * @param {number} width
     * @param {number} height
     */
    constructor(canvas, width, height) {
        this.width = width
        this.height = height

        this.currentScreen = null

        this.inputManager = new InputManager(canvas)
        this.renderer = new Renderer(canvas, width, height)

        this.lastFrameTime = 0
        this.started = false
        this.screens = new Map()
        this.score = 0
    }

    addToScore(amount) {
        this.score += amount
    }

    getScore() {
        return this.score
    }

    init() {
        // build the "screens" that the game has
        this.screens.set('title', new TitleScreen(this, this.inputManager, this.width, this.height))
        this.screens.set('inGame', new Game(this, this.inputManager, this.width, this.height))
        this.screens.set('paused', new PauseScreen(this, this.inputManager, this.width, this.height))
        this.screens.set('gameOver', new GameOverScreen(this, this.inputManager, this.width, this.height))

        // set the initial screen to the title screen
        this.setScreen('title')
    }

    /**
     * @param {string} screenName
     * @param {boolean} initialise
     */
    setScreen(screenName, initialise = true) {
        // find screen by screenName
        const screen = this.screens.get(screenName)

        // debug error checking
        if (!screen) {
            throw new Error(`Invalid screen name: ${screenName}`)
        }

        // initialise if needed
        if (initialise && screen.onTransitionTo) {
            screen.onTransitionTo()
        }

        // set it as the current screen
        this.currentScreen = screen
    }

    startNewGame() {
        // set score to zero
        this.score = 0

        // set game screen
        this.setScreen('inGame')

        // initialise first level
        this.currentScreen.initLevel()
    }

    start() {
        this.started = true
        this.setNextFrame()
    }

    /**
     * @param {number} timestamp
     * @returns {number}
     */
    calculateDelta(timestamp) {
        // for 60 frames per second, this is roughly 16.666667
        return timestamp - this.lastFrameTime;
    }

    /**
     * @param {number} timestamp
     */
    frame(timestamp) {
        const delta = this.calculateDelta(timestamp)

        this.update(delta)
        this.render(delta)
        this.setNextFrame(timestamp)
    }

    /**
     * @param {number} delta
     */
    update(delta) {
        this.currentScreen.update(delta)

        // reset the input manager's keyPressed information
        this.inputManager.endFrame()
    }

    /**
     * @param {number} delta
     */
    render(delta) {
        this.currentScreen.render(this.renderer, delta)
    }

    setNextFrame(timestamp = null) {
        this.lastFrameTime = timestamp ?? Date.now();

        // todo: this should be "if not started, exit the game!"
        if (this.started) {
            // only request another frame if we are still running
            requestAnimationFrame(this.frame.bind(this));
        }
    }
}
