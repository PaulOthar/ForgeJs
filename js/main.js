GraphicsManager.SetHTMLBackgroundColor('black');
GraphicsManager.DrawAxis('canvas', '2d', 'white', 1, false);

GraphicsManager.DrawPolygonGrid(GraphicsManager.GetCanvasContextByName('canvas'), ShapeManager.DiamondQuadrilateralMatrix(400, 100, 10, 10, 64, 32), "green", false, false, false);
GraphicsManager.DrawText(GraphicsManager.GetCanvasContextByName('canvas'), "Sésgo 👁👄👁", 100, 100, CanvasPropertyIndex.BuildFont(CanvasPropertyIndex.FontFamily_Arial, CanvasPropertyIndex.FontSize(50), CanvasPropertyIndex.fontWeight_900, CanvasPropertyIndex.fontVariant_small_caps, CanvasPropertyIndex.fontStyle_italic), 'white', 'red', false, false);

//Gambiarra
function importJSFile(ScriptName,folderName,Id){
    let scr = document.createElement('script');
    scr.src = `${folderName}/${ScriptName}.js`;
    scr.id = Id;
    document.body.appendChild(scr);
}

let but1 = document.getElementById('norcol');
let but2 = document.getElementById('invcol');
let colselec = document.getElementById('color');

but1.onclick = function(){
    GraphicsManager.SetHTMLBackgroundColor(colselec.value);
}
but2.onclick = function(){
    let color = "";

    color.toUpperCase();
    color = CustomMath.InvertColor(colselec.value.toUpperCase());

    GraphicsManager.SetHTMLBackgroundColor(color);
}

let red = document.getElementById('Red');
let green = document.getElementById('Green');
let blue = document.getElementById('Blue');

let commonfunc = function(){
    let Hred,Hgreen,Hblue;
    Hred = CustomMath.DecimalToRGBUnit(red.value);
    Hgreen = CustomMath.DecimalToRGBUnit(green.value);
    Hblue = CustomMath.DecimalToRGBUnit(blue.value);

    let color = "#"+Hred+Hgreen+Hblue;
    
    colselec.value = color;
}

MouseManager.OnMouseHolding(red,commonfunc);
MouseManager.OnMouseHolding(green,commonfunc);
MouseManager.OnMouseHolding(blue,commonfunc);

//red.onchange = commonfunc;
//green.onchange = commonfunc;
//blue.onchange = commonfunc;

