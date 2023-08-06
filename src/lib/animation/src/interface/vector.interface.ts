import { PointI } from "./point.interface";

export interface VectorI {
    x: number;
    y: number;
    z: number;
    toArray: () => number[];
    toPoint: () => PointI;
}