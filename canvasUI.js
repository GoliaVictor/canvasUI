class Blank {
    constructor(width=0, height=0) {
        this.x;
        this.y;
        this.width = width;
        this.height = height;

        this.clickable = false;
        this.typeable = false;
        this.alignment = "leading";
        this.phantomBinding = "";
    }

    render(x, y) {
        this.x = x;
        this.y = y;
    }

    phantom(target) {
        this.phantomBinding = target;
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
        this.hiddenBinding = "";
        this.phantomBinding = "";

        this.displayState = "default";
        this.commandVar;

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

        if (this.hiddenBinding == "" || eval(this.hiddenBinding) == false) {
            if (this.mouseOver()) {
                cursor("pointer")
                this.displayState = `hover`
                if (mouseIsPressed) {
                    this.displayState = `pressed`
                }
            }
            else {
                this.displayState = "default"
            }
    
            push()
            // Background
            fill(this.backgroundVar[this.displayState])
            stroke(this.borderVar[this.displayState])
            strokeWeight(this.borderWeightVar[this.displayState])
            rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[this.displayState][0], this.cornerRadiusVar[this.displayState][1], this.cornerRadiusVar[this.displayState][2], this.cornerRadiusVar[this.displayState][3])
            
            if (this.contents[this.displayState]) {
                if (this.contents[this.displayState].phantomBinding == "" || eval(this.contents[this.displayState].phantomBinding) == false) {
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

    hidden(target) {
        this.hiddenBinding = target;
        return this;
    }
    phantom(target) {
        this.phantomBinding = target;
        return this;
    }
    
    command(func) {
        this.commandVar = func;
        return this;
    }

    onMousePressed() {
        if ((this.hiddenBinding == "" || eval(this.hiddenBinding) == false) && (this.phantomBinding == "" || eval(this.phantomBinding) == false)) {
            if (this.popup) {
                if (this.popup.typeable) {
                    this.popup.onMousePressed()
                }
            }
        }
    }

    onMouseReleased() {
        if ((this.hiddenBinding == "" || eval(this.hiddenBinding) == false) && (this.phantomBinding == "" || eval(this.phantomBinding) == false)) {
            if (this.mouseOver()) {
                this.commandVar();
            }
            if (this.popup) {
                if (this.popup.typeable) {
                    this.popup.onKeyPressed()
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

let hotkey = {
    dataKey: {},
    dataKeyCode: {},
    on(when, func) {
        if (typeof when === "string") hotkey.dataKey[when] = func;
        else if (Number.isInteger(when)) hotkey.dataKeyCode[when] = func;
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

        this.typeable = false;
        this.clickable = false;
        this.alignment = "center";
        this.hiddenBinding = "";
        this.phantomBinding = "";

        // Get paths
        let temp = this.svg.split('<path d="')
        for (let n = 1; n < temp.length; n++) {
            let d = temp[n].split('"')[0];
            this.graphicString += this.interpretSVGPath(d);
        }

        this.fillColourVar = Color.transparent;
        this.strokeColourVar = Color.primary;
        this.strokeWeightVar = 2;
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
                        command += `endShape();beginShape();vertex(${array[i+1]},${array[i+2]});`;
                        i += 2;
                        break;
                    case "L":
                        command += `vertex(${array[i+1]},${array[i+2]});`;
                        i += 2;
                        break;
                    case "H":
                        command += `vertex(${array[i+1]},${array[i-1]});`;
                        i += 1;
                        break;
                    case "V":
                        command += `vertex(${array[i-2]},${array[i+1]});`;
                        i += 1;
                        break;
                    case "C":
                        command += `bezierVertex(${array[i+1]},${array[i+2]},${array[i+3]},${array[i+4]},${array[i+5]},${array[i+6]});`;
                        i += 6;
                        break;
                    case "Q":
                        command += `quadraticVertex(${array[i+1]},${array[i+2]},${array[i+3]},${array[i+4]});`;
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
        if (this.hiddenBinding == "" || eval(this.hiddenBinding) == false) {
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

    hidden(target) {
        this.hiddenBinding = target;
        return this;
    }
    phantom(target) {
        this.phantomBinding = target;
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
        this.hiddenBinding = "";
        this.phantomBinding = "";

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
            if (elem.phantomBinding == "" || eval(elem.phantomBinding) == false) {
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

        if (this.hiddenBinding == "" || eval(this.hiddenBinding) == false) {
            push()
            fill(this.backgroundVar)
            stroke(this.borderVar)
            strokeWeight(this.borderWeightVar)
            rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
            pop()
            let ySweep = this.pad;
            for (let n = 0; n < this.contents.length; n++) {
                const elem = this.contents[n]
                if (elem.phantomBinding == "" || eval(elem.phantomBinding) == false) {
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
        if ((this.hiddenBinding == "" || eval(this.hiddenBinding) == false) && (this.phantomBinding == "" || eval(this.phantomBinding) == false)) {
            for (let n = 0; n < this.contents.length; n++) {
                if (this.contents[n].typeable) this.contents[n].onKeyPressed()
            }
        }
    }

    onMousePressed() {
        if ((this.hiddenBinding == "" || eval(this.hiddenBinding) == false) && (this.phantomBinding == "" || eval(this.phantomBinding) == false)) {
            for (let n = 0; n < this.contents.length; n++) {
                if (this.contents[n].clickable) this.contents[n].onMousePressed()
            }
        }
    }

    onMouseReleased() {
        if ((this.hiddenBinding == "" || eval(this.hiddenBinding) == false) && (this.phantomBinding == "" || eval(this.phantomBinding) == false)) {
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

    hidden(target) {
        this.hiddenBinding = target;
        return this;
    }
    phantom(target) {
        this.phantomBinding = target;
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
        this.hiddenBinding = "";
        this.phantomBinding = "";

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

        if (this.hiddenBinding == "" || eval(this.hiddenBinding) == false) {
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

    hidden(target) {
        this.hiddenBinding = target;
        return this;
    }
    phantom(target) {
        this.phantomBinding = target;
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
        if ((this.hiddenBinding == "" || eval(this.hiddenBinding) == false) && (this.phantomBinding == "" || eval(this.phantomBinding) == false)) {
            if (this.contents.typeable) {
                this.contents.onKeyPressed()
            }
        }
    }

    onMousePressed() {
        if ((this.hiddenBinding == "" || eval(this.hiddenBinding) == false) && (this.phantomBinding == "" || eval(this.phantomBinding) == false)) {
            if (this.contents.clickable) {
                this.contents.onMousePressed();
            }
        }
    }

    onMouseReleased() {
        if ((this.hiddenBinding == "" || eval(this.hiddenBinding) == false) && (this.phantomBinding == "" || eval(this.phantomBinding) == false)) {
            if (this.contents.clickable) {
                this.contents.onMouseReleased();
            }
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
        this.hiddenBinding = "";
        this.phantomBinding = "";

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

    hidden(target) {
        this.hiddenBinding = target;
        return this;
    }
    phantom(target) {
        this.phantomBinding = target;
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
        if ((this.hiddenBinding == "" || eval(this.hiddenBinding) == false) && (this.phantomBinding == "" || eval(this.phantomBinding) == false)) {
            for (let n = 0; n < this.contents.length; n++) {
                if (this.contents[n].typeable) this.contents[n].onKeyPressed()
            }
        }
    }

    onMousePressed() {
        if ((this.hiddenBinding == "" || eval(this.hiddenBinding) == false) && (this.phantomBinding == "" || eval(this.phantomBinding) == false)) {
            for (let n = 0; n < this.contents.length; n++) {
                if (this.contents[n].clickable) this.contents[n].onMousePressed()
            }
        }
    }

    onMouseReleased() {
        if ((this.hiddenBinding == "" || eval(this.hiddenBinding) == false) && (this.phantomBinding == "" || eval(this.phantomBinding) == false)) {
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
            if (elem.phantomBinding == "" || eval(elem.phantomBinding) == false) {
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

        if (this.hiddenBinding == "" || eval(this.hiddenBinding) == false) {
            push()
            fill(this.backgroundVar)
            stroke(this.borderVar)
            strokeWeight(this.borderWeightVar)
            rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
            pop()
            let ySweep = 0;
            for (let n = 0; n < this.contents.length; n++) {
                let elem = this.contents[n]
                if (elem.phantomBinding == "" || eval(elem.phantomBinding) == false) {
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
            if (elem.phantomBinding == "" || eval(elem.phantomBinding) == false) {
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

        if (this.hiddenBinding == "" || eval(this.hiddenBinding) == false) {
            push()
            fill(this.backgroundVar)
            stroke(this.borderVar)
            strokeWeight(this.borderWeightVar)
            rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
            pop()
            let xSweep = 0;
            for (let n = 0; n < this.contents.length; n++) {
                let elem = this.contents[n]
                if (elem.phantomBinding == "" || eval(elem.phantomBinding) == false) {
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
        this.t = text;
        this.tSize = 18;
        this.pFactor = 0;
        this.width = 0;
        this.height = 0;

        this.typeable = false;
        this.clickable = false;
        this.alignment = "leading";
        this.hiddenBinding = "";
        this.phantomBinding = "";

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

    hidden(target) {
        this.hiddenBinding = target;
        return this;
    }
    phantom(target) {
        this.phantomBinding = target;
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
        this.width = tWidth + this.tSize*this.pFactor*2
        textAlign(LEFT, TOP)
        this.height = this.tSize*(lines.length + this.pFactor*2)
        
        if (this.hiddenBinding == "" || eval(this.hiddenBinding) == false) {
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
                    this.t = eval(this.binding);
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
        this.width = tWidth + this.tSize*this.pFactor*2
        textAlign(LEFT, TOP)
        this.height = this.tSize*(lines.length + this.pFactor*2)
        
        if (this.hiddenBinding == "" || eval(this.hiddenBinding) == false) {

            if (this.mouseOver()) {
                cursor("text")
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
        if ((this.hiddenBinding == "" || eval(this.hiddenBinding) == false) && (this.phantomBinding == "" || eval(this.phantomBinding) == false)) {
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
        if ((this.hiddenBinding == "" || eval(this.hiddenBinding) == false) && (this.phantomBinding == "" || eval(this.phantomBinding) == false)) {
            if (this.mouseOver()) {
                this.editing = true;
                doHotkeys = false;
                console.log(doHotkeys)
                this.cursorAfter = this.getClosestCursorAfter(mouseX, mouseY)
                this.showingCursor = true;
                this.lastToggledCursor = new Date();
            }
            else {
                if (this.editing) {
                    this.editing = false;
                    doHotKeys = true;
                }
            }
        }
    }

    onMouseReleased() {
        // if ((this.hiddenBinding == "" || eval(this.hiddenBinding) == false) && (this.phantomBinding == "" || eval(this.phantomBinding) == false)) {

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
        this.hiddenBinding = "";
        this.phantomBinding = "";

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
        }
        else {
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

    hidden(target) {
        this.hiddenBinding = target;
        return this;
    }
    phantom(target) {
        this.phantomBinding = target;
        return this;
    }

    onKeyPressed() {
        if ((this.hiddenBinding == "" || eval(this.hiddenBinding) == false) && (this.phantomBinding == "" || eval(this.phantomBinding) == false)) {
            if (this.popupVar && this.on) {
                if (this.popupVar.typeable) {
                    this.popupVar.onKeyPressed()
                }
            }
        }
    }

    onMousePressed() {
        if ((this.hiddenBinding == "" || eval(this.hiddenBinding) == false) && (this.phantomBinding == "" || eval(this.phantomBinding) == false)) {
            if (this.popupVar && this.on) {
                if (this.popupVar.clickable) {
                    this.popupVar.onMousePressed()
                }
            }
        }
    }

    onMouseReleased() {
        if ((this.hiddenBinding == "" || eval(this.hiddenBinding) == false) && (this.phantomBinding == "" || eval(this.phantomBinding) == false)) {
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

        this.knobColourVar = {"default on": Color.white, "default off": Color.white, "hover on": Color.white, "hover off": Color.white, "pressed on": Color.white, "pressed off": Color.white};
        this.knobBorderVar = {"default on": Color.transparent, "default off": Color.transparent, "hover on": Color.transparent, "hover off": Color.transparent, "pressed on": Color.transparent, "pressed off": Color.transparent};
        this.knobBorderWeightVar = {"default on": 1, "default off": 1, "hover on": 1, "hover off": 1, "pressed on": 1, "pressed off": 1};
        this.knobCornerRadiusVar = {"default on": [this.height, this.height, this.height, this.height], "default off": [this.height, this.height, this.height, this.height], "hover on": [this.height, this.height, this.height, this.height], "hover off": [this.height, this.height, this.height, this.height], "pressed on": [this.height, this.height, this.height, this.height], "pressed off": [this.height, this.height, this.height, this.height]};

    }

    render(x, y) {
        this.x = x;
        this.y = y;

        if (this.hiddenBinding == "" || eval(this.hiddenBinding) == false) {
            this.update()
            
            push()
            // Background
            fill(this.backgroundVar[this.displayState])
            stroke(this.borderVar[this.displayState])
            strokeWeight(this.borderWeightVar[this.displayState])
            rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[this.displayState][0], this.cornerRadiusVar[this.displayState][1], this.cornerRadiusVar[this.displayState][2], this.cornerRadiusVar[this.displayState][3])

            // Knob
            fill(this.knobColourVar[this.displayState])
            stroke(this.knobBorderVar[this.displayState])
            strokeWeight(this.knobBorderWeightVar[this.displayState])
            rectMode(CENTER)
            if (this.displayState.split(" ")[1] == "on") {
                rect(this.x + this.width - this.height/2, this.y + this.height/2, this.height-4, this.height-4, this.knobCornerRadiusVar[this.displayState][0], this.knobCornerRadiusVar[this.displayState][1], this.knobCornerRadiusVar[this.displayState][2], this.knobCornerRadiusVar[this.displayState][3])
            }
            else {
                rect(this.x + this.height/2, this.y + this.height/2, this.height-4, this.height-4, this.knobCornerRadiusVar[this.displayState][0], this.knobCornerRadiusVar[this.displayState][1], this.knobCornerRadiusVar[this.displayState][2], this.knobCornerRadiusVar[this.displayState][3])
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

    knobColour(colour, when) {
        this.checkWhen(when, () => {
            this.knobColourVar[when] = colour;
        }, () => {
            this.knobColourVar["default on"] = colour;
            this.knobColourVar["default off"] = colour;
            this.knobColourVar["hover on"] = colour;
            this.knobColourVar["hover off"] = colour;
            this.knobColourVar["pressed on"] = colour;
            this.knobColourVar["pressed off"] = colour;
        }, () => {
            this.knobColourVar[`${when} on`] = colour;
            this.knobColourVar[`${when} off`] = colour;
        }, () => {
            this.knobColourVar[`default ${when}`] = colour;
            this.knobColourVar[`hover ${when}`] = colour;
            this.knobColourVar[`pressed ${when}`] = colour;
        }, "slider toggle knobColour")
        return this;
    }
    knobBorder(colour, when) {
        this.checkWhen(when, () => {
            this.knobBorderVar[when] = colour;
        }, () => {
            this.knobBorderVar["default on"] = colour;
            this.knobBorderVar["default off"] = colour;
            this.knobBorderVar["hover on"] = colour;
            this.knobBorderVar["hover off"] = colour;
            this.knobBorderVar["pressed on"] = colour;
            this.knobBorderVar["pressed off"] = colour;
        }, () => {
            this.knobBorderVar[`${when} on`] = colour;
            this.knobBorderVar[`${when} off`] = colour;
        }, () => {
            this.knobBorderVar[`default ${when}`] = colour;
            this.knobBorderVar[`hover ${when}`] = colour;
            this.knobBorderVar[`pressed ${when}`] = colour;
        }, "slider toggle knobBorder")
        return this;
    }
    knobBorderWeight(value, when) {
        this.checkWhen(when, () => {
            this.knobBorderWeightVar[when] = value;
        }, () => {
            this.knobBorderWeightVar["default on"] = value;
            this.knobBorderWeightVar["default off"] = value;
            this.knobBorderWeightVar["hover on"] = value;
            this.knobBorderWeightVar["hover off"] = value;
            this.knobBorderWeightVar["pressed on"] = value;
            this.knobBorderWeightVar["pressed off"] = value;
        }, () => {
            this.knobBorderWeightVar[`${when} on`] = value;
            this.knobBorderWeightVar[`${when} off`] = value;
        }, () => {
            this.knobBorderWeightVar[`default ${when}`] = value;
            this.knobBorderWeightVar[`hover ${when}`] = value;
            this.knobBorderWeightVar[`pressed ${when}`] = value;
        }, "slider toggle knobBorderWeightVar")
        return this;
    }
    knobCornerRadius(tl=this.height, tr, br, bl, when) {
        if (tr == undefined && br == undefined && bl == undefined) {
            // r1 applies to all corners
            this.checkWhen(when, () => {
                this.knobCornerRadiusVar[when] = [tl, tl, tl, tl];
            }, () => {
                this.knobCornerRadiusVar["default on"] = [tl, tl, tl, tl];
                this.knobCornerRadiusVar["default off"] = [tl, tl, tl, tl];
                this.knobCornerRadiusVar["hover on"] = [tl, tl, tl, tl];
                this.knobCornerRadiusVar["hover off"] = [tl, tl, tl, tl];
                this.knobCornerRadiusVar["pressed on"] = [tl, tl, tl, tl];
                this.knobCornerRadiusVar["pressed off"] = [tl, tl, tl, tl];
            }, () => {
                this.knobCornerRadiusVar[`${when} on`] = [tl, tl, tl, tl];
                this.knobCornerRadiusVar[`${when} off`] = [tl, tl, tl, tl];
            }, () => {
                this.knobCornerRadiusVar[`default ${when}`] = [tl, tl, tl, tl];
                this.knobCornerRadiusVar[`hover ${when}`] = [tl, tl, tl, tl];
                this.knobCornerRadiusVar[`pressed ${when}`] = [tl, tl, tl, tl];
            }, "slider toggle knobCornerRadius")
        }
        else {
            // each one individually applies to their own corner with tl as top-left and tr as top-right etc
            this.checkWhen(when, () => {
                this.knobCornerRadiusVar[when] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
            }, () => {
                this.knobCornerRadiusVar["default on"] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.knobCornerRadiusVar["default off"] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.knobCornerRadiusVar["hover on"] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.knobCornerRadiusVar["hover off"] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.knobCornerRadiusVar["pressed on"] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.knobCornerRadiusVar["pressed off"] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
            }, () => {
                this.knobCornerRadiusVar[`${when} on`] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.knobCornerRadiusVar[`${when} off`] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
            }, () => {
                this.knobCornerRadiusVar[`default ${when}`] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.knobCornerRadiusVar[`hover ${when}`] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
                this.knobCornerRadiusVar[`pressed ${when}`] = [tl ?? 0, tr ?? 0, br ?? 0, bl ?? 0];
            }, "slider toggle knobCornerRadius")
        }
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

        if (this.hiddenBinding == "" || eval(this.hiddenBinding) == false) {
            this.update()

            push()
            // Background
            fill(this.backgroundVar[this.displayState])
            stroke(this.borderVar[this.displayState])
            strokeWeight(this.borderWeightVar[this.displayState])
            rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[this.displayState][0], this.cornerRadiusVar[this.displayState][1], this.cornerRadiusVar[this.displayState][2], this.cornerRadiusVar[this.displayState][3])
            
            if (this.contents[this.displayState]) {
                if (this.contents[this.displayState].phantomBinding == "" || eval(this.contents[this.displayState].phantomBinding) == false) {
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