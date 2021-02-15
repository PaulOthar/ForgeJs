class MouseManager {
    static AddBasicProperties(Element) {
        Element.MouseManager_MouseDown = false;
        Element.MouseManager_MouseUp = true;
        Element.MouseManager_MouseX = 0;
        Element.MouseManager_MouseY = 0;
        Element.MouseManager_Where_X_MouseDown = 0;
        Element.MouseManager_Where_Y_MouseDown = 0;
        Element.MouseManager_Where_X_MouseUp = 0;
        Element.MouseManager_Where_Y_MouseUp = 0;
    }

    static AddBasicFunctionality(Element) {
        MouseManager.BasicOnMouseDown(Element, false);
        MouseManager.BasicOnMouseUp(Element, false);
        MouseManager.BasicOnMouseMove(Element, false);
    }

    static AddBasicReadings(Element) {
        MouseManager.Add_GetMouseAxis(Element);
        MouseManager.Add_GetMouseDownLocation(Element);
        MouseManager.Add_GetMouseState(Element);
        MouseManager.Add_GetMouseUpLocation(Element);
    }

    static SetBasicMouse(Element) {
        MouseManager.AddBasicProperties(Element);
        MouseManager.AddBasicFunctionality(Element);
        MouseManager.AddBasicReadings(Element);
    }

    static GetCurrentMouseAxis(Element) {
        let x = event.pageX - Element.offsetLeft;
        let y = event.pageY - Element.offsetTop;

        return [x, y];
    }

    static OnMouseHolding(Element, Handler) {

        Element.onmousemove = function () {
            if (Element.MouseManager_MouseDown) {
                Handler();
            }
        }
    }

    //The Full List of Things To Add

    static BasicOnMouseDown(Element, Handler) {
        if (Handler) {
            Element.onmousedown = function () {
                Element.MouseManager_MouseDown = true;
                Element.MouseManager_MouseUp = false;

                let coords = MouseManager.GetCurrentMouseAxis(Element);

                Element.MouseManager_Where_X_MouseDown = coords[0];
                Element.MouseManager_Where_Y_MouseDown = coords[1];

                Handler();
            }
        }
        else {
            Element.onmousedown = function () {
                Element.MouseManager_MouseDown = true;
                Element.MouseManager_MouseUp = false;

                let coords = MouseManager.GetCurrentMouseAxis(Element);

                Element.MouseManager_Where_X_MouseDown = coords[0];
                Element.MouseManager_Where_Y_MouseDown = coords[1];
            }
        }
    }
    static BasicOnMouseUp(Element, Handler) {
        if (Handler) {
            Element.onmouseup = function () {
                Element.MouseManager_MouseDown = false;
                Element.MouseManager_MouseUp = true;

                let coords = MouseManager.GetCurrentMouseAxis(Element);

                Element.MouseManager_Where_X_MouseUp = coords[0];
                Element.MouseManager_Where_Y_MouseUp = coords[1];

                Handler();
            }
        }
        else {
            Element.onmouseup = function () {
                Element.MouseManager_MouseDown = false;
                Element.MouseManager_MouseUp = true;

                let coords = MouseManager.GetCurrentMouseAxis(Element);

                Element.MouseManager_Where_X_MouseUp = coords[0];
                Element.MouseManager_Where_Y_MouseUp = coords[1];
            }
        }
    }
    static BasicOnMouseMove(Element, Handler) {
        if (Handler) {
            Element.onmousemove = function () {
                let coords = MouseManager.GetCurrentMouseAxis(Element);

                Element.MouseManager_MouseX = coords[0];
                Element.MouseManager_MouseY = coords[1];

                Handler();
            }
        }
        else {
            Element.onmousemove = function () {
                let coords = MouseManager.GetCurrentMouseAxis(Element);

                Element.MouseManager_MouseX = coords[0];
                Element.MouseManager_MouseY = coords[1];
            }
        }
    }
    static BasicOnMouseHolding(Element, Handler) {
        let NewHandler = function(){

            if (Element.MouseManager_MouseDown) {
                Handler();
            }
            
        }
        MouseManager.BasicOnMouseMove(Element,NewHandler);
    }

    static Add_GetMouseAxis(Element) {
        Element.GetMouseAxis = function () {
            return [Element.MouseManager_MouseX, Element.MouseManager_MouseY]
        }
    }
    static Add_GetMouseState(Element) {
        Element.GetMouseState = function () {
            return [Element.MouseManager_MouseDown, Element.MouseManager_MouseUp];
        }
    }
    static Add_GetMouseDownLocation(Element) {
        Element.GetMouseDownLocation = function () {
            return [Element.MouseManager_Where_X_MouseDown, Element.MouseManager_Where_Y_MouseDown];
        }
    }
    static Add_GetMouseUpLocation(Element) {
        Element.GetMouseUpLocation = function () {
            return [Element.MouseManager_Where_X_MouseUp, Element.MouseManager_Where_Y_MouseUp];
        }
    }
}