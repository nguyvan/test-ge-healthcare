import { PointI } from "../interface/point.interface";
import { VectorI } from "../interface/vector.interface";
import { Vector } from "./vector.class";


export class Point implements PointI {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Subtract to the coordinates of point in parameter
     * @param point - Point to be subtracted to
     * @returns The result of subtraction between 2 points
     */
    public subtract(point: PointI): VectorI {
        const p = new Point(0, 0);
        const v = new Vector(p);
        v.x = this.x - point.x;
        v.y = this.y - point.y;
        return v
    }

    /**
     * Add with the coordinates of point in parameter
     * @param point - Point to be added with
     * @returns The result of addition between 2 points
     */
    public add(point: PointI): VectorI {
        const p = new Point(0, 0);
        const v = new Vector(p);
        v.x = this.x + point.x;
        v.y = this.y + point.y;
        return v;
    }
}