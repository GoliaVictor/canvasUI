class Base {
    constructor(width=0, height=0) {
        this.x;
        this.y;
        this.width = width;
        this.height = height;

        this.clickable = false;
        this.typeable = false;
        this.scrollable = false;
        this.alignment = "leading";
        this.hiddenVar = false;
        this.phantomVar = false;

        this.centeredVar = false;
        this.lockedVar = false;

        this.popupID = "";
        this.canSelect = true;
    }

    pipe(popupID, canSelect) {
        if (popupID !== undefined) this.popupID = popupID;
        if (canSelect !== undefined) this.canSelect = canSelect;
        if (this.contents[this.displayState]) if (this.contents[this.displayState].clickable) this.contents[this.displayState].pipe(popupID, canSelect)
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }

        if (this.hiddenVar == false) {
            if (context) {

            }
            else {
                
            }
        }
    }

    setWidth(value) {
        this.width = value;
        return this;
    }
    setHeight(value) {
        this.height = value;
        return this;
    }

    align(value) {
        if (value == "leading" || value == "center" || value == "trailing") {
            this.alignment = value;
        }
        else {
            logCanvasUIError(`Invalid alignment: '${value}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
        }
        return this;
    }

    hidden(value=true) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value=true) {
        this.phantomVar = value;
        return this;
    }
    centered(value=true) {
        this.centeredVar = value;
        return this;
    }

}class Blank {
    constructor(width=0, height=0) {
        this.x;
        this.y;
        this.width = width;
        this.height = height;

        this.centeredVar = false;

        this.clickable = false;
        this.typeable = false;
        this.scrollable = false;
        this.alignment = "leading";
        this.phantomVar = false;
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }
    }

    phantom(value=true) {
        this.phantomVar = value;
        return this;
    }

    setWidth(value) {
        this.width = value;
        return this;
    }
    setHeight(value) {
        this.height = value;
        return this;
    }

    centered(value=true) {
        this.centeredVar = value;
        return this;
    }

    mouseOver() {
        if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) return true;
        return false;
    }
}class Block {
    constructor(width=50, height=50) {
        this.x;
        this.y;
        this.width = width;
        this.height = height;

        this.clickable = false;
        this.typeable = false;
        this.scrollable = false;
        this.alignment = "leading";
        this.phantomVar = false;
        this.hiddenVar = false;

        this.centeredVar = false;

        this.backgroundVar = Color.primary;
        this.borderVar = Color.transparent;
        this.borderWeightVar = 1;
        this.cornerRadiusVar = [0, 0, 0, 0];
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }

        if (this.hiddenVar == false) {
            if (context) {
                // Render on to specified context
                let x = this.x - contextX;
                let y = this.y - contextY;
                context.push()
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(x, y, this.width, this.height, context)
                    context.noFill()
                }
                else {
                    context.fill(this.backgroundVar)
                }
                context.stroke(this.borderVar)
                context.strokeWeight(this.borderWeightVar)
                context.rect(x, y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                context.pop()
            }
            else {
                // Render directly on to main canvas
                push()
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(this.x, this.y, this.width, this.height)
                    noFill()
                }
                else {
                    fill(this.backgroundVar)
                }
                stroke(this.borderVar)
                strokeWeight(this.borderWeightVar)
                rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                pop()
            }
        }
    }

    mouseOver() {
        if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) return true;
        return false;
    }

    setWidth(value) {
        this.width = value;
        if (this.backgroundIsImage) this.context = createGraphics(this.width, this.height)
        return this;
    }
    setHeight(value) {
        this.height = value;
        if (this.backgroundIsImage) this.context = createGraphics(this.width, this.height)
        return this;
    }

    align(value) {
        if (value == "leading" || value == "center" || value == "trailing") {
            this.alignment = value;
        }
        else {
            logCanvasUIError(`Invalid alignment: '${value}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
        }
        return this;
    }

    hidden(value=true) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value=true) {
        this.phantomVar = value;
        return this;
    }

    centered(value=true) {
        this.centeredVar = value;
        return this;
    }

    background(input) {
        this.backgroundVar = input;
        return this;
    }
    border(colour) {
        this.borderVar = colour;
        return this;
    }
    borderWeight(value) {
        this.borderWeightVar = value;
        return this;
    }
    cornerRadius(tl, tr, br, bl) {
        if (tr == undefined && br == undefined && bl == undefined) {
            // r1 applies to all corners
            this.cornerRadiusVar = [tl, tl, tl, tl];
        }
        else {
            // each one individually applies to their own corner with r1 starting at top-left and successive rs moving clockwise around the shape
            this.cornerRadiusVar = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
        }
        return this;
    }
}class Button {
    constructor(width=80, height=25) {
        this.x;
        this.y;
        this.width = width;
        this.height = height;

        this.clickable = true;
        this.typeable = false;
        this.scrollable = false;
        this.alignment = "leading";
        this.hiddenVar = false;
        this.phantomVar = false;

        this.popupVar;

        this.centeredVar = false;
        this.lockedVar = false;
        this.displayState = "default";
        this.commandVar = () => {};

        this.backgroundVar = {"default": Color.secondary, "hover": Color.brighter(Color.secondary), "pressed": Color.accent};
        this.borderVar = {"default": Color.transparent, "hover": Color.transparent, "pressed": Color.transparent};
        this.borderWeightVar = {"default": 1, "hover": 1, "pressed": 1};
        this.cornerRadiusVar = {"default": [6, 6, 6, 6], "hover": [6, 6, 6, 6], "pressed": [6, 6, 6, 6]};

        this.contents = {"default": undefined, "hover": undefined, "pressed": undefined,};
        this.pad = {"default": 0, "hover": 0, "pressed": 0};

        this.popupID = "";
        this.canSelect = true;
    }
    
    pipe(popupID, canSelect) {
        if (popupID !== undefined) this.popupID = popupID;
        if (canSelect !== undefined) this.canSelect = canSelect;
        if (this.contents[this.displayState]) if (this.contents[this.displayState].clickable) this.contents[this.displayState].pipe(popupID, canSelect)
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }

        if (this.hiddenVar == false) {
            if (this.lockedVar == false) {
                if (this.mouseOver() && this.canSelect) {
                    if (popups.mouseOver() == this.popupID || popups.mouseOver() == undefined) {
                        cursor("pointer")
                        this.displayState = `hover`
                        if (mouseIsPressed) {
                            this.displayState = `pressed`
                        }
                        doHotMouseDown = false;
                        doHotMouseUp = false;
                    }
                }
                else {
                    if (this.displayState == "hover" || this.displayState == "pressed") {
                        doHotMouseDown = true;
                        doHotMouseUp = true;
                    }
                    this.displayState = "default"
                }
            }
            
            if (context) {
                // Render on to specified context
                let x = this.x - contextX;
                let y = this.y - contextY;
                context.push()
                // Background
                if (typeof this.backgroundVar[this.displayState] == "function") {
                    this.backgroundVar[this.displayState](x, y, this.width, this.height, context)
                    context.noFill()
                }
                else {
                    context.fill(this.backgroundVar[this.displayState])
                }
                context.stroke(this.borderVar[this.displayState])
                context.strokeWeight(this.borderWeightVar[this.displayState])
                context.rect(x, y, this.width, this.height, this.cornerRadiusVar[this.displayState][0], this.cornerRadiusVar[this.displayState][1], this.cornerRadiusVar[this.displayState][2], this.cornerRadiusVar[this.displayState][3])
                
                if (this.contents[this.displayState]) {
                    if (this.contents[this.displayState].phantomVar == false) {
                        let scaleFactor = Math.min((this.width - 2*this.pad[this.displayState])/this.contents[this.displayState].width, (this.height - 2*this.pad[this.displayState])/this.contents[this.displayState].height)
                        context.translate(x + this.width/2 - this.contents[this.displayState].width/2*scaleFactor, y + this.height/2 - this.contents[this.displayState].height/2*scaleFactor)
                        context.scale(scaleFactor)
                        this.contents[this.displayState].render(0, 0)
                    }
                }
                context.pop()
            }
            else {
                // Render directly on to main canvas
                push()
                // Background
                if (typeof this.backgroundVar[this.displayState] == "function") {
                    this.backgroundVar[this.displayState](this.x, this.y, this.width, this.height)
                    noFill()
                }
                else {
                    fill(this.backgroundVar[this.displayState])
                }
                stroke(this.borderVar[this.displayState])
                strokeWeight(this.borderWeightVar[this.displayState])
                rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[this.displayState][0], this.cornerRadiusVar[this.displayState][1], this.cornerRadiusVar[this.displayState][2], this.cornerRadiusVar[this.displayState][3])
                
                if (this.contents[this.displayState]) {
                    if (this.contents[this.displayState].phantomVar == false) {
                        let scaleFactor = Math.min((this.width - 2*this.pad[this.displayState])/this.contents[this.displayState].width, (this.height - 2*this.pad[this.displayState])/this.contents[this.displayState].height)
                        translate(this.x + this.width/2 - this.contents[this.displayState].width/2*scaleFactor, this.y + this.height/2 - this.contents[this.displayState].height/2*scaleFactor)
                        scale(scaleFactor)
                        this.contents[this.displayState].render(0, 0)
                    }
                }
                pop()
            }
        }

        if (this.popupVar) {
            switch (this.popupVar.side) {
                case "left":
                    this.popupVar.x = this.x;
                    this.popupVar.y = this.y + this.height/2;
                    break;
                case "right":
                    this.popupVar.x = this.x + this.width
                    this.popupVar.y = this.y + this.height/2
                    break;
                case "top":
                    this.popupVar.x = this.x + this.width/2
                    this.popupVar.y = this.y
                    break;
                case "bottom":
                    this.popupVar.x = this.x + this.width/2
                    this.popupVar.y = this.y + this.height
                    break;
            }
        }
    }

    align(value) {
        if (value == "leading" || value == "center" || value == "trailing") {
            this.alignment = value;
        }
        else {
            logCanvasUIError(`Invalid alignment: '${value}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
        }
        return this;
    }

    hidden(value=true) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value=true) {
        this.phantomVar = value;
        return this;
    }

    centered(value=true) {
        this.centeredVar = value;
        return this;
    }

    locked(value=true) {
        this.lockedVar = value;
        return this;
    }
    
    command(func) {
        this.commandVar = func;
        return this;
    }

    onMousePressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (popups.mouseOver() == this.popupID || popups.mouseOver() == undefined) {
                if (this.lockedVar == false && this.popupVar) {
                    if (this.mouseOver() == false && this.canSelect && this.popupVar.mouseOver() == false) {
                        if (this.popupVar.hiddenVar == false) this.popupVar.hidden(true)
                    }
                }
            }
        }
    }

    onMouseReleased() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.lockedVar == false) {
                if (this.mouseOver() && this.canSelect) {
                    if (popups.mouseOver() == this.popupID || popups.mouseOver() == undefined) {
                        this.commandVar();
                        if (this.popupVar) {
                            if (this.popupVar.hiddenVar == true) this.popupVar.hidden(false)
                        }
                    }
                }
            }
        }
    }

    mouseOver() {
        if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) return true;
        return false;
    }

    setWidth(value) {
        this.width = value;
        return this;
    }

    setHeight(value) {
        this.height = value;
        return this;
    }

    popup(popup) {
        this.popupVar = popup;
        return this;
    }

    checkWhen(when, trueFunction, absentFunction, variableIdentifierText) {
        if (when) {
            let whenOptions = ["default", "hover", "pressed"]
            if (whenOptions.includes(when)) {
                trueFunction()
            }
            else {
                logCanvasUIError(`Invalid parameter '${when}' for ${variableIdentifierText}. Ensure the input is one of the following: '${whenOptions.join("', '")}'`)
            }
        }
        else {
            absentFunction()
        }
        return this;
    }

    background(input, when) {
        this.checkWhen(when, () => {
            this.backgroundVar[when] = input;
        }, () => {
            this.backgroundVar["default"] = input;
            this.backgroundVar["hover"] = input;
            this.backgroundVar["pressed"] = input;
        }, "button background")
        return this;
    }
    border(colour, when) {
        this.checkWhen(when, () => {
            this.borderVar[when] = colour;
        }, () => {
            this.borderVar["default"] = colour;
            this.borderVar["hover"] = colour;
            this.borderVar["pressed"] = colour;
        }, "button border")
        return this;
    }
    borderWeight(value, when) {
        this.checkWhen(when, () => {
            this.borderWeightVar[when] = value;
        }, () => {
            this.borderWeightVar["default"] = value;
            this.borderWeightVar["hover"] = value;
            this.borderWeightVar["pressed"] = value;
        }, "button borderWeight")
        return this;
    }
    cornerRadius(tl=this.height, tr, br, bl, when) {
        if (tr == undefined && br == undefined && bl == undefined) {
            // r1 applies to all corners
            this.checkWhen(when, () => {
                this.cornerRadiusVar[when] = [tl, tl, tl, tl];
            }, () => {
                this.cornerRadiusVar["default"] = [tl, tl, tl, tl];
                this.cornerRadiusVar["hover"] = [tl, tl, tl, tl];
                this.cornerRadiusVar["pressed"] = [tl, tl, tl, tl];
            }, "button cornerRadius")
        }
        else {
            // each one individually applies to their own corner with tl as top-left and tr as top-right etc
            this.checkWhen(when, () => {
                this.cornerRadiusVar[when] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
            }, () => {
                this.cornerRadiusVar["default"] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.cornerRadiusVar["hover"] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.cornerRadiusVar["pressed"] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
            }, "button cornerRadius")
        }
        return this;
    }

    contains(elem, when) {
        this.checkWhen(when, () => {
            this.contents[when] = elem;
        }, () => {
            this.contents["default"] = elem;
            this.contents["hover"] = elem;
            this.contents["pressed"] = elem;
        }, "button contains")
        return this;
    }

    padding(value, when) {
        this.checkWhen(when, () => {
            this.pad[when] = value;
        }, () => {
            this.pad["default"] = value;
            this.pad["hover"] = value;
            this.pad["pressed"] = value;
        }, "button padding")
        return this;
    }
}let doHotkeys = true;
let doHotMouseDown = true;
let doHotMouseUp = true;

const hotkey = {
    dataKey: {},
    dataKeyCode: {},
    dataMouseDown: {},
    dataMouseUp: {},
    onkey(when, func) {
        if (typeof when === "string") hotkey.dataKey[when] = func;
        else if (Number.isInteger(when)) hotkey.dataKeyCode[when] = func;
    },
    onmousedown(when, func) {
        if (typeof when === "string") hotkey.dataMouseDown[when] = func;
    },
    onmouseup(when, func) {
        if (typeof when === "string") hotkey.dataMouseUp[when] = func;
    },
    onKeyPressed() {
        if (doHotkeys) {
            for (let code of Object.keys(hotkey.dataKeyCode)) {
                if (keyCode == code) hotkey.dataKeyCode[code]()
            }
            for (let keyI of Object.keys(hotkey.dataKey)) {
                if (key == keyI) hotkey.dataKey[keyI]()
            }
        }
    },
    onMousePressed() {
        if (doHotMouseDown) {
            for (let mouseKey of Object.keys(hotkey.dataMouseDown)) {
                if (mouseButton == mouseKey) hotkey.dataMouseDown[mouseKey]()
            }
        }
    },
    onMouseReleased() {
        if (doHotMouseUp) {
            for (let mouseKey of Object.keys(hotkey.dataMouseUp)) {
                if (mouseButton == mouseKey) hotkey.dataMouseUp[mouseKey]()
            }
        }
    }
}
class Icon {
    constructor(svg) {
        this.svg = svg;
        this.graphicString = "";
        
        this.x;
        this.y;
        // Interpret dimensions
        this.rawWidth = parseFloat(this.svg.split('width="')[1].split('"')[0]);
        this.rawHeight = parseFloat(this.svg.split('height="')[1].split('"')[0]);
        this.width = this.rawWidth;
        this.height = this.rawHeight;
        this.scaleFactor = 1;
        this.flipHorizontallyVar = false;
        this.flipVerticallyVar = false;

        this.clickable = false;
        this.typeable = false;
        this.scrollable = false;
        this.alignment = "leading";
        this.hiddenVar = false;
        this.phantomVar = false;

        this.centeredVar = false;

        this.generateGraphicString()

        this.fillColourVar = Color.transparent;
        this.strokeColourVar = Color.primary;
        this.strokeWeightVar = 2;
    }

    generateGraphicString() {
        this.graphicString = "";
        // Get paths
        let temp = this.svg.split('<path d="')
        for (let n = 1; n < temp.length; n++) {
            let d = temp[n].split('"')[0];
            this.graphicString += this.interpretSVGPath(d);
        }
    }

    interpretSVGPath(d) {
        // Convert svg formatting to simple array of numbers
        let array = [];
        for (let i in d) {
            let char = d[i];
            if (char.match(/[a-z]/i)) {
                // is a letter
                array.push(char);
                array.push("");
            }
            else if (char == " ") {
                array.push("");
            }
            else {
                array[array.length-1] += char;
            }
        }

        let command = "";
        let closeShape = false;
        for (let i = 0; i < array.length; i++) {
            let unit = array[i]
            if (unit.match(/[a-z]/i)) {
                switch (unit) {
                    case "M":
                        if (this.flipHorizontallyVar && this.flipVerticallyVar) {
                            command += `endShape();beginShape();vertex(${this.width-array[i+1]},${this.height-array[i+2]});`;
                        }
                        else if (this.flipHorizontallyVar) {
                            command += `endShape();beginShape();vertex(${this.width-array[i+1]},${array[i+2]});`;
                        }
                        else if (this.flipVerticallyVar) {
                            command += `endShape();beginShape();vertex(${array[i+1]},${this.height-array[i+2]});`;
                        }
                        else {
                            command += `endShape();beginShape();vertex(${array[i+1]},${array[i+2]});`;
                        }
                        i += 2;
                        break;
                    case "L":
                        if (this.flipHorizontallyVar && this.flipVerticallyVar) {
                            command += `vertex(${this.width-array[i+1]},${this.height-array[i+2]});`;
                        }
                        else if (this.flipHorizontallyVar) {
                            command += `vertex(${this.width-array[i+1]},${array[i+2]});`;
                        }
                        else if (this.flipVerticallyVar) {
                            command += `vertex(${array[i+1]},${this.height-array[i+2]});`;
                        }
                        else {
                            command += `vertex(${array[i+1]},${array[i+2]});`;
                        }
                        i += 2;
                        break;
                    case "H":
                        if (this.flipHorizontallyVar && this.flipVerticallyVar) {
                            command += `vertex(${this.width-array[i+1]},${this.height-array[i-1]});`;
                        }
                        else if (this.flipHorizontallyVar) {
                            command += `vertex(${this.width-array[i+1]},${array[i-1]});`;
                        }
                        else if (this.flipVerticallyVar) {
                            command += `vertex(${array[i+1]},${this.height-array[i-1]});`;
                        }
                        else {
                            command += `vertex(${array[i+1]},${array[i-1]});`;
                        }
                        i += 1;
                        break;
                    case "V":
                        if (this.flipHorizontallyVar && this.flipVerticallyVar) {
                            command += `vertex(${this.width-array[i-2]},${this.height-array[i+1]});`;
                        }
                        else if (this.flipHorizontallyVar) {
                            command += `vertex(${this.width-array[i-2]},${array[i+1]});`;
                        }
                        else if (this.flipVerticallyVar) {
                            command += `vertex(${array[i-2]},${this.height-array[i+1]});`;
                        }
                        else {
                            command += `vertex(${array[i-2]},${array[i+1]});`;
                        }
                        i += 1;
                        break;
                    case "C":
                        if (this.flipHorizontallyVar && this.flipVerticallyVar) {
                            command += `bezierVertex(${this.width-array[i+1]},${this.height-array[i+2]},${this.width-array[i+3]},${this.height-array[i+4]},${this.width-array[i+5]},${this.height-array[i+6]});`;
                        }
                        else if (this.flipHorizontallyVar) {
                            command += `bezierVertex(${this.width-array[i+1]},${array[i+2]},${this.width-array[i+3]},${array[i+4]},${this.width-array[i+5]},${array[i+6]});`;
                        }
                        else if (this.flipVerticallyVar) {
                            command += `bezierVertex(${array[i+1]},${this.height-array[i+2]},${array[i+3]},${this.height-array[i+4]},${array[i+5]},${this.height-array[i+6]});`;
                        }
                        else {
                            command += `bezierVertex(${array[i+1]},${array[i+2]},${array[i+3]},${array[i+4]},${array[i+5]},${array[i+6]});`;
                        }
                        i += 6;
                        break;
                    case "Q":
                        if (this.flipHorizontallyVar && this.flipVerticallyVar) {
                            command += `quadraticVertex(${this.width-array[i+1]},${this.height-array[i+2]},${this.width-array[i+3]},${this.height-array[i+4]});`;
                        }
                        else if (this.flipHorizontallyVar) {
                            command += `quadraticVertex(${this.width-array[i+1]},${array[i+2]},${this.width-array[i+3]},${array[i+4]});`;
                        }
                        else if (this.flipVerticallyVar) {
                            command += `quadraticVertex(${array[i+1]},${this.height-array[i+2]},${array[i+3]},${this.height-array[i+4]});`;
                        }
                        else {
                            command += `quadraticVertex(${array[i+1]},${array[i+2]},${array[i+3]},${array[i+4]});`;
                        }
                        i += 4;
                        break;
                    case "Z":
                    case "z":
                        command += `endShape(CLOSE);`
                        closeShape = true;
                        break;
                }
            }
        }

        if (!closeShape) {
            command += `endShape();`
        }

        command = command.slice(11)

        return command;
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }
        if (context) {
            // Render on to specified context
            let x = this.x - contextX;
            let y = this.y - contextY;
            if (this.hiddenVar == false) {
                context.push()
                context.translate(x, y)
                context.scale(this.scaleFactor)
                context.fill(this.fillColourVar)
                context.stroke(this.strokeColourVar)
                context.strokeWeight(this.strokeWeightVar)
                let temp = this.graphicString.split(";")
                temp.pop()
                temp = temp.join(";context.")
                temp = "context." + temp;
                eval(temp)
                context.pop()
            }
        }
        else {
            // Render directly on to main canvas
            if (this.hiddenVar == false) {
                push()
                translate(this.x, this.y)
                scale(this.scaleFactor)
                fill(this.fillColourVar)
                stroke(this.strokeColourVar)
                strokeWeight(this.strokeWeightVar)
                eval(this.graphicString)
                pop()
            }
        }
    }

    scale(value) {
        this.scaleFactor = value;
        return this;
    }

    setWidth(value) {
        this.scaleFactor = value/this.rawWidth;
        this.height = this.rawHeight*this.scaleFactor;
        this.width = value;
        return this;
    }
    setHeight(value) {
        this.scaleFactor = value/this.rawHeight;
        this.width = this.rawWidth*this.scaleFactor;
        this.height = value;
        return this;
    }

    mouseOver() {
        if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) return true;
        return false;
    }

    align(value) {
        if (value == "leading" || value == "center" || value == "trailing") {
            this.alignment = value;
        }
        else {
            logCanvasUIError(`Invalid alignment: '${value}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
        }
        return this;
    }

    hidden(value=true) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value=true) {
        this.phantomVar = value;
        return this;
    }

    centered(value=true) {
        this.centeredVar = value;
        return this;
    }

    fill(colour) {
        this.fillColourVar = colour;
        return this;
    }
    stroke(colour) {
        this.strokeColourVar = colour;
        return this;
    }
    strokeWeight(value) {
        this.strokeWeightVar = value;
        return this;
    }

    flipHorizontally(value=true) {
        this.flipHorizontallyVar = value;
        this.generateGraphicString()
        return this;
    }

    flipVertically(value=true) {
        this.flipVerticallyVar = value;
        this.generateGraphicString()
        return this;
    }
}class ImageView {
    constructor(path, width=100, height=100) {
        this.x;
        this.y;

        this.clickable = false;
        this.typeable = false;
        this.scrollable = false;
        this.alignment = "leading";
        this.phantomVar = false;
        this.hiddenVar = false;

        this.centeredVar = false;

        this.binding = "";
        this.value = {x: 0, y: 0};
        
        this.aspectRatioVar = "fit"
        this.width = width;
        this.height = height;
        p.loadImage(path, img => {
            this.contents = img;
            this.context = p.createGraphics(this.width, this.height)
        })

        this.borderVar = Color.transparent;
        this.borderWeightVar = 1;
        this.cornerRadiusVar = [10, 10, 10, 10]
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }

        if (this.hiddenVar == false) {
            if (this.binding != "") {
                if (this.value.x != eval(this.binding).x) {
                    this.value.x = eval(this.binding).x
                }
                if (this.value.y != eval(this.binding).y) {
                    this.value.y = eval(this.binding).y
                }
            }

            if (context) {
                // Render directly on to main canvas
                let x = this.x - contextX;
                let y = this.y - contextY;
                context.push()
                if (this.contents) {
                    this.context.clear()
                    switch (this.aspectRatioVar) {
                        case "fit":
                            // fit
                            if (this.width < this.height) {
                                // Align size with width
                                let newHeight = this.width/this.contents.width*this.contents.height;
                                this.context.image(this.contents, this.value.x, (this.height-newHeight)/2+this.value.y, this.width, newHeight)
                            }
                            else {
                                // Align size with height
                                let newWidth = this.height/this.contents.height*this.contents.width;
                                this.context.image(this.contents, (this.width-newWidth)/2+this.value.x, this.value.y, newWidth, this.height)
                            }
                            break;
                        case "stretch":
                            this.context.image(this.contents, this.value.x, this.value.y, this.width, this.height)
                            break;
                        case "fill":
                            if (this.width > this.height) {
                                // Align size with width
                                let newHeight = this.width/this.contents.width*this.contents.height;
                                this.context.image(this.contents, this.value.x, (this.height-newHeight)/2+this.value.y, this.width, newHeight)
                            }
                            else {
                                // Align size with height
                                let newWidth = this.height/this.contents.height*this.contents.width;
                                this.context.image(this.contents, (this.width-newWidth)/2+this.value.x, this.value.y, newWidth, this.height)
                            }
                            break;
                    }
                    // fill
                    this.roundContextCorners()
                    context.image(this.context, x, y, this.width, this.height)
                }
                
                context.noFill()
                context.stroke(this.borderVar)
                context.strokeWeight(this.borderWeightVar)
                context.rect(x, y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                context.pop()
            }
            else {
                // Render directly on to main canvas
                push()
                if (this.contents) {
                    this.context.clear()
                    switch (this.aspectRatioVar) {
                        case "fit":
                            // fit
                            if (this.width < this.height) {
                                // Align size with width
                                let newHeight = this.width/this.contents.width*this.contents.height;
                                this.context.image(this.contents, this.value.x, (this.height-newHeight)/2+this.value.y, this.width, newHeight)
                            }
                            else {
                                // Align size with height
                                let newWidth = this.height/this.contents.height*this.contents.width;
                                this.context.image(this.contents, (this.width-newWidth)/2+this.value.x, this.value.y, newWidth, this.height)
                            }
                            break;
                        case "stretch":
                            this.context.image(this.contents, this.value.x, this.value.y, this.width, this.height)
                            break;
                        case "fill":
                            if (this.width > this.height) {
                                // Align size with width
                                let newHeight = this.width/this.contents.width*this.contents.height;
                                this.context.image(this.contents, this.value.x, (this.height-newHeight)/2+this.value.y, this.width, newHeight)
                            }
                            else {
                                // Align size with height
                                let newWidth = this.height/this.contents.height*this.contents.width;
                                this.context.image(this.contents, (this.width-newWidth)/2+this.value.x, this.value.y, newWidth, this.height)
                            }
                            break;
                    }
                    this.roundContextCorners()
                    image(this.context, x, y, this.width, this.height)
                }
                
                noFill()
                stroke(this.borderVar)
                strokeWeight(this.borderWeightVar)
                rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                pop()
            }
        }
    }

    bind(target) {
        this.binding = target;
        return this;
    }

    set({x, y}) {
        if (x !== undefined) this.value.x = x;
        if (y !== undefined) this.value.y = y;
        if (this.binding != "") eval(`${this.binding} = this.value`)
        return this;
    }

    mouseOver() {
        if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) return true;
        return false;
    }

    setWidth(value) {
        this.width = value;
        this.context.width = this.width;
        return this;
    }
    setHeight(value) {
        this.height = value;
        this.context.height = this.height;
        return this;
    }
    // value == "top-left" || value == "top" || value == "top-right" || value == "right" || value == "bottom-right" || value == "bottom" || value == "bottom-left" || value == "left"
    aspectRatio(value) {
        if (value == "fit" || value == "fill" || value == "stretch") {
            this.aspectRatioVar = value;
        }
        else {
            logCanvasUIError(`Invalid aspect ratio: '${value}'. Ensure alignment is either 'fit', 'fill', or 'stretch'.`)
        }
        return this;
    }

    align(value) {
        if (value == "leading" || value == "center" || value == "trailing") {
            this.alignment = value;
        }
        else {
            logCanvasUIError(`Invalid alignment: '${value}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
        }
        return this;
    }

    hidden(value=true) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value=true) {
        this.phantomVar = value;
        return this;
    }

    centered(value=true) {
        this.centeredVar = value;
        return this;
    }

    roundContextCorners() {
        this.context.loadPixels()
        let radii = this.cornerRadiusVar;
        for (let i = 0; i < radii.length; i++) {
            if (this.width < this.height && radii[i] > this.width/2) {
                radii[i] = this.width/2;
            }
            else if (this.width > this.height && radii[i] > this.height/2) {
                radii[i] = this.height/2;
            }
        }
        if (radii[0] == radii[1] && radii[1] == radii[2] && radii[2] == radii[3]) {
            for (let row=0.5; row < radii[0]; row++) {
                for (let col=0.5; col < radii[0]; col++) {
                    if ((row-radii[0])**2 + (col-radii[0])**2 > radii[0]**2) {
                        this.context.set((col-0.5), (row-0.5), Color.transparent)
                        this.context.set(this.width-(col-0.5), (row-0.5), Color.transparent)
                        this.context.set(this.width-(col-0.5), this.height-(row-0.5), Color.transparent)
                        this.context.set((col-0.5), this.height-(row-0.5), Color.transparent)
                    }
                }
            }
        }
        else {
            for (let row=0.5; row < radii[0]; row++) {
                for (let col=0.5; col < radii[0]; col++) {
                    if ((row-radii[0])**2 + (col-radii[0])**2 > radii[0]**2) {
                        this.context.set(col-0.5, row-0.5, Color.transparent)
                    }
                }
            }
            for (let row=0.5; row < radii[1]; row++) {
                for (let col=0.5; col < radii[1]; col++) {
                    if ((row-radii[1])**2 + (col-radii[1])**2 > radii[1]**2) {
                        this.context.set(this.width-(col-0.5), row-0.5, Color.transparent)
                    }
                }
            }
            for (let row=0.5; row < radii[2]; row++) {
                for (let col=0.5; col < radii[2]; col++) {
                    if ((row-radii[2])**2 + (col-radii[2])**2 > radii[2]**2) {
                        this.context.set(this.width-(col-0.5), this.height-(row-0.5), Color.transparent)
                    }
                }
            }
            for (let row=0.5; row < radii[3]; row++) {
                for (let col=0.5; col < radii[3]; col++) {
                    if ((row-radii[3])**2 + (col-radii[3])**2 > radii[3]**2) {
                        this.context.set(col-0.5, this.height-(row-0.5), Color.transparent)
                    }
                }
            }
        }
        this.context.updatePixels()
    }

    border(colour) {
        this.borderVar = colour;
        return this;
    }
    borderWeight(value) {
        this.borderWeightVar = value;
        return this;
    }
    cornerRadius(tl, tr, br, bl) {
        if (tr == undefined && br == undefined && bl == undefined) {
            // r1 applies to all corners
            this.cornerRadiusVar = [tl, tl, tl, tl];
        }
        else {
            // each one individually applies to their own corner with r1 starting at top-left and successive rs moving clockwise around the shape
            this.cornerRadiusVar = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
        }
        return this;
    }

}class Panel {
    constructor() {
        this.x;
        this.y;
        this.width = 0;
        this.height = 0;
        this.contents = [];
        this.pad = 15;

        this.minWidthVar = 3*this.pad;
        this.minHeightVar = 2*this.pad;
        this.spacingVar = 7.5;
        
        this.clickable = true;
        this.typeable = true;
        this.scrollable = true;
        this.alignment = "leading"
        this.hiddenVar = false;
        this.phantomVar = false;

        this.centeredVar = false;

        this.backgroundVar = Color.nearInverse;
        this.borderVar = Color.transparent;
        this.borderWeightVar = 1;
        this.cornerRadiusVar = [0, 0, 0, 0];

        this.popupID = "";
        this.canSelect = true;
    }

    pipe(popupID, canSelect) {
        if (popupID !== undefined) this.popupID = popupID;
        if (canSelect !== undefined) this.canSelect = canSelect;
        for (let n = 0; n < this.contents.length; n++) {
            if (this.contents[n].clickable) this.contents[n].pipe(popupID, canSelect)
        }
    }

    calcDimensions() {
        this.width = 3*this.pad;
        this.height = 2*this.pad;
        for (let n = 0; n < this.contents.length; n++) {
            let elem = this.contents[n]
            if (elem.phantomVar == false) {
                this.width = Math.max(this.width, elem.width + 3*this.pad);
                this.height += elem.height;
                if (elem.constructor.name == "Label") {
                    this.height += this.spacingVar/2
                }
                else {
                    if (n != this.contents.length-1) this.height += this.spacingVar
                    if (elem.constructor.name == "Title") {
                        if (n != 0) this.height += this.spacingVar
                    }
                }
            }
        }

        this.width = Math.max(this.width, this.minWidthVar)
        this.height = Math.max(this.height, this.minHeightVar)
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }
        this.calcDimensions()

        if (this.hiddenVar == false) {
            if (context) {
                // Render on to specified context
                let x = this.x - contextX;
                let y = this.y - contextY;
                context.push()
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(x, y, this.width, this.height, context)
                    context.noFill()
                }
                else {
                    context.fill(this.backgroundVar)
                }
                context.stroke(this.borderVar)
                context.strokeWeight(this.borderWeightVar)
                context.rect(x, y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                context.pop()
                let ySweep = this.pad;
                for (let n = 0; n < this.contents.length; n++) {
                    const elem = this.contents[n]
                    if (elem.phantomVar == false) {
                        switch (elem.alignment) {
                            case "leading":
                                if (elem.constructor.name == "Title") {
                                    if (n != 0) ySweep += this.spacingVar
                                    elem.render(this.x + this.pad, this.y + ySweep, context, contextX, contextY);
                                }
                                else {
                                    elem.render(this.x + 1.5*this.pad, this.y + ySweep, context, contextX, contextY);
                                }
                                break;
                            case "center":
                                if (elem.constructor.name == "Title") {
                                    if (n != 0) ySweep += this.spacingVar
                                }
                                elem.render(this.x + (this.width - elem.width)/2, this.y + ySweep, context, contextX, contextY);
                                break;
                            case "trailing":
                                if (elem.constructor.name == "Title") {
                                    if (n != 0) ySweep += this.spacingVar
                                    elem.render(this.x + this.width - elem.width - this.pad, this.y + ySweep, context, contextX, contextY);
                                }
                                else{
                                    elem.render(this.x + this.width - elem.width - 1.5*this.pad, this.y + ySweep, context, contextX, contextY);
                                }
                                break;
                        }
                        
                        if (elem.constructor.name == "Label") {
                            ySweep += elem.height + this.spacingVar/2;
                        }
                        else {
                            ySweep += elem.height + this.spacingVar;
                        }
                    }
                }
            }
            else {
                // Render directly on to main canvas
                push()
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(this.x, this.y, this.width, this.height)
                    noFill()
                }
                else {
                    fill(this.backgroundVar)
                }
                stroke(this.borderVar)
                strokeWeight(this.borderWeightVar)
                rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                pop()
                let ySweep = this.pad;
                for (let n = 0; n < this.contents.length; n++) {
                    const elem = this.contents[n]
                    if (elem.phantomVar == false) {
                        switch (elem.alignment) {
                            case "leading":
                                if (elem.constructor.name == "Title") {
                                    if (n != 0) ySweep += this.spacingVar
                                    elem.render(this.x + this.pad, this.y + ySweep);
                                }
                                else {
                                    elem.render(this.x + 1.5*this.pad, this.y + ySweep);
                                }
                                break;
                            case "center":
                                if (elem.constructor.name == "Title") {
                                    if (n != 0) ySweep += this.spacingVar
                                }
                                elem.render(this.x + (this.width - elem.width)/2, this.y + ySweep);
                                break;
                            case "trailing":
                                if (elem.constructor.name == "Title") {
                                    if (n != 0) ySweep += this.spacingVar
                                    elem.render(this.x + this.width - elem.width - this.pad, this.y + ySweep);
                                }
                                else{
                                    elem.render(this.x + this.width - elem.width - 1.5*this.pad, this.y + ySweep);
                                }
                                break;
                        }
                        
                        if (elem.constructor.name == "Label") {
                            ySweep += elem.height + this.spacingVar/2;
                        }
                        else {
                            ySweep += elem.height + this.spacingVar;
                        }
                    }
                }
            }
        }
    }

    contains(elements) {
        this.contents = elements;
        return this;
    }

    onKeyPressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            for (let n = 0; n < this.contents.length; n++) {
                if (this.contents[n].typeable) this.contents[n].onKeyPressed()
            }
        }
    }

    onMousePressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            for (let n = 0; n < this.contents.length; n++) {
                if (this.contents[n].clickable) this.contents[n].onMousePressed()
            }
        }
    }

    onMouseReleased() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            for (let n = 0; n < this.contents.length; n++) {
                if (this.contents[n].clickable) this.contents[n].onMouseReleased()
            }
        }
    }

    onMouseWheel(event) {
        if (this.hiddenVar == false && this.phantomVar == false) {
            for (let n = 0; n < this.contents.length; n++) {
                if (this.contents[n].scrollable) this.contents[n].onMouseWheel(event)
            }
        }
    }

    mouseOver() {
        if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) return true;
        return false;
    }

    padding(value) {
        this.pad = value;
        return this;
    }

    minWidth(value) {
        this.minWidthVar = value;
        return this;
    }
    minHeight(value) {
        this.minHeightVar = value;
        return this;
    }

    spacing(value) {
        this.spacingVar = value;
        return this;
    }

    align(value) {
        if (value == "leading" || value == "center" || value == "trailing") {
            this.alignment = value;
        }
        else {
            logCanvasUIError(`Invalid alignment: '${value}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
        }
        return this;
    }

    hidden(value=true) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value=true) {
        this.phantomVar = value;
        return this;
    }

    centered(value=true) {
        this.centeredVar = value;
        return this;
    }

    background(input) {
        this.backgroundVar = input;
        return this;
    }

    border(colour) {
        this.borderVar = colour;
        return this;
    }

    borderWeight(value) {
        this.borderWeightVar = value;
        return this;
    }

    cornerRadius(tl, tr, br, bl) {
        if (tr == undefined && br == undefined && bl == undefined) {
            // r1 applies to all corners
            this.cornerRadiusVar = [tl, tl, tl, tl];
        }
        else {
            // each one individually applies to their own corner with r1 starting at top-left and successive rs moving clockwise around the shape
            this.cornerRadiusVar = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
        }
        return this;
    }
}let popups = {
    showing: [], 
    render() {
        for (let n = 0; n < popups.showing.length; n++) {
            popups.showing[n].render()
        }
    },
    mouseOver() {
        for (let n = popups.showing.length-1; n >= 0; n--) {
            if (popups.showing[n].mouseOver()) {
                return popups.showing[n].id;
            }
        }
    },
    onMousePressed() {
        for (let n = popups.showing.length-1; n >= 0; n--) {
            popups.showing[n].onMousePressed(popups.showing[n].id)
        }
    },
    onMouseReleased() {
        for (let n = popups.showing.length-1; n >= 0; n--) {
            popups.showing[n].onMouseReleased(popups.showing[n].id)
        }
    },
    onKeyPressed() {
        for (let n = popups.showing.length-1; n >= 0; n--) {
            popups.showing[n].onKeyPressed(popups.showing[n].id)
        }
    },
}

