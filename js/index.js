class point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    assimilatePoint(external_point){
        if(external_point instanceof point){
            this.x += external_point.getX();
            this.y += external_point.getY();
        }
    }

    getX(){
        return this.x;
    }
    setX(X){
        this.x = X;
    }

    getY(){
        return this.y;
    }
    setY(Y){
        this.y = Y;
    }

    toString(){
        return `(${this.getX()},${this.getY()})`;
    }
}

class line{
    constructor(pointA,pointB){
        if(pointA instanceof point && pointB instanceof point){
            this.pointA = pointA;
            this.pointB = pointB;
        }
        else{
            console.log(`The Line (${pointA}) , ${pointB} Is Invalid`);
        }
    }

    getVector(){
        let pAx = this.getPointA().getX();
        let pAy = this.getPointA().getY();
        let pBx = this.getPointB().getX();
        let pBy = this.getPointB().getY();
        let Vector = new point((pBx-pAx),(pBy-pAy));
        return Vector;
    }

    getModule(){
        let Vector = this.getVector();
        let Module = (((Vector.getX())**(2))+((Vector.getY())**(2)))**(1/2);
        return Module;
    }

    getMiddlePoint(){
        let pAx = this.getPointA().getX();
        let pAy = this.getPointA().getY();
        let pBx = this.getPointB().getX();
        let pBy = this.getPointB().getY();
        let Mpoint = new point((pAx+pBx)/2,(pAy+pBy)/2);
        return Mpoint;
    }

    getPointA(){
        return this.pointA;
    }
    setPointA(pointA){
        this.pointA = pointA;
    }

    getPointB(){
        return this.pointB;
    }
    setPointB(pointB){
        this.pointB = pointB;
    }

    toString(){
        return `${this.getPointA().toString()}--(${this.getModule()})--${this.getPointB().toString()}`
    }
}

class polygon{
    constructor(pointArray){
        this.pointArray = pointArray;
        this.starting_Position = new point(0,0);
        this.width = 0;
        this.height = 0;
    }

    getLinesArray(){
        let PointArrayLength = this.getPointArray().length;
        let LinesArray = [];
        let pointA = new point(0,0),pointB = new point(0,0);
        for(let i = 0;i<PointArrayLength;i++){
            if(i+1<PointArrayLength){
                pointA = this.getPointArray()[i];
                pointB = this.getPointArray()[i+1];
            }
            else if(i+1==PointArrayLength){
                pointA = this.getPointArray()[i];
                pointB = this.getPointArray()[0];
            }
            pointA.assimilatePoint(this.starting_Position);
            pointB.assimilatePoint(this.starting_Position);
            LinesArray.push(new line(pointA,pointB));
        }
        return LinesArray;
    }

    getPointArray(){
        return this.pointArray;
    }
    setPointArray(pointArray){
        this.pointArray = pointArray;
    }

    toString(){
        let output = "";
        let lines = this.getLinesArray();
        for(let i = 0;i<lines.length;i++){
            output += `[=(${lines[i].toString()})=]`;
        }
        return output;
    }
}

class matrix{
    constructor(exemplary_polygon,axis){
        if(exemplary_polygon instanceof polygon && axis instanceof Array){
            this.ex_polygon = exemplary_polygon;
            this.axis = axis;
        }
    }

    /*

    The Axis Will Be a Matrix of Numbers,Being 0 the Null Space (Aka Empty Space)

    Axis[Lines][Columns]

    Reggex:
    "," Separates The Elements Inside The Line
    ";" Separates The Columns

    */

    readMatrix(string_matrix){
        const temp_matrix = [];
        const lines_separator = ';',elements_separator = ',';
        for(let i = 0;i<string_matrix.split(lines_separator).length;i++){
            let current_line = string_matrix.split(lines_separator)[i];
            temp_matrix.push([]);
            for(let l = 0;l<current_line.split(elements_separator).length;l++){
                let current_element;
                current_element = current_line.split(elements_separator)[l];
                temp_matrix[i].push(current_element);
            }
        }
        this.setAxis(temp_matrix);
    }
    writeMatrix(){
        let string_matrix;
        const lines_separator = ';',elements_separator = ',';
        for(let i = 0;i<this.getAxis().length;i++){
            for(let l = 0;l<this.getAxis()[i].length;l++){
                string_matrix += `${this.getAxis()[i][l]}${elements_separator}`;
            }
            string_matrix += lines_separator;
        }

        return string_matrix;
    }

