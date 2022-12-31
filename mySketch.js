let heart = "heart"
let bool = false;
let radioman = "";

let ti = new TextInput("", true)
                .placeholder("Input")
                .maxWidth(100)
                .maxHeight(200)
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
        .radio("slide", "radioman")
        ,
    new CheckToggle()
        .align("center")
        .bind("bool")
        .contains(tick, "on")
        .popup(new Popup("right")
            .contains(new Panel()
                .contains([
                    new TextInput("", true)
                        .placeholder("Input")
                        ,
                    new Text("Default text"),
                ])
                .background(Color.secondary)
                .cornerRadius(10)
                .padding(10)
            )
        )
        .radio("check", "radioman")
])


let panel = new Panel()

panel.contains([
    new Title("Settings"),
    new Text("Vedant").textColour(Color.pink),
    new Text("Unemployed").textColour(Color.red),
    new Label("Heart input:"),
    new TextInput("", true)
        .placeholder("Input")
        .paddingFactor(0)
        .bind("heart")
        ,
    new Title("Settings")
        .bind("bool")
        ,
    new Text("Vedant"),
    new Text("Unemployed"),
    new Label("Heart input:"),
    new SlideToggle()
        .bind("bool")
        .knobColour(Color.white, "on")
        .knobColour(Color.transparent, "off")
        .knobBorder(Color.white, "on")
        .knobBorder(Color.white, "off")
        .knobBorder(Color.white.concat(100), "hover")
        .knobColour(Color.white.concat(100), "pressed")
        ,
    new Label("Other input:"),
    stack,
    new Button()
        .command(() => console.log("hi"))
        .contains(airplayIcon)
    ,
])
.cornerRadius(20)

let title = new Title("Title")

function setup() {
    createCanvas(600, 600)
}

function draw() {
    background(0)
    cursor("default")

    panel.render(100, 100)
    ti.render(300, 300)
    title.render(500, 500)
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