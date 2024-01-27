const angleIncrement = 0.01;
const noiseIncrement = 0.006;
const amplitude = 150;
const noiseAmplitude = 100;
const stepBetweenLines = 10;
const stepBetweenPoints = 4;
const numWeights = 3;
const speed = 0.001;
const maxAmplitude = amplitude * 2 + noiseAmplitude * 2;


let weights, noiseCache; // Cache for precomputed noise values
let t = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    stroke(255);
    noFill();
    frameRate(60);

    weights = generateWeights(numWeights);
    noiseCache = computeNoise();
}

function draw() {
    background(0);
    angle = t;
    t += speed * deltaTime;
    drawSinescape();
}

function drawSinescape() {
    let i = 0;
    for (let y = -maxAmplitude; y <= height + maxAmplitude; y += stepBetweenLines) {
        drawLine(i, y);
        angle = y * angleIncrement + t;
        i++;
    }
}

function drawLine(i, baseY) {
    beginShape();
    let y, harmonicComponent, noiseComponent;
    for (let x = 0; x <= width + stepBetweenPoints; x += stepBetweenPoints) {
        noiseComponent = noiseCache[i][x] * noiseAmplitude;
        harmonicComponent = harmonicSine(angle, weights) * amplitude;
        y = baseY + harmonicComponent + noiseComponent;
        angle += angleIncrement;
        vertex(x, y);
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

function computeNoise() {
    // Pre-compute noise values and store them in the cache
    let cache = [];
    let offset = createVector(0, 0);
    for (let y = 0; y <= (height+maxAmplitude*2)/stepBetweenLines; y++) {
        cache.push([])
        for (let x = 0; x <= width + stepBetweenPoints; x++) {
            cache[y].push(noise(offset.x, offset.y));
            offset.x += noiseIncrement;
        }
        offset.y += noiseIncrement * stepBetweenLines;
        offset.x = 0;
    }
    return cache;
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

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    computeNoise();

}