class Popup {
    constructor(side="right") {
        this.id = Math.floor(Math.random() * Date.now()).toString(16)
        this.clickable = true;
        this.typeable = true;
        this.scrollable = true;
        this.hiddenVar = true;
        this.phantomVar = false;

        this.side = side; // left, right, top, bottom
        switch (this.side) {
            case "right":
                this.offsetVar = {x: 15 , y: 0};
                break;
            case "top":
                this.offsetVar = {x: 0 , y: -15};
                break;
            case "bottom":
                this.offsetVar = {x: 0 , y: 15};
                break;
            default:
                logCanvasUIError(`Popup has invalid side: ${this.side}`)
            case "left":
                this.offsetVar = {x: -15 , y: 0};
                break;
        }
        this.contentOffsetVar = {x: this.offsetVar.x/2, y: this.offsetVar.y/2};
        
        this.x;
        this.y;
        this.width = this.offsetVar.x + this.contentOffsetVar.x;
        this.height = this.offsetVar.y + this.contentOffsetVar.y;
        this.contents;

        this.beakWidthVar = 15;
    }

    render(x, y) {
        if (x !== undefined) this.x = x;
        if (y !== undefined) this.y = y;

        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.contents) {
                if (this.contents.phantomVar == false) {
                    if (this.contents.clickable) this.contents.pipe(this.id)
                    switch (this.side) {
                        case "left":
                            this.contents.render(this.x + this.offsetVar.x + this.contentOffsetVar.x - this.contents.width, this.y + this.offsetVar.y + this.contentOffsetVar.y - this.contents.height/2)
                            push();
                            if (typeof this.contents.backgroundVar != "function") fill(this.contents.backgroundVar);
                            stroke(this.contents.borderVar);
                            strokeWeight(this.contents.borderWeightVar);
                            triangle(this.x + this.offsetVar.x, this.y + this.offsetVar.y, this.x + this.offsetVar.x + this.contentOffsetVar.x - 1, this.y + this.offsetVar.y + this.contentOffsetVar.y-this.beakWidthVar/2, this.x + this.offsetVar.x + this.contentOffsetVar.x - 1, this.y + this.offsetVar.y + this.contentOffsetVar.y+this.beakWidthVar/2);
                            pop();
                            break;
                        case "right":
                            this.contents.render(this.x + this.offsetVar.x + this.contentOffsetVar.x, this.y + this.offsetVar.y + this.contentOffsetVar.y - this.contents.height/2)
                            push();
                            if (typeof this.contents.backgroundVar != "function") fill(this.contents.backgroundVar);
                            stroke(this.contents.borderVar);
                            strokeWeight(this.contents.borderWeightVar);
                            triangle(this.x + this.offsetVar.x, this.y + this.offsetVar.y, this.x + this.offsetVar.x + this.contentOffsetVar.x + 1, this.y + this.offsetVar.y + this.contentOffsetVar.y-this.beakWidthVar/2, this.x + this.offsetVar.x + this.contentOffsetVar.x + 1, this.y + this.offsetVar.y + this.contentOffsetVar.y+this.beakWidthVar/2);
                            pop();
                            break;
                        case "top":
                            this.contents.render(this.x + this.offsetVar.x + this.contentOffsetVar.x - this.contents.width/2, this.y + this.offsetVar.y + this.contentOffsetVar.y - this.contents.height)
                            push();
                            if (typeof this.contents.backgroundVar != "function") fill(this.contents.backgroundVar);
                            stroke(this.contents.borderVar);
                            strokeWeight(this.contents.borderWeightVar);
                            triangle(this.x + this.offsetVar.x, this.y + this.offsetVar.y, this.x + this.offsetVar.x + this.contentOffsetVar.x-this.beakWidthVar/2, this.y + this.offsetVar.y + this.contentOffsetVar.y - 1, this.x + this.offsetVar.x + this.contentOffsetVar.x+this.beakWidthVar/2, this.y + this.offsetVar.y + this.contentOffsetVar.y - 1);
                            pop();
                            break;
                        case "bottom":
                            this.contents.render(this.x + this.offsetVar.x + this.contentOffsetVar.x - this.contents.width/2, this.y + this.offsetVar.y + this.contentOffsetVar.y)
                            push();
                            if (typeof this.contents.backgroundVar != "function") fill(this.contents.backgroundVar);
                            stroke(this.contents.borderVar);
                            strokeWeight(this.contents.borderWeightVar);
                            triangle(this.x + this.offsetVar.x, this.y + this.offsetVar.y, this.x + this.offsetVar.x + this.contentOffsetVar.x-this.beakWidthVar/2, this.y + this.offsetVar.y + this.contentOffsetVar.y + 1, this.x + this.offsetVar.x + this.contentOffsetVar.x+this.beakWidthVar/2, this.y + this.offsetVar.y + this.contentOffsetVar.y + 1);
                            pop();
                            break;
                    }
                }
            }
        }
    }

    hidden(value=true) {
        if (value != this.hiddenVar) {
            this.hiddenVar = value;
            if (value) {
                popups.showing = popups.showing.filter( p => {
                    return p.id !== this.id;
                });
            }
            else {
                popups.showing.push(this)
            }
        }
        return this;
    }
    phantom(value=true) {
        this.phantomVar = value;
        return this;
    }

    contains(elem) {
        this.contents = elem;
        return this;
    }

    offset(newOffset) {
        if (newOffset.x == undefined && newOffset.y) {
            // Only y
            this.offsetVar.y = newOffset.y
        }
        else if (newOffset.x && newOffset.y == undefined) {
            // Only x
            this.offsetVar.x = newOffset.x
        }
        else {
            // Both or neither(error)
            this.offsetVar = newOffset;
        }
        return this;
    }
    contentOffset(newOffset) {
        if (newOffset.x == undefined && newOffset.y) {
            // Only y
            this.contentOffsetVar.y = newOffset.y
        }
        else if (newOffset.x && newOffset.y == undefined) {
            // Only x
            this.contentOffsetVar.x = newOffset.x
        }
        else {
            // Both or neither(error)
            this.contentOffsetVar = newOffset;
        }
        return this;
    }

    beakWidth(value) {
        this.beakWidthVar = value;
        return this;
    }

    onKeyPressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.contents.typeable) {
                this.contents.onKeyPressed()
            }
        }
    }

    onMousePressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.contents.clickable) {
                this.contents.onMousePressed();
            }
        }
    }

    onMouseReleased() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.contents.clickable) {
                this.contents.onMouseReleased();
            }
        }
    }

    onMouseWheel(event) {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.contents.scrollable) {
                this.contents.onMouseWheel(event);
            }
        }
    }

    mouseOver() {
        let x = -this.width-1;
        let y = -this.height-1;
        switch (this.side) {
            case "left":
                x = this.x + this.offsetVar.x + this.contentOffsetVar.x - this.contents.width
                y = this.y + this.offsetVar.y + this.contentOffsetVar.y - this.contents.height/2
                break;
            case "right":
                x = this.x + this.offsetVar.x + this.contentOffsetVar.x
                y = this.y + this.offsetVar.y + this.contentOffsetVar.y - this.contents.height/2
                break;
            case "top":
                x = this.x + this.offsetVar.x + this.contentOffsetVar.x - this.contents.width/2
                y = this.y + this.offsetVar.y + this.contentOffsetVar.y - this.contents.height
                break;
            case "bottom":
                x = this.x + this.offsetVar.x + this.contentOffsetVar.x - this.contents.width/2
                y = this.y + this.offsetVar.y + this.contentOffsetVar.y
                break;
        }

        if (mouseX >= x && mouseX <= x + this.contents.width && mouseY >= y && mouseY <= y + this.contents.height) return true;
        return false;
    }
}let selectedScrollView = ""
let p = new p5();

