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