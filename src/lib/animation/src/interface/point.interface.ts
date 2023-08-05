
export interface PointI {
    x: number;
    y: number;

    subtract: (point: PointI) => PointI;
    add: (point: PointI) => PointI
}