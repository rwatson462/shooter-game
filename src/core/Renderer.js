import {Vector2} from "../utils/Vector2.js";


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

    /**
     * @param {Vector2} point
     */
    lockToPoint(point) {
        const left = point.x - this.width / 2
        const top = point.y - this.height / 2
        this.ctx.translate(-left, -top)
    }

    drawText(x, y, text, colour, size = '12', align = 'left') {
        this.ctx.fillStyle = colour
        this.ctx.font = `${size}px monospace`
        this.ctx.textAlign = align
        this.ctx.fillText(text, x, y)
    }

    drawPolygon(points, colour) {
        this.ctx.strokeStyle = colour
        this.ctx.beginPath()
        this.ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length; i++) {
            const point = points[i]
            this.ctx.lineTo(point.x, point.y)
        }
        this.ctx.closePath()
        this.ctx.stroke()
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

    drawLine(x1, y1, x2, y2, colour) {
        this.ctx.strokeStyle = colour
        this.ctx.beginPath()
        this.ctx.moveTo(x1, y1)
        this.ctx.lineTo(x2, y2)
        this.ctx.stroke()
    }
}
