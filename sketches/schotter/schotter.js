const columns = 12;
const rows = 22;
const translationMultiplier = 1 / 2;
const rotationMultiplier = 1 / 100;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noFill();

    drawSchotter();
}

function mousePressed() {
    drawSchotter();
}

function drawSchotter() {
    background(255);

    // compute square size based on canvas size and margin
    let margin = height * 8 / 100; // margin of 8% on each side
    squareSize = (height - margin * 2) / rows;

    push()
    // translate to the upper corner of the grid, so that it will be centered
    translate(width / 2 - (columns * squareSize) / 2, height / 2 - (rows * squareSize) / 2);

    for (let i = 1; i <= columns; i++) {
        for (let j = 1; j <= rows; j++) {
            push();
            // get position of the upper left corner of the square
            const x = (i - 1) * squareSize;
            const y = (j - 1) * squareSize;
            // get the position of the center of the square and offset it
            const displacement = j * translationMultiplier;
            const cx = x + squareSize / 2 + random(-displacement, displacement);
            const cy = y + squareSize / 2 + random(-displacement, displacement);
            // rotate the square around its center (cx, cy)
            translate(cx, cy);
            const rotation = j * rotationMultiplier * random(-PI, PI);
            rotate(rotation);
            // draw the square around its center
            square(-squareSize / 2, -squareSize / 2, squareSize);
            pop();
        }
    }
    pop()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    drawSchotter();
}