class ScrollView {
    constructor(width, height) {
        this.id = Math.floor(Math.random() * Date.now()).toString(16)
        this.width = width ?? 1;
        this.widthSet = width === undefined ? false : true;
        this.height = height ?? 1;
        this.heightSet = height === undefined ? false : true;
        this.contents;
        
        this.clickable = true;
        this.typeable = true;
        this.scrollable = true;
        this.alignment = "leading";
        this.hiddenVar = false;
        this.phantomVar = false;

        this.centeredVar = false;

        this.context = p.createGraphics(this.width, this.height);
        this.binding = "";
        this.value = {x: 0, y: 0}
        this.sensitivityVar = {x: 1, y: 1};

        this.backgroundVar = Color.transparent;
        this.borderVar = Color.transparent;
        this.borderWeightVar = 1;
        this.cornerRadiusVar = [0, 0, 0, 0];

        this.popupID = "";
        this.canSelect = true;
    }

    pipe(popupID, canSelect) {
        if (popupID !== undefined) this.popupID = popupID;
        if (canSelect !== undefined) this.canSelect = canSelect;
        if (this.contents) if (this.contents.clickable) this.contents.pipe(popupID, this.mouseOver() && this.canSelect)
    }

    bind(target) {
        this.binding = target;
        return this;
    }

