class Blank {
    constructor(width=0, height=0) {
        this.x;
        this.y;
        this.width = width;
        this.height = height;

        this.clickable = false;
        this.typeable = false;
        this.alignment = "leading";
        this.phantomVar = false;
    }

    render(x, y) {
        this.x = x;
        this.y = y;
    }

    phantom(value) {
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
}class Block {
    constructor(width=50, height=50) {
        this.x;
        this.y;
        this.width = width;
        this.height = height;

        this.clickable = false;
        this.typeable = false;
        this.alignment = "leading";
        this.phantomVar = false;
        this.hiddenVar = false;

        this.centeredVar = false;

        this.backgroundVar = Color.primary;
        this.borderVar = Color.transparent;
        this.borderWeightVar = 1;
        this.cornerRadiusVar = [10, 10, 10, 10]
    }

    render(x, y) {
        this.x = x;
        this.y = y;

        if (this.hiddenVar == false) {
            push()
            fill(this.backgroundVar)
            stroke(this.borderVar)
            strokeWeight(this.borderWeightVar)
            if (this.centeredVar) rectMode(CENTER)
            rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
            pop()
        }
    }

    mouseOver() {
        if (this.centeredVar) {
            if (mouseX >= this.x - this.width/2 && mouseX <= this.x + this.width/2 && mouseY >= this.y - this.height/2 && mouseY <= this.y + this.height/2) return true;
        }
        else {
            if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) return true;
        }
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

    align(value) {
        if (value != "leading" && value != "center" && value != "trailing") {
            console.error(`Invalid alignment: '${this.alignment}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
            return this;
        }
        this.alignment = value;
        return this;
    }

    phantom(value) {
        this.phantomVar = value;
        return this;
    }
    hidden(value) {
        this.hiddenVar = value;
        return this;
    }

    centered(value) {
        this.centeredVar = value;
        return this;
    }

    background(colour) {
        this.backgroundVar = colour;
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
    constructor (width=80, height=25) {
        this.x;
        this.y;
        this.width = width;
        this.height = height;

        this.typeable = false;
        this.clickable = true;
        this.alignment = "center";
        this.hiddenVar = false;
        this.phantomVar = false;

        this.displayState = "default";
        this.commandVar = () => {};

        this.backgroundVar = {"default": Color.secondary, "hover": Color.brighter(Color.secondary), "pressed": Color.accent};
        this.borderVar = {"default": Color.transparent, "hover": Color.transparent, "pressed": Color.transparent};
        this.borderWeightVar = {"default": 1, "hover": 1, "pressed": 1};
        this.cornerRadiusVar = {"default": [6, 6, 6, 6], "hover": [6, 6, 6, 6], "pressed": [6, 6, 6, 6]};

        this.contents = {"default": undefined, "hover": undefined, "pressed": undefined,};
        this.padFactor = {"default": 0.8, "hover": 0.8, "pressed": 0.8};
    }

    render(x, y) {
        this.x = x;
        this.y = y;

        if (this.hiddenVar == false) {
            if (this.mouseOver()) {
                cursor("pointer")
                this.displayState = `hover`
                if (mouseIsPressed) {
                    this.displayState = `pressed`
                }
                doHotMouseDown = false;
                doHotMouseUp = false;
            }
            else {
                if (this.displayState == "hover" || this.displayState == "pressed") {
                    doHotMouseDown = true;
                    doHotMouseUp = true;
                }
                this.displayState = "default"
            }
    
            push()
            // Background
            fill(this.backgroundVar[this.displayState])
            stroke(this.borderVar[this.displayState])
            strokeWeight(this.borderWeightVar[this.displayState])
            rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[this.displayState][0], this.cornerRadiusVar[this.displayState][1], this.cornerRadiusVar[this.displayState][2], this.cornerRadiusVar[this.displayState][3])
            
            if (this.contents[this.displayState]) {
                if (this.contents[this.displayState].phantomVar == false) {
                    let scaleFactor = Math.min(this.width/this.contents[this.displayState].width, this.height/this.contents[this.displayState].height)*this.padFactor[this.displayState]
                    translate(this.x + this.width/2 - this.contents[this.displayState].width/2*scaleFactor, this.y + this.height/2 - this.contents[this.displayState].height/2*scaleFactor)
                    scale(scaleFactor)
                    this.contents[this.displayState].render(0, 0)
                }
            }
            pop()
        }
    }

    align(value) {
        if (value != "leading" && value != "center" && value != "trailing") {
            console.error(`Invalid alignment: '${this.alignment}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
            return this;
        }
        this.alignment = value;
        return this;
    }

    hidden(value) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value) {
        this.phantomVar = value;
        return this;
    }
    
    command(func) {
        this.commandVar = func;
        return this;
    }

    onMousePressed() {
        // if (this.hiddenVar == false && this.phantomVar == false) {
            
        // }
    }

    onMouseReleased() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.mouseOver()) {
                this.commandVar();
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

    checkWhen(when, trueFunction, absentFunction, variableIdentifierText) {
        if (when) {
            let whenOptions = ["default", "hover", "pressed"]
            if (whenOptions.includes(when)) {
                trueFunction()
            }
            else {
                console.error(`Invalid 'when' parameter ${when} for ${variableIdentifierText}. Ensure the input is one of the following: '${whenOptions.join("', '")}'`)
            }
        }
        else {
            absentFunction()
        }
        return this;
    }

    background(colour, when) {
        this.checkWhen(when, () => {
            this.backgroundVar[when] = colour;
        }, () => {
            this.backgroundVar["default"] = colour;
            this.backgroundVar["hover"] = colour;
            this.backgroundVar["pressed"] = colour;
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

    paddingFactor(value, when) {
        this.checkWhen(when, () => {
            this.padFactor[when] = value;
        }, () => {
            this.padFactor["default"] = value;
            this.padFactor["hover"] = value;
            this.padFactor["pressed"] = value;
        }, "button paddingFactor")
        return this;
    }
}let doHotkeys = true;
let doHotMouseDown = true;
let doHotMouseUp = true;

let hotkey = {
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
        this.width = parseFloat(this.svg.split('width="')[1].split('"')[0]);
        this.height = parseFloat(this.svg.split('height="')[1].split('"')[0]);
        this.flipHorizontallyVar = false;
        this.flipVerticallyVar = false;

        this.typeable = false;
        this.clickable = false;
        this.alignment = "center";
        this.hiddenVar = false;
        this.phantomVar = false;

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

    render(x, y, scaleFactor=1) {
        this.x = x;
        this.y = y;
        if (this.hiddenVar == false) {
            push()
            scale(scaleFactor)
            translate(x, y)
            fill(this.fillColourVar)
            stroke(this.strokeColourVar)
            eval(this.graphicString)
            pop()
        }
    }

    align(value) {
        if (value == "leading" || value == "center" || value == "trailing") {
            this.alignment = value;
        }
        else {
            console.error(`Invalid alignment: '${this.alignment}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
        }
        return this;
    }

    hidden(value) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value) {
        this.phantomVar = value;
        return this;
    }

    fillColour(colour) {
        this.fillColourVar = colour;
        return this;
    }
    strokeColour(colour) {
        this.strokeColourVar = colour;
        return this;
    }
    strokeWeight(value) {
        this.strokeWeightVar = value;
        return this;
    }

    flipHorizontally() {
        this.flipHorizontallyVar = true;
        this.generateGraphicString()
        return this;
    }

    flipVertically() {
        this.flipVerticallyVar = true;
        this.generateGraphicString()
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
        
        this.clickable = true;
        this.typeable = true;
        this.alignment = "leading"
        this.hiddenVar = false;
        this.phantomVar = false;

        this.backgroundVar = Color.nearInverse;
        this.borderVar = Color.transparent;
        this.borderWeightVar = 1;
        this.cornerRadiusVar = [0, 0, 0, 0];
    }

    calcDimensions() {
        this.width = 0;
        this.height = this.pad;
        for (let n = 0; n < this.contents.length; n++) {
            let elem = this.contents[n]
            if (elem.phantomVar == false) {
                this.width = Math.max(this.width, elem.width + 3*this.pad);
                this.height += elem.height;
                if (elem.constructor.name == "Label") {
                    this.height += this.pad/4
                }
                else {
                    this.height += this.pad/2
                    if (elem.constructor.name == "Title") {
                        if (n != 0) this.height += this.pad/2
                    }
                }
            }
        }
        this.height += this.pad/2
    }

    render(x, y) {
        this.x = x;
        this.y = y;
        this.calcDimensions()

        if (this.hiddenVar == false) {
            push()
            fill(this.backgroundVar)
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
                                if (n != 0) ySweep += this.pad/2
                                elem.render(this.x + this.pad, this.y + ySweep);
                            }
                            else{
                                elem.render(this.x + 1.5*this.pad, this.y + ySweep);
                            }
                            break;
                        case "center":
                            if (elem.constructor.name == "Title") {
                                if (n != 0) ySweep += this.pad/2
                            }
                            elem.render(this.x + (this.width - elem.width)/2, this.y + ySweep);
                            break;
                        case "trailing":
                            if (elem.constructor.name == "Title") {
                                if (n != 0) ySweep += this.pad/2
                                elem.render(this.x + this.width - elem.width - this.pad, this.y + ySweep);
                            }
                            else{
                                elem.render(this.x + this.width - elem.width - 1.5*this.pad, this.y + ySweep);
                            }
                            break;
                    }

                    if (elem.constructor.name == "Label") {
                        ySweep += elem.height + this.pad/4;
                    }
                    else {
                        ySweep += elem.height + this.pad/2;
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

    padding(value) {
        this.pad = value;
        return this;
    }

    align(alignment) {
        this.alignment = alignment
    }

    hidden(value) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value) {
        this.phantomVar = value;
        return this;
    }

    background(colour) {
        this.backgroundVar = colour;
        return this;
    }

    border(value) {
        this.borderVar = value;
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
}class Popup {
    constructor(side="right") {
        this.clickable = true;
        this.typeable = true;
        this.hiddenVar = false;
        this.phantomVar = false;

        this.side = side; // left, right, top, bottom
        switch (this.side) {
            case "left":
                this.offsetVar = {x: -15 , y: 0};
                break;
            case "right":
                this.offsetVar = {x: 15 , y: 0};
                break;
            case "top":
                this.offsetVar = {x: 0 , y: -15};
                break;
            case "bottom":
                this.offsetVar = {x: 0 , y: 15};
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
        this.x = x;
        this.y = y;

        if (this.hiddenVar == false) {
            if (this.contents) {
                if (this.side == "left" || this.side == "right") {
                    // Left or right
                    if (this.side == "left") {
                        // Left
                        this.contents.render(this.x + this.offsetVar.x + this.contentOffsetVar.x - this.contents.width, this.y + this.offsetVar.y + this.contentOffsetVar.y - this.contents.height/2)
                        push();
                        fill(this.contents.backgroundVar);
                        stroke(this.contents.borderVar);
                        strokeWeight(this.contents.borderWeightVar);
                        triangle(this.x + this.offsetVar.x, this.y + this.offsetVar.y, this.x + this.offsetVar.x + this.contentOffsetVar.x - 1, this.y + this.offsetVar.y + this.contentOffsetVar.y-this.beakWidthVar/2, this.x + this.offsetVar.x + this.contentOffsetVar.x - 1, this.y + this.offsetVar.y + this.contentOffsetVar.y+this.beakWidthVar/2);
                        pop();
                    }
                    else {
                        // Right
                        this.contents.render(this.x + this.offsetVar.x + this.contentOffsetVar.x, this.y + this.offsetVar.y + this.contentOffsetVar.y - this.contents.height/2)
                        push();
                        fill(this.contents.backgroundVar);
                        stroke(this.contents.borderVar);
                        strokeWeight(this.contents.borderWeightVar);
                        triangle(this.x + this.offsetVar.x, this.y + this.offsetVar.y, this.x + this.offsetVar.x + this.contentOffsetVar.x + 1, this.y + this.offsetVar.y + this.contentOffsetVar.y-this.beakWidthVar/2, this.x + this.offsetVar.x + this.contentOffsetVar.x + 1, this.y + this.offsetVar.y + this.contentOffsetVar.y+this.beakWidthVar/2);
                        pop();
                    }
                }
                else {
                    // Top or bottom
                    if (this.side == "top") {
                        // Top
                        this.contents.render(this.x + this.offsetVar.x + this.contentOffsetVar.x - this.contents.width/2, this.y + this.offsetVar.y + this.contentOffsetVar.y - this.contents.height)
                        push();
                        fill(this.contents.backgroundVar);
                        stroke(this.contents.borderVar);
                        strokeWeight(this.contents.borderWeightVar);
                        triangle(this.x + this.offsetVar.x, this.y + this.offsetVar.y, this.x + this.offsetVar.x + this.contentOffsetVar.x-this.beakWidthVar/2, this.y + this.offsetVar.y + this.contentOffsetVar.y - 1, this.x + this.offsetVar.x + this.contentOffsetVar.x+this.beakWidthVar/2, this.y + this.offsetVar.y + this.contentOffsetVar.y - 1);
                        pop();
                    }
                    else {
                        // Bottom
                        this.contents.render(this.x + this.offsetVar.x + this.contentOffsetVar.x - this.contents.width/2, this.y + this.offsetVar.y + this.contentOffsetVar.y)
                        push();
                        fill(this.contents.backgroundVar);
                        stroke(this.contents.borderVar);
                        strokeWeight(this.contents.borderWeightVar);
                        triangle(this.x + this.offsetVar.x, this.y + this.offsetVar.y, this.x + this.offsetVar.x + this.contentOffsetVar.x-this.beakWidthVar/2, this.y + this.offsetVar.y + this.contentOffsetVar.y + 1, this.x + this.offsetVar.x + this.contentOffsetVar.x+this.beakWidthVar/2, this.y + this.offsetVar.y + this.contentOffsetVar.y + 1);
                        pop();
                    }
                }
            }
        }
    }

    hidden(value) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value) {
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
}// NOT FINISHED
// !!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!

class Slider {
    constructor (width, height) {
        this.x;
        this.y;
        this.width = width;
        this.height = height;

        this.typeable = false;
        this.clickable = true;
        this.alignment = "center";
        this.hiddenVar = false;
        this.phantomVar = false;

        this.displayState = "default"

        this.value = 0;
        this.precisionVar = Infinity;
        this.binding = "";
        this.editing = false;

        this.backgroundVar = Color.secondary;
        this.borderVar = Color.transparent;
        this.borderWeightVar = 1;
        this.cornerRadiusVar = [6, 6, 6, 6];

        this.knobVar;
    }

    update() {
        if (this.binding != "") {
            let bindValue = parseFloat(eval(this.binding))
            if (this.value != bindValue) {
                // the binding variable changed - update this.value
                if (bindValue < 0) {
                    this.value = 0;
                }
                else if (bindValue > 1) {
                    this.value = 1;
                }
                else {
                    if (this.precisionVar == Infinity) {
                        this.value = bindValue;
                    }
                    else {
                        this.value = Math.round(bindValue*this.precisionVar)/this.precisionVar
                    }
                }
            }
        }
        
        if (this.mouseOver() || this.knobVar.mouseOver()) {
            cursor("pointer")
            this.displayState = "hover"
            if (this.editing) {
                this.displayState = "pressed"
            }
            doHotMouseDown = false;
            doHotMouseUp = false;
        }
        else {
            if (this.displayState == "hover" || this.displayState == "pressed") {
                doHotMouseDown = true;
                doHotMouseUp = true;
            }
            this.displayState = "default"
        }
    }

    set(value) {
        if (value < 0) {
            this.value = 0;
        }
        else if (value > 1) {
            this.value = 1;
        }
        else {
            if (this.precisionVar == Infinity) {
                this.value = value;
            }
            else {
                this.value = Math.round(value*this.precisionVar)/this.precisionVar
            }
        }
        eval(`${this.binding} = this.value`)
        return this;
    }

    bind(target) {
        this.binding = target;
        return this;
    }

    precision(value) {
        this.precisionVar = value;
        return this;
    }

    align(value) {
        if (value != "leading" && value != "center" && value != "trailing") {
            console.error(`Invalid alignment: '${this.alignment}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
            return this;
        }
        this.alignment = value;
        return this;
    }

    hidden(value) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value) {
        this.phantomVar = value;
        return this;
    }

    onMousePressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.mouseOver() || this.knobVar.mouseOver()) {
                this.editing = true;
                console.log(this.editing)
            }
        }
    }

    onMouseReleased() {
        this.editing = false
        console.log(this.editing)
        // if (this.hiddenVar == false && this.phantomVar == false) {
       
        // }
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

    background(colour) {
        this.backgroundVar = colour;
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
            this.cornerRadiusVar[when] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
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

    render(x, y) {
        this.x = x;
        this.y = y;

        if (this.hiddenVar == false) {
            this.update()
            
            if (this.editing) {
                this.set((mouseX-this.x)/this.width)
            }

            push()
            // Background
            fill(this.backgroundVar)
            stroke(this.borderVar)
            strokeWeight(this.borderWeightVar)
            rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
            pop()

            this.knobVar.render(this.value*this.width+this.x, this.y+this.height/2)
        }
    }
}

class VSlider extends Slider {
    constructor(width=10, height=100) {
        super(width, height)

        this.knobVar = new Block(width*1.8, width*1.8).cornerRadius(width*1.8).centered(true)
    }

    render(x, y) {
        this.x = x;
        this.y = y;

        if (this.hiddenVar == false) {
            this.update()
            
            if (this.editing) {
                this.set(1+(this.y-mouseY)/this.height)
            }

            push()
            // Background
            fill(this.backgroundVar)
            stroke(this.borderVar)
            strokeWeight(this.borderWeightVar)
            rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
            pop()

            this.knobVar.render(this.x+this.width/2, this.height*(1-this.value)+this.y)
        }
    }
}class Stack {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.contents = [];
        this.spacingVar = 15;
        
        this.clickable = true;
        this.typeable = true;
        this.alignment = "leading";
        this.hiddenVar = false;
        this.phantomVar = false;

        this.backgroundVar = Color.transparent;
        this.borderVar = Color.transparent;
        this.borderWeightVar = 1;
        this.cornerRadiusVar = [0, 0, 0, 0];
    }

    contains(array) {
        this.contents = array;
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
            console.error(`Invalid alignment: '${this.alignment}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
        }
        return this;
    }

    hidden(value) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value) {
        this.phantomVar = value;
        return this;
    }

    background(colour) {
        this.backgroundVar = colour;
        return this;
    }

    border(value) {
        this.borderVar = value;
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
}

class VStack extends Stack {
    constructor() {
        super();
    }

    calcDimensions() {
        this.width = 0;
        this.height = 0;
        let i = 0;
        for (let n = 0; n < this.contents.length; n++) {
            let elem = this.contents[n]
            if (elem.phantomVar == false) {
                i++;
                this.width = Math.max(this.width, elem.width);
                this.height += elem.height + this.spacingVar;
            }
        }
        if (i > 0) {
            this.height -= this.spacingVar;
        }
    }

    render(x, y) {
        this.x = x;
        this.y = y;
        this.calcDimensions()

        if (this.hiddenVar == false) {
            push()
            fill(this.backgroundVar)
            stroke(this.borderVar)
            strokeWeight(this.borderWeightVar)
            rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
            pop()
            let ySweep = 0;
            for (let n = 0; n < this.contents.length; n++) {
                let elem = this.contents[n]
                if (elem.phantomVar == false) {
                    switch (elem.alignment) {
                        case "leading":
                            elem.render(this.x, this.y + ySweep);
                            break;
                        case "center":
                            elem.render(this.x + (this.width - this.contents[n].width)/2, this.y + ySweep);
                            break;
                        case "trailing":
                            elem.render(this.x + this.width - this.contents[n].width, this.y + ySweep);
                            break;
                    }
                    ySweep += elem.height + this.spacingVar;
                }
            }
        }
    }
}

class HStack extends Stack {
    constructor() {
        super();
    }

    calcDimensions() {
        this.width = 0;
        this.height = 0;
        let i = 0;
        for (let n = 0; n < this.contents.length; n++) {
            let elem = this.contents[n];
            if (elem.phantomVar == false) {
                i++;
                this.height = Math.max(this.height, elem.height);
                this.width += elem.width + this.spacingVar;
            }
        }
        if (i > 0) {
            this.width -= this.spacingVar;
        }
    }

    render(x, y) {
        this.x = x;
        this.y = y;
        this.calcDimensions()

        if (this.hiddenVar == false) {
            push()
            fill(this.backgroundVar)
            stroke(this.borderVar)
            strokeWeight(this.borderWeightVar)
            rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
            pop()
            let xSweep = 0;
            for (let n = 0; n < this.contents.length; n++) {
                let elem = this.contents[n]
                if (elem.phantomVar == false) {
                    switch (elem.alignment) {
                        case "leading":
                            this.contents[n].render(this.x + xSweep, this.y );
                            break;
                        case "center":
                            this.contents[n].render(this.x + xSweep, (2*this.y + this.height - this.contents[n].height)/2);
                            break;
                        case "trailing":
                            this.contents[n].render(this.x + xSweep, this.y + this.height - this.contents[n].height);
                            break;
                    }
                    xSweep += this.contents[n].width + this.spacingVar;
                }
            }
        }
    }
}class Text {
    constructor(text) {
        this.x;
        this.y;
        this.t = `${text}`;
        this.tSize = 18;
        this.pFactor = 0;
        this.width = 0;
        this.height = 0;

        this.minWidthVar = 0;
        this.minHeightVar = 0;

        this.typeable = false;
        this.clickable = false;
        this.alignment = "leading";
        this.hiddenVar = false;
        this.phantomVar = false;

        this.binding = "";

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
            console.error(`Invalid alignment: '${this.alignment}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
        }
        return this;
    }

    hidden(value) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value) {
        this.phantomVar = value;
        return this;
    }

    render(x, y) {
        push();
        this.x = x;
        this.y = y;

        if (this.binding != "") this.t = `${eval(this.binding)}`
        textSize(this.tSize)
        if (this.emphasisVar) textStyle(this.emphasisVar)
        if (this.fontVar) textFont(this.fontVar)
        let lines = this.t.split("\n")
        let longestLineIndex = 0;
        for (let n = 1; n < lines.length; n++) {
            if (textWidth(lines[n]) > textWidth(lines[longestLineIndex])) longestLineIndex = n;
        }
        let tWidth = textWidth(lines[longestLineIndex])
        this.width = Math.max(this.minWidthVar, tWidth + this.tSize*this.pFactor*2)
        textAlign(LEFT, TOP)
        this.height = Math.max(this.minHeightVar, this.tSize*(lines.length + this.pFactor*2))
        
        if (this.hiddenVar == false) {
            fill(this.backgroundVar)
            stroke(this.borderVar)
            strokeWeight(this.borderWeightVar)
            rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])

            fill(this.textColourVar)
            stroke(this.textBorderVar)
            strokeWeight(this.textBorderWeightVar)
            for (let n = 0; n < lines.length; n++) {
                text(lines[n], this.x+this.tSize*this.pFactor, this.y + this.tSize*(this.pFactor+n))
            }
        }
        pop();
    }

    background(colour) {
        this.backgroundVar = colour;
        return this;
    }

    border(value) {
        this.borderVar = value;
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

    paddingFactor(value) {
        this.pFactor = value;
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
        this.paddingFactor(0)
        this.emphasis("bold")
        this.textSize(39)
    }
}

