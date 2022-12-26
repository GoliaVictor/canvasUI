class Blank {
    constructor(width=0, height=0) {
        this.x;
        this.y;
        this.width = width;
        this.height = height;

        this.clickable = false;
        this.typeable = false;
        this.alignment = "leading";
    }

    render(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Button {
    constructor (width=80, height=25) {
        this.x;
        this.y;
        this.width = width;
        this.height = height;

        this.typeable = false;
        this.clickable = true;
        this.alignment = "center";

        this.displayState = "default";
        this.commandVar;

        this.backgroundVar = {"default": Color.secondary, "hover": Color.brighter(Color.secondary), "pressed": Color.accent};
        this.borderVar = {"default": Color.transparent, "hover": Color.transparent, "pressed": Color.transparent};
        this.borderWeightVar = {"default": 1, "hover": 1, "pressed": 1};
        this.cornerRadiusVar = {"default": [6, 6, 6, 6], "hover": [6, 6, 6, 6], "pressed": [6, 6, 6, 6]};

        this.contentsVar = {"default": undefined, "hover": undefined, "pressed": undefined,};
        this.padFactor = {"default": 0.8, "hover": 0.8, "pressed": 0.8};
    }

    render(x, y) {
        this.x = x;
        this.y = y;

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
        
        if (this.contentsVar[this.displayState]) {
            let scaleFactor = Math.min(this.width/this.contentsVar[this.displayState].width, this.height/this.contentsVar[this.displayState].height)*this.padFactor[this.displayState]
            translate(this.x + this.width/2 - this.contentsVar[this.displayState].width/2*scaleFactor, this.y + this.height/2 - this.contentsVar[this.displayState].height/2*scaleFactor)
            scale(scaleFactor)
            this.contentsVar[this.displayState].render(0, 0)
        }
        pop()
    }

    align(value) {
        if (value != "leading" && value != "center" && value != "trailing") {
            console.error(`Invalid alignment: '${this.alignment}'. Ensure alignment is either 'leading', 'center', or 'trailing'.`)   
            return this;
        }
        this.alignment = value;
        return this;
    }

    onMousePressed() {
        // nothing - see mouse released
    }

    command(func) {
        this.commandVar = func;
        return this;
    }

    onMouseReleased() {
        if (this.mouseOver()) {
            this.commandVar();
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
                console.log(`Invalid 'when' parameter ${when} for ${variableIdentifierText}. Ensure the input is one of the following: '${whenOptions.join("', '")}'`)
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

    contents(elem, when) {
        this.checkWhen(when, () => {
            this.contentsVar[when] = elem;
        }, () => {
            this.contentsVar["default"] = elem;
            this.contentsVar["hover"] = elem;
            this.contentsVar["pressed"] = elem;
        }, "button contents")
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
}

let DARKTHEME = true

let Color = {
    white: [255, 255, 255],
    nearWhite: [242, 242, 247],
    black: [0, 0, 0],
    nearBlack: [28, 28, 29],
    red: [235, 77, 61],
    green: [101, 195, 102],
    blue: [48, 124, 246],
    orange: [241, 153, 55],
    yellow: [248, 205, 70],
    pink: [235, 68, 90],
    purple: [163, 91, 215],
    secondary: [138, 138, 142],
    saffron: [242, 157, 75],
    accent: [48, 124, 246],
    primary: [255, 255, 255],
    inverse: [0, 0, 0],
    transparent: [0, 0, 0, 0],
    nearPrimary: [242, 242, 247],
    nearInverse: [28, 28, 29],

    brighter(colour) {
        return [colour[0]*7/6, colour[1]*7/6, colour[2]*7/6];
    },

    darkTheme: (bool) => {
        if (bool) {
            Color.primary = Color.white
            Color.inverse = Color.black
            Color.nearPrimary = Color.nearWhite
            Color.nearInverse = Color.nearBlack
        }
        else {
            Color.primary = Color.black
            Color.inverse = Color.white
            Color.nearPrimary = Color.nearBlack
            Color.nearInverse = Color.nearWhite
        }
    },
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

    render(x, y) {
        this.x = x;
        this.y = y;
        push()
        translate(x, y)
        fill(this.fillColourVar)
        stroke(this.strokeColourVar)
        eval(this.graphicString)
        pop()
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
}

const airplayIcon = new Icon(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 18C3.34315 18 2 16.6569 2 15V7.8C2 6.11984 2 5.27976 2.32698 4.63803C2.6146 4.07354 3.07354 3.6146 3.63803 3.32698C4.27976 3 5.11984 3 6.8 3H17.2C18.8802 3 19.7202 3 20.362 3.32698C20.9265 3.6146 21.3854 4.07354 21.673 4.63803C22 5.27976 22 6.11984 22 7.8V15C22 16.6569 20.6569 18 19 18M8.70803 21H15.292C15.8368 21 16.1093 21 16.2467 20.8889C16.3663 20.7923 16.4347 20.6461 16.4324 20.4925C16.4298 20.3157 16.2554 20.1064 15.9065 19.6879L12.6146 15.7375C12.4035 15.4842 12.298 15.3576 12.1716 15.3114C12.0608 15.2709 11.9392 15.2709 11.8284 15.3114C11.702 15.3576 11.5965 15.4842 11.3854 15.7375L8.09346 19.6879C7.74465 20.1064 7.57024 20.3157 7.56758 20.4925C7.56526 20.6461 7.63373 20.7923 7.75326 20.8889C7.89075 21 8.16318 21 8.70803 21Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`)

const tick = new Icon(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 6L9 17L4 12" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`)

class PanelTitle extends Text {
    constructor(text) {
        super(text);
        this.isPanelTitle = true;

        // Default styling config
        this.paddingFactor(0)
        this.emphasis("bold")
        this.textSize(39)
        // this.textColour(Color.secondary)
    }
}

class PanelLabel extends Text {
    constructor(text) {
        super(text);
        this.isPanelLabel = true;

        // Default styling config
        this.textSize(16)
        this.paddingFactor(0)
        this.emphasis("bold")
        this.textColour(Color.secondary)
    }
}

class Panel {
    constructor() {
        this.x;
        this.y;
        this.width = 0;
        this.height = 0;
        this.elems = [];
        this.pad = 15;
        
        this.clickable = true;
        this.typeable = true;
        this.alignemnt = "leading"

        this.backgroundVar = Color.nearInverse;
        this.borderVar = Color.transparent;
        this.borderWeightVar = 1;
        this.cornerRadiusVar = [0, 0, 0, 0];
    }

    contains(elements) {
        this.elems = elements;
        return this;
    }

    calcDimensions() {
        this.width = 0;
        this.height = this.pad;
        for (let n = 0; n < this.elems.length; n++) {
            let elem = this.elems[n]
            this.width = Math.max(this.width, elem.width + 3*this.pad);
            this.height += elem.height + this.pad/2;
            if (elem.isPanelTitle) this.height += this.pad/2
            if (elem.isPanelLabel) this.height += this.pad/4
        }
    }

    render(x, y) {
        this.x = x;
        this.y = y;
        push()
        this.calcDimensions()
        fill(this.backgroundVar)
        stroke(this.borderVar)
        strokeWeight(this.borderWeightVar)
        rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
        pop()
        let ySweep = this.pad;
        for (let n = 0; n < this.elems.length; n++) {
            const elem = this.elems[n]
            switch (elem.alignment) {
                case "leading":
                    if (elem.isPanelTitle) {
                        ySweep += this.pad/2
                        elem.render(this.x + this.pad, this.y + ySweep);
                    }
                    else{
                        elem.render(this.x + 1.5*this.pad, this.y + ySweep);
                    }
                    break;
                case "center":
                    elem.render(this.x + (this.width - elem.width)/2, this.y + ySweep);
                    break;
                case "trailing":
                    if (elem.isPanelTitle) {
                        ySweep += this.pad/2
                        elem.render(this.x + this.width - elem.width - this.pad, this.y + ySweep);
                    }
                    else{
                        elem.render(this.x + this.width - elem.width - 1.5*this.pad, this.y + ySweep);
                    }
                    break;
            }

            if (elem.isPanelLabel) {
                ySweep += elem.height + this.pad/4;
            }
            else {
                ySweep += elem.height + this.pad/2;
            }
        }
    }

    onKeyPressed() {
        for (let n = 0; n < this.elems.length; n++) {
            if (this.elems[n].typeable) this.elems[n].onKeyPressed()
        }
    }

    onMousePressed() {
        for (let n = 0; n < this.elems.length; n++) {
            if (this.elems[n].clickable) this.elems[n].onMousePressed()
        }
    }

    onMouseReleased() {
        for (let n = 0; n < this.elems.length; n++) {
            if (this.elems[n].clickable) this.elems[n].onMouseReleased()
        }
    }

    padding(value) {
        this.pad = value;
        return this;
    }

    align(alignment) {
        this.alignment = alignment
    }

    background(colour) {
        this.backgroundVar = colour;
        return this;
    }


    border(border) {
        this.borderVar = border;
        return this;
    }

    borderWeight(weight) {
        this.borderWeightVar = weight;
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
}

class Stack {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.elems = [];
        this.spacingVar = 15;
        
        this.clickable = true;
        this.typeable = true;
        this.alignment = "leading";

        this.backgroundVar = Color.transparent;
        this.borderVar = Color.transparent;
        this.borderWeightVar = 1;
        this.cornerRadiusVar = [0, 0, 0, 0];
    }

    contains(array) {
        this.elems = array;
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

    background(colour) {
        this.backgroundVar = colour;
        return this;
    }

    border(border) {
        this.borderVar = border;
        return this;
    }

    borderWeight(weight) {
        this.borderWeightVar = weight;
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
        for (let n = 0; n < this.elems.length; n++) {
            if (this.elems[n].typeable) this.elems[n].onKeyPressed()
        }
    }

    onMousePressed() {
        for (let n = 0; n < this.elems.length; n++) {
            if (this.elems[n].clickable) this.elems[n].onMousePressed()
        }
    }

    onMouseReleased() {
        for (let n = 0; n < this.elems.length; n++) {
            if (this.elems[n].clickable) this.elems[n].onMouseReleased()
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
        for (let n = 0; n < this.elems.length; n++) {
            this.width = Math.max(this.width, this.elems[n].width);
            this.height += this.elems[n].height + this.spacingVar;
        }
        if (this.elems.length > 0) {
            this.height -= this.spacingVar;
        }
    }

    render(x, y) {
        this.x = x;
        this.y = y;
        push()
        this.calcDimensions()
        fill(this.backgroundVar)
        stroke(this.borderVar)
        strokeWeight(this.borderWeightVar)
        rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
        pop()
        let ySweep = 0;
        for (let n = 0; n < this.elems.length; n++) {
            let elem = this.elems[n]
            switch (elem.alignment) {
                case "leading":
                    elem.render(this.x, this.y + ySweep);
                    break;
                case "center":
                    elem.render(this.x + (this.width - this.elems[n].width)/2, this.y + ySweep);
                    break;
                case "trailing":
                    elem.render(this.x + this.width - this.elems[n].width, this.y + ySweep);
                    break;
            }
            ySweep += elem.height + this.spacingVar;
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
        for (let n = 0; n < this.elems.length; n++) {
            this.height = Math.max(this.height, this.elems[n].height);
            this.width += this.elems[n].width + this.spacingVar;
        }
        if (this.elems.length > 0) {
            this.width -= this.spacingVar;
        }
    }

    render(x, y) {
        this.x = x;
        this.y = y;
        push()
        this.calcDimensions()
        fill(this.backgroundVar)
        stroke(this.borderVar)
        strokeWeight(this.borderWeightVar)
        rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
        pop()
        let xSweep = 0;
        for (let n = 0; n < this.elems.length; n++) {
            let elem = this.elems[n]
            switch (elem.alignment) {
                case "leading":
                    this.elems[n].render(this.x + xSweep, this.y );
                    break;
                case "center":
                    this.elems[n].render(this.x + xSweep, (2*this.y + this.height - this.elems[n].height)/2);
                    break;
                case "trailing":
                    this.elems[n].render(this.x + xSweep, this.y + this.height - this.elems[n].height);
                    break;
            }
            xSweep += this.elems[n].width + this.spacingVar;
        }
    }
}

class Text {
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

    unbind() {
        this.binding = "";
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
        // this.height = this.tSize/(1-this.pFactor)
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
        pop();
    }

    background(colour) {
        this.backgroundVar = colour;
        return this;
    }

    border(border) {
        this.borderVar = border;
        return this;
    }

    borderWeight(weight) {
        this.borderWeightVar = weight;
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

    textSize(size) {
        this.tSize = size;
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

    emphasis(p5TextStyle) {
        this.emphasisVar = p5TextStyle;
        return this;
    }

    font(p5Font) {
        this.fontVar = p5Font;
        return this;
    }

    paddingFactor(newPFactor) {
        this.pFactor = newPFactor;
        return this;
    }
}

class TextInput extends Text {
    constructor(defaultText, placeholder, maxWidth=Infinity, doMultiLine=false, maxHeight=Infinity) {
        super(defaultText)
        this.editing = false;
        this.edited = false;
        this.placeholder = placeholder;
        this.cursorAfter = this.t;
        this.maxWidth = maxWidth;
        this.doMultiLine = doMultiLine;
        this.maxHeight = maxHeight;

        this.typeable = true;
        this.clickable = true;

        this.showingCursor = false;
        this.lastToggledCursor = new Date();
        this.cursorColourVar = Color.accent;
        this.cursorWeightVar = 2;

        // Default styling config
        this.background(Color.nearInverse)
        this.paddingFactor(0.2)
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
        
        if (this.mouseOver()) {
            cursor("text")
        }

        push()

        fill(this.backgroundVar)
        stroke(this.borderVar)
        strokeWeight(this.borderWeightVar)
        rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
        
        textSize(this.tSize)
        if (this.emphasisVar) textStyle(this.emphasisVar)
        if (this.fontVar) textFont(this.fontVar)
        let lines;
        if (this.t == "") {
            lines = this.placeholder.split("\n")
            fill(this.textColourVar[0], this.textColourVar[1], this.textColourVar[2], (this.textColourVar[3] ?? 255)*0.4)
            stroke(this.textBorderVar[0], this.textBorderVar[1], this.textBorderVar[2], (this.textBorderVar[3] ?? 255)*0.4)
        }
        else {
            lines = this.t.split("\n")
            fill(this.textColourVar)
            stroke(this.textBorderVar)
        }
        strokeWeight(this.textBorderWeightVar)

        if (this.emphasisVar) textStyle(this.emphasisVar)
        if (this.fontVar) textFont(this.fontVar)

        let longestLineIndex = 0;
        for (let n = 1; n < lines.length; n++) {
            if (textWidth(lines[n]) > textWidth(lines[longestLineIndex])) longestLineIndex = n;
        }
        let tWidth = textWidth(lines[longestLineIndex])
        this.width = tWidth + this.tSize*this.pFactor*2
        textAlign(LEFT, TOP)
        this.height = this.tSize*(lines.length + this.pFactor*2)
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

    onKeyPressed() {
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
                        if (cursorAfterOnThisLine == "" && textWidth(lines[lineNumber])+textWidth(lines[lineNumber-1]) > this.maxWidth) break;
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
                        if (this.height + this.tSize <= this.maxHeight) {
                            this.t = this.t.slice(0, this.cursorAfter.length) + "\n" + this.t.slice(this.cursorAfter.length)
                            this.cursorAfter += "\n"
                            this.showingCursor = true;
                            this.lastToggledCursor = new Date();
                            this.edited = true;
                        }
                    }
                    else {
                        this.editing = false;
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
                        if (textWidth(lines[lineNumber])+textWidth(key) <= this.maxWidth) {
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
        if (this.mouseOver()) {
            this.editing = true;
            this.cursorAfter = this.getClosestCursorAfter(mouseX, mouseY)
            this.showingCursor = true;
            this.lastToggledCursor = new Date();
        }
        else {
            this.editing = false;
        }
    }

    onMouseReleased() {
        
    }

    mouseOver() {
        if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) return true;
        return false;
    }

    cursorColour(colour) {
        this.cursorColourVar = colour;
        return this;
    }

    cursorWeight(weight) {
        this.cursorWeightVar = weight;
        return this;
    }
}

class Toggle {
    constructor(width, height) {
        this.x;
        this.y;
        this.width = width;
        this.height = height;

        this.clickable = true;
        this.typeable = false;
        this.alignment = "leading";

        this.displayState = "default off";
        this.on = false;
        this.binding = "";

        this.cornerRadiusVar;
        this.backgroundVar = {"default on": Color.accent, "default off": Color.secondary, "hover on": Color.accent, "hover off": Color.secondary, "pressed on": Color.brighter(Color.accent), "pressed off": Color.brighter(Color.secondary)};
        this.borderVar = {"default on": Color.transparent, "default off": Color.transparent, "hover on": Color.transparent, "hover off": Color.transparent, "pressed on": Color.transparent, "pressed off": Color.transparent, };
        this.borderWeightVar = {"default on": 1, "default off": 1, "hover on": 1, "hover off": 1, "pressed on": 1, "pressed off": 1};
    }

    bind(target) {
        this.binding = target;
        return this;
    }

    unbind() {
        this.binding = "";
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

    onMousePressed() {
        // nothing - see mouse released
    }

    onMouseReleased() {
        if (this.mouseOver()) {
            this.on = !this.on;
            this.displayState = this.on ? "default on": "default off";
            if (this.binding != "") eval(`${this.binding} = this.on`)
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
                console.log(`Invalid 'when' parameter ${when} for ${variableIdentifierText}. Ensure the input is one of the following: '${whenOptions.join("', '")}'`)
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
                this.on = eval(this.binding)
                this.displayState = this.on ? "default on" : "default off"
            }
        }

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

        this.contentsVar = {"default on": undefined, "default off": undefined, "hover on": undefined, "hover off": undefined, "pressed on": undefined, "pressed off": undefined};

        this.padFactor = {"default on": 0.8, "default off": 0.8, "hover on": 0.8, "hover off": 0.8, "pressed on": 0.8, "pressed off": 0.8};
    }

    render(x, y) {
        this.x = x;
        this.y = y;

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
                this.on = eval(this.binding)
                this.displayState = this.on ? "default on" : "default off"
            }
        }

        push()
        // Background
        fill(this.backgroundVar[this.displayState])
        stroke(this.borderVar[this.displayState])
        strokeWeight(this.borderWeightVar[this.displayState])
        rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[this.displayState][0], this.cornerRadiusVar[this.displayState][1], this.cornerRadiusVar[this.displayState][2], this.cornerRadiusVar[this.displayState][3])
        
        if (this.contentsVar[this.displayState]) {
            let scaleFactor = Math.min(this.width/this.contentsVar[this.displayState].width, this.height/this.contentsVar[this.displayState].height)*this.padFactor[this.displayState]
            translate(this.x + this.width/2 - this.contentsVar[this.displayState].width/2*scaleFactor, this.y + this.height/2 - this.contentsVar[this.displayState].height/2*scaleFactor)
            scale(scaleFactor)
            this.contentsVar[this.displayState].render(0, 0)
        }
        pop()
    }

    contents(elem, when) {
        this.checkWhen(when, () => {
            this.contentsVar[when] = elem;
        }, () => {
            this.contentsVar["default on"] = elem;
            this.contentsVar["default off"] = elem;
            this.contentsVar["hover on"] = elem;
            this.contentsVar["hover off"] = elem;
            this.contentsVar["pressed on"] = elem;
            this.contentsVar["pressed off"] = elem;
        }, () => {
            this.contentsVar[`${when} on`] = elem;
            this.contentsVar[`${when} off`] = elem;
        }, () => {
            this.contentsVar[`default ${when}`] = elem;
            this.contentsVar[`hover ${when}`] = elem;
            this.contentsVar[`pressed ${when}`] = elem;
        }, "check toggle contents")
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