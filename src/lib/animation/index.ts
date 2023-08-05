import { Matrix } from "./src/class/matrix.class";
import { Vector } from "./src/class/vector.class";
import { MatrixI } from "./src/interface/matrix.interface";
import { PointI } from "./src/interface/point.interface";


export class Animation {


    translate(start: PointI, moving: PointI): MatrixI {
        const startVector = new Vector(start);
        const startSize = startVector.toArray().length;
        const startMatrix_ = new Matrix(startSize, startSize);
        const startMatrix = startMatrix_.fromVectorToMatrix(startVector);

        const movingVector = new Vector(moving);
        const movingSize = movingVector.toArray().length;
        const movingMatrix_ = new Matrix(movingSize, movingSize);
        const movingMatrix = movingMatrix_.fromVectorToTranslationMatrix(movingVector);

        return movingMatrix.multiple(startMatrix);
    }

    rotate(start: PointI, rad: number): MatrixI {
        const startVector = new Vector(start);
        const startSize = startVector.toArray().length;
        const startMatrix_ = new Matrix(startSize, startSize);
        const startMatrix = startMatrix_.fromVectorToMatrix(startVector);

        const rotationMatrix_ = new Matrix(startSize, startSize);
        const rotationMatrix = rotationMatrix_.toRotationMatrix(rad, 0, 1)

        return rotationMatrix.multiple(startMatrix);
    }

    scale(start: PointI, scale: PointI): MatrixI {
        const startVector = new Vector(start);
        const startSize = startVector.toArray().length;
        const startMatrix_ = new Matrix(startSize, startSize);
        const startMatrix = startMatrix_.fromVectorToMatrix(startVector);

        const scaleVector = new Vector(scale);
        const scaleLength = scaleVector.toArray().length;
        const scaleMatrix_ = new Matrix(scaleLength, scaleLength);
        const scaleMatrix = scaleMatrix_.toScaleMatrix(scaleVector);

        return scaleMatrix.multiple(startMatrix);
    }

}