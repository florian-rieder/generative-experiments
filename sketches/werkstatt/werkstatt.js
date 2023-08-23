let numColumns = 9;
let numRows = 13;
let cellSize;
let margin = 20;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noFill();
    stroke(0);
    strokeWeight(1);
    strokeJoin(BEVEL);
    drawGrid();
}

function mousePressed() {
    drawGrid();
}

function drawGrid() {
    margin = height * 8 / 100; // margin of 8% on each side
    background(255, 32, 32); // Set the background to a bloody red
    // Calculate the size of each cell based on the available space within the canvas
    cellSize = min((width - margin * 2) / numColumns, (height - margin * 2) / numRows);
    // Calculate the position of the top-left corner of the grid based on the available space within the canvas
    let gridX = margin + (width - margin * 2 - numColumns * cellSize) / 2;
    let gridY = margin + (height - margin * 2 - numRows * cellSize) / 2;
    // Draw the grid
    for (let y = 0; y < numRows; y++) {
        for (let x = 0; x < numColumns; x++) {
            // Calculate the position of the cell based on its position in the grid
            let xPos = gridX + x * cellSize + cellSize / 2;
            let yPos = gridY + y * cellSize + cellSize / 2;
            drawCell(xPos, yPos, cellSize, x + y * numColumns + 1); // Pass in the cell number as an argument
        }
    }
}

function drawCell(x, y, cellSize, cellNumber) {
    // Choose the number of points to connect based on the cell number
    let numPoints = cellNumber + 2;
    // Generate the points randomly around the circle
    let points = new Array();
    let radius = cellSize / 2;
    for (let i = 0; i < numPoints; i++) {
        // ChatGPT prompt: How do I get a random point on the periphery of a circle in p5.js ?
        let angle = random(0, TWO_PI);
        let px = x + cos(angle) * radius;
        let py = y + sin(angle) * radius;
        points.push(createVector(px, py));
    }
    // Connect the points in a random order
    shuffleArray(points);
    beginShape();
    for (let i = 0; i < numPoints; i++) {
        vertex(points[i].x, points[i].y);
    }
    endShape(CLOSE);
}

// ChatGPT prompt: How do I shuffle an array in play in js ?
// Shuffle an array in place
function shuffleArray(array) {
    for (let i = 0; i < array.length; i++) {
        let j = int(random(i, array.length));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    drawGrid();
}