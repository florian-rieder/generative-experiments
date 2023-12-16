const PHI = (1 + Math.sqrt(5)) / 2; // golden ratio
const padding = 50;
let freq; 

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);

    initialize();
}

function initialize() {
    background(255);
    currentX = 20;
    currentY = -padding;
    angle = 0;
    increment = padding;
    freq = (random(2, 10) * 2) + 1; // odd numbers produce more interesting results.
    let numWeights = round(random(2, 6));
    let weights = generateWeights(numWeights);
    sineFunc = (t) => harmonicSine(t, weights);

    drawSinescape(sineFunc);
}

function drawSinescape(sineFunc) {
    // Don't worry ! There's a return statement in there, and it's entirely deterministic
    const angleIncrement = (PI * freq) / (height + 2 * padding)
    while (true) {
        // calculate the X based on the current X, angle and current Y
        const x = currentX + sineFunc(angle) * (increment + currentY + padding);
        goldenRect(x, currentY, padding);

        // increment angle and current Y
        angle += angleIncrement;
        currentY++;

        // stop the simulation once we have reached the bottom right corner, basically
        if (currentX > width && currentY > height + padding) return;

        // when we arrive at the bottom of the window,
        // get back to the top and move to the right
        if (currentY > height + padding) {
            currentX += currentX / 2;
            currentY = -padding;
        }
    }
}

function goldenRect(x, y, rectWidth) {
    let rectHeight = rectWidth * PHI
    rect(x, y, x + rectWidth, y + rectHeight);
}

function harmonicSine(t, weights) {
    let sum = 0;
    for (i = 0; i < weights.length; i++) {
        sum += Math.sin(t / (i + 1)) * weights[i];
    }
    return sum;
}

function generateWeights(numWeights) {
    const alpha = new Array(numWeights).fill(1);

    // Generate random weights
    const weights = [];
    let sum = 0;
    for (let i = 0; i < numWeights; i++) {
        const weight = Math.random() * alpha[i];
        weights.push(weight);
        sum += weight;
    }

    // Normalize the weights to ensure the sum is 1
    for (let i = 0; i < numWeights; i++) {
        weights[i] /= sum;
    }

    return weights;
}

function mousePressed() {
    initialize();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    initialize();
}
