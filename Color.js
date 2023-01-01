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

    brighter(colour, times=1) {
        return [colour[0]*((7/6)**times), colour[1]*((7/6)**times), colour[2]*((7/6)**times)];
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