    sensitivity(value) {
        if (typeof value == "number") {
            this.sensitivityVar = {x: value, y: value};
        }
        else {
            this.sensitivityVar.x = value.x;
            this.sensitivityVar.y = value.y;
        }
        return this;
    }

    set({x, y}) {
        if (x !== undefined) this.value.x = x;
        if (y !== undefined) this.value.y = y;
        if (this.binding != "") eval(`${this.binding} = this.value`)
        return this;
    }

    contains(elem) {
        this.contents = elem;
        return this;
    }

    align(value) {
        if (value == "leading" || value == "center" || value == "trailing") {
            this.alignment = value;
        }
        else {
            logCanvasUIError(`Invalid alignment: '${value}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
        }
        return this;
    }

    hidden(value=true) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value=true) {
        this.phantomVar = value;
        return this;
    }

    centered(value=true) {
        this.centeredVar = value;
        return this;
    }

    background(input) {
        this.backgroundVar = input;
        return this;
    }

    border(colour) {
        this.borderVar = colour;
        return this;
    }

    borderWeight(value) {
        this.borderWeightVar = value;
        return this;
    }

    cornerRadius(tl, tr, br, bl) {
        if (tr == undefined && br == undefined && bl == undefined) {
            // r1 applies to all corners
            this.cornerRadiusVar = [tl, tl, tl, tl];
        }
        else {
            // each one individually applies to their own corner with r1 starting at top-left and successive rs moving clockwise around the shape
            this.cornerRadiusVar = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
        }
        return this;
    }

    mouseOver() {
        if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) return true;
        return false;
    }

    onKeyPressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.contents.typeable) this.contents.onKeyPressed()
        }
    }

    onMousePressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.contents.clickable) this.contents.onMousePressed()
        }
    }

    onMouseReleased() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.contents.clickable) this.contents.onMouseReleased()
        }
    }

    onMouseWheel(event) {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.mouseOver() && this.canSelect) selectedScrollView = this.id;
            if (this.contents.scrollable) this.contents.onMouseWheel(event)
            if (this.mouseOver() && this.canSelect && selectedScrollView == this.id) {

                if (this.widthSet || this.heightSet) {
                    let proposedX = 0;
                    let proposedY = 0;

                    // make work for when the content is smaller than the scrollview
                    
                    if (this.widthSet) {
                        proposedX = this.value.x-event.deltaX*this.sensitivityVar.x;
                        if (proposedX < this.width-this.contents.width) {
                            proposedX = this.width-this.contents.width;
                        }
                        else if (proposedX > 0) {
                            proposedX = 0;
                        }
                    }
                    if (this.heightSet) {
                        proposedY = this.value.y-event.deltaY*this.sensitivityVar.y;
                        if (proposedY < this.height-this.contents.height) {
                            proposedY = this.height-this.contents.height;
                        }
                        else if (proposedY > 0) {
                            proposedY = 0;
                        }
                    }
    
                    this.set({x: proposedX, y: proposedY})
                }
            }
        }
    }

    setWidth(value) {
        if (value) {
            this.width = value;
            this.widthSet = true;
            this.context.width = this.width;
        }
        else {
            this.widthSet = false;
        }
        return this;
    }
    setHeight(value) {
        if (value) {
            this.height = value;
            this.heightSet = true;
            this.context.height = this.height;
        }
        else {
            this.heightSet = false;
        }
        return this;
    }

    calcDimensions() {
        if (this.contents) {
            if (this.widthSet == false && this.width != this.contents.width) {
                this.width = this.contents.width > 0 ? this.contents.width : 1
                this.context = createGraphics(this.width, this.height)
            }
            if (this.heightSet == false && this.height != this.contents.height) {
                this.height = this.contents.height > 0 ? this.contents.height : 1
                this.context = createGraphics(this.width, this.height)
            }
        }
        if (this.context === undefined) this.context = createGraphics(this.width, this.height)
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }
        this.calcDimensions()

        if (this.contents) if (this.contents.clickable) this.contents.pipe(undefined, this.mouseOver() && this.canSelect)

        if (this.hiddenVar == false) {
            if (this.binding != "") {
                if (this.value.x != eval(this.binding).x) {
                    this.value.x = eval(this.binding).x
                }
                if (this.value.y != eval(this.binding).y) {
                    this.value.y = eval(this.binding).y
                }
            }

            if (context) {
                let x = this.x - contextX;
                let y = this.y - contextY;
                context.push()
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(x, y, this.width, this.height, context)
                    context.noFill()
                }
                else {
                    context.fill(this.backgroundVar)
                }
                context.stroke(this.borderVar)
                context.strokeWeight(this.borderWeightVar)
                context.rect(x, y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                context.pop()

                this.context.clear()
                this.contents.render(this.x+this.value.x, this.y+this.value.y, this.context, this.x, this.y)
                context.image(this.context, x, y)
            }
            else {
                push()
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(this.x, this.y, this.width, this.height)
                    noFill()
                }
                else {
                    fill(this.backgroundVar)
                }
                stroke(this.borderVar)
                strokeWeight(this.borderWeightVar)
                rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                pop()

                this.context.clear()
                this.contents.render(this.x+this.value.x, this.y+this.value.y, this.context, this.x, this.y)
                image(this.context, this.x, this.y)
            }
        }
    }
}class Slider {
    constructor (width, height) {
        this.x;
        this.y;
        this.width = width;
        this.height = height;

        this.clickable = true;
        this.typeable = true;
        this.scrollable = true;
        this.alignment = "leading";
        this.hiddenVar = false;
        this.phantomVar = false;

        this.centeredVar = false;
        this.displayState = "default"

        this.value = 0;
        this.minValue = 0;
        this.maxValue = 100;
        this.binding = "";
        this.editing = false;
        this.editingCursorOffset = 0;
        this.lockedVar = false;

        this.backgroundVar = Color.secondary;
        this.borderVar = Color.transparent;
        this.borderWeightVar = 1;
        this.cornerRadiusVar = [6, 6, 6, 6];

        this.knobVar;

        this.popupID = "";
        this.canSelect = true;
    }

    pipe(popupID, canSelect) {
        if (popupID !== undefined) this.popupID = popupID;
        if (canSelect !== undefined) this.canSelect = canSelect;
        if (this.knobVar) if (this.knobVar.clickable) this.knobVar.pipe(popupID, canSelect)
    }

    update() {
        if (this.binding != "") {
            let bindValue = Math.round(parseFloat(eval(this.binding)))
            if (this.value != bindValue) {
                // the binding variable changed - update this.value
                if (bindValue < this.minValue) {
                    this.value = this.minValue;
                }
                else if (bindValue > this.maxValue) {
                    this.value = this.maxValue;
                }
                else {
                    this.value = bindValue;
                }
            }
        }

        if (this.lockedVar == false) {
            if (this.canSelect) {
                if (this.mouseOver() || this.knobVar.mouseOver()) {
                    if (popups.mouseOver() == this.popupID || popups.mouseOver() == undefined) {
                        cursor("pointer")
                        this.displayState = "hover"
                        if (this.editing) {
                            this.displayState = "pressed"
                        }
                        doHotMouseDown = false;
                        doHotMouseUp = false;
                    }
                }
                else {
                    if (this.displayState == "hover" || this.displayState == "pressed") {
                        doHotMouseDown = true;
                        doHotMouseUp = true;
                    }
                    this.displayState = "default"
                }
            }
        }
    }

    set(value) {
        if (value < this.minValue) {
            this.value = this.minValue;
        }
        else if (value > this.maxValue) {
            this.value = this.maxValue;
        }
        else {
            this.value = Math.round(value);
        }
        if (this.binding != "") eval(`${this.binding} = this.value`)
        return this;
    }

    bind(target) {
        this.binding = target;
        return this;
    }

    min(value) {
        this.minValue = value;
        if (this.value < this.minValue) {
            this.value = this.minValue;
        }
        return this;
    }
    max(value) {
        this.maxValue = value;
        if (this.value > this.maxValue) {
            this.value = this.maxValue;
        }
        return this;
    }

    align(value) {
        if (value == "leading" || value == "center" || value == "trailing") {
            this.alignment = value;
        }
        else {
            logCanvasUIError(`Invalid alignment: '${value}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
        }
        return this;
    }

    hidden(value=true) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value=true) {
        this.phantomVar = value;
        return this;
    }

    centered(value=true) {
        this.centeredVar = value;
        return this;
    }
    
    locked(value=true) {
        this.lockedVar = value;
        return this;
    }

    onMousePressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (popups.mouseOver() == this.popupID || popups.mouseOver() == undefined) {
                if (this.canSelect) {
                    if (this.knobVar.mouseOver()) {
                        this.calcEditingCursorOffset();
                        this.editing = true;
                    }
                    else if (this.mouseOver()) {
                        this.editing = true;
                    }
                }
            }
            if (this.knobVar.clickable) this.knobVar.onMousePressed()
        }
    }

    onMouseReleased() {
        this.editing = false
        this.editingCursorOffset = 0;
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.knobVar.clickable) this.knobVar.onMouseReleased()
        }
    }

    onKeyPressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.knobVar.typeable) this.knobVar.onKeyPressed()
        }
    }

    onMouseWheel(event) {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.knobVar.scrollable) this.knobVar.onMouseWheel(event)
        }
    }

    mouseOver() {
        if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) return true;
        return false;
    }

    setWidth(value) {
        this.width = value;
        return this;
    }

    setHeight(value) {
        this.height = value;
        return this;
    }

    background(input) {
        this.backgroundVar = input;
        return this;
    }
    border(colour) {
        this.borderVar = colour;
        return this;
    }
    borderWeight(value) {
        this.borderWeightVar = value;
        return this;
    }
    cornerRadius(tl=this.height, tr, br, bl) {
        if (tr == undefined && br == undefined && bl == undefined) {
            // r1 applies to all corners
            this.cornerRadiusVar = [tl, tl, tl, tl];
        }
        else {
            // each one individually applies to their own corner with tl as top-left and tr as top-right etc
            this.cornerRadiusVar = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
        }
        return this;
    }

    knob(elem) {
        this.knobVar = elem;
        return this;
    }
}

class HSlider extends Slider {
    constructor(width=100, height=10) {
        super(width, height)

        this.knobVar = new Block(height*1.8, height*1.8).cornerRadius(height*1.8).centered(true)
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }

        if (this.hiddenVar == false) {
            this.update()
            if (this.lockedVar == false && this.editing) {
                this.set(Math.round((mouseX-this.editingCursorOffset-this.x)/this.width*(this.maxValue-this.minValue)+this.minValue))
            }

            if (context) {
                // Render on to specified context
                let x = this.x - contextX;
                let y = this.y - contextY;
                context.push()
                // Background
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(x, y, this.width, this.height, this.value, context)
                    context.noFill()
                }
                else {
                    context.fill(this.backgroundVar)
                }
                context.stroke(this.borderVar)
                context.strokeWeight(this.borderWeightVar)
                context.rect(x, y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                context.pop()
                
                this.knobVar.render((this.value-this.minValue)*this.width/(this.maxValue-this.minValue)+this.x, this.y+this.height/2, context, contextX, contextY)
            }
            else {
                // Render directly on to main canvas
                push()
                // Background
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(this.x, this.y, this.width, this.height, this.value)
                    noFill()
                }
                else {
                    fill(this.backgroundVar)
                }
                stroke(this.borderVar)
                strokeWeight(this.borderWeightVar)
                rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                pop()
                
                this.knobVar.render((this.value-this.minValue)*this.width/(this.maxValue-this.minValue)+this.x, this.y+this.height/2)
            }
        }
    }

    calcEditingCursorOffset() {
        this.editingCursorOffset = mouseX-((this.value-this.minValue)*this.width/(this.maxValue-this.minValue)+this.x);
    }
}

class VSlider extends Slider {
    constructor(width=10, height=100) {
        super(width, height)

        this.knobVar = new Block(width*1.8, width*1.8).cornerRadius(width*1.8).centered(true)
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }

