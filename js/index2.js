//Math Section

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
//Assembly Section
class ShapeManager {
    constructor() { }
    //Form
    static NULL = -1;
    static DIAMOND = 0;
    static SQUARE = 1;

    //Type
    static UNITY = 0;
    static MATRIX = 1;

    static Draw(x_origin,y_origin,x_row, y_column, step, width, height, form, type) {
        let output = [];

        switch (type) {
            case (ShapeManager.UNITY):
                output = ShapeManager.DrawUnity(form, step, x_row, y_column, width, height);
                break;
            case (ShapeManager.MATRIX):
                output = ShapeManager.DrawMatrix(form, x_row, y_column, width, height,x_origin,y_origin);
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
    static DrawUnityIntersection(type1,type2,pendency,step,x,y,width,height) {
        let output = [];

        output = ShapeManager.PolygonIntersection(ShapeManager.DrawUnity(type1,step, x, y, width, height),ShapeManager.DrawUnity(type2,step, x, y, width, height),pendency);

        return output;
    }


    static DrawMatrix(type,rows,columns,width,height,x_origin,y_origin) {
        let output = [];

        switch(type) {
            case (ShapeManager.DIAMOND):
                output = ShapeManager.DiamondQuadrilateralMatrix(x_origin,y_origin,rows, columns, width, height);
                break;
            case (ShapeManager.SQUARE):
                output = ShapeManager.SquareQuadrilateralMatrix(x_origin,y_origin,rows, columns, width, height);
                break;
            }
            
        return output;
    }
    static DrawMatrixIntersection(x_origin,y_origin,type1,type2,pendency,rows,columns,width,height) {
        output = [];

        output = ShapeManager.MatrixIntersection(ShapeManager.DrawMatrix(type1, rows, columns, width, height,x_origin,y_origin),ShapeManager.DrawMatrix(type2, rows, columns, width, height,x_origin,y_origin),pendency,x_origin,y_origin);
		
		return output;
    }


    static Step(type,x,y,width,height) {
        let output = [];
		
		switch(type) {
		case (ShapeManager.DIAMOND):
			output = ShapeManager.StepDiamondCoordinate(x, y, width, height);
			break;
		case (ShapeManager.SQUARE):
			output = ShapeManager.StepSquareCoordinate(x, y, width, height);
			break;
		}
		
		return output;
    }
    static StepIntersection(type1,type2,pendency,x,y,width,height) {
        let output = [];
		
		output = ShapeManager.PointsIntersectionPP(ShapeManager.Step(type1, x, y, width, height), ShapeManager.Step(type2, x, y, width, height), pendency);
		
		return output;
    }


    static StepDiamondCoordinate(x,y,width,height) {
		let Coordinates = [];
		
		//0 = x
        //1 = y
        Coordinates.push(((x*width/2)-(y*width/2)));
        Coordinates.push(((y*height/2)+(x*height/2)));
		
		return Coordinates;
    }
    static RawToDiamondCoordinate(x,y,width,height) {
        let Coordinates = [];
		
		//0 = x
        //1 = y
        Coordinates.push(((y/height)-(x/width)));
        Coordinates.push(((x/width)+(y/height)));
		
		return Coordinates;
    }
    static DiamondQuadrilateralX_Y(x,y,width,height) {
        let Coordinates = [];
		
		let x1 = x ,           y1 = y;
		let x2 = x + width/2 , y2 = y + height/2;
		let x3 = x ,           y3 = y + height;
        let x4 = x - width/2 , y4 = y + height/2;
        
		Coordinates.push([x1,x2,x3,x4]);
		Coordinates.push([y1,y2,y3,y4]);
		
		return Coordinates;
    }
    static DiamondQuadrilateralXY(xy,width,height) {
        let Coordinates = [];
		
		let x = xy[0],y = xy[1];
		
		let x1 = x ,           y1 = y;
		let x2 = x + width/2 , y2 = y + height/2;
		let x3 = x ,           y3 = y + height;
        let x4 = x - width/2 , y4 = y + height/2;

		Coordinates.push([x1,x2,x3,x4]);
		Coordinates.push([y1,y2,y3,y4]);
		
		return Coordinates;
    }
    static DiamondQuadrilateralMatrix(x_origin,y_origin,rows,columns,width,height) {
        let Coordinates = [];
		let SimpleCoordinates = [];
		
		for(let i = 0;i<rows;i++) {
			for(let l = 0;l<columns;l++) {
				SimpleCoordinates = ShapeManager.StepDiamondCoordinate(i, l, width, height);
				Coordinates.push(ShapeManager.DiamondQuadrilateralX_Y(SimpleCoordinates[0]+x_origin, SimpleCoordinates[1]+y_origin, width, height));
			}
		}
		return Coordinates;
    }


    static StepSquareCoordinate(x,y,width,height) {
        let Coordinates = [];
		
		//0 = x
        //1 = y
        
        Coordinates.push(x*width);
        Coordinates.push(y*height);
		
		return Coordinates;
    }
    static SquareQuadrilateralX_Y(x,y,width,height) {
        let Coordinates = [];
		
		let x1 = x , y1 =    y;
		let x2 = x + width , y2 = y;
		let x3 = x + width , y3 = y + height;
		let x4 = x , y4 =    y + height;
		
		Coordinates.push([x1,x2,x3,x4]);
        Coordinates.push([y1,y2,y3,y4]);
        
		return Coordinates;
    }
    static SquareQuadrilateralXY(xy,width,height) {
        let Coordinates = [];
		
		let x = xy[0],y = xy[1];
		
		let x1 = x ,         y1 = y;
		let x2 = x + width , y2 = y;
		let x3 = x + width , y3 = y + height;
		let x4 = x ,         y4 = y + height;
		
		Coordinates.push([x1,x2,x3,x4]);
        Coordinates.push([y1,y2,y3,y4]);
        
		return Coordinates;
    }
    static SquareQuadrilateralMatrix(x_origin,y_origin,rows,columns,width,height) {
        let Coordinates = [];
		let SimpleCoordinates = [];
		
		for(let i = 0;i<rows;i++) {
			for(let l = 0;l<columns;l++) {
				SimpleCoordinates = ShapeManager.StepSquareCoordinate(i, l, width, height);
				Coordinates.push(ShapeManager.SquareQuadrilateralX_Y(SimpleCoordinates[0]+x_origin, SimpleCoordinates[1]+y_origin, width, height));
			}
        }
        
		return Coordinates;
    }


    static Intersection(num1,num2,pendency) {
		return ((num1*pendency)+(num2*(1-pendency)));
    }
    static PointsIntersectionPP(p1,p2,pendency) {
        let Coordinates = [];
		
		//0 = x
        //1 = y
        
        Coordinates.push(((p1[0]*pendency)+(p2[0]*(1-pendency))));
        Coordinates.push(((p1[1]*pendency)+(p2[1]*(1-pendency))));
		
		return Coordinates;
    }
    static PointsIntersectionXYXY(x1,y1,x2,y2,pendency) {
        let Coordinates = [];
		
		//0 = x
        //1 = y
        
        Coordinates.push(((x1*pendency)+(x2*(1-pendency))));
        Coordinates.push(((y1*pendency)+(y2*(1-pendency))));
		
		return Coordinates;
    }
    static PolygonIntersection(Polygon1,Polygon2,pendency) {
        let Coordinates = [];
		
		//Polygon = [[x1,x2,x3,x4] , [y1,y2,y3,y4]]
		//Point = [x,y]
		
		let temporarypolygonx = new int[4];
		let temporarypolygony  = new int[4];
		
		let temporarypolygonx1 = Polygon1[0];
		let temporarypolygony1 = Polygon1[1];
		let temporarypolygonx2 = Polygon2[0];
		let temporarypolygony2 = Polygon2[1];
		
		for(let i = 0;i<temporarypolygonx1.length && i<temporarypolygonx2.length;i++) {
            temporarypolygonx.push(ShapeManager.Intersection(temporarypolygonx1[i], temporarypolygonx2[i], pendency));
		}
		for(let i = 0;i<temporarypolygony1.length && i<temporarypolygony2.length;i++) {
            temporarypolygony.push(ShapeManager.Intersection(temporarypolygony1[i], temporarypolygony2[i], pendency));
		}
		
		Coordinates.push(temporarypolygonx);
		Coordinates.push(temporarypolygony);
		
		return Coordinates;
    }
    static MatrixIntersection(matrix1,matrix2,pendency,x_origin,y_origin) {
        let Coordinates = [];
		
		let mod1 = pendency,mod2 = (1-pendency);
		
		for(let i = 0;i<matrix1.length && i<matrix2.length;i++) {
            
            let midx = [];
            let midy = [];

            let mat1x = matrix1[i][0];
            let mat1y = matrix1[i][1];
            let mat2x = matrix2[i][0];
            let mat2y = matrix2[i][1];
			
			Coordinates.push([]);
			
			for(let l = 0;l<4;l++) {
                midx.push(((mat1x[l]*pendency)+(mat2x[l]*(1-pendency))));
                midy.push(((mat1y[l]*pendency)+(mat2y[l]*(1-pendency))));
			}
			
			Coordinates[i].push(midx);
			Coordinates[i].push(midy);
			
		}
		
		return Coordinates;
    }
}

//Graphics Section

class GraphicsManager{
    constructor(){}

    //Main Canvas Methods
    static GetCanvasElementByName(Canvas_Name){
        return document.getElementById(Canvas_Name);
    }
    static GetCanvasContextByName(Canvas_Name,Context_type){
        if(!Context_type){
            Context_type = '2d';
        }
        return GraphicsManager.GetCanvasElementByName(Canvas_Name).getContext(Context_type);
    }
    static SaveState(Context){
        Context.save();
    }
    static LoadState(Context){
        Context.restore();
    }

    //Basic Enviroment Changes
    static SetCanvasBackgroundColor(Canvas_Name,Context_type,color){
        let C_element = GraphicsManager.GetCanvasElementByName(Canvas_Name);
        let C_context = C_element.getContext(Context_type);
        C_context.fillStyle = color;
        C_context.fillRect(0, 0, C_element.width, C_element.height);
    }
    static SetHTMLBackgroundColor(color){
        document.body.style.backgroundColor = color;
    }
    static DrawAxis(Canvas_Name,Context_type,Color,width,style){
        let element = GraphicsManager.GetCanvasElementByName(Canvas_Name);
        let context = element.getContext(Context_type);

        GraphicsManager.DrawLine(context,0,element.height/2,element.width,element.height/2,Color,width,style);
        GraphicsManager.DrawLine(context,element.width/2,0,element.width/2,element.height,Color,width,style);
    }

    /*Resets:
    
    Since the Canvas Context Properties Are Global,
    and changes everything from starting point,
    it must be reseted when changing some details.
    */
    static ResetAllContextProperty(Context){
        Context.font = '10px sans-serif';
        Context.lineWidth = 1;
        Context.lineCap = 'butt';
        Context.lineJoin = 'miter';
        Context.textAlign = 'start';
        Context.textBaseline = 'alphabetic';
        Context.fillStyle = '#000000';
        Context.strokeStyle = '#000000';
        Context.shadowColor = '#000000';
        Context.shadowBlur = 0;
        Context.shadowOffsetX = 0;
        Context.shadowOffsetY = 0;
    }
    static Resetfont(Context){
        Context.font = '10px sans-serif';
    }
    static ResetlineWidth(Context){
        Context.lineWidth = 1;
    }
    static ResetlineCap(Context){
        Context.lineCap = 'butt';
    }
    static ResetlineJoin(Context){
        Context.lineJoin = 'miter';
    }
    static ResettextAlign(Context){
        Context.textAlign = 'start';
    }
    static ResettextBaseline(Context){
        Context.textBaseline = 'alphabetic';
    }
    static ResetfillStyle(Context){
        Context.fillStyle = '#000000';
    }
    static ResetstrokeStyle(Context){
        Context.strokeStyle = '#000000';
    }
    static ResetshadowColor(Context){
        Context.shadowColor = '#000000';
    }
    static ResetshadowBlur(Context){
        Context.shadowBlur = 0;
    }
    static ResetshadowOffsetX(Context){
        Context.shadowOffsetX = 0;
    }
    static ResetshadowOffsetY(Context){
        Context.shadowOffsetY = 0;
    }

    //Drawers
    static DrawLine(Context,x_start,y_start,x_end,y_end,Line_Color,width,Line_Cap){
        Context.beginPath();

        Context.moveTo(x_start, y_start);
        Context.lineTo(x_end, y_end);

        if(Line_Cap){
            Context.lineCap = Line_Cap;
        }
        if(width){
            Context.lineWidth = width;
        }
        if(Line_Color){
            Context.strokeStyle = Line_Color;
        }
        Context.closePath();
        Context.stroke();

        GraphicsManager.ResetlineCap(Context);
        GraphicsManager.ResetlineWidth(Context);
        GraphicsManager.ResetstrokeStyle(Context);
    }
    static DrawPolygon(Context,Polygon,Line_Color,Line_Width,Line_Cap,Fill_Color){
        //A Polygon is Composed By 2 Arrays (x's and y's), being x, the 0 index, and y the 1 index
        let x,y;
        x = Polygon[0];
        y = Polygon[1];

        Context.beginPath();

        for(let i = 0;i<x.length && i<y.length;i++){
            if(i == 0){
                Context.moveTo(x[i],y[i]);
            }
            else{
                Context.lineTo(x[i],y[i]);
            }
        }

        //it must draw a line to the initial point  :/

        Context.lineTo(x[0],y[0]);

        if(Fill_Color){
            Context.fillStyle = Fill_Color;
            Context.fill();
        }

        if(Line_Color){
            Context.strokeStyle = Line_Color;
        }

        if(Line_Width){
            Context.lineWidth = Line_Width;
        }

        if(Line_Cap){
            Context.lineCap = Line_Cap;
        }

        Context.closePath();
        Context.stroke();

        GraphicsManager.ResetfillStyle(Context);
        GraphicsManager.ResetstrokeStyle(Context);
        GraphicsManager.ResetlineWidth(Context);
        GraphicsManager.ResetlineCap(Context);
    }
    static DrawPolygonForGrid(Context,Polygon,Fill){
        let x,y;
        x = Polygon[0];
        y = Polygon[1];

        Context.beginPath();

        for(let i = 0;i<x.length && i<y.length;i++){
            if(i == 0){
                Context.moveTo(x[i],y[i]);
            }
            else{
                Context.lineTo(x[i],y[i]);
            }
        }

        Context.lineTo(x[0],y[0]);

        if(Fill){
            Context.fill();
        }

        Context.closePath();
        Context.stroke();
    }
    static DrawPolygonGrid(Context,Matrix,Line_Color,Line_Width,Line_Cap,Fill_Color){
        //WARNING: Extremely Inneficient

        if(Fill_Color){
            Context.fillStyle = Fill_Color;
        }

        if(Line_Color){
            Context.strokeStyle = Line_Color;
        }

        if(Line_Width){
            Context.lineWidth = Line_Width;
        }

        if(Line_Cap){
            Context.lineCap = Line_Cap;
        }

        for(let i = 0;i<Matrix.length;i++){
            GraphicsManager.DrawPolygonForGrid(Context,Matrix[i],Fill_Color);
        }

        GraphicsManager.ResetfillStyle(Context);
        GraphicsManager.ResetstrokeStyle(Context);
        GraphicsManager.ResetlineWidth(Context);
        GraphicsManager.ResetlineCap(Context);
    }
    static DrawText(Context,Text,x,y,Font,Fill,Color,Alignment,Baseline){
        if(Font){
            Context.font = Font;
        }
        if(Alignment){
            Context.textAlign = Alignment;
        }
        if(Baseline){
            Context.textBaseline = Baseline;
        }
        if(Fill){
            Context.fillStyle = Fill;
            Context.fillText(Text, x, y); 
        }
        if(Color){
            Context.strokeStyle = Color;
            Context.strokeText(Text,x,y);
        }

        GraphicsManager.Resetfont(Context);
        GraphicsManager.ResettextAlign(Context);
        GraphicsManager.ResettextBaseline(Context);
        GraphicsManager.ResetfillStyle(Context);
        GraphicsManager.ResetstrokeStyle(Context);
    }

    static GenerateLinearGradient(Context,x_start,y_start,x_end,y_end,Array_of_Colors){
        let gradient = Context.createLinearGradient(x_start,y_start,x_end,y_end);

        const multiplier = (1/Array_of_Colors.length);

        for(let i = 0;i<Array_of_Colors.length;i++){
            gradient.addColorStop(i*multiplier,Array_of_Colors[i]);
        }

        return gradient;
    }
}
class PropertyIndex{
    constructor(){}

    //Some Properties to choose from:

    //Line Cap:
    static lineCap_butt = 'butt';
    static lineCap_round = 'round';
    static lineCap_square = 'square';

    //Line Join:
    static lineJoin_bevel = 'bevel';
    static lineJoin_round = 'round';
    static lineJoin_miter = 'miter';

    //Font Style
    static fontStyle_normal = 'normal';
    static fontStyle_italic = 'italic';
    static fontStyle_oblique = 'oblique';

    //Font Variant:
    static fontVariant_normal = 'normal';
    static fontVariant_small_caps = 'small-caps';

    //Font Weight:
    static fontWeight_normal = 'normal';
    static fontWeight_bold = 'bold';
    static fontWeight_bolder = 'bolder';
    static fontWeight_lighter = 'lighter';
    static fontWeight_300 = '300';
    static fontWeight_600 = '600';
    static fontWeight_900 = '900';

    //Font Size:
    static FontSize(Pixels){
        return `${Pixels}px`;
    }

    //Font Family:
    static FontFamily_monospace = 'monospace';
    static FontFamily_serif = 'serif';
    static FontFamily_sans_serif = 'sans-serif';
    static FontFamily_cursive =	 'cursive';
    static FontFamily_fantasy = 'fantasy';
    static FontFamily_Courier_New = 'Courier New';
    static FontFamily_Verdana = 'Verdana';
    static FontFamily_Arial = 'Arial';

    //Buld Font:
    static BuildFont(Family,Size,Weight,Variant,Style){
        return `${Style} ${Variant} ${Weight} ${Size} ${Family}`;
    }

    //Text Alignment:
    static textAlign_start = 'start';
    static textAlign_end = 'end';
    static textAlign_center = 'center';
    static textAlign_left = 'left';
    static textAlign_right = 'right';

    //Text Baseline:
    static textBaseline_alphabetic = 'alphabetic';
    static textBaseline_top = 'top';
    static textBaseline_hanging	 = 'hanging	';
    static textBaseline_middle = 'middle';
    static textBaseline_ideographic = 'ideographic';
    static textBaseline_bottom = 'bottom';
}

//Execution Section
GraphicsManager.SetHTMLBackgroundColor('black');
GraphicsManager.DrawAxis('canvas','2d','white',1,false);

GraphicsManager.DrawPolygonGrid(GraphicsManager.GetCanvasContextByName('canvas'),ShapeManager.DiamondQuadrilateralMatrix(400,100,10,10,64,32),"green",false,false,false);
GraphicsManager.LoadState(GraphicsManager.GetCanvasContextByName('canvas'));
GraphicsManager.DrawText(GraphicsManager.GetCanvasContextByName('canvas'),"Aha, Uhul, eu to Malucow",100,100,PropertyIndex.BuildFont(PropertyIndex.FontFamily_cursive,PropertyIndex.FontSize(50),PropertyIndex.fontWeight_900,PropertyIndex.fontVariant_small_caps,PropertyIndex.fontStyle_italic),'white','red',false,false);