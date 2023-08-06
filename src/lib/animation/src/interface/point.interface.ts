import { VectorI } from "./vector.interface";

export interface PointI {
    x: number;
    y: number;

    subtract: (point: PointI) => VectorI;
    add: (point: PointI) => VectorI;
}