        if (this.hiddenVar == false) {
            this.update()
            if (this.lockedVar == false && this.editing) {
                this.set(Math.round((this.height+this.y-mouseY+this.editingCursorOffset)*(this.maxValue-this.minValue)/this.height + this.minValue))
            }

            if (context) {
                // Render on to specified context
                let x = this.x - contextX;
                let y = this.y - contextY;
                context.push()
                // Background
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(x, y, this.width, this.height, this.value, context)
                    context.noFill()
                }
                else {
                    context.fill(this.backgroundVar)
                }
                context.stroke(this.borderVar)
                context.strokeWeight(this.borderWeightVar)
                context.rect(x, y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                context.pop()
                
                this.knobVar.render(this.x+this.width/2, this.height-(this.value-this.minValue)*this.height/(this.maxValue-this.minValue)+this.y, context, contextX, contextY)
            }
            else {
                // Render directly on to main canvas
                push()
                // Background
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(this.x, this.y, this.width, this.height)
                    noFill()
                }
                else {
                    fill(this.backgroundVar)
                }
                stroke(this.borderVar)
                strokeWeight(this.borderWeightVar)
                rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                pop()
                
                this.knobVar.render(this.x+this.width/2, this.height-(this.value-this.minValue)*this.height/(this.maxValue-this.minValue)+this.y)
            }
        }
    }

    calcEditingCursorOffset() {
        this.editingCursorOffset = mouseY-(this.height-(this.value-this.minValue)*this.height/(this.maxValue-this.minValue)+this.y);
    }
}class SliderSheet {
    constructor (width=100, height=100) {
        this.x;
        this.y;
        this.width = width;
        this.height = height;

        this.clickable = true;
        this.typeable = true;
        this.scrollable = true;
        this.alignment = "leading";
        this.hiddenVar = false;
        this.phantomVar = false;

        this.centeredVar = false;
        this.displayState = "default"

        this.value = {x: 0, y: 0};
        this.minValue = {x: 0, y: 0};
        this.maxValue = {x: 100, y: 100};
        this.binding = "";
        this.editing = false;
        this.lockedVar = false;
        this.editingCursorOffset = {x: 0, y: 0};

        this.backgroundVar = Color.secondary;
        this.borderVar = Color.primary;
        this.borderWeightVar = 1;
        this.cornerRadiusVar = [6, 6, 6, 6];

        this.knobVar = new Block(18, 18).cornerRadius(18).centered(true)

        this.popupID = "";
        this.canSelect = true;
    }

    pipe(popupID, canSelect) {
        if (popupID !== undefined) this.popupID = popupID;
        if (canSelect !== undefined) this.canSelect = canSelect;
        if (this.knobVar) if (this.knobVar.clickable) this.knobVar.pipe(popupID, canSelect)
    }

    update() {
        if (this.binding != "") {
            let bindValue = {x: Math.round(eval(this.binding).x), y: Math.round(eval(this.binding).y)}
            if (this.value.x != bindValue.x) {
                // the binding variable.x changed - update this.value.x
                if (bindValue.x < this.minValue.x) {
                    this.value.x = this.minValue.x;
                }
                else if (bindValue.x > this.maxValue.x) {
                    this.value.x = this.maxValue.x;
                }
                else {
                    this.value.x = bindValue.x;
                }
            }

            if (this.value.y != bindValue.y) {
                // the binding variable.y changed - update this.value.y
                if (bindValue.y < this.minValue.y) {
                    this.value.y = this.minValue.y;
                }
                else if (bindValue.y > this.maxValue.y) {
                    this.value.y = this.maxValue.y;
                }
                else {
                    this.value.y = bindValue.y;
                }
            }
        }
        
        if (this.lockedVar == false) {
            if (this.canSelect) {
                if (this.mouseOver() || this.knobVar.mouseOver()) {
                    if (popups.mouseOver() == this.popupID || popups.mouseOver() == undefined) {
                        cursor("pointer")
                        this.displayState = "hover"
                        if (this.editing) {
                            this.displayState = "pressed"
                        }
                        doHotMouseDown = false;
                        doHotMouseUp = false;
                    }
                }
                else {
                    if (this.displayState == "hover" || this.displayState == "pressed") {
                        doHotMouseDown = true;
                        doHotMouseUp = true;
                    }
                    this.displayState = "default"
                }
            }
        }
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }

        if (this.hiddenVar == false) {
            this.update()
            if (this.lockedVar == false && this.editing) {
                this.set({
                    x: Math.round((mouseX-this.editingCursorOffset.x-this.x)/this.width*(this.maxValue.x-this.minValue.x)+this.minValue.x),
                    y: Math.round((mouseY-this.editingCursorOffset.y-this.y)/this.height*(this.maxValue.y-this.minValue.y)+this.minValue.y),
                })
            }
            
            if (context) {
                // Render on to specified context
                let x = this.x - contextX;
                let y = this.y - contextY;
                context.push()
                // Background
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(x, y, this.width, this.height, this.value, context)
                    context.noFill()
                }
                else {
                    context.fill(this.backgroundVar)
                }
                context.stroke(this.borderVar)
                context.strokeWeight(this.borderWeightVar)
                context.rect(x, y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                context.pop()
                
                this.knobVar.render((this.value.x-this.minValue.x)/(this.maxValue.x-this.minValue.x)*this.width+this.x, (this.value.y-this.minValue.y)/(this.maxValue.y-this.minValue.y)*this.height+this.y, context, contextX, contextY)
            }
            else {
                // Render directly on to main canvas
                push()
                // Background
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(this.x, this.y, this.width, this.height, this.value)
                    noFill()
                }
                else {
                    fill(this.backgroundVar)
                }
                stroke(this.borderVar)
                strokeWeight(this.borderWeightVar)
                rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                pop()
                
                this.knobVar.render((this.value.x-this.minValue.x)/(this.maxValue.x-this.minValue.x)*this.width+this.x, (this.value.y-this.minValue.y)/(this.maxValue.y-this.minValue.y)*this.height+this.y)
            }
        }
    }

    set(value) {
        // x
        if (value.x < this.minValue.x) {
            this.value.x = this.minValue.x;
        }
        else if (value.x > this.maxValue.x) {
            this.value.x = this.maxValue.x;
        }
        else {
            this.value.x = value.x;
        }

        // y
        if (value.y < this.minValue.y) {
            this.value.y = this.minValue.y;
        }
        else if (value.y > this.maxValue.y) {
            this.value.y = this.maxValue.y;
        }
        else {
            this.value.y = value.y;
        }

        if (this.binding != "") eval(`${this.binding} = this.value`)
        return this;
    }

    bind(target) {
        this.binding = target;
        return this;
    }

    min(value) {
        this.minValue = value;
        if (this.value.x < this.minValue.x) {
            this.value.x = this.minValue.x;
        }
        if (this.value.y < this.minValue.y) {
            this.value.y = this.minValue.y;
        }
        return this;
    }
    max(value) {
        this.maxValue = value;
        if (this.value.x > this.maxValue.x) {
            this.value.x = this.maxValue.x;
        }
        if (this.value.y > this.maxValue.y) {
            this.value.y = this.maxValue.y;
        }
        return this;
    }

    align(value) {
        if (value == "leading" || value == "center" || value == "trailing") {
            this.alignment = value;
        }
        else {
            logCanvasUIError(`Invalid alignment: '${value}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
        }
        return this;
    }

    hidden(value=true) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value=true) {
        this.phantomVar = value;
        return this;
    }

    centered(value=true) {
        this.centeredVar = value;
        return this;
    }

    locked(value=true) {
        this.lockedVar = value;
        return this;
    }

    onMousePressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (popups.mouseOver() == this.popupID || popups.mouseOver() == undefined) {
                if (this.canSelect) {
                    if (this.knobVar.mouseOver()) {
                        this.editingCursorOffset = {x: mouseX-((this.value.x-this.minValue.x)/(this.maxValue.x-this.minValue.x)*this.width+this.x), y: mouseY-((this.value.y-this.minValue.y)/(this.maxValue.y-this.minValue.y)*this.height+this.y)};
                        this.editing = true;
                    }
                    else if (this.mouseOver()) {
                        this.editing = true;
                    }
                }
            }
            if (this.knobVar.clickable) this.knobVar.onMousePressed()
        }
    }

    onMouseReleased() {
        this.editing = false;
        this.editingCursorOffset = {x: 0, y: 0};
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.knobVar.clickable) this.knobVar.onMouseReleased()
        }
    }

    onKeyPressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.knobVar.typeable) this.knobVar.onKeyPressed()
        }
    }

    onMouseWheel(event) {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.knobVar.typeable) this.knobVar.onMouseWheel(event)
        }
    }

    mouseOver() {
        if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) return true;
        return false;
    }

    setWidth(value) {
        this.width = value;
        return this;
    }

    setHeight(value) {
        this.height = value;
        return this;
    }

    background(input) {
        this.backgroundVar = input;
        return this;
    }
    border(colour) {
        this.borderVar = colour;
        return this;
    }
    borderWeight(value) {
        this.borderWeightVar = value;
        return this;
    }
    cornerRadius(tl=this.height, tr, br, bl) {
        if (tr == undefined && br == undefined && bl == undefined) {
            // r1 applies to all corners
            this.cornerRadiusVar = [tl, tl, tl, tl];
        }
        else {
            // each one individually applies to their own corner with tl as top-left and tr as top-right etc
            this.cornerRadiusVar = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
        }
        return this;
    }

    knob(elem) {
        this.knobVar = elem;
        return this;
    }
}class Stack {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.contents = [];
        this.pad = 0;

        this.minWidthVar = 2*this.pad;
        this.minHeightVar = 2*this.pad;
        
        this.clickable = true;
        this.typeable = true;
        this.scrollable = true;
        this.alignment = "leading";
        this.hiddenVar = false;
        this.phantomVar = false;

        this.centeredVar = false;

        this.backgroundVar = Color.transparent;
        this.borderVar = Color.transparent;
        this.borderWeightVar = 1;
        this.cornerRadiusVar = [0, 0, 0, 0];

        this.popupID = "";
        this.canSelect = true;
    }

    pipe(popupID, canSelect) {
        if (popupID !== undefined) this.popupID = popupID;
        if (canSelect !== undefined) this.canSelect = canSelect;
        for (let n = 0; n < this.contents.length; n++) {
            if (this.contents[n].clickable) this.contents[n].pipe(popupID, canSelect)
        }
    }

    contains(elems) {
        this.contents = elems;
        return this;
    }

    padding(value) {
        this.pad = value;
        return this;
    }

    minWidth(value) {
        this.minWidthVar = value;
        return this;
    }
    minHeight(value) {
        this.minHeightVar = value;
        return this;
    }

    align(value) {
        if (value == "leading" || value == "center" || value == "trailing") {
            this.alignment = value;
        }
        else {
            logCanvasUIError(`Invalid alignment: '${value}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
        }
        return this;
    }

    hidden(value=true) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value=true) {
        this.phantomVar = value;
        return this;
    }

    centered(value=true) {
        this.centeredVar = value;
        return this;
    }

    background(input) {
        this.backgroundVar = input;
        return this;
    }

    border(colour) {
        this.borderVar = colour;
        return this;
    }

    borderWeight(value) {
        this.borderWeightVar = value;
        return this;
    }

    cornerRadius(tl, tr, br, bl) {
        if (tr == undefined && br == undefined && bl == undefined) {
            // r1 applies to all corners
            this.cornerRadiusVar = [tl, tl, tl, tl];
        }
        else {
            // each one individually applies to their own corner with r1 starting at top-left and successive rs moving clockwise around the shape
            this.cornerRadiusVar = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
        }
        return this;
    }

    onKeyPressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            for (let n = 0; n < this.contents.length; n++) {
                if (this.contents[n].typeable) this.contents[n].onKeyPressed()
            }
        }
    }

    onMousePressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            for (let n = 0; n < this.contents.length; n++) {
                if (this.contents[n].clickable) this.contents[n].onMousePressed()
            }
        }
    }

    onMouseReleased() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            for (let n = 0; n < this.contents.length; n++) {
                if (this.contents[n].clickable) this.contents[n].onMouseReleased()
            }
        }
    }

    onMouseWheel(event) {
        if (this.hiddenVar == false && this.phantomVar == false) {
            for (let n = 0; n < this.contents.length; n++) {
                if (this.contents[n].scrollable) this.contents[n].onMouseWheel(event)
            }
        }
    }

    mouseOver() {
        if (typeof this.backgroundVar == "function" || this.backgroundVar.length <= 3 || (this.backgroundVar.length > 3 && this.backgroundVar[3] != 0)) {
            if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) return true;
        }
        else {
            for (let n = 0; n < this.contents.length; n++) {
                if (this.contents[n].mouseOver()) return true;
            }
        }
        return false;
    }
}

class VStack extends Stack {
    constructor() {
        super();
        this.spacingVar = 15;
    }

    spacing(value) {
        this.spacingVar = value;
        return this;
    }

    calcDimensions() {
        this.width = this.pad*2;
        this.height = this.pad*2;
        let i = 0;
        for (let n = 0; n < this.contents.length; n++) {
            let elem = this.contents[n]
            if (elem.phantomVar == false) {
                i++;
                this.width = Math.max(this.width, elem.width+this.pad*2);
                this.height += elem.height + this.spacingVar;
            }
        }
        if (i > 0) {
            this.height -= this.spacingVar;
        }

        this.width = Math.max(this.width, this.minWidthVar)
        this.height = Math.max(this.height, this.minHeightVar)
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }
        this.calcDimensions()

        if (this.hiddenVar == false) {
            if (context) {
                // Render on to specified context
                let x = this.x - contextX;
                let y = this.y - contextY;
                context.push()
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(x, y, this.width, this.height, context)
                    context.noFill()
                }
                else {
                    context.fill(this.backgroundVar)
                }
                context.stroke(this.borderVar)
                context.strokeWeight(this.borderWeightVar)
                context.rect(x, y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                context.pop()
                let ySweep = this.pad;
                for (let n = 0; n < this.contents.length; n++) {
                    let elem = this.contents[n]
                    if (elem.phantomVar == false) {
                        switch (elem.alignment) {
                            case "leading":
                                elem.render(this.x+this.pad, this.y + ySweep, context, contextX, contextY);
                                break;
                            case "center":
                                elem.render(this.x + (this.width - this.contents[n].width)/2, this.y + ySweep, context, contextX, contextY);
                                break;
                            case "trailing":
                                elem.render(this.x - this.pad + this.width - this.contents[n].width, this.y + ySweep, context, contextX, contextY);
                                break;
                        }
                        ySweep += elem.height + this.spacingVar;
                    }
                }
            }
            else {
                // Render directly on to main canvas
                push()
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(this.x, this.y, this.width, this.height)
                    noFill()
                }
                else {
                    fill(this.backgroundVar)
                }
                stroke(this.borderVar)
                strokeWeight(this.borderWeightVar)
                rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                pop()
                let ySweep = this.pad;
                for (let n = 0; n < this.contents.length; n++) {
                    let elem = this.contents[n]
                    if (elem.phantomVar == false) {
                        switch (elem.alignment) {
                            case "leading":
                                elem.render(this.x+this.pad, this.y + ySweep);
                                break;
                            case "center":
                                elem.render(this.x + (this.width - this.contents[n].width)/2, this.y + ySweep);
                                break;
                            case "trailing":
                                elem.render(this.x - this.pad + this.width - this.contents[n].width, this.y + ySweep);
                                break;
                        }
                        ySweep += elem.height + this.spacingVar;
                    }
                }
            }
        }
    }
}

class HStack extends Stack {
    constructor() {
        super();
        this.spacingVar = 15;
    }

    spacing(value) {
        this.spacingVar = value;
        return this;
    }

    calcDimensions() {
        this.width = this.pad*2;
        this.height = this.pad*2;
        let i = 0;
        for (let n = 0; n < this.contents.length; n++) {
            let elem = this.contents[n];
            if (elem.phantomVar == false) {
                i++;
                this.height = Math.max(this.height, elem.height + this.pad*2);
                this.width += elem.width + this.spacingVar;
            }
        }
        if (i > 0) {
            this.width -= this.spacingVar;
        }

        this.width = Math.max(this.width, this.minWidthVar)
        this.height = Math.max(this.height, this.minHeightVar)
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }
        this.calcDimensions()

