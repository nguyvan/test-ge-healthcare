import { VectorI } from "./vector.interface";


export interface MatrixI {
    
    coord: number[][];
    columns: number;
    rows: number;

    inverse: () => MatrixI;
    multiple: (mat: MatrixI) => MatrixI;

    at: (row: number, col: number) => number;
    determinant: () => number;
    getCofactor: (row: number, col: number) => MatrixI;

    addAColumn: () => MatrixI;
    addARow: () => MatrixI;
    reset: () => void;
    
    equals: (mat: MatrixI) => boolean;
    setAsIdentity: () => MatrixI;
    identity: (dimension: number) => MatrixI;

    fromVectorToMatrix: (vector: VectorI) => MatrixI;

    fromVectorToTranslationMatrix: (vector: VectorI) => MatrixI;

    toRotationMatrix: (rad: number, axes1: number, axes2: number) => MatrixI;

    toScaleMatrix: (vector: VectorI) => MatrixI;
}