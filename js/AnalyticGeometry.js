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