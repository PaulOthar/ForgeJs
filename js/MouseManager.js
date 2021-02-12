class MouseManager{
    static AddBasicProperties(Element){
        Element.MouseManager_MouseDown = false;
        Element.MouseManager_MouseUp = true;
        Element.MouseManager_MouseX = 0;
        Element.MouseManager_MouseY = 0;
    }

    static OnMouseHolding(Element,Handler){
        //Adding Some Properties

        MouseManager.AddBasicProperties(Element);

        //Adding Some Custom Methods
        
        Element.onmousedown = function(){
            Element.MouseManager_MouseDown = true;
            Element.MouseManager_MouseUp = false;
        }
        Element.onmouseup = function(){
            Element.MouseManager_MouseDown = false;
            Element.MouseManager_MouseUp = true;
        }
        Element.onmousemove = function(){
            if(Element.MouseManager_MouseDown){
                Handler();
            }
        }
    }
}