class GraphicsManager {
    constructor() { }

    //Main Canvas Methods
    static GetCanvasElementByName(Canvas_Name) {
        return document.getElementById(Canvas_Name);
    }
    static GetCanvasContextByName(Canvas_Name, Context_type) {
        if (!Context_type) {
            Context_type = '2d';
        }
        return GraphicsManager.GetCanvasElementByName(Canvas_Name).getContext(Context_type);
    }
    static ClearCanvas(Canvas_Name, Context_type) {
        let Element = GraphicsManager.GetCanvasElementByName(Canvas_Name);
        let Context = Element.getContext(Context_type);

        Context.clearRect(0, 0, Element.width, Element.height);
    }
    static SaveState(Context) {
        Context.save();
    }
    static LoadState(Context) {
        Context.restore();
    }

    //Basic Enviroment Changes
    static SetCanvasBackgroundColor(Canvas_Name, Context_type, color) {
        let C_element = GraphicsManager.GetCanvasElementByName(Canvas_Name);
        let C_context = C_element.getContext(Context_type);
        C_context.fillStyle = color;
        C_context.fillRect(0, 0, C_element.width, C_element.height);

        GraphicsManager.ResetfillStyle();
    }
    static SetHTMLBackgroundColor(color) {
        document.body.style.backgroundColor = color;
    }
    static DrawAxis(Canvas_Name, Context_type, Color, width, style) {
        let element = GraphicsManager.GetCanvasElementByName(Canvas_Name);
        let context = element.getContext(Context_type);

        GraphicsManager.DrawLine(context, 0, element.height / 2, element.width, element.height / 2, Color, width, style);
        GraphicsManager.DrawLine(context, element.width / 2, 0, element.width / 2, element.height, Color, width, style);
    }

    /*Resets:
    
    Since the Canvas Context Properties Are Global,
    and changes everything from starting point,
    it must be reseted when changing some details.
    */
    static ResetAllContextProperty(Context) {
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
    static Resetfont(Context) {
        Context.font = '10px sans-serif';
    }
    static ResetlineWidth(Context) {
        Context.lineWidth = 1;
    }
    static ResetlineCap(Context) {
        Context.lineCap = 'butt';
    }
    static ResetlineJoin(Context) {
        Context.lineJoin = 'miter';
    }
    static ResettextAlign(Context) {
        Context.textAlign = 'start';
    }
    static ResettextBaseline(Context) {
        Context.textBaseline = 'alphabetic';
    }
    static ResetfillStyle(Context) {
        Context.fillStyle = '#000000';
    }
    static ResetstrokeStyle(Context) {
        Context.strokeStyle = '#000000';
    }
    static ResetshadowColor(Context) {
        Context.shadowColor = '#000000';
    }
    static ResetshadowBlur(Context) {
        Context.shadowBlur = 0;
    }
    static ResetshadowOffsetX(Context) {
        Context.shadowOffsetX = 0;
    }
    static ResetshadowOffsetY(Context) {
        Context.shadowOffsetY = 0;
    }

    //Drawers
    static DrawLine(Context, x_start, y_start, x_end, y_end, Line_Color, width, Line_Cap) {
        Context.beginPath();

        Context.moveTo(x_start, y_start);
        Context.lineTo(x_end, y_end);

        if (Line_Cap) {
            Context.lineCap = Line_Cap;
        }
        if (width) {
            Context.lineWidth = width;
        }
        if (Line_Color) {
            Context.strokeStyle = Line_Color;
        }
        Context.closePath();
        Context.stroke();

        GraphicsManager.ResetlineCap(Context);
        GraphicsManager.ResetlineWidth(Context);
        GraphicsManager.ResetstrokeStyle(Context);
    }
    static DrawPolygon(Context, Polygon, Line_Color, Line_Width, Line_Cap, Fill_Color) {
        //A Polygon is Composed By 2 Arrays (x's and y's), being x, the 0 index, and y the 1 index
        let x, y;
        x = Polygon[0];
        y = Polygon[1];

        Context.beginPath();

        for (let i = 0; i < x.length && i < y.length; i++) {
            if (i == 0) {
                Context.moveTo(x[i], y[i]);
            }
            else {
                Context.lineTo(x[i], y[i]);
            }
        }

        //it must draw a line to the initial point  :/

        Context.lineTo(x[0], y[0]);

        if (Fill_Color) {
            Context.fillStyle = Fill_Color;
            Context.fill();
        }

        if (Line_Color) {
            Context.strokeStyle = Line_Color;
        }

        if (Line_Width) {
            Context.lineWidth = Line_Width;
        }

        if (Line_Cap) {
            Context.lineCap = Line_Cap;
        }

        Context.closePath();
        Context.stroke();

        GraphicsManager.ResetfillStyle(Context);
        GraphicsManager.ResetstrokeStyle(Context);
        GraphicsManager.ResetlineWidth(Context);
        GraphicsManager.ResetlineCap(Context);
    }
    static DrawPolygonForGrid(Context, Polygon, Fill) {
        let x, y;
        x = Polygon[0];
        y = Polygon[1];

        Context.beginPath();

        for (let i = 0; i < x.length && i < y.length; i++) {
            if (i == 0) {
                Context.moveTo(x[i], y[i]);
            }
            else {
                Context.lineTo(x[i], y[i]);
            }
        }

        Context.lineTo(x[0], y[0]);

        if (Fill) {
            Context.fill();
        }

        Context.closePath();
        Context.stroke();
    }
    static DrawPolygonGrid(Context, Matrix, Line_Color, Line_Width, Line_Cap, Fill_Color) {
        //WARNING: Extremely Inneficient

        if (Fill_Color) {
            Context.fillStyle = Fill_Color;
        }

        if (Line_Color) {
            Context.strokeStyle = Line_Color;
        }

        if (Line_Width) {
            Context.lineWidth = Line_Width;
        }

        if (Line_Cap) {
            Context.lineCap = Line_Cap;
        }

        for (let i = 0; i < Matrix.length; i++) {
            GraphicsManager.DrawPolygonForGrid(Context, Matrix[i], Fill_Color);
        }

        GraphicsManager.ResetfillStyle(Context);
        GraphicsManager.ResetstrokeStyle(Context);
        GraphicsManager.ResetlineWidth(Context);
        GraphicsManager.ResetlineCap(Context);
    }
    static DrawText(Context, Text, x, y, Font, Fill, Color, Alignment, Baseline) {
        if (Font) {
            Context.font = Font;
        }
        if (Alignment) {
            Context.textAlign = Alignment;
        }
        if (Baseline) {
            Context.textBaseline = Baseline;
        }
        if (Fill) {
            Context.fillStyle = Fill;
            Context.fillText(Text, x, y);
        }
        if (Color) {
            Context.strokeStyle = Color;
            Context.strokeText(Text, x, y);
        }

        GraphicsManager.Resetfont(Context);
        GraphicsManager.ResettextAlign(Context);
        GraphicsManager.ResettextBaseline(Context);
        GraphicsManager.ResetfillStyle(Context);
        GraphicsManager.ResetstrokeStyle(Context);
    }

    static GenerateLinearGradient(Context, x_start, y_start, x_end, y_end, Array_of_Colors) {
        let gradient = Context.createLinearGradient(x_start, y_start, x_end, y_end);

        const multiplier = (1 / Array_of_Colors.length);

        for (let i = 0; i < Array_of_Colors.length; i++) {
            gradient.addColorStop(i * multiplier, Array_of_Colors[i]);
        }

        return gradient;
    }
}