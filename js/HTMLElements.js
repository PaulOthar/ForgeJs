class HTMLElements{
    //Most Basic Ones
    static Canvas = document.getElementById('canvas');
    static Context = HTMLElements.Canvas.getContext('2d');

    //Basic Information
    static Mid_Width = HTMLElements.Canvas.offsetWidth / 2;
    static Mid_Height = HTMLElements.Canvas.offsetHeight / 2;

    //Colour Form = F1
    static F1_color = document.getElementById('color');
    static F1_norcol = document.getElementById('norcol');
    static F1_invcol = document.getElementById('invcol');
    static F1_Red = document.getElementById('Red');
    static F1_Green = document.getElementById('Green');
    static F1_Blue = document.getElementById('Blue');

    //Polygon Form = F2
    static F2_PolygonLabel = document.getElementById('PolygonLabel');
    static F2_Polygon = document.getElementById('Polygon');
    static F2_Generate = document.getElementById('Generate');
}

//Canvas 3D Drawing
{
    MouseManager.AddBasicProperties(HTMLElements.Canvas);
    MouseManager.AddBasicReadings(HTMLElements.Canvas);
    MouseManager.BasicOnMouseDown(HTMLElements.Canvas);
    MouseManager.BasicOnMouseUp(HTMLElements.Canvas);
    let Width_Distance = 0,Height_Distance = 0;
    let Angle = 90,Modifier = 2;
    let proto = function () {
        GraphicsManager.ClearCanvas('canvas','2d');
        Width_Distance = (HTMLElements.Canvas.MouseManager_Where_X_MouseDown) - (HTMLElements.Canvas.MouseManager_MouseX);
        Height_Distance = (HTMLElements.Canvas.MouseManager_Where_Y_MouseDown) - (HTMLElements.Canvas.MouseManager_MouseY);
    
        Angle = Angle+Width_Distance;
        if(Modifier+Height_Distance/10 > 1 && Modifier+Height_Distance/10 < 10){
            Modifier = Modifier+Height_Distance/10;
        }
    
        GraphicsManager.DrawPolygon(HTMLElements.Context, AnalyticGeometry.RadiusLimitedIrregularPolygon(HTMLElements.Mid_Width, HTMLElements.Mid_Height, 100, 5, Angle, 1, Modifier), "green", false, "round", false);
        GraphicsManager.DrawAxis('canvas', '2d', 'white', 0.5, false);
        HTMLElements.Canvas.MouseManager_Where_Y_MouseDown = HTMLElements.Canvas.MouseManager_MouseY;
        HTMLElements.Canvas.MouseManager_Where_X_MouseDown = HTMLElements.Canvas.MouseManager_MouseX;
    }
    
    MouseManager.BasicOnMouseHolding(HTMLElements.Canvas, proto);
}

//Color Settings
{
    HTMLElements.F1_norcol.onclick = function () {
        GraphicsManager.SetHTMLBackgroundColor(HTMLElements.F1_color.value);
    }
    HTMLElements.F1_invcol.onclick = function () {
        let color = "";
    
        color.toUpperCase();
        color = CustomMath.InvertColor(HTMLElements.F1_color.value.toUpperCase());
    
        GraphicsManager.SetHTMLBackgroundColor(color);
    }

    let commonfunc = function(){
        let Hred, Hgreen, Hblue;
        Hred = CustomMath.DecimalToRGBUnit(HTMLElements.F1_Red.value);
        Hgreen = CustomMath.DecimalToRGBUnit(HTMLElements.F1_Green.value);
        Hblue = CustomMath.DecimalToRGBUnit(HTMLElements.F1_Blue.value);
        let color = "#" + Hred + Hgreen + Hblue;
    
        HTMLElements.F1_color.value = color;
    }
    
    MouseManager.AddBasicProperties(HTMLElements.F1_Red);
    MouseManager.AddBasicProperties(HTMLElements.F1_Green);
    MouseManager.AddBasicProperties(HTMLElements.F1_Blue);
    
    MouseManager.BasicOnMouseDown(HTMLElements.F1_Red);
    MouseManager.BasicOnMouseUp(HTMLElements.F1_Red);
    MouseManager.BasicOnMouseDown(HTMLElements.F1_Green);
    MouseManager.BasicOnMouseUp(HTMLElements.F1_Green);
    MouseManager.BasicOnMouseDown(HTMLElements.F1_Blue);
    MouseManager.BasicOnMouseUp(HTMLElements.F1_Blue);
    
    MouseManager.OnMouseHolding(HTMLElements.F1_Red, commonfunc);
    MouseManager.OnMouseHolding(HTMLElements.F1_Green, commonfunc);
    MouseManager.OnMouseHolding(HTMLElements.F1_Blue, commonfunc);
}

//Polygon Drawing
{
    HTMLElements.F2_Generate.onclick = function(){
        GraphicsManager.ClearCanvas('canvas','2d');
    
        let Input = HTMLElements.F2_Polygon.value;
        let NumericArrayInput = [];
        let Current_Number;
        Input = Input.split(",");
    
        for(let i = 0;i<Input.length;i++){
            Current_Number = parseFloat(Input[i]);
            if(Current_Number != NaN){
                NumericArrayInput.push(Current_Number);
            }
            else{
                NumericArrayInput.push(0);
            }
        }
        let Polygon = AnalyticGeometry.DifferentSidesIrregularPolygon(HTMLElements.Mid_Width,HTMLElements.Mid_Height,NumericArrayInput);
        GraphicsManager.DrawPolygon(HTMLElements.Context,Polygon,'green',1,false,false);
        console.log("NumericArrayInput:",NumericArrayInput);
        console.log("Polygon:",Polygon);
        console.log("ModulesOfPolygon:",AnalyticGeometry.ModulesOfPolygon(Polygon));
        GraphicsManager.DrawAxis('canvas', '2d', 'white', 0.5, false);
        HTMLElements.Context.beginPath();
        HTMLElements.Context.arc(HTMLElements.Mid_Width,HTMLElements.Mid_Height, 100, 0, 2 * Math.PI);
        HTMLElements.Context.stroke();
    }
}