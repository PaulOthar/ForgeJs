class AnalyticGeometry {
    constructor() { }

    static AxisVector(start, end) {
        return end - start;
    }

    static Module(x, y) {
        //Module of the Vector(x,y) = SquareRoot of x powered by 2 + y powered by 2
        return Math.sqrt((Math.pow(x, 2)) + (Math.pow(y, 2)));
    }

    static RadToDegree(rad) {
        return (rad * 180) / (Math.PI);
    }

    static DegreeToRad(deg) {
        return (deg * Math.PI) / 180;
    }

    static AxisAngle(axis, module) {
        //Angle of the Axis = arccosine of Axis/Module
        return AnalyticGeometry.RadToDegree(Math.acos(axis / module));
    }

    static VectorAngle(x, y, module) {
        //Angle of the Vector(x,y) = arccosine of (x+y)/Module
        return AnalyticGeometry.RadToDegree(Math.acos((x + y) / module));
    }

    static XFromMiddle(Axis, Dimension) {
        /*
        Normally The (0,0) point is in the left upper corner.
        So This Method will Pretend that the (0,0) Point is in the center of the screen
        For example: if the screen is 800x400, then the new (0,0) will be at (400,200)
        */
        let Middle = Dimension / 2;
        return Axis - Middle;
    }

    static YFromMiddle(Axis, Dimension) {
        /*
        Normally The (0,0) point is in the left upper corner.
        So This Method will Pretend that the (0,0) Point is in the center of the screen
        For example: if the screen is 800x400, then the new (0,0) will be at (400,200)
        */
        let Middle = Dimension / 2;
        return Middle - Axis;
    }

    static ModuleFromMiddle(width, height, x, y) {
        return AnalyticGeometry.Module(AnalyticGeometry.XFromMiddle(x, width), AnalyticGeometry.YFromMiddle(y, height));
    }

    //Some Trigonometry Stuff

    static XFromAngle(angle) {
        return Math.cos(AnalyticGeometry.DegreeToRad(angle));
    }

    static YFromAngle(angle) {
        return Math.sin(AnalyticGeometry.DegreeToRad(angle));
    }

    static Apothem(NumberOfSides, SideSize) {
        /*
        S = Side Size
        N = Number of Sides

        Apothem = S/(2*tan(PI/N))
        */
        return SideSize / (2 * Math.tan(Math.PI / NumberOfSides));
    }

    static RadiusFromInscribedPolygon(NumberOfSides, SideSize) {
        /*
        S = Side Size

        Radius = Sqrt((Apothem)+(S/2)²)
        */
        let apothem = AnalyticGeometry.Apothem(NumberOfSides, SideSize);

        return Math.sqrt(Math.pow(apothem, 2) + Math.pow((SideSize / 2), 2));
    }

    //Experimental

    //Regular Polygon

    static GetPointInCircleByDegree(Degree, Radius) {
        let x, y;

        x = AnalyticGeometry.XFromAngle(Degree) * Radius;
        y = AnalyticGeometry.YFromAngle(Degree) * Radius;

        return [x, y];
    }

    static RegularPolygon(center_x, center_y, SideSize, NumberOfSides, StartingAngle) {
        let Coordinates = [];
        let Radius = AnalyticGeometry.RadiusFromInscribedPolygon(NumberOfSides, SideSize);

        Coordinates = AnalyticGeometry.RadiusLimitedRegularPolygon(center_x, center_y, Radius, NumberOfSides, StartingAngle);
        return Coordinates;

    }

    static RadiusLimitedRegularPolygon(center_x, center_y, Radius, NumberOfSides, StartingAngle) {
        let Coordinates = [];
        let X = [];
        let Y = [];
        let current_point;
        let degrees = 360 / NumberOfSides;

        for (let i = 0; i < NumberOfSides; i++) {
            current_point = AnalyticGeometry.GetPointInCircleByDegree(degrees * i + StartingAngle, Radius);
            X.push(current_point[0] + center_x);
            Y.push(current_point[1] + center_y);
        }

        Coordinates.push(X);
        Coordinates.push(Y);

        return Coordinates;
    }

    //Irregular Polygon

    static GetModifiedPointInCircleByDegree(Degree, Radius, X_Modifier, Y_Modifier) {
        let x, y;

        x = (AnalyticGeometry.XFromAngle(Degree) / X_Modifier) * Radius;
        y = (AnalyticGeometry.YFromAngle(Degree) / Y_Modifier) * Radius;

        return [x, y];
    }

    static IrregularPolygon(center_x, center_y, SideSize, NumberOfSides, StartingAngle, X_Modifier, Y_Modifier) {
        let Coordinates = [];
        let Radius = AnalyticGeometry.RadiusFromInscribedPolygon(NumberOfSides, SideSize);

        Coordinates = AnalyticGeometry.RadiusLimitedIrregularPolygon(center_x, center_y, Radius, NumberOfSides, StartingAngle, X_Modifier, Y_Modifier);
        return Coordinates;
    }
    static RadiusLimitedIrregularPolygon(center_x, center_y, Radius, NumberOfSides, StartingAngle, X_Modifier, Y_Modifier) {
        let Coordinates = [];
        let X = [];
        let Y = [];
        let current_point;
        let degrees = 360 / NumberOfSides;

        for (let i = 0; i < NumberOfSides; i++) {
            current_point = AnalyticGeometry.GetModifiedPointInCircleByDegree(degrees * i + StartingAngle, Radius, X_Modifier, Y_Modifier);
            X.push(current_point[0] + center_x);
            Y.push(current_point[1] + center_y);
        }

        Coordinates.push(X);
        Coordinates.push(Y);

        return Coordinates;
    }

    //Deprecated
    static AngleBetweenVectors(Origin_x, Origin_y, End_x1, End_y1, End_x2, End_y2) {
        //Cosθ = V*S/‖V‖*‖S‖

        let x1, y1, x2, y2;
        x1 = AnalyticGeometry.AxisVector(Origin_x, End_x1);
        y1 = AnalyticGeometry.AxisVector(Origin_y, End_y1);
        x2 = AnalyticGeometry.AxisVector(Origin_x, End_x2);
        y2 = AnalyticGeometry.AxisVector(Origin_y, End_y2);

        return AnalyticGeometry.RadToDegree(Math.acos(((x1 * x2) + (y1 * y2)) / (AnalyticGeometry.Module(x1, y1) * AnalyticGeometry.Module(x2, y2))));
    }
}