let heart = "heart"
let bool = false;

let ti = new TextInput("", "input", 100, true, 200)
                .bind("heart")
                .emphasis("italic")

let tbox = new Text("Hi there")
                // .textSize(40)
                .align("center")
                
let iconStack = new HStack().contains([
    airplayIcon,
    // tbox,
])

let stack = new HStack().contains([
    tbox,
    new SlideToggle()
        .align("center")
        ,
    new CheckToggle()
        .align("center")
        .bind("bool")
        .contents(tick, "on")
        // .contents(iconStack, "off")
        // .cornerRadius(10)
])


let panel = new Panel()

panel.contains([
    new PanelTitle("Settings"),
    new Text("Vedant").textColour(Color.pink),
    new Text("Unemployed").textColour(Color.red),
    new PanelLabel("Heart input:"),
    new TextInput("", "Input", Infinity, true)
        .paddingFactor(0)
        .bind("heart")
        ,
    new PanelTitle("Settings")
        .bind("bool")
        ,
    new Text("Vedant"),
    new Text("Unemployed"),
    new PanelLabel("Heart input:"),
    new SlideToggle()
        .bind("bool")
        // .knobColour(Color.white, "on")
        // .knobColour(Color.transparent, "off")
        // .knobBorder(Color.white, "on")
        // .knobBorder(Color.white, "off")
        // .knobBorder(Color.white.concat(100), "hover")
        // .knobColour(Color.white.concat(100), "pressed")
        ,
    new PanelLabel("Other input:"),
    stack,
    new Button()
        .command(() => console.log("hi"))
        .contents(airplayIcon)
    ,
])
.cornerRadius(20)

function setup() {
    createCanvas(600, 600)
}

function draw() {
    background(0)
    cursor("default")

    panel.render(100, 100)
    ti.render(300, 300)
    // tbox.render(400, 200)
    // toggle.render(100, 400)
    // stack.render(100, 400)
}

function mousePressed() {
    panel.onMousePressed()
    ti.onMousePressed()
    // toggle.onMousePressed()
}

function mouseReleased() {
    panel.onMouseReleased()
    ti.onMouseReleased()
}

function keyPressed() {
    panel.onKeyPressed()
    ti.onKeyPressed()
}