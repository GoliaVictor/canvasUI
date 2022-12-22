let DARKTHEME = true

let Color = {
    black: [0, 0, 0],
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
    offPrimary: [234, 234, 234],
    offInverse: [21, 21, 21],

    darkTheme: (bool) => {
        if (bool) {
            Color.primary = [255, 255, 255]
            Color.inverse = [0, 0, 0]
            Color.offPrimary = [234, 234, 234]
            Color.offInverse = [21, 21, 21]
        }
        else {
            Color.primary = [0, 0, 0]
            Color.inverse = [255, 255, 255]
            Color.offPrimary = [21, 21, 21]
            Color.offInverse = [234, 234, 234]
        }
    }
}

class Text {
    constructor(text) {
        this.x;
        this.y;
        this.t = text;
        this.tSize = 20;
        this.pFactor = 0;
        this.width;
        this.height;

        this.typeable = false;
        this.clickable = false;

        this.binding = "";

        // Default styling config
        this.backgroundColourVar = Color.transparent;
        this.borderVar = Color.transparent;
        this.borderWeightVar = 1;
        this.cornerRadiusVar = [0, 0, 0, 0];
        this.textColourVar = Color.primary;
        this.textBorderVar = Color.transparent;
        this.textBorderWeightVar = 1;
        this.emphasisVar;
        this.fontVar;
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
        fill(this.backgroundColourVar)
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

    backgroundColour(colour) {
        this.backgroundColourVar = colour;
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

    textBorderWeight(weight) {
        this.textBorderWeightVar = weight;
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

    bind(target) {
        this.binding = target;
        return this;
    }

    unbind() {
        this.binding = "";
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
        this.backgroundColour(Color.offInverse)
        this.paddingFactor(0.2)
    }

    render(x, y) {
        this.x = x;
        this.y = y;
        
        push()
        if (this.mouseOver()) {
            cursor("text")
        }

        fill(this.backgroundColourVar)
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
                        this.cursorAfter = this.cursorAfter.slice(0, -1)
                        this.showingCursor = true;
                        this.lastToggledCursor = new Date();
                    }
                    break;
                case "ArrowRight":
                    if (this.cursorAfter.length < this.t.length) {
                        this.cursorAfter = this.t.slice(0, this.cursorAfter.length+1)
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
                        let cursorAfterOnThisLine = this.cursorAfter.split("\n")[lineNumber]
                        if (cursorAfterOnThisLine == "" && textWidth(lines[lineNumber])+textWidth(lines[lineNumber-1]) > this.maxWidth) break;
                        this.t = this.t.slice(0, this.cursorAfter.length-1) + this.t.slice(this.cursorAfter.length);
                        this.cursorAfter = this.cursorAfter.slice(0, -1);
                        this.showingCursor = true;
                        this.lastToggledCursor = new Date();
                    }
                    pop()
                    break;
                case "Enter":
                    if (this.doMultiLine) {
                        if (this.height + this.tSize <= this.maxHeight) {
                            this.t = this.t.slice(0, this.cursorAfter.length) + "\n" + this.t.slice(this.cursorAfter.length)
                            this.cursorAfter += "\n"
                            this.showingCursor = true;
                            this.lastToggledCursor = new Date();
                        }
                    }
                    else {
                        this.editing = false;
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

class PanelTitle extends Text {
    constructor(text) {
        super(text);
        this.notIndented = true;

        // Default styling config
        this.paddingFactor(0)
        this.emphasis("bold")
        this.textSize(25)
    }
}

class PanelLabel extends Text {
    constructor(text) {
        super(text);
        this.touchingNext = true;

        // Default styling config
        this.textSize(12)
        this.paddingFactor(0)
        this.emphasis("bold")
    }
}

class Panel {
    constructor() {
        this.x;
        this.y;
        this.width = 0;
        this.height = 0;
        this.elems = [];
        this.pad = 10;

        // this.backgroundColourVar = [34, 32, 29, 100]
        this.backgroundColourVar = Color.offInverse;
        this.borderVar = Color.transparent;
        this.borderWeightVar = 1;
        this.cornerRadiusVar = [0, 0, 0, 0];
    }

    setElems(elements) {
        this.elems = elements;
        return this;
    }

    calcDimensions() {
        this.width = 3*this.pad;
        this.height = this.pad;
        for (let n = 0; n < this.elems.length; n++) {
            this.width = Math.max(this.width, this.elems[n].width + 3*this.pad);
            if (this.elems[n].touchingNext) {
                this.height += this.elems[n].height;
            }
            else {
                this.height += this.elems[n].height + this.pad/2;
            }
        }
    }

    render(x, y) {
        this.x = x;
        this.y = y;
        push()
        this.calcDimensions()
        fill(this.backgroundColourVar)
        stroke(this.borderVar)
        strokeWeight(this.borderWeightVar)
        rect(this.x, this.y, this.width, this.height, this.cornerRadiusVar[0], this.cornerRadiusVar[1], this.cornerRadiusVar[2], this.cornerRadiusVar[3])
        pop()
        let ySweep = this.pad;
        for (let n = 0; n < this.elems.length; n++) {
            if (this.elems[n].notIndented) {
                this.elems[n].render(this.x + this.pad, this.y + ySweep);
            }
            else {
                this.elems[n].render(this.x + 2*this.pad, this.y + ySweep);
            }
            if (this.elems[n].touchingNext) {
                ySweep += this.elems[n].height;
            }
            else {
                ySweep += this.elems[n].height + this.pad/2;
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

    backgroundColour(colour) {
        this.backgroundColourVar = colour;
        return this;
    }

    padding(value) {
        this.pad = value;
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