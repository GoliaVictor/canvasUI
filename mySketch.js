let panel = new Panel()
                // .backgroundColour([255, 0, 0, 50])
                // .cornerRadius(10)
                // .border([10, 10, 10])
                // .borderWeight(2)
                // .backgroundColour([226,26,26])
                // .border([13, 226, 113])
                // .borderWeight(4)
                // .cornerRadius(50, 30, 10, 0)
                // .textColour([26, 226, 226])
                // .textBorder([26, 113, 226])
                // .textBorderWeight(3)


panel.elems.push((new PanelTitle("asodijaosijdr")))
panel.elems.push(new Text("asodijaosijdr"))
panel.elems.push(new Text("aosij"))
panel.elems.push((new PanelLabel("Label:"))
                    .textSize(10)
)
panel.elems.push((new TextInput("", "input", Infinity, false))
                    // .backgroundColour([0, 0, 0, 0])
                    .paddingFactor(0)
)

let ti = new TextInput("", "input", 100, true, 200)
                // .backgroundColour([113, 226, 113, 100])
                // .border([255, 255, 255])
                // .borderWeight(3)
                // .cornerRadius(10)
                // .textColour([113, 226, 113])
                // .textBorder([26, 113, 226])
                // .textBorderWeight(3)
                // .cursorColour([226,26,26])
                // .cursorWeight(5)
                // .emphasis("italic")

let tbox = new Text("Hi there")
                // .backgroundColour([226,26,26])
                // .border([13, 226, 113])
                // .borderWeight(4)
                // .cornerRadius(50, 30, 10, 0)
                // .textColour([26, 226, 226])
                // .textBorder([26, 113, 226])
                // .textBorderWeight(3)


// let bob = new Text("Bob")
//             .backgroundColour(Color.yellow)
//             .paddingFactor(0)

// let bob_input = new TextInput("bobby", "bobby place", Infinity, true)
//                     .cursorColour(Color.pink)
//                     .cursorWeight(2)
//                     .cornerRadius(5)
//                     .paddingFactor(0)

// let pernell_title = new PanelTitle("Title")
//                         .backgroundColour(Color.saffron)

// let bob_input_label = new PanelLabel("Average joe")
//                         .textColour(Color.accent)

// let pernell = new Panel()
//                 .setElems([pernell_title, bob, bob_input_label, bob_input])
//                 .cornerRadius(10)

function setup() {
    createCanvas(600, 600)
}

function draw() {
    background(50)
    cursor("default")
    // pernell.render(100, 400)

    panel.render(100, 100)
    ti.render(300, 300)
    tbox.render(400, 200)
}

function mousePressed() {
    panel.onMousePressed()
    ti.onMousePressed()
    // pernell.onMousePressed()
}

function keyPressed() {
    panel.onKeyPressed()
    ti.onKeyPressed()
    // pernell.onKeyPressed()
}