    getEx_Polygon(){
        return this.ex_polygon;
    }
    setEx_Polygon(exemplary_polygon){
        this.ex_polygon = exemplary_polygon;
    }

    getAxis(){
        return this.axis;
    }
    setAxis(axis){
        this.axis = axis;
    }

    toString(){
        let output;

        output = this.getEx_Polygon().toString();
        for(let i = 0;i<this.getAxis().length;i++){
            output += "\n"
            for(let l = 0;l<this.getAxis()[i].length;l++){
                output += `${this.getAxis()[i][l]} `
            }
        }

        return output;
    }
}

class shapeGenerator{
    constructor(){}

    static square_shape(width,height,square_position){
        if(square_position instanceof point){
            let point1,point2,point3,point4;
            const x = square_position.getX(),y = square_position.getY();
            point1 = new point(x,y);
            point2 = new point(x+width,y);
            point3 = new point(x+width,y+height);
            point4 = new point(x,y+height);

            let S_S_Polygon = new polygon([point1,point2,point3,point4]);

            S_S_Polygon.width = width;
            S_S_Polygon.height = height;

            return S_S_Polygon;
        }
    }

    static diamond_shape(width,height,diamond_position){
        if(diamond_position instanceof point){
            let point1,point2,point3,point4;
            const x = diamond_position.getX(),y = diamond_position.getY();
            point1 = new point(x,y);
            point2 = new point(x+width/2,y+height/2);
            point3 = new point(x,y+height);
            point4 = new point(x-width/2,y+height/2);

            let D_S_Polygon = new polygon([point1,point2,point3,point4]);

            D_S_Polygon.width = width;
            D_S_Polygon.height = height;

            return D_S_Polygon;
        }
    }

    static generic_shape(width,height,sides,position){
        //Math Is Hard ;-;
    }
}

class drawer{
    constructor(){}

    static drawLine(Aline){
        if(Aline instanceof line){
            let c = document.getElementById("canvas");
            let ctx = c.getContext("2d");

            ctx.beginPath();
            ctx.moveTo(Aline.getPointA().getX(), Aline.getPointA().getY());
            ctx.lineTo(Aline.getPointB().getX(), Aline.getPointB().getY());

            var grd = ctx.createLinearGradient(0, 0, 10, 0);
            grd.addColorStop(0, "red");
            grd.addColorStop(1, "black");

            ctx.strokeStyle = grd;
            ctx.stroke();
        }
    }

    static drawPolygon(Apolygon){
        if(Apolygon instanceof polygon){
            let lines = Apolygon.getLinesArray();
            for(let i = 0;i<lines.length;i++){
                drawer.drawLine(lines[i]);
            }
        }
    }

    /*
    static drawQuadrilateral_Grid_Matrix(Amatrix){
        let current_polygon = Amatrix.getEx_Polygon();
        let current_lines = [];
        let lines = [];
        const Xstep = current_polygon.getXStep(),Ystep = current_polygon.getXStep();
        for(let i = 0;i<Amatrix.getAxis().length;i++){
            console.log(lines.toString());
            for(let l = 0;l<Amatrix.getAxis()[i].length;l++){
                console.log(lines.toString());
                current_lines = current_polygon.getLinesArray();
                for(let j = 0;j<current_lines.length;j++){
                    lines.push(current_lines[j]);
                //End of loop
                }
                current_polygon.starting_Position = new point(i*Xstep,l*Ystep);

            //End of loop
            }
            current_polygon.starting_Position = new point(i*Xstep,0);

        //End of loop
        }
        for(let i = 0;i<lines.length;i++){
            drawer.drawLine(lines[i]);
        }
    }
    */
   static drawQuadrilateral_Grid_Matrix(AMatrix){
       let pol = AMatrix.getEx_Polygon();
       const width = pol.width,height = pol.height;
        for(let i = 0;i<Amatrix.getAxis().length;i++){
            for(let l = 0;l<Amatrix.getAxis()[i].length;l++){
                drawer.drawPolygon(shapeGenerator.diamond_shape(100,100,new point(250+(width/2),100+(height/2))));
            }
        }
   }

}

/*
drawer.drawPolygon(new polygon([new point(30,40),new point(60,10),new point(50,70)]));
drawer.drawPolygon(shapeGenerator.square_shape(100,100,new point(100,100)));
drawer.drawPolygon(shapeGenerator.diamond_shape(100,100,new point(250,100)));
*/
drawer.drawPolygon(shapeGenerator.diamond_shape(100,100,new point(250,100)));
drawer.drawPolygon(shapeGenerator.diamond_shape(100,100,new point(250+50,100+50)));