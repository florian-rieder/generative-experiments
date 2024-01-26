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
    freq = (random(2, 10) * 2) + 1; // Odd numbers produce more interesting results.
    let numWeights = round(random(2, 6));
    let weights = generateWeights(numWeights);
    sineFunc = (t) => harmonicSine(t, weights);

    drawSinescape(sineFunc);
}

function drawSinescape(sineFunc) {
    const angleIncrement = (PI * freq) / (height + 2 * padding)

    // Don't worry ! There's a return statement in there, and it's entirely deterministic
    while (true) {
        // Calculate the X based on the current X, angle and current Y
        const x = currentX + sineFunc(angle) * (increment + currentY + padding);
        landscapeRect(x, currentY, padding);

        // Increment angle and current Y
        angle += angleIncrement;
        currentY++;

        // Stop the simulation once we have reached the bottom right
        // corner, basically
        if (currentX > width && currentY > height + padding) return;

        // When we arrive at the bottom of the window,
        // get back to the top and move to the right
        if (currentY > height + padding) {
            currentX += currentX / 2;
            currentY = -padding;
        }
    }
}

function landscapeRect(x, y, rectWidth) {
    // Create a rect whose width depends on its x position, and
    // its height is the height of the canvas so as to cover everything
    // beneath its y position until the bottom border of the canvas
    rect(x, y, x + rectWidth, height);
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
