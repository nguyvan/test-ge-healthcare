import { MatrixI } from "../interface/matrix.interface";
import { VectorI } from "../interface/vector.interface";


export class Matrix implements MatrixI {
    
    public coord: number[][];
    public columns: number;
    public rows: number;

    constructor(rows: number, columns: number, coord?: number[][]) {
        this.rows = Math.max(rows, 1);
        this.columns = Math.max(columns, 1);
        this.coord = new Array<number[]>(this.rows).fill([]).map(() => new Array<number>(this.columns).fill(0));
        if (coord) {
            this.coord = coord;
        }
    }

    at(row: number, col: number): number {
        return this.coord[row][col];
    }

    reset(): void {
        this.coord = this.coord.map((row) => row.map(() => 0));
    }

    toRotationMatrix(rad: number, axes1: number, axes2: number): MatrixI {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (i === axes1 && j === axes1) {
                    this.coord[i][j] = Math.cos(rad);
                }
                if (i === axes2 && j === axes1) {
                    this.coord[i][j] = Math.sin(rad);
                }
                if (i === axes1 && j === axes2) {
                    this.coord[i][j] = -Math.sin(rad);
                }
                if (i === axes2 && j === axes2) {
                    this.coord[i][j] = Math.cos(rad);
                }
            }
        }
        return this;
    };

    toScaleMatrix(vector: VectorI): MatrixI {
        const array = vector.toArray();
        const size: number = array.length;
        let matrix: MatrixI = new Matrix(size, size);
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (i === j) {
                    matrix.coord[i][j] = array[i]
                }
                else {
                    matrix.coord[i][j] = 0
                }
            }
        }

        return matrix;
        
    };

    fromVectorToMatrix(vector: VectorI): MatrixI {
        const array: number[] = vector.toArray();
        const size: number = array.length;
        let matrix: MatrixI = new Matrix(size, 1)
        for (let i = 0; i < size; i++) {
            matrix.coord[i][0] = array[i];
        }

        return matrix;
    };

    fromVectorToTranslationMatrix(vector: VectorI): MatrixI {
        const array: number[] = vector.toArray();
        const size: number = array.length;
        let matrix: MatrixI = new Matrix(size, size);
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if(i == j){
                   matrix.coord[i][j] = 1
                }
                else{
                    matrix.coord[i][j] = 0;
                }
            }
        }

        for (let i = 0; i < size; i++) {
            matrix.coord[i][size-1] = array[i]
        }
        return matrix;
    }

    equals(mat: Matrix): boolean {
        // Reduce on rows -> reduce on columns -> if a value != then false!
        return (this.rows === mat.rows && this.columns === mat.columns)
            && this.coord.reduce(// Rows
                (eql: boolean, row, i) => eql && row.reduce(// Columns (real values)
                        (eql2: boolean, val, j) => eql2 && mat.at(i, j) === val, eql)
                , true);
    }

    setAsIdentity(): MatrixI {
        if (this.rows !== this.columns) throw new Error("Dimension error! The matrix isn't squared!");
        this.coord.forEach((row, i) => {
            row.forEach((c, j) => {
                this.coord[i][j] = i === j ? 1 : 0;
            });
        });
        return this;
    }

    identity(dimension: number): MatrixI {
        if (dimension < 1) throw Error('Dimension error! Matrix dimension must be positive.');
        return new Matrix(dimension, dimension).setAsIdentity();
    }


    determinant(): number {
        if (this.rows !== this.columns) throw new Error("Dimension error! The matrix isn't squared!");
        if (this.rows === this.columns && this.columns === 1) { return this.coord[0][0]; }

        let det = 0;
        let sign = 1;
        if (this.rows === 2) {
            det = this.coord[0][0] * this.coord[1][1] - this.coord[1][0] * this.coord[0][1];
        } else {
            for (let i = 0; i < this.rows; i++) {
                const minor = this.getCofactor(0, i);
                det += sign * this.at(0, i) * minor.determinant();
                sign = -sign;
            }
        }
        return det;
    }

    addAColumn(): MatrixI {
        return new Matrix(this.rows, this.columns + 1, this.coord);
    }

    addARow(): MatrixI {
        return new Matrix(this.rows + 1, this.columns, this.coord);
    }

    getCofactor(row: number, col: number): MatrixI {
        return new Matrix(this.rows - 1, this.columns - 1, this.coord
            .filter((v, i) => i !== row) // Remove the unnecessary row
            .map((c) => c.filter((v, i) => i !== col)));
    }

    transpose(): MatrixI {
        return new Matrix(this.columns, this.rows, new Array<number[]>(this.columns).fill([])
            .map((row, i) => new Array<number>(this.rows).fill(0).map((c, j) => this.at(j, i))));
    }

    inverse() {
        if (this.rows !== this.columns) throw new Error("Dimension error! The matrix isn't squared!");
        const det = this.determinant();
        if (det === 0) throw new Error("Determinant is 0, can't compute inverse.");

        // Get cofactor matrix: i.e. for each matrix value, get the cofactor's determinant
        const cofactorMatrix = new Matrix (this.rows, this.columns,
            this.coord.map((row, i) => row.map((val, j) => {
                const sign = Math.pow(-1, i + j);
                return sign * this.getCofactor(i, j).determinant();
            })));
        // Transpose it
        const transposedCofactor = cofactorMatrix.transpose();
        // Compute inverse of transposed / determinant on each value
        return new Matrix(this.rows, this.columns,
            this.coord.map((row, i) => row.map((val, j) => transposedCofactor.at(i, j) / det)));
    };

    multiple(mat: MatrixI): MatrixI {
        if (this.columns !== mat.rows) throw new Error("Dimension error! The operand matrix must have the same number of rows as 'this' matrix columns!");
        const resMatrix = new Matrix(this.rows, mat.columns);
        resMatrix.coord = resMatrix.coord.map((row, i) => {
            return row.map((val, j) => {
                return this.coord[i].reduce((sum, elm, k) => sum + (elm * mat.at(k, j)), 0);
            });
        });
        return resMatrix;
    };
}