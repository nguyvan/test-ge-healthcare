import { PointI } from "../interface/point.interface";
import { VectorI } from "../interface/vector.interface";


export class Vector implements VectorI {

    public x: number;
    public y: number;
    public z: number;

    constructor(point: PointI) {
        this.x = point.x;
        this.y = point.y;
        this.z = 1;
    }

    toArray(): number[] {
        return [this.x, this.y, this.z];
    }
}