        if (this.hiddenVar == false) {
            if (context) {
                // Render on to specified context
                let x = this.x - contextX;
                let y = this.y - contextY;
                context.push()
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(x, y, this.width, this.height, context)
                    context.noFill()
                }
                else {
                    context.fill(this.backgroundVar)
                }
                context.stroke(this.borderVar)
                context.strokeWeight(this.borderWeightVar)
                context.rect(x, y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                context.pop()
                let xSweep = this.pad;
                for (let n = 0; n < this.contents.length; n++) {
                    let elem = this.contents[n]
                    if (elem.phantomVar == false) {
                        switch (elem.alignment) {
                            case "leading":
                                this.contents[n].render(this.x + xSweep, this.y + this.pad, context, contextX, contextY);
                                break;
                            case "center":
                                this.contents[n].render(this.x + xSweep, (2*this.y + this.height - this.contents[n].height)/2, context, contextX, contextY);
                                break;
                            case "trailing":
                                this.contents[n].render(this.x + xSweep, this.y - this.pad + this.height - this.contents[n].height, context, contextX, contextY);
                                break;
                        }
                        xSweep += this.contents[n].width + this.spacingVar;
                    }
                }
            }
            else {
                // Render directly on to main canvas
                push()
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(this.x, this.y, this.width, this.height)
                    noFill()
                }
                else {
                    fill(this.backgroundVar)
                }
                stroke(this.borderVar)
                strokeWeight(this.borderWeightVar)
                rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                pop()
                let xSweep = this.pad;
                for (let n = 0; n < this.contents.length; n++) {
                    let elem = this.contents[n]
                    if (elem.phantomVar == false) {
                        switch (elem.alignment) {
                            case "leading":
                                this.contents[n].render(this.x + xSweep, this.y + this.pad);
                                break;
                            case "center":
                                this.contents[n].render(this.x + xSweep, (2*this.y + this.height - this.contents[n].height)/2);
                                break;
                            case "trailing":
                                this.contents[n].render(this.x + xSweep, this.y - this.pad + this.height - this.contents[n].height);
                                break;
                        }
                        xSweep += this.contents[n].width + this.spacingVar;
                    }
                }
            }
        }
    }
}

class ZStack extends Stack {
    constructor() {
        super();
    }

    calcDimensions() {
        this.width = 0;
        this.height = 0;
        for (let n = 0; n < this.contents.length; n++) {
            let elem = this.contents[n];
            if (elem.phantomVar == false) {
                this.height = Math.max(this.height, elem.height)
                this.width = Math.max(this.width, elem.width)
            }
        }
        this.width += 2*this.pad
        this.height += 2*this.pad

        this.width = Math.max(this.width, this.minWidthVar)
        this.height = Math.max(this.height, this.minHeightVar)
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }
        this.calcDimensions()