class Label extends Text {
    constructor(text) {
        super(text);

        // Default styling config
        this.textSize(16)
        this.paddingFactor(0)
        this.emphasis("bold")
        this.textColour(Color.secondary)
    }
}class TextInput extends Text {
    constructor(defaultText="", doMultiLine=false) {
        super(defaultText)
        this.editing = false;
        this.edited = false;
        this.placeholderVar = "";
        this.cursorAfter = this.t;
        this.doMultiLine = doMultiLine;
        this.maxWidthVar = Infinity;
        this.maxHeightVar = Infinity;

        this.typeable = true;
        this.clickable = true;

        this.hovering = false;

        this.showingCursor = false;
        this.lastToggledCursor = new Date();
        this.cursorColourVar = Color.accent;
        this.cursorWeightVar = 2;

        // Default styling config
        this.background(Color.nearInverse)
    }

    render(x, y) {
        this.x = x;
        this.y = y;

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

            if (this.mouseOver()) {
                cursor("text")
                this.hovering = true;
                doHotMouseDown = false;
                doHotMouseUp = false;
            }
            else {
                if (this.hovering) {
                    doHotMouseDown = true;
                    doHotMouseUp = true;
                }
                this.hovering = false;
            }

            push()
            fill(this.backgroundVar)
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

            pop()
        }
    }

    onKeyPressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.editing) {
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
            for (let i = 0; i < this.t.length-1; i++) {
                let sample = this.t.slice(0, i)
                if (Math.abs(this.x + textWidth(sample) + this.tSize*this.pFactor - mx) < Math.abs(this.x + textWidth(closestCursorAfter) + this.tSize*this.pFactor - mx)) closestCursorAfter = sample;
            }
        }
        pop()
        return closestCursorAfter;
    }

    onMousePressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.mouseOver()) {
                this.editing = true;
                doHotkeys = false;
                doHotMouseDown = false;
                doHotMouseUp = false;
                this.cursorAfter = this.getClosestCursorAfter(mouseX, mouseY)
                this.showingCursor = true;
                this.lastToggledCursor = new Date();
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
        // if (this.hiddenVar == false && this.phantomVar == false) {

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
        this.alignment = "leading";
        this.hiddenVar = false;
        this.phantomVar = false;

        this.displayState = "default off";
        this.on = false;
        this.binding = "";
        this.radioName = "";
        this.radioBinding = "";

        this.popupVar;

        this.cornerRadiusVar;
        this.backgroundVar = {"default on": Color.accent, "default off": Color.secondary, "hover on": Color.accent, "hover off": Color.secondary, "pressed on": Color.brighter(Color.accent), "pressed off": Color.brighter(Color.secondary)};
        this.borderVar = {"default on": Color.transparent, "default off": Color.transparent, "hover on": Color.transparent, "hover off": Color.transparent, "pressed on": Color.transparent, "pressed off": Color.transparent, };
        this.borderWeightVar = {"default on": 1, "default off": 1, "hover on": 1, "hover off": 1, "pressed on": 1, "pressed off": 1};
    }

    update() {
        if (this.mouseOver()) {
            cursor("pointer")
            this.displayState = `hover ${this.on ? "on": "off"}`
            if (mouseIsPressed) {
                this.displayState = `pressed ${this.on ? "on": "off"}`
            }
            doHotMouseDown = false;
            doHotMouseUp = false;
            // console.log(doHotMouseDown, this.radioName)
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

    toggle() {
        this.set(!this.on)
    }
    set(value) {
        this.on = value;
        this.displayState = this.on ? "default on" : "default off"
        if (this.binding != "") eval(`${this.binding} = this.on`)
        if (this.radioBinding != "") {
            if (value == true) {
                eval(`${this.radioBinding} = this.radioName`)
            }
        }
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
        if (value != "leading" && value != "center" && value != "trailing") {
            console.error(`Invalid alignment: '${this.alignment}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
            return this;
        }
        this.alignment = value;
        return this;
    }

    hidden(value) {
        this.hiddenVar = value;
        return this;
    }
    phantom(value) {
        this.phantomVar = value;
        return this;
    }

    onKeyPressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.popupVar && this.on) {
                if (this.popupVar.typeable) {
                    this.popupVar.onKeyPressed()
                }
            }
        }
    }

    onMousePressed() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.popupVar && this.on) {
                if (this.popupVar.clickable) {
                    this.popupVar.onMousePressed()
                }
            }
        }
    }

    onMouseReleased() {
        if (this.hiddenVar == false && this.phantomVar == false) {
            if (this.mouseOver()) {
                this.toggle()
                if (this.binding != "") eval(`${this.binding} = this.on`)
                if (!this.on && this.radioBinding != "") eval(`${this.radioBinding} = ""`)
            }
            if (this.popupVar && this.on) {
                if (this.popupVar.clickable) {
                    this.popupVar.onMouseReleased()
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
                console.error(`Invalid 'when' parameter ${when} for ${variableIdentifierText}. Ensure the input is one of the following: '${whenOptions.join("', '")}'`)
            }
        }
        else {
            absentFunction()
        }
        return this;
    }

    background(colour, when) {
        this.checkWhen(when, () => {
            this.backgroundVar[when] = colour;
        }, () => {
            this.backgroundVar["default on"] = colour;
            this.backgroundVar["default off"] = colour;
            this.backgroundVar["hover on"] = colour;
            this.backgroundVar["hover off"] = colour;
            this.backgroundVar["pressed on"] = colour;
            this.backgroundVar["pressed off"] = colour;
        }, () => {
            this.backgroundVar[`${when} on`] = colour;
            this.backgroundVar[`${when} off`] = colour;
        }, () => {
            this.backgroundVar[`default ${when}`] = colour;
            this.backgroundVar[`hover ${when}`] = colour;
            this.backgroundVar[`pressed ${when}`] = colour;
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
            "default on": new Block(0, 0).background(Color.white).cornerRadius(this.height).centered(true), 
            "default off": new Block(0, 0).background(Color.white).cornerRadius(this.height).centered(true), 
            "hover on": new Block(0, 0).background(Color.white).cornerRadius(this.height).centered(true), 
            "hover off": new Block(0, 0).background(Color.white).cornerRadius(this.height).centered(true), 
            "pressed on": new Block(0, 0).background(Color.white).cornerRadius(this.height).centered(true), 
            "pressed off": new Block(0, 0).background(Color.white).cornerRadius(this.height).centered(true)
        }
    }

    render(x, y) {
        this.x = x;
        this.y = y;

        if (this.hiddenVar == false) {
            this.update()
            
            push()
            // Background
            fill(this.backgroundVar[this.displayState])
            stroke(this.borderVar[this.displayState])
            strokeWeight(this.borderWeightVar[this.displayState])
            rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[this.displayState][0], this.cornerRadiusVar[this.displayState][1], this.cornerRadiusVar[this.displayState][2], this.cornerRadiusVar[this.displayState][3])
            pop()

            // Knob
            this.knobVar[this.displayState].setWidth(this.height-4)
            this.knobVar[this.displayState].setHeight(this.height-4)
            if (this.displayState.split(" ")[1] == "on") {
                this.knobVar[this.displayState].render(this.x + this.width - this.height/2, this.y + this.height/2)
            }
            else {
                this.knobVar[this.displayState].render(this.x + this.height/2, this.y + this.height/2)
            }

            if (this.popupVar && this.on) {
                switch (this.popupVar.side) {
                    case "left":
                        this.popupVar.render(this.x, this.y + this.height/2)
                        break;
                    case "right":
                        this.popupVar.render(this.x + this.width, this.y + this.height/2)
                        break;
                    case "top":
                        this.popupVar.render(this.x + this.width/2, this.y)
                        break;
                        case "bottom":
                        this.popupVar.render(this.x + this.width/2, this.y + this.height)
                        break;
                    default:
                        console.error(`Popup has invalid side: ${this.popupVar.side}`)
                        break;
                }
            }
        }
    }

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

        this.padFactor = {"default on": 0.8, "default off": 0.8, "hover on": 0.8, "hover off": 0.8, "pressed on": 0.8, "pressed off": 0.8};
    }

    render(x, y) {
        this.x = x;
        this.y = y;

        if (this.hiddenVar == false) {
            this.update()

            push()
            // Background
            fill(this.backgroundVar[this.displayState])
            stroke(this.borderVar[this.displayState])
            strokeWeight(this.borderWeightVar[this.displayState])
            rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[this.displayState][0], this.cornerRadiusVar[this.displayState][1], this.cornerRadiusVar[this.displayState][2], this.cornerRadiusVar[this.displayState][3])
            
            if (this.contents[this.displayState]) {
                if (this.contents[this.displayState].phantomVar == false) {
                    let scaleFactor = Math.min(this.width/this.contents[this.displayState].width, this.height/this.contents[this.displayState].height)*this.padFactor[this.displayState]
                    translate(this.x + this.width/2 - this.contents[this.displayState].width/2*scaleFactor, this.y + this.height/2 - this.contents[this.displayState].height/2*scaleFactor)
                    scale(scaleFactor)
                    this.contents[this.displayState].render(0, 0)
                }
            }
            pop()

            if (this.popupVar && this.on) {
                switch (this.popupVar.side) {
                    case "left":
                        this.popupVar.render(this.x, this.y + this.height/2)
                        break;
                    case "right":
                        this.popupVar.render(this.x + this.width, this.y + this.height/2)
                        break;
                    case "top":
                        this.popupVar.render(this.x + this.width/2, this.y)
                        break;
                        case "bottom":
                        this.popupVar.render(this.x + this.width/2, this.y + this.height)
                        break;
                    default:
                        console.error(`Popup has invalid side: ${this.popupVar.side}`)
                        break;
                }
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

    paddingFactor(value, when) {
        this.checkWhen(when, () => {
            this.padFactor[when] = value;
        }, () => {
            this.padFactor["default on"] = value;
            this.padFactor["default off"] = value;
            this.padFactor["hover on"] = value;
            this.padFactor["hover off"] = value;
            this.padFactor["pressed on"] = value;
            this.padFactor["pressed off"] = value;
        }, () => {
            this.padFactor[`${when} on`] = value;
            this.padFactor[`${when} off`] = value;
        }, () => {
            this.padFactor[`default ${when}`] = value;
            this.padFactor[`hover ${when}`] = value;
            this.padFactor[`pressed ${when}`] = value;
        }, "check toggle paddingFactor")
        return this;
    }
}