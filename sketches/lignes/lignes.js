const rows = 16;
const columns = 16;
const margin = 50;
const weightFactor = 1/4;
let doneWorking = false

let i = 0;
let j = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    frameRate(16);
    strokeCap(PROJECT);
    strokeWeight(weightFactor);

    cellSize = getCellSize();
}

function draw() {
    if (doneWorking) {
        noLoop();
        return;
    }
    translate(width / 2 - (cellSize * columns) / 2, 0)
    drawCell(i, j);

    i++;
    if (i >= rows) {
        j++;
        i = 0;
        strokeWeight((j + 1) * weightFactor);
        if (j >= columns) {
            noLoop();
            doneWorking = true;
        }
    }
}

function drawCell(x, y) {
    // x and y are the grid coordinates
    topLeft = createVector(x * cellSize + margin / 2, y * cellSize + margin / 2);
    bottomRight = createVector((x + 1) * cellSize + margin / 2, (y + 1) * cellSize + margin / 2);

    let corners = [
        topLeft,
        createVector(bottomRight.x, topLeft.y),
        createVector(topLeft.x, bottomRight.y),
        bottomRight
    ]

    // select two random points
    let firstPointIndex = floor(random(corners.length));
    let firstPoint = corners.splice(firstPointIndex, 1)[0]; // remove that element so we don't pick it again
    let secondPoint = corners[floor(random(corners.length))];

    line(firstPoint.x, firstPoint.y, secondPoint.x, secondPoint.y);
}

function getCellSize() {
    return min((width - margin) / columns, (height - margin) / rows - 1);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // reset display and data
    background(255);
    doneWorking = false;
    i = 0;
    j = 0;
    cellSize = getCellSize();
    strokeWeight(weightFactor);
}
