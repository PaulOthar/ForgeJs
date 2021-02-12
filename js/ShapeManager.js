class ShapeManager {
    constructor() { }
    //Form
    static NULL = -1;
    static DIAMOND = 0;
    static SQUARE = 1;

    //Type
    static UNITY = 0;
    static MATRIX = 1;

    static Draw(x_origin, y_origin, x_row, y_column, step, width, height, form, type) {
        let output = [];

        switch (type) {
            case (ShapeManager.UNITY):
                output = ShapeManager.DrawUnity(form, step, x_row, y_column, width, height);
                break;
            case (ShapeManager.MATRIX):
                output = ShapeManager.DrawMatrix(form, x_row, y_column, width, height, x_origin, y_origin);
                break;
            default:
                console.log(`${type} Is An Invalid Type`);
        }

        return output;
    }


    static DrawUnity(type, step, x, y, width, height) {
        let output = [];

        if (step) {
            let stepped = ShapeManager.Step(type, x, y, width, height);
            x = stepped[0];
            y = stepped[1];
        }

        switch (type) {
            case (ShapeManager.DIAMOND):
                output = ShapeManager.DiamondQuadrilateralX_Y(x, y, width, height);
                break;
            case (ShapeManager.SQUARE):
                output = ShapeManager.SquareQuadrilateralX_Y(x, y, width, height);
                break;
        }

        return output;
    }
    static DrawUnityIntersection(type1, type2, pendency, step, x, y, width, height) {
        let output = [];

        output = ShapeManager.PolygonIntersection(ShapeManager.DrawUnity(type1, step, x, y, width, height), ShapeManager.DrawUnity(type2, step, x, y, width, height), pendency);

        return output;
    }


    static DrawMatrix(type, rows, columns, width, height, x_origin, y_origin) {
        let output = [];

        switch (type) {
            case (ShapeManager.DIAMOND):
                output = ShapeManager.DiamondQuadrilateralMatrix(x_origin, y_origin, rows, columns, width, height);
                break;
            case (ShapeManager.SQUARE):
                output = ShapeManager.SquareQuadrilateralMatrix(x_origin, y_origin, rows, columns, width, height);
                break;
        }

        return output;
    }
    static DrawMatrixIntersection(x_origin, y_origin, type1, type2, pendency, rows, columns, width, height) {
        output = [];

        output = ShapeManager.MatrixIntersection(ShapeManager.DrawMatrix(type1, rows, columns, width, height, x_origin, y_origin), ShapeManager.DrawMatrix(type2, rows, columns, width, height, x_origin, y_origin), pendency, x_origin, y_origin);

        return output;
    }


    static Step(type, x, y, width, height) {
        let output = [];

        switch (type) {
            case (ShapeManager.DIAMOND):
                output = ShapeManager.StepDiamondCoordinate(x, y, width, height);
                break;
            case (ShapeManager.SQUARE):
                output = ShapeManager.StepSquareCoordinate(x, y, width, height);
                break;
        }

        return output;
    }
    static StepIntersection(type1, type2, pendency, x, y, width, height) {
        let output = [];

        output = ShapeManager.PointsIntersectionPP(ShapeManager.Step(type1, x, y, width, height), ShapeManager.Step(type2, x, y, width, height), pendency);

        return output;
    }


    static StepDiamondCoordinate(x, y, width, height) {
        let Coordinates = [];

        //0 = x
        //1 = y
        Coordinates.push(((x * width / 2) - (y * width / 2)));
        Coordinates.push(((y * height / 2) + (x * height / 2)));

        return Coordinates;
    }
    static RawToDiamondCoordinate(x, y, width, height) {
        let Coordinates = [];

        //0 = x
        //1 = y
        Coordinates.push(((y / height) - (x / width)));
        Coordinates.push(((x / width) + (y / height)));

        return Coordinates;
    }
    static DiamondQuadrilateralX_Y(x, y, width, height) {
        let Coordinates = [];

        let x1 = x, y1 = y;
        let x2 = x + width / 2, y2 = y + height / 2;
        let x3 = x, y3 = y + height;
        let x4 = x - width / 2, y4 = y + height / 2;

        Coordinates.push([x1, x2, x3, x4]);
        Coordinates.push([y1, y2, y3, y4]);

        return Coordinates;
    }
    static DiamondQuadrilateralXY(xy, width, height) {
        let Coordinates = [];

        let x = xy[0], y = xy[1];

        let x1 = x, y1 = y;
        let x2 = x + width / 2, y2 = y + height / 2;
        let x3 = x, y3 = y + height;
        let x4 = x - width / 2, y4 = y + height / 2;

        Coordinates.push([x1, x2, x3, x4]);
        Coordinates.push([y1, y2, y3, y4]);

        return Coordinates;
    }
    static DiamondQuadrilateralMatrix(x_origin, y_origin, rows, columns, width, height) {
        let Coordinates = [];
        let SimpleCoordinates = [];

        for (let i = 0; i < rows; i++) {
            for (let l = 0; l < columns; l++) {
                SimpleCoordinates = ShapeManager.StepDiamondCoordinate(i, l, width, height);
                Coordinates.push(ShapeManager.DiamondQuadrilateralX_Y(SimpleCoordinates[0] + x_origin, SimpleCoordinates[1] + y_origin, width, height));
            }
        }
        return Coordinates;
    }


    static StepSquareCoordinate(x, y, width, height) {
        let Coordinates = [];

        //0 = x
        //1 = y

        Coordinates.push(x * width);
        Coordinates.push(y * height);

        return Coordinates;
    }
    static SquareQuadrilateralX_Y(x, y, width, height) {
        let Coordinates = [];

        let x1 = x, y1 = y;
        let x2 = x + width, y2 = y;
        let x3 = x + width, y3 = y + height;
        let x4 = x, y4 = y + height;

        Coordinates.push([x1, x2, x3, x4]);
        Coordinates.push([y1, y2, y3, y4]);

        return Coordinates;
    }
    static SquareQuadrilateralXY(xy, width, height) {
        let Coordinates = [];

        let x = xy[0], y = xy[1];

        let x1 = x, y1 = y;
        let x2 = x + width, y2 = y;
        let x3 = x + width, y3 = y + height;
        let x4 = x, y4 = y + height;

        Coordinates.push([x1, x2, x3, x4]);
        Coordinates.push([y1, y2, y3, y4]);

        return Coordinates;
    }
    static SquareQuadrilateralMatrix(x_origin, y_origin, rows, columns, width, height) {
        let Coordinates = [];
        let SimpleCoordinates = [];

        for (let i = 0; i < rows; i++) {
            for (let l = 0; l < columns; l++) {
                SimpleCoordinates = ShapeManager.StepSquareCoordinate(i, l, width, height);
                Coordinates.push(ShapeManager.SquareQuadrilateralX_Y(SimpleCoordinates[0] + x_origin, SimpleCoordinates[1] + y_origin, width, height));
            }
        }

        return Coordinates;
    }


    static Intersection(num1, num2, pendency) {
        return ((num1 * pendency) + (num2 * (1 - pendency)));
    }
    static PointsIntersectionPP(p1, p2, pendency) {
        let Coordinates = [];

        //0 = x
        //1 = y

        Coordinates.push(((p1[0] * pendency) + (p2[0] * (1 - pendency))));
        Coordinates.push(((p1[1] * pendency) + (p2[1] * (1 - pendency))));

        return Coordinates;
    }
    static PointsIntersectionXYXY(x1, y1, x2, y2, pendency) {
        let Coordinates = [];

        //0 = x
        //1 = y

        Coordinates.push(((x1 * pendency) + (x2 * (1 - pendency))));
        Coordinates.push(((y1 * pendency) + (y2 * (1 - pendency))));

        return Coordinates;
    }
    static PolygonIntersection(Polygon1, Polygon2, pendency) {
        let Coordinates = [];

        //Polygon = [[x1,x2,x3,x4] , [y1,y2,y3,y4]]
        //Point = [x,y]

        let temporarypolygonx = new int[4];
        let temporarypolygony = new int[4];

        let temporarypolygonx1 = Polygon1[0];
        let temporarypolygony1 = Polygon1[1];
        let temporarypolygonx2 = Polygon2[0];
        let temporarypolygony2 = Polygon2[1];

        for (let i = 0; i < temporarypolygonx1.length && i < temporarypolygonx2.length; i++) {
            temporarypolygonx.push(ShapeManager.Intersection(temporarypolygonx1[i], temporarypolygonx2[i], pendency));
        }
        for (let i = 0; i < temporarypolygony1.length && i < temporarypolygony2.length; i++) {
            temporarypolygony.push(ShapeManager.Intersection(temporarypolygony1[i], temporarypolygony2[i], pendency));
        }

        Coordinates.push(temporarypolygonx);
        Coordinates.push(temporarypolygony);

        return Coordinates;
    }
    static MatrixIntersection(matrix1, matrix2, pendency, x_origin, y_origin) {
        let Coordinates = [];

        let mod1 = pendency, mod2 = (1 - pendency);

        for (let i = 0; i < matrix1.length && i < matrix2.length; i++) {

            let midx = [];
            let midy = [];

            let mat1x = matrix1[i][0];
            let mat1y = matrix1[i][1];
            let mat2x = matrix2[i][0];
            let mat2y = matrix2[i][1];

            Coordinates.push([]);

            for (let l = 0; l < 4; l++) {
                midx.push(((mat1x[l] * pendency) + (mat2x[l] * (1 - pendency))));
                midy.push(((mat1y[l] * pendency) + (mat2y[l] * (1 - pendency))));
            }

            Coordinates[i].push(midx);
            Coordinates[i].push(midy);

        }

        return Coordinates;
    }
}