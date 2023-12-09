const PHI = (1 + Math.sqrt(5)) / 2; // golden ratio
const d = 50;
const freq = 9; // odd numbers produce more interesting results.

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);

    initialize();
}

function initialize() {
    background(255);
    currentX = 20;
    currentY = -d;
    angle = 0;
    increment = d;

    drawSinescape();
}

function drawSinescape() {
    // Don't worry ! There's a return statement in there, and it's entirely deterministic
    while (true) {
        // calculate the X based on the current X, angle and current Y
        const x = currentX + sin(angle) * (increment + currentY + d);

        goldenRect(x, currentY, d);

        // increment angle and current Y
        angle = (angle + (PI * freq) / (height + 2 * d)) % TWO_PI;
        currentY++;

        // stop the simulation once we have reached the bottom right corner, basically
        if (currentX > width && currentY > height + d) {
            return;
        }

        // when we arrive at the bottom of the window,
        // get back to the top and move to the right
        if (currentY > height + d) {
            currentX += currentX / 2;
            currentY = -d;
            //increment += currentX;
        }
    }
}

function goldenRect(x, y, rectWidth) {
    let rectHeight = rectWidth * PHI;
    rect(x, y, x + rectWidth, y + rectHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    initialize();
}
