const angleIncrement = 0.01;
const noiseIncrement = 0.01;
const amplitude = 100;
const noiseAmplitude = 50;
const step = 10;

const weights = generateWeights(3);

// Cache for noise values
const noiseCache = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    stroke(255);
    noFill();

    currentTime = 0;

    // Pre-compute noise values and store them in the cache
    let noiseOffset = createVector(0, 0);
    for (let y = -amplitude - noiseAmplitude; y < height + amplitude + noiseAmplitude; y += step) {
        for (let x = 0; x < width; x++) {
            noiseOffset.x += noiseIncrement;
            noiseCache.push(noise(noiseOffset.x, noiseOffset.y));
        }
        noiseOffset.y += noiseIncrement * 10;
        noiseOffset.x = 0;
    }
}

function draw() {
    background(0);
    angle = currentTime;
    noiseOffset = createVector(0, 0);

    drawSinescape();
    currentTime += 1;
}

function drawSinescape() {
    let totalAmplitude = amplitude + noiseAmplitude;

    for (let y = -totalAmplitude; y < height + totalAmplitude; y += step) {
        drawLine(y);
        angle = y * angleIncrement + currentTime;
    }
}


function drawLine(offsetY) {
    beginShape();
    for (let x = 0; x < width; x++) {
        let y = harmonicSine(angle, weights) * amplitude + noiseCache[(x + x * offsetY / 10) % noiseCache.length] * noiseAmplitude + offsetY;
        vertex(x, y);
        angle += angleIncrement;
    }
    endShape();
}

function harmonicSine(t, weights) {
    let sum = 0;
    for (i = 0; i < weights.length; i++) {
        sum += Math.sin(t / (i + 1)) * weights[i];
    }
    return sum;
}

/* Prompt: *My naive implementation* The current implementation of the generateWeights doesn't really satisfy me.
 * Let me explain: I'm using it to generate random harmonic sines, and when I take a large amount of 
 * weights, the first random number as a much higher chance to be a high percentage, making it so
 * that my sine is mostly a regular sine most of the time. I want the weights to have uniform variance.
 */
function generateWeights(numWeights) {
    const alpha = new Array(numWeights).fill(1); // Dirichlet distribution parameter

    // Generate random weights using the Dirichlet distribution
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