        if (this.hiddenVar == false) {
            let pipeCanSelect = this.canSelect;
            for (let n = this.contents.length-1; n >= 0; n--) {
                let elem = this.contents[n]
                elem.pipe(undefined, pipeCanSelect)
                if (elem.clickable && elem.mouseOver()) pipeCanSelect = false;
            }

            if (context) {
                // Render on to specified context
                let x = this.x - contextX;
                let y = this.y - contextY;

                context.push()
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(x, y, this.width, this.height, context)
                    context.noFill()
                }
                else {
                    context.fill(this.backgroundVar)
                }
                context.stroke(this.borderVar)
                context.strokeWeight(this.borderWeightVar)
                context.rect(x, y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                context.pop()

                for (let n = 0; n < this.contents.length; n++) {
                    let elem = this.contents[n]
                    if (elem.phantomVar == false) {
                        this.contents[n].render(this.x + this.pad, this.y + this.pad, context, contextX, contextY)
                    }
                }
            }
            else {
                // Render directly on to main canvas
                push()
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(this.x, this.y, this.width, this.height)
                    noFill()
                }
                else {
                    fill(this.backgroundVar)
                }
                stroke(this.borderVar)
                strokeWeight(this.borderWeightVar)
                rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                pop()

                for (let n = 0; n < this.contents.length; n++) {
                    let elem = this.contents[n]
                    if (elem.phantomVar == false) {
                        this.contents[n].render(this.x + this.pad, this.y + this.pad)
                    }
                }
            }
        }
    }
}class Text {
    constructor(text="Text") {
        this.x;
        this.y;
        this.t = `${text}`;
        this.tSize = 18;
        this.binding = "";
        this.pad = 0;
        this.width = 0;
        this.height = 0;

        this.minWidthVar = 0;
        this.minHeightVar = 0;

        this.clickable = false;
        this.typeable = false;
        this.scrollable = false;
        this.alignment = "leading";
        this.centeredVar = false;
        this.hiddenVar = false;
        this.phantomVar = false;

        // Default styling config
        this.backgroundVar = Color.transparent;
        this.borderVar = Color.transparent;
        this.borderWeightVar = 1;
        this.cornerRadiusVar = [0, 0, 0, 0];
        this.textColourVar = Color.primary;
        this.textBorderVar = Color.transparent;
        this.textBorderWeightVar = 1;
        this.emphasisVar;
        this.fontVar;
    }

    bind(target) {
        this.binding = target;
        this.t = `${eval(target)}`
        return this;
    }

    align(value) {
        if (value == "leading" || value == "center" || value == "trailing") {
            this.alignment = value;
        }
        else {
            logCanvasUIError(`Invalid alignment: '${value}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
        }
        return this;
    }

    hidden(value=true) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value=true) {
        this.phantomVar = value;
        return this;
    }

    centered(value=true) {
        this.centeredVar = value;
        return this;
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }

        if (this.binding != "") this.t = `${eval(this.binding)}`

        if (context) {
            // Render on to specified context
            let x = this.x - contextX;
            let y = this.y - contextY;
            context.push();
            context.textSize(this.tSize)
            if (this.emphasisVar) context.textStyle(this.emphasisVar)
            if (this.fontVar) context.textFont(this.fontVar)
            let lines = this.t.split("\n")
            let longestLineIndex = 0;
            for (let n = 1; n < lines.length; n++) {
                if (context.textWidth(lines[n]) > context.textWidth(lines[longestLineIndex])) longestLineIndex = n;
            }
            let tWidth = context.textWidth(lines[longestLineIndex])
            this.width = Math.max(this.minWidthVar, tWidth + this.pad*2)
            context.textAlign(LEFT, TOP)
            this.height = Math.max(this.minHeightVar, this.tSize*lines.length + this.pad)
            
            if (this.hiddenVar == false) {
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(x, y, this.width, this.height, context)
                    context.noFill()
                }
                else {
                    context.fill(this.backgroundVar)
                }
                context.stroke(this.borderVar)
                context.strokeWeight(this.borderWeightVar)
                context.rect(x, y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])

                context.fill(this.textColourVar)
                context.stroke(this.textBorderVar)
                context.strokeWeight(this.textBorderWeightVar)
                for (let n = 0; n < lines.length; n++) {
                    context.text(lines[n], x+this.pad, y + this.tSize*n + this.pad)
                }
            }
            context.pop();
        }
        else {
            // Render directly on to main canvas
            push();
            textSize(this.tSize)
            if (this.emphasisVar) textStyle(this.emphasisVar)
            if (this.fontVar) textFont(this.fontVar)
            let lines = this.t.split("\n")
            let longestLineIndex = 0;
            for (let n = 1; n < lines.length; n++) {
                if (textWidth(lines[n]) > textWidth(lines[longestLineIndex])) longestLineIndex = n;
            }
            let tWidth = textWidth(lines[longestLineIndex])
            this.width = Math.max(this.minWidthVar, tWidth + this.pad*2)
            textAlign(LEFT, TOP)
            this.height = Math.max(this.minHeightVar, this.tSize*lines.length + this.pad*2)
            
            if (this.hiddenVar == false) {
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(this.x, this.y, this.width, this.height)
                    noFill()
                }
                else {
                    fill(this.backgroundVar)
                }
                stroke(this.borderVar)
                strokeWeight(this.borderWeightVar)
                rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])

                fill(this.textColourVar)
                stroke(this.textBorderVar)
                strokeWeight(this.textBorderWeightVar)
                for (let n = 0; n < lines.length; n++) {
                    text(lines[n], this.x+this.pad, this.y + this.tSize*n + this.pad)
                }
            }
            pop();
        }
    }

    mouseOver() {
        if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) return true;
        return false;
    }

    background(input) {
        this.backgroundVar = input;
        return this;
    }

    border(colour) {
        this.borderVar = colour;
        return this;
    }

    borderWeight(value) {
        this.borderWeightVar = value;
        return this;
    }

    cornerRadius(tl, tr, br, bl) {
        if (tr == undefined && br == undefined && bl == undefined) {
            // r1 applies to all corners
            this.cornerRadiusVar = [tl, tl, tl, tl];
        }
        else {
            // each one individually applies to their own corner with r1 starting at top-left and successive rs moving clockwise around the shape
            this.cornerRadiusVar = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
        }
        return this;
    }

    textSize(value) {
        this.tSize = value;
        return this;
    }

    textColour(colour) {
        this.textColourVar = colour;
        return this;
    }

    textBorder(colour) {
        this.textBorderVar = colour;
        return this;
    }

    textBorderWeight(value) {
        this.textBorderWeightVar = value;
        return this;
    }

    emphasis(style) {
        this.emphasisVar = style;
        return this;
    }

    font(p5Font) {
        this.fontVar = p5Font;
        return this;
    }

    padding(value) {
        this.pad = value;
        return this;
    }

    minWidth(value) {
        this.minWidthVar = value;
        return this;
    }

    minHeight(value) {
        this.minHeightVar = value;
        return this;
    }
}

class Title extends Text {
    constructor(text) {
        super(text);

        // Default styling config
        this.padding(0)
        this.emphasis("bold")
        this.textSize(39)
    }
}

class Label extends Text {
    constructor(text) {
        super(text);

        // Default styling config
        this.textSize(16)
        this.padding(0)
        this.emphasis("bold")
        this.textColour(Color.secondary)
    }
}class TextInput extends Text {
    constructor(defaultText="Text Input", doMultiLine=false) {
        super(defaultText)
        this.editing = false;
        this.edited = false;
        this.placeholderVar = "";
        this.cursorAfter = this.t;
        this.doMultiLine = doMultiLine;
        this.maxWidthVar = Infinity;
        this.maxHeightVar = Infinity;

        this.clickable = true;
        this.typeable = true;
        this.scrollable = false;

        this.hovering = false;

        this.lockedVar = false;

        this.showingCursor = false;
        this.lastToggledCursor = new Date();
        this.cursorColourVar = Color.accent;
        this.cursorWeightVar = 2;

        // Default styling config
        this.background(Color.nearInverse)

        this.popupID = "";
        this.canSelect = true;
    }

    pipe(popupID, canSelect) {
        if (popupID !== undefined) this.popupID = popupID;
        if (canSelect !== undefined) this.canSelect = canSelect;
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }

        if (this.binding != "") {
            if (this.t != eval(this.binding)) {
                if (!this.edited) {
                    // the binding variable changed - update this.t
                    this.t = `${eval(this.binding)}`;
                    this.editing = false;
                    this.cursorAfter = this.t;
                }
            }
        }
        
        if (context) {
            // Render on to specified context
            let x = this.x - contextX;
            let y = this.y - contextY;
            context.push()
            context.textSize(this.tSize)
            if (this.emphasisVar) context.textStyle(this.emphasisVar)
            if (this.fontVar) context.textFont(this.fontVar)
            let lines;
            if (this.t == "") {
                lines = this.placeholderVar.split("\n")
                context.fill(this.textColourVar[0], this.textColourVar[1], this.textColourVar[2], (this.textColourVar[3] ?? 255)*0.4)
                context.stroke(this.textBorderVar[0], this.textBorderVar[1], this.textBorderVar[2], (this.textBorderVar[3] ?? 255)*0.4)
            }
            else {
                lines = this.t.split("\n")
                context.fill(this.textColourVar)
                context.stroke(this.textBorderVar)
            }
            context.strokeWeight(this.textBorderWeightVar)
            
            let longestLineIndex = 0;
            for (let n = 1; n < lines.length; n++) {
                if (context.textWidth(lines[n]) > context.textWidth(lines[longestLineIndex])) longestLineIndex = n;
            }
            let tWidth = context.textWidth(lines[longestLineIndex])
            this.width = Math.max(this.minWidthVar, tWidth + this.tSize*this.pFactor*2)
            context.textAlign(LEFT, TOP)
            this.height = Math.max(this.minHeightVar, this.tSize*(lines.length + this.pFactor*2))
            
            if (this.hiddenVar == false) {
                if (this.lockedVar == false) {
                    if (this.mouseOver() && this.canSelect) {
                        if (popups.mouseOver() == this.popupID || popups.mouseOver() == undefined) {
                            cursor("text")
                            this.hovering = true;
                            doHotMouseDown = false;
                            doHotMouseUp = false;
                        }
                    }
                    else {
                        if (this.hovering) {
                            doHotMouseDown = true;
                            doHotMouseUp = true;
                        }
                        this.hovering = false;
                    }
                }
    
                context.push()
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(x, y, this.width, this.height, context)
                    context.noFill()
                }
                else {
                    context.fill(this.backgroundVar)
                }
                context.stroke(this.borderVar)
                context.strokeWeight(this.borderWeightVar)
                context.rect(x, y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                context.pop()
    
                for (let n = 0; n < lines.length; n++) {
                    context.text(lines[n], x+this.tSize*this.pFactor, y + this.tSize*(this.pFactor+n))
                }
    
                if (this.editing) {
                    const now = new Date()
                    if (now - this.lastToggledCursor > 530) {
                        this.showingCursor = !this.showingCursor;
                        this.lastToggledCursor = now;
                    }
                    if (this.showingCursor) {
                        let lineNumber = (this.cursorAfter.match(/\n/g) || []).length
                        let cursorAfterOnThisLine = this.cursorAfter.split("\n")[lineNumber]
                        let lineX = x+context.textWidth(cursorAfterOnThisLine)+this.tSize*this.pFactor;
                        let lineY1 =  y + this.tSize*(this.pFactor + lineNumber);
                        let lineY2 = y + this.tSize*(this.pFactor + lineNumber+1);
                        context.stroke(this.cursorColourVar)
                        context.strokeWeight(this.cursorWeightVar)
                        context.line(lineX, lineY1, lineX, lineY2)
                    }
                }
            }
            context.pop()
        }
        else {
            // Render directly on to main canvas
            push()
            textSize(this.tSize)
            if (this.emphasisVar) textStyle(this.emphasisVar)
            if (this.fontVar) textFont(this.fontVar)
            let lines;
            if (this.t == "") {
                lines = this.placeholderVar.split("\n")
                fill(this.textColourVar[0], this.textColourVar[1], this.textColourVar[2], (this.textColourVar[3] ?? 255)*0.4)
                stroke(this.textBorderVar[0], this.textBorderVar[1], this.textBorderVar[2], (this.textBorderVar[3] ?? 255)*0.4)
            }
            else {
                lines = this.t.split("\n")
                fill(this.textColourVar)
                stroke(this.textBorderVar)
            }
            strokeWeight(this.textBorderWeightVar)
            
            let longestLineIndex = 0;
            for (let n = 1; n < lines.length; n++) {
                if (textWidth(lines[n]) > textWidth(lines[longestLineIndex])) longestLineIndex = n;
            }
            let tWidth = textWidth(lines[longestLineIndex])
            this.width = Math.max(this.minWidthVar, tWidth + this.tSize*this.pFactor*2)
            textAlign(LEFT, TOP)
            this.height = Math.max(this.minHeightVar, this.tSize*(lines.length + this.pFactor*2))
            
            if (this.hiddenVar == false) {
                if (this.lockedVar == false) {
                    if (this.mouseOver() && this.canSelect) {
                        if (popups.mouseOver() == this.popupID || popups.mouseOver() == undefined) {
                            cursor("text")
                            this.hovering = true;
                            doHotMouseDown = false;
                            doHotMouseUp = false;
                        }
                    }
                    else {
                        if (this.hovering) {
                            doHotMouseDown = true;
                            doHotMouseUp = true;
                        }
                        this.hovering = false;
                    }
                }
    
                push()
                if (typeof this.backgroundVar == "function") {
                    this.backgroundVar(this.x, this.y, this.width, this.height)
                    noFill()
                }
                else {
                    fill(this.backgroundVar)
                }
                stroke(this.borderVar)
                strokeWeight(this.borderWeightVar)
                rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
                pop()
    
                for (let n = 0; n < lines.length; n++) {
                    text(lines[n], this.x+this.tSize*this.pFactor, this.y + this.tSize*(this.pFactor+n))
                }
    
                if (this.editing) {
                    const now = new Date()
                    if (now - this.lastToggledCursor > 530) {
                        this.showingCursor = !this.showingCursor;
                        this.lastToggledCursor = now;
                    }
                    if (this.showingCursor) {
                        let lineNumber = (this.cursorAfter.match(/\n/g) || []).length
                        let cursorAfterOnThisLine = this.cursorAfter.split("\n")[lineNumber]
                        let lineX = this.x+textWidth(cursorAfterOnThisLine)+this.tSize*this.pFactor;
                        let lineY1 =  this.y + this.tSize*(this.pFactor + lineNumber);
                        let lineY2 = this.y + this.tSize*(this.pFactor + lineNumber+1);
                        stroke(this.cursorColourVar)
                        strokeWeight(this.cursorWeightVar)
                        line(lineX, lineY1, lineX, lineY2)
                    }
                }
            }
            pop()
        }
    }

    async onKeyPressed() {
        if (this.hiddenVar == false && this.phantomVar == false && this.lockedVar == false) {
            if (this.editing) {
                // Check if Control or Meta is pressed
                if (keyIsDown(17) || keyIsDown(91) || keyIsDown(93)) {
                    console.log("yo1")
                    // Check if v is pressed
                    if (keyCode == 86) {
                        console.log("yo")
                        if (navigator.clipboard) {
                            let textToAdd = await navigator.clipboard.readText();
                            let lines = this.t.split("\n")
                            let lineNumber = (this.cursorAfter.match(/\n/g) || []).length
                            push()
                            textSize(this.tSize)
                            if (this.emphasisVar) textStyle(this.emphasisVar)
                            if (this.fontVar) textFont(this.fontVar)
                            if (textWidth(lines[lineNumber])+textWidth(textToAdd) <= this.maxWidthVar) {
                                this.t = this.t.slice(0, this.cursorAfter.length) + textToAdd + this.t.slice(this.cursorAfter.length)
                                this.cursorAfter += textToAdd;
                                this.showingCursor = true;
                                this.lastToggledCursor = new Date();
                                this.edited = true;
                            }
                            pop()
                        }
                    }
                }
                else {
                    switch (key) {
                        case "ArrowLeft":
                            if (this.cursorAfter.length > 0) {
                                this.cursorAfter = this.cursorAfter.slice(0, -1);
                                this.showingCursor = true;
                                this.lastToggledCursor = new Date();
                            }
                            break;
                        case "ArrowRight":
                            if (this.cursorAfter.length < this.t.length) {
                                this.cursorAfter = this.t.slice(0, this.cursorAfter.length+1);
                                this.showingCursor = true;
                                this.lastToggledCursor = new Date();
                            }
                            break;
                        case "ArrowUp":
                            {
                                push()
                                textSize(this.tSize)
                                if (this.emphasisVar) textStyle(this.emphasisVar)
                                if (this.fontVar) textFont(this.fontVar)
                                let lineNumber = (this.cursorAfter.match(/\n/g) || []).length
                                if (lineNumber > 0) {
                                    let cursorAfterOnThisLine = this.cursorAfter.split("\n")[lineNumber]
                                    let lineX = this.x+textWidth(cursorAfterOnThisLine)+this.tSize*this.pFactor;
                                    let lineY =  this.y + this.tSize*(this.pFactor + lineNumber+0.5);
                                    this.cursorAfter = this.getClosestCursorAfter(lineX, lineY-this.tSize)
                                    this.showingCursor = true;
                                    this.lastToggledCursor = new Date();
                                }
                                pop()
                            }
                            break;
                        case "ArrowDown":
                            {
                                push()
                                textSize(this.tSize)
                                if (this.emphasisVar) textStyle(this.emphasisVar)
                                if (this.fontVar) textFont(this.fontVar)
                                let lineNumber = (this.cursorAfter.match(/\n/g) || []).length
                                if (lineNumber < (this.t.match(/\n/g) || []).length) {
                                    let cursorAfterOnThisLine = this.cursorAfter.split("\n")[lineNumber]
                                    let lineX = this.x+textWidth(cursorAfterOnThisLine)+this.tSize*this.pFactor;
                                    let lineY =  this.y + this.tSize*(this.pFactor + lineNumber+0.5);
                                    this.cursorAfter = this.getClosestCursorAfter(lineX, lineY+this.tSize)
                                    this.showingCursor = true;
                                    this.lastToggledCursor = new Date();
                                }
                                pop()
                            }
                            break;
                        case "Backspace":
                            push()
                            textSize(this.tSize)
                            if (this.emphasisVar) textStyle(this.emphasisVar)
                            if (this.fontVar) textFont(this.fontVar)
                            if (this.cursorAfter != "") {
                                let lines = this.t.split("\n")
                                let lineNumber = (this.cursorAfter.match(/\n/g) || []).length
                                let cursorAfterArray = this.cursorAfter.split("\n");
                                let cursorAfterOnThisLine = cursorAfterArray[lineNumber]
                                if (cursorAfterOnThisLine == "" && textWidth(lines[lineNumber])+textWidth(lines[lineNumber-1]) > this.maxWidthVar) break;
                                this.t = this.t.slice(0, this.cursorAfter.length-1) + this.t.slice(this.cursorAfter.length);
                                this.cursorAfter = this.cursorAfter.slice(0, -1);
                                this.showingCursor = true;
                                this.lastToggledCursor = new Date();
                                this.edited = true;
                            }
                            pop()
                            break;
                        case "Enter":
                            if (this.doMultiLine && keyIsDown(SHIFT)) {
                                if (this.height + this.tSize <= this.maxHeightVar) {
                                    this.t = this.t.slice(0, this.cursorAfter.length) + "\n" + this.t.slice(this.cursorAfter.length)
                                    this.cursorAfter += "\n"
                                    this.showingCursor = true;
                                    this.lastToggledCursor = new Date();
                                    this.edited = true;
                                }
                            }
                            else {
                                this.editing = false;
                                doHotkeys = true;
                                doHotMouseDown = true;
                                doHotMouseUp = true;
                                this.edited = false;
                                if (this.binding != "") {
                                    eval(`${this.binding} = this.t`)
                                }
                            }
                            break;
                        default:
                            if ((keyCode == 32) || (48 <= keyCode && keyCode <= 90) || (96 <= keyCode && keyCode <= 111) || (186 <= keyCode && keyCode <= 222)) {
                                let lines = this.t.split("\n")
                                let lineNumber = (this.cursorAfter.match(/\n/g) || []).length
                                push()
                                textSize(this.tSize)
                                if (this.emphasisVar) textStyle(this.emphasisVar)
                                if (this.fontVar) textFont(this.fontVar)
                                if (textWidth(lines[lineNumber])+textWidth(key) <= this.maxWidthVar) {
                                    this.t = this.t.slice(0, this.cursorAfter.length) + key + this.t.slice(this.cursorAfter.length)
                                    this.cursorAfter += key;
                                    this.showingCursor = true;
                                    this.lastToggledCursor = new Date();
                                    this.edited = true;
                                }
                                pop()
                            }
                            break;
                    }
                }
            }
        }
    }

    getClosestCursorAfter(mx, my) {
        push()
        textSize(this.tSize)
        if (this.emphasisVar) textStyle(this.emphasisVar)
        if (this.fontVar) textFont(this.fontVar)
        let closestCursorAfter = ""
        if (this.doMultiLine) {
            let lines = this.t.split("\n")

            let closestLineIndex = 0;
            let closestLineMidY = this.y + this.tSize*(this.pFactor+0.5)
            for (let n = 1; n < lines.length; n++) {
                let midY = this.y + this.tSize*(this.pFactor+n+0.5)
                if (Math.abs(midY - my) < Math.abs(closestLineMidY - my)) {
                    closestLineIndex = n;
                    closestLineMidY = midY;
                }
            }

            let t = lines[closestLineIndex]
            for (let n = 0; n < closestLineIndex; n++) {
                closestCursorAfter += lines[n] + "\n"
            }

            let closestSample = ""
            for (let i = 1; i <= t.length; i++) {
                let sample = t.slice(0, i)
                if (Math.abs(this.x + textWidth(sample) + this.tSize*this.pFactor - mx) < Math.abs(this.x + textWidth(closestSample) + this.tSize*this.pFactor - mx)) closestSample = sample;
            }
            closestCursorAfter += closestSample
        }
        else {
            closestCursorAfter = this.t
            for (let i = 0; i < this.t.length; i++) {
                let sample = this.t.slice(0, i)
                if (Math.abs(this.x + textWidth(sample) + this.tSize*this.pFactor - mx) < Math.abs(this.x + textWidth(closestCursorAfter) + this.tSize*this.pFactor - mx)) closestCursorAfter = sample;
            }
        }
        pop()
        return closestCursorAfter;
    }

    onMousePressed() {
        if (this.hiddenVar == false && this.phantomVar == false && this.lockedVar == false) {
            if (this.mouseOver() && this.canSelect) {
                if (popups.mouseOver() == this.popupID || popups.mouseOver() == undefined) {
                    this.editing = true;
                    doHotkeys = false;
                    doHotMouseDown = false;
                    doHotMouseUp = false;
                    this.cursorAfter = this.getClosestCursorAfter(mouseX, mouseY)
                    this.showingCursor = true;
                    this.lastToggledCursor = new Date();
                }
            }
            else {
                if (this.editing) {
                    this.editing = false;
                    doHotkeys = true;
                    doHotMouseDown = true;
                    doHotMouseUp = true;
                }
            }
        }
    }

    onMouseReleased() {
        // if (popups.mouseOver() == this.popupID || popups.mouseOver() == undefined) {
            // if (this.hiddenVar == false && this.phantomVar == false && this.lockedVar == false) {

            // }
        // }
    }

    mouseOver() {
        if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) return true;
        return false;
    }

    placeholder(text) {
        this.placeholderVar = text;
        return this;
    }

    locked(value=true) {
        this.lockedVar = value;
        return this;
    }

    maxWidth(value) {
        this.maxWidthVar = value;
        return this;
    }

    maxHeight(value) {
        this.maxHeightVar = value;
        return this;
    }

    cursorColour(colour) {
        this.cursorColourVar = colour;
        return this;
    }

    cursorWeight(value) {
        this.cursorWeightVar = value;
        return this;
    }
}class Toggle {
    constructor(width, height) {
        this.x;
        this.y;
        this.width = width;
        this.height = height;

        this.clickable = true;
        this.typeable = true;
        this.scrollable = true;
        this.alignment = "leading";
        this.hiddenVar = false;
        this.phantomVar = false;

        this.binding = "";
        this.radioName = "";
        this.radioBinding = "";
        
        this.popupVar;
        
        this.centeredVar = false;
        this.lockedVar = false;
        this.displayState = "default off";
        this.on = false;

        this.cornerRadiusVar;
        this.backgroundVar = {"default on": Color.accent, "default off": Color.secondary, "hover on": Color.accent, "hover off": Color.secondary, "pressed on": Color.brighter(Color.accent), "pressed off": Color.brighter(Color.secondary)};
        this.borderVar = {"default on": Color.transparent, "default off": Color.transparent, "hover on": Color.transparent, "hover off": Color.transparent, "pressed on": Color.transparent, "pressed off": Color.transparent, };
        this.borderWeightVar = {"default on": 1, "default off": 1, "hover on": 1, "hover off": 1, "pressed on": 1, "pressed off": 1};

        this.popupID = "";
        this.canSelect = true;
    }

    pipe(popupID, canSelect) {
        if (popupID !== undefined) this.popupID = popupID;
        if (canSelect !== undefined) this.canSelect = canSelect;
        if (this.knobVar) if (this.knobVar[this.displayState]) if (this.knobVar[this.displayState].clickable) this.knobVar[this.displayState].pipe(popupID, canSelect)
        if (this.contents) if (this.contents[this.displayState]) if (this.contents[this.displayState].clickable) this.contents[this.displayState].pipe(popupID, canSelect)
    }

    update() {
        if (this.lockedVar == false) {
            let condition = false;
            if (this.mouseOver() && this.canSelect) condition = true;
            else if (this.knobVar) {
                if (this.knobVar[this.displayState].mouseOver() && this.canSelect) condition = true;
            }
            if (condition) {
                if (popups.mouseOver() == this.popupID || popups.mouseOver() == undefined) {
                    cursor("pointer")
                    this.displayState = `hover ${this.on ? "on": "off"}`
                    if (mouseIsPressed) {
                        this.displayState = `pressed ${this.on ? "on": "off"}`
                    }
                    doHotMouseDown = false;
                    doHotMouseUp = false;
                    // console.log(doHotMouseDown, this.radioName)
                }
            }
            else {
                if (this.displayState == "hover on" || this.displayState == "hover off" || this.displayState == "pressed on" || this.displayState == "pressed off") {
                    doHotMouseDown = true;
                    doHotMouseUp = true;
                }
                // console.log(doHotMouseDown, this.radioName)
                this.displayState = this.on ? "default on" : "default off"
            }

            if (this.binding != "") {
                if (this.on != eval(this.binding)) {
                    // binding changed so update this.displayState and this.on
                    this.set(eval(this.binding))
                    if (!this.on && this.radioBinding != "") eval(`${this.radioBinding} = ""`)
                }
            }
    
            if (this.radioBinding != "") {
                if (eval(this.radioBinding) != this.radioName) {
                    if (this.on) this.set(false)
                }
                else {
                    if (!this.on) this.set(true)
                }
            }
        }
    }

    toggle() {
        return this.set(!this.on);
    }
    set(value) {
        this.on = value;
        this.displayState = value ? "default on" : "default off"
        if (this.binding != "") eval(`${this.binding} = this.on`)
        if (this.radioBinding != "") {
            if (value == true) {
                eval(`${this.radioBinding} = this.radioName`)
            }
        }
        if (this.popupVar) this.popupVar.hidden(!value)
        return this;
    }

    bind(target) {
        this.binding = target;
        return this;
    }

    radio(target, radioName) {
        this.radioName = radioName
        this.radioBinding = target;
        return this;
    }

    align(value) {
        if (value == "leading" || value == "center" || value == "trailing") {
            this.alignment = value;
        }
        else {
            logCanvasUIError(`Invalid alignment: '${value}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
        }
        return this;
    }

    hidden(value=true) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value=true) {
        this.phantomVar = value;
        return this;
    }

    centered(value=true) {
        this.centeredVar = value;
        return this;
    }

    locked(value=true) {
        this.lockedVar = value;
        return this;
    }

    onKeyPressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.knobVar) {
                if (this.knobVar[this.displayState].typeable) this.knobVar[this.displayState].onKeyPressed()
            }
        }
    }

    onMousePressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.knobVar) {
                if (this.knobVar[this.displayState].clickable) {
                    this.knobVar[this.displayState].onMousePressed()
                }
            }
        }
    }

    onMouseReleased() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.lockedVar == false) {
                let condition = false;
                if (this.mouseOver() && this.canSelect) condition = true;
                else if (this.knobVar) {
                    if (this.knobVar[this.displayState].mouseOver() && this.canSelect) condition = true;
                }
                if (condition) {
                    if (popups.mouseOver() == this.popupID || popups.mouseOver() == undefined) {
                        this.toggle()
                        if (this.binding != "") eval(`${this.binding} = this.on`)
                        if (!this.on && this.radioBinding != "") eval(`${this.radioBinding} = ""`)
                    }
                }
            }
            if (this.knobVar) {
                if (this.knobVar[this.displayState].clickable) this.knobVar[this.displayState].onMouseReleased()
            }
        }
    }

    onMouseWheel(event) {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.knobVar) {
                if (this.knobVar[this.displayState].scrollable) this.knobVar[this.displayState].onMouseWheel(event)
            }
        }
    }

    mouseOver() {
        if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) return true;
        return false;
    }

    setWidth(value) {
        this.width = value;
        return this;
    }

    setHeight(value) {
        this.height = value;
        return this;
    }

    popup(popup) {
        this.popupVar = popup;
        return this;
    }

    checkWhen(when, trueFunction, absentFunction, onlyMouseStateFunction, onlyStateFunction, variableIdentifierText) {
        if (when) {
            let whenOptions = ["default on", "default off", "hover on", "hover off", "pressed on", "pressed off"]
            if (whenOptions.includes(when)) {
                trueFunction()
            }
            else if (when == "default" || when == "hover" || when == "pressed") {
                onlyMouseStateFunction()
            }
            else if (when == "on" || when == "off") {
                onlyStateFunction()
            }
            else {
                logCanvasUIError(`Invalid parameter '${when}' for ${variableIdentifierText}. Ensure the input is one of the following: '${whenOptions.join("', '")}'`)
            }
        }
        else {
            absentFunction()
        }
        return this;
    }

    background(input, when) {
        this.checkWhen(when, () => {
            this.backgroundVar[when] = input;
        }, () => {
            this.backgroundVar["default on"] = input;
            this.backgroundVar["default off"] = input;
            this.backgroundVar["hover on"] = input;
            this.backgroundVar["hover off"] = input;
            this.backgroundVar["pressed on"] = input;
            this.backgroundVar["pressed off"] = input;
        }, () => {
            this.backgroundVar[`${when} on`] = input;
            this.backgroundVar[`${when} off`] = input;
        }, () => {
            this.backgroundVar[`default ${when}`] = input;
            this.backgroundVar[`hover ${when}`] = input;
            this.backgroundVar[`pressed ${when}`] = input;
        }, "toggle background")
        return this;
    }
    border(colour, when) {
        this.checkWhen(when, () => {
            this.borderVar[when] = colour;
        }, () => {
            this.borderVar["default on"] = colour;
            this.borderVar["default off"] = colour;
            this.borderVar["hover on"] = colour;
            this.borderVar["hover off"] = colour;
            this.borderVar["pressed on"] = colour;
            this.borderVar["pressed off"] = colour;
        }, () => {
            this.borderVar[`${when} on`] = colour;
            this.borderVar[`${when} off`] = colour;
        }, () => {
            this.borderVar[`default ${when}`] = colour;
            this.borderVar[`hover ${when}`] = colour;
            this.borderVar[`pressed ${when}`] = colour;
        }, "toggle alignment")
        return this;
    }
    borderWeight(value, when) {
        this.checkWhen(when, () => {
            this.borderWeightVar[when] = value;
        }, () => {
            this.borderWeightVar["default on"] = value;
            this.borderWeightVar["default off"] = value;
            this.borderWeightVar["hover on"] = value;
            this.borderWeightVar["hover off"] = value;
            this.borderWeightVar["pressed on"] = value;
            this.borderWeightVar["pressed off"] = value;
        }, () => {
            this.borderWeightVar[`${when} on`] = value;
            this.borderWeightVar[`${when} off`] = value;
        }, () => {
            this.borderWeightVar[`default ${when}`] = value;
            this.borderWeightVar[`hover ${when}`] = value;
            this.borderWeightVar[`pressed ${when}`] = value;
        }, "toggle borderWeight")
        return this;
    }
    cornerRadius(tl=this.height, tr, br, bl, when) {
        if (tr == undefined && br == undefined && bl == undefined) {
            // r1 applies to all corners
            this.checkWhen(when, () => {
                this.cornerRadiusVar[when] = [tl, tl, tl, tl];
            }, () => {
                this.cornerRadiusVar["default on"] = [tl, tl, tl, tl];
                this.cornerRadiusVar["default off"] = [tl, tl, tl, tl];
                this.cornerRadiusVar["hover on"] = [tl, tl, tl, tl];
                this.cornerRadiusVar["of hover"] = [tl, tl, tl, tl];
                this.cornerRadiusVar["pressed on"] = [tl, tl, tl, tl];
                this.cornerRadiusVar["pressed off"] = [tl, tl, tl, tl];
            }, () => {
                this.cornerRadiusVar[`${when} on`] = [tl, tl, tl, tl];
                this.cornerRadiusVar[`${when} off`] = [tl, tl, tl, tl];
            }, () => {
                this.cornerRadiusVar[`default ${when}`] = [tl, tl, tl, tl];
                this.cornerRadiusVar[`hover ${when}`] = [tl, tl, tl, tl];
                this.cornerRadiusVar[`pressed ${when}`] = [tl, tl, tl, tl];
            }, "toggle cornerRadius")
        }
        else {
            // each one individually applies to their own corner with tl as top-left and tr as top-right etc
            this.checkWhen(when, () => {
                this.cornerRadiusVar[when] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
            }, () => {
                this.cornerRadiusVar["default on"] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.cornerRadiusVar["default off"] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.cornerRadiusVar["hover on"] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.cornerRadiusVar["hover off"] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.cornerRadiusVar["pressed on"] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.cornerRadiusVar["pressed off"] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
            }, () => {
                this.cornerRadiusVar[`${when} on`] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.cornerRadiusVar[`${when} off`] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
            }, () => {
                this.cornerRadiusVar[`default ${when}`] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.cornerRadiusVar[`hover ${when}`] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.cornerRadiusVar[`pressed ${when}`] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
            }, "toggle cornerRadius")
        }
        return this;
    }
}

