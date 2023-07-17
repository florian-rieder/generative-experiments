const margin = 50;
const hueConstraint = 30; // only take colors from a 90 degree arc on the hue circle
const maxRectSize = 10;
const missChance = 15 / 100;

function setup() {
    let size = min(windowWidth, windowHeight);
    createCanvas(size, size);

    background(255);
    stroke(255);
    colorMode(HSL);
    frameRate(1);

    baseHue = random(0, 360);

    //columns = round(random(400, 1000));
    //rows = round(random(100, 400));
    columns = 100;
    rows = 100;

    cellSizeX = (width - 2 * margin) / columns;
    cellSizeY = (height - 2 * margin) / rows;
    internalMargin = min(cellSizeY, cellSizeX) / 2;
    strokeWeight(internalMargin);

    filledCells = new Array(rows).fill().map(() => new Array(columns).fill(false));
}

function draw() {
    /* Framerate stuff */
    if (frameCount / 2 <= 60) {
        frameRate(frameCount / 2);
    }
    let additionalRectangles = frameCount / 2 - 60 > 1 ? frameCount / 2 - 60 : 1;
    if (additionalRectangles >= 10) {
        additionalRectangles = 10;
    }
    /* Adding rectangles */
    for (let i = 0; i < additionalRectangles; i++) {
        addRectangle();

        if (countFilledCells(filledCells) >= rows * columns) {
            noLoop();
            writeTitle();
            return;
        }
    }
}

function writeTitle() {
    textFont("Courier New");
    textSize(16);
    textAlign(RIGHT);
    fill(0, 0, 50);
    const serial = "P-" + rows + "-" + columns + "-" + round(random(0, 9)) + round(random(0, 9)) + round(random(0, 9)) + "-" + round(random(0, 9));
    text(serial, width - margin - internalMargin / 2, height - margin / 2 + 8 - internalMargin / 2);
}

function addRectangle() {
    // get the coordinates of the largest rectangle of empty grid space
    const largestRectangle = maximalRectangle(filledCells, false);

    // get two random points within the largest rectangle in grid coordinates
    const x1 = floor(random(largestRectangle.topLeftX, largestRectangle.bottomRightX));
    const y1 = floor(random(largestRectangle.topLeftY, largestRectangle.bottomRightY));
    const x2 = floor(random(x1, min(x1 + maxRectSize, largestRectangle.bottomRightX)));
    const y2 = floor(random(y1, min(y1 + maxRectSize, largestRectangle.bottomRightY)));

    // draw the rect in canvas coordinates
    const x = x1 * cellSizeX + margin;
    const y = y1 * cellSizeY + margin;
    const w = (x2 - x1 + 1) * cellSizeX;
    const h = (y2 - y1 + 1) * cellSizeY;

    fill(color((baseHue + random(-hueConstraint / 2, hueConstraint / 2)) % 360, 75, 75));
    if (random() > missChance) rect(x, y, w, h);

    // update the grid data
    for (let tx = x1; tx <= x2; tx++) {
        for (let ty = y1; ty <= y2; ty++) {
            filledCells[ty][tx] = true;
        }
    }
}


function maximalRectangle(matrix, value = 1) {
    /* An algorithm to find the maximal rectangle in a binary matrix.
     * based on https://baffinlee.com/leetcode-javascript/problem/maximal-rectangle.html
     * I don't really get it, it's hard, but it's somewhat related to finding the 
     * maximum rectangle below a rolling histogram of row-wise column heights. The algorithm
     * runs in O(n*m) time.
     * Prompt: Could you help me modify this code so that instead of returning the maximal
     *         area, it returns the bounding box of the largest rectangle in the form 
     *         { topLeftX, topLeftY, bottomRightX, bottomRightY }
     */
    let n = matrix.length;
    let m = (matrix[0] || []).length;
    let maxArea = 0;
    let heights = Array(m);
    let stack = [];
    let h = 0;
    let w = 0;
    let boundingBox = null;

    for (let i = 0; i < n; i++) {
        stack = [];

        for (let j = 0; j < m; j++) {
            // Calculate the height of the current column based on the input value
            if (matrix[i][j] === value) {
                heights[j] = i === 0 ? 1 : heights[j] + 1;
            } else {
                heights[j] = 0;
            }

            // Process the stack to calculate the maximum rectangle for the current column
            while (stack.length && heights[j] <= heights[stack[stack.length - 1]]) {
                h = heights[stack.pop()];
                w = stack.length === 0 ? j : j - stack[stack.length - 1] - 1;
                let area = h * w;

                // Update the bounding box if the current rectangle is larger than the current maximum
                if (area > maxArea) {
                    maxArea = area;
                    boundingBox = {
                        topLeftX: stack.length === 0 ? 0 : stack[stack.length - 1] + 1,
                        topLeftY: i - h + 1,
                        bottomRightX: j,
                        bottomRightY: i
                    };
                }
            }

            // Push the index of the current column onto the stack
            stack.push(j);
        }

        // Process the remaining columns on the stack to calculate the largest rectangle between columns
        while (stack.length) {
            h = heights[stack.pop()];
            w = stack.length === 0 ? m : m - stack[stack.length - 1] - 1;
            let area = h * w;

            // Update the bounding box if the current rectangle is larger than the current maximum
            if (area > maxArea) {
                maxArea = area;
                boundingBox = {
                    topLeftX: stack.length === 0 ? 0 : stack[stack.length - 1] + 1,
                    topLeftY: i - h + 1,
                    bottomRightX: m - 1,
                    bottomRightY: i
                };
            }
        }
    }

    return boundingBox;
}

function countFilledCells(grid) {
    // Prompt: Could you help me with creating a function that goes through a 2D array of booleans and returns how many are true ?
    return grid.flat().reduce((sum, val) => sum + val, 0);
}
