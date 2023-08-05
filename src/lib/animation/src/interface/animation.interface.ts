import { MatrixI } from "./matrix.interface";
import { PointI } from "./point.interface";


export interface AnimationI {
    translate: (start: PointI, moving: PointI) => MatrixI;
    rotate: (start: PointI, rad: number) => MatrixI;
    scale: (start: PointI, scale: PointI) => MatrixI; 
}