class SlideToggle extends Toggle {
    constructor(width=32, height=18) {
        super(width, height);

        this.cornerRadiusVar = {"default on": [this.height, this.height, this.height, this.height], "default off": [this.height, this.height, this.height, this.height], "hover on": [this.height, this.height, this.height, this.height], "hover off": [this.height, this.height, this.height, this.height], "pressed on": [this.height, this.height, this.height, this.height], "pressed off": [this.height, this.height, this.height, this.height]};

        this.knobVar = {
            "default on": new Block(height*0.77, height*0.77).background(Color.white).cornerRadius(this.height).centered(true), 
            "default off": new Block(height*0.77, height*0.77).background(Color.white).cornerRadius(this.height).centered(true), 
            "hover on": new Block(height*0.77, height*0.77).background(Color.white).cornerRadius(this.height).centered(true), 
            "hover off": new Block(height*0.77, height*0.77).background(Color.white).cornerRadius(this.height).centered(true), 
            "pressed on": new Block(height*0.77, height*0.77).background(Color.white).cornerRadius(this.height).centered(true), 
            "pressed off": new Block(height*0.77, height*0.77).background(Color.white).cornerRadius(this.height).centered(true)
        }
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }

        if (this.hiddenVar == false) {
            this.update()
            
            if (context) {
                // Render on to specified context
                let x = this.x - contextX;
                let y = this.y - contextY;
                context.push()
                // Background
                if (typeof this.backgroundVar[this.displayState] == "function") {
                    this.backgroundVar[this.displayState](x, y, this.width, this.height, context)
                    context.noFill()
                }
                else {
                    context.fill(this.backgroundVar[this.displayState])
                }
                context.stroke(this.borderVar[this.displayState])
                context.strokeWeight(this.borderWeightVar[this.displayState])
                context.rect(x, y, this.width, this.height, this.cornerRadiusVar[this.displayState][0], this.cornerRadiusVar[this.displayState][1], this.cornerRadiusVar[this.displayState][2], this.cornerRadiusVar[this.displayState][3])
                context.pop()
                
                // Knob
                if (this.displayState.split(" ")[1] == "on") {
                    this.knobVar[this.displayState].render(this.x + this.width - this.height/2, this.y + this.height/2, context, contextX, contextY)
                }
                else {
                    this.knobVar[this.displayState].render(this.x + this.height/2, this.y + this.height/2, context, contextX, contextY)
                }
            }
            else {
                // Render directly on to main canvas
                push()
                // Background
                if (typeof this.backgroundVar[this.displayState] == "function") {
                    this.backgroundVar[this.displayState](this.x, this.y, this.width, this.height)
                    noFill()
                }
                else {
                    fill(this.backgroundVar[this.displayState])
                }
                stroke(this.borderVar[this.displayState])
                strokeWeight(this.borderWeightVar[this.displayState])
                rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[this.displayState][0], this.cornerRadiusVar[this.displayState][1], this.cornerRadiusVar[this.displayState][2], this.cornerRadiusVar[this.displayState][3])
                pop()
                
                // Knob
                if (this.displayState.split(" ")[1] == "on") {
                    this.knobVar[this.displayState].render(this.x + this.width - this.height/2, this.y + this.height/2)
                }
                else {
                    this.knobVar[this.displayState].render(this.x + this.height/2, this.y + this.height/2)
                }
            }
        }

        if (this.popupVar) {
            switch (this.popupVar.side) {
                case "left":
                    this.popupVar.x = this.x;
                    this.popupVar.y = this.y + this.height/2;
                    break;
                case "right":
                    this.popupVar.x = this.x + this.width
                    this.popupVar.y = this.y + this.height/2
                    break;
                case "top":
                    this.popupVar.x = this.x + this.width/2
                    this.popupVar.y = this.y
                    break;
                case "bottom":
                    this.popupVar.x = this.x + this.width/2
                    this.popupVar.y = this.y + this.height
                    break;
            }
        }
    }

    // Can only input elements with setWidth and setHeight functions. ie: Blank, Block, Button, Slider, Slider2D
    knob(elem, when) {
        this.checkWhen(when, () => {
            this.knobVar[when] = elem;
        }, () => {
            this.knobVar["default on"] = elem;
            this.knobVar["default off"] = elem;
            this.knobVar["hover on"] = elem;
            this.knobVar["hover off"] = elem;
            this.knobVar["pressed on"] = elem;
            this.knobVar["pressed off"] = elem;
        }, () => {
            this.knobVar[`${when} on`] = elem;
            this.knobVar[`${when} off`] = elem;
        }, () => {
            this.knobVar[`default ${when}`] = elem;
            this.knobVar[`hover ${when}`] = elem;
            this.knobVar[`pressed ${when}`] = elem;
        }, "slider toggle knob")
        return this;
    }
}

class CheckToggle extends Toggle {
    constructor(width=18, height=18) {
        super(width, height);

        this.cornerRadiusVar = {"default on": [4, 4, 4, 4], "default off": [4, 4, 4, 4], "hover on": [4, 4, 4, 4], "hover off": [4, 4, 4, 4], "pressed on": [4, 4, 4, 4], "pressed off": [4, 4, 4, 4]};

        this.contents = {"default on": undefined, "default off": undefined, "hover on": undefined, "hover off": undefined, "pressed on": undefined, "pressed off": undefined};
    
        this.pad = {"default on": 0, "default off": 0, "hover on": 0, "hover off": 0, "pressed on": 0, "pressed off": 0};
    }

    render(x, y, context, contextX, contextY) {
        if (this.centeredVar) {
            if (x !== undefined) this.x = x-this.width/2;
            if (y !== undefined) this.y = y-this.height/2;
        }
        else {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
        }

        if (this.hiddenVar == false) {
            this.update()

            if (context) {
                // Render on to specified context
                let x = this.x - contextX;
                let y = this.y - contextY;
                context.push()
                // Background
                if (typeof this.backgroundVar[this.displayState] == "function") {
                    this.backgroundVar[this.displayState](x, y, this.width, this.height, context)
                    context.noFill()
                }
                else {
                    context.fill(this.backgroundVar[this.displayState])
                }
                context.stroke(this.borderVar[this.displayState])
                context.strokeWeight(this.borderWeightVar[this.displayState])
                context.rect(x, y, this.width, this.height, this.cornerRadiusVar[this.displayState][0], this.cornerRadiusVar[this.displayState][1], this.cornerRadiusVar[this.displayState][2], this.cornerRadiusVar[this.displayState][3])
                
                if (this.contents[this.displayState]) {
                    if (this.contents[this.displayState].phantomVar == false) {
                        let scaleFactor = Math.min((this.width - 2*this.pad[this.displayState])/this.contents[this.displayState].width, (this.height - 2*this.pad[this.displayState])/this.contents[this.displayState].height)
                        context.translate(x + this.width/2 - this.contents[this.displayState].width/2*scaleFactor, y + this.height/2 - this.contents[this.displayState].height/2*scaleFactor)
                        context.scale(scaleFactor)
                        this.contents[this.displayState].render(contextX, contextY, context, contextX, contextY)
                    }
                }
                context.pop()
            }
            else {
                // Render directly on to main canvas
                push()
                // Background
                if (typeof this.backgroundVar[this.displayState] == "function") {
                    this.backgroundVar[this.displayState](this.x, this.y, this.width, this.height)
                    noFill()
                }
                else {
                    fill(this.backgroundVar[this.displayState])
                }
                stroke(this.borderVar[this.displayState])
                strokeWeight(this.borderWeightVar[this.displayState])
                rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[this.displayState][0], this.cornerRadiusVar[this.displayState][1], this.cornerRadiusVar[this.displayState][2], this.cornerRadiusVar[this.displayState][3])
                
                if (this.contents[this.displayState]) {
                    if (this.contents[this.displayState].phantomVar == false) {
                        let scaleFactor = Math.min((this.width - 2*this.pad[this.displayState])/this.contents[this.displayState].width, (this.height - 2*this.pad[this.displayState])/this.contents[this.displayState].height)
                        translate(this.x + this.width/2 - this.contents[this.displayState].width/2*scaleFactor, this.y + this.height/2 - this.contents[this.displayState].height/2*scaleFactor)
                        scale(scaleFactor)
                        this.contents[this.displayState].render(0, 0)
                    }
                }
                pop()
            }
        }

        if (this.popupVar) {
            switch (this.popupVar.side) {
                case "left":
                    this.popupVar.x = this.x;
                    this.popupVar.y = this.y + this.height/2;
                    break;
                case "right":
                    this.popupVar.x = this.x + this.width
                    this.popupVar.y = this.y + this.height/2
                    break;
                case "top":
                    this.popupVar.x = this.x + this.width/2
                    this.popupVar.y = this.y
                    break;
                case "bottom":
                    this.popupVar.x = this.x + this.width/2
                    this.popupVar.y = this.y + this.height
                    break;
            }
        }
    }

    contains(elem, when) {
        this.checkWhen(when, () => {
            this.contents[when] = elem;
        }, () => {
            this.contents["default on"] = elem;
            this.contents["default off"] = elem;
            this.contents["hover on"] = elem;
            this.contents["hover off"] = elem;
            this.contents["pressed on"] = elem;
            this.contents["pressed off"] = elem;
        }, () => {
            this.contents[`${when} on`] = elem;
            this.contents[`${when} off`] = elem;
        }, () => {
            this.contents[`default ${when}`] = elem;
            this.contents[`hover ${when}`] = elem;
            this.contents[`pressed ${when}`] = elem;
        }, "check toggle contains")
        return this;
    }

    padding(value, when) {
        this.checkWhen(when, () => {
            this.pad[when] = value;
        }, () => {
            this.pad["default on"] = value;
            this.pad["default off"] = value;
            this.pad["hover on"] = value;
            this.pad["hover off"] = value;
            this.pad["pressed on"] = value;
            this.pad["pressed off"] = value;
        }, () => {
            this.pad[`${when} on`] = value;
            this.pad[`${when} off`] = value;
        }, () => {
            this.pad[`default ${when}`] = value;
            this.pad[`hover ${when}`] = value;
            this.pad[`pressed ${when}`] = value;
        }, "check toggle padding")
        return this;
    }
}let doCanvasUIErrorLog = true;
function logCanvasUIError(message) {
    if (doCanvasUIErrorLog) console.error(message)
}