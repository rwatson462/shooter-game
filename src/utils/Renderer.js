import {Vector2} from "./Vector2.js";


export class Renderer {
    constructor(canvas, width, height) {
        canvas.width = width
        canvas.height = height

        this.width = width
        this.height = height
        this.ctx = canvas.getContext('2d')
    }

    clear(colour) {
        this.ctx.fillStyle = colour
        this.ctx.fillRect(0, 0, this.width, this.height)
    }

    drawText(x, y, text, colour) {
        this.ctx.fillStyle = colour
        this.ctx.fillText(text, x, y)
    }

    drawPolygon(points, colour) {
        this.ctx.fillStyle = colour
        this.ctx.beginPath()
        this.ctx.moveTo(points[0].x, points[0].y)
        for (let point of points) {
            this.ctx.lineTo(point.x, point.y)
        }
        this.ctx.closePath()
        this.ctx.fill()
    }

    drawRect(x, y, w, h, colour) {
        const points = [
            new Vector2(x, y),
            new Vector2(x + w, y),
            new Vector2(x + w, y + h),
            new Vector2(x, y + h),
        ]
        this.drawPolygon(points, colour)
    }
}
