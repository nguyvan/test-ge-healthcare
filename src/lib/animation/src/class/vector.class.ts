import { PointI } from "../interface/point.interface";
import { VectorI } from "../interface/vector.interface";
import { Point } from "./point.class";


export class Vector implements VectorI {

    public x: number;
    public y: number;
    public z: number;

    constructor(point: PointI) {
        this.x = point.x;
        this.y = point.y;
        this.z = 1;
    }

    /**
     * Transform the vector to an array
     * @returns The array transformed from vector
     */
    public toArray(): number[] {
        return [this.x, this.y, this.z];
    }

    /**
     * Transform the vector to a point
     * @returns The point transformed from vector
     */

    public toPoint(): PointI {
        const p = new Point(0, 0)
        p.x = this.x;
        p.y = this.y
        return p;
    }
}