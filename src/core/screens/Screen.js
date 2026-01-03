
export class Screen {
    /**
     *
     * @param {Application} application
     * @param {InputManager} inputManager
     * @param {number} width
     * @param {number} height
     */
    constructor(application, inputManager, width, height) {
        this.application = application;
        this.inputManager = inputManager

        this.width = width
        this.height = height
    }
}