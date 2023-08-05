import { PointI } from "../interface/point.interface";


export class Point implements PointI {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    subtract(point: PointI): PointI {
        const p = new Point(0, 0);
        p.x = this.x - point.x;
        p.y = this.y - point.y;
        return p
    }

    add(point: PointI): PointI {
        const p = new Point(0, 0);
        p.x = this.x + point.x;
        p.y = this.y + point.y;
        return p;
    }
}