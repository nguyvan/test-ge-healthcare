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
        p.x = this.x - p.x;
        p.y = this.y - p.y;
        return p
    }
}