
export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        return new Vector2(this.x + other.x, this.y + other.y)
    }

    subtract(other) {
        return new Vector2(this.x - other.x, this.y - other.y)
    }

    multiply(num) {
        return new Vector2(this.x * num, this.y * num)
    }

    divide(num) {
        return new Vector2(this.x / num, this.y / num)
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    normalise() {
        const mag = this.magnitude()
        return mag > 0
            ? this.divide(mag)
            : new Vector2(0,0)
    }

    static distance(vector1, vector2) {
        return Math.abs(vector1.subtract(vector2).magnitude())
    }
}
