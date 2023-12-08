const rows = 32;
const columns = 32;
const marginPercent = 0.1;
const minWeight = 1 / 4;
const maxWeight = 4;

let doneWorking = false;
let margin = 0;
let i = 0;
let j = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    strokeCap(PROJECT);
    initialize();
}

function initialize() {
    i = 0;
    j = 0;
    doneWorking = false;
    margin = min(width, height) * marginPercent;
    cellSize = getCellSize();
    strokeWeight(minWeight);
    background(255);
    loop();
}

function draw() {
    if (doneWorking) {
        noLoop();
        return;
    }

    // Set the origin to the top left corner of the grid
    translate(
        width / 2 - margin/2 - (cellSize * columns) / 2,
        height / 2 - margin/2 - (cellSize * rows) / 2
    )

    drawCell(i, j);

    i++;
    if (i >= rows) {
        j++;
        i = 0;
        strokeWeight(map(j, 0, rows, minWeight, maxWeight));
        if (j >= columns) {
            noLoop();
            doneWorking = true;
        }
    }

    //strokeWeight(map(j + i, 0, rows+columns, minWeight, maxWeight));
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
    return min((width - margin) / columns, (height - margin) / rows);
}

function mousePressed() {
    initialize();
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    initialize();
}
