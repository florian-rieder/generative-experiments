
const margin = 0;

let offsetX = 0;
let angleIncrement = 0.015;
let noiseIncrement = 0.015;
let keepWeights = true;
let maxThickness,
    maxAmplitude,
    baseHue,
    randomStep,
    resetAngle;


const titleSize = margin / 4;
let weights = new Array();

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSL);
    noStroke();
    noLoop();

    generate();
}

function mousePressed() {
    generate();
}

function generate() {
    amplitudeReductionFactor = Math.random() * 0.4 + 0.6;
    thicknessReductionFactor = Math.random() * 0.2 + 0.79;
    numFrequencies = Math.round(Math.random() * 8);
    numColors = Math.round(Math.random() * 8 + 8);
    maxThickness = Math.round(Math.random() * 50 + 50);
    maxAmplitude = Math.round(Math.random() * 50 + 50);
    baseHue = Math.round(Math.random() * 360);
    randomStep = Math.random() > 0.5;
    resetAngle = Math.random() > 0.5;
    background(color(baseHue, 15, 15));

    angle = 0;
    lines = 0;
    columns = 0;
    noiseOffset = 0;
    thickness = maxThickness;
    amplitude = maxAmplitude;
    columnX = -maxAmplitude + offsetX;
    x = columnX;
    y = -maxThickness;

    // Generate color scheme based on a random hue
    colors = new Array();
    //baseHue = random(0, 360);
    background(color(baseHue, 15, 15));
    for (i = 0; i < numColors; i++) {
        colors.push(color(baseHue, map(i, 0, numColors - 1, 20, 80), map(i, 0, numColors - 1, 20, 75)))
    }
    fill(colors[0]);

    // no weights + keep = true -> generate new weights
    // no weights + no keep = true
    // weights + keep = false
    // weights + no keep = true
    if (!(weights.length == numFrequencies && keepWeights)) {
        // Generate weights for our harmonic function
        weights = generateWeights(numFrequencies);
    }

    drawFilaments();
    //drawFrame();
    //writeTitle();
}

function drawFilaments() {
    // don't worry about it, there's a return statement in there !
    // noprotect
    while (true) {
        const n = noiseIncrement == 0 ? 1 : noise(noiseOffset);
        const localAmplitude = amplitude;

        let radius = n * thickness;
        circle(x, y, radius);

        x = columnX + harmonicSine(angle, weights) * localAmplitude * 2;

        // Calculate the slope between the current point and the next point
        const nextY = y + 1;
        const nextX = columnX + harmonicSine(angle + angleIncrement, weights) * localAmplitude * 2;
        const distance = Math.sqrt((nextY - y) ^ 2 + (nextX - x) ^ 2);

        if (Math.abs(distance) > radius) {
            const yStep = Math.sign(dist); // Determine the direction of y increment
            const yIncrement = yStep / Math.abs(distance);

            // Draw the intermediate circles
            for (let i = 1; i <= distance; i++) {
                const intermediateY = y + i * yIncrement;
                circle(x, intermediateY, radius);
            }
        }

        y += 1;
        angle += angleIncrement;
        noiseOffset += noiseIncrement;

        // When we arrive at the bottom of the screen
        if (y > height) {
            columns++;
            y = -maxThickness;
            if (randomStep) {
                columnX += random(maxAmplitude / 2, maxAmplitude * 2) + offsetX;
            } else {
                columnX = columns * maxAmplitude + offsetX;
            }

            // When we arrive at the far right of the screen
            if (x > width) {
                columns = 0;
                lines++;
                // End if we've drawn all the colors
                if (lines >= colors.length) return;

                fill(colors[lines]);

                if (randomStep) {
                    columnX = random(-maxAmplitude, maxAmplitude) + offsetX;
                } else {
                    columnX = columns * maxAmplitude + offsetX;
                }
                angle = resetAngle ? 0 : angle;
                thickness *= thicknessReductionFactor;
                amplitude *= amplitudeReductionFactor;
            }
        }
    }
}

function harmonicSine(t, weights) {
    let sum = 0;
    for (i = 0; i < weights.length; i++) {
        sum += sin(t / (i + 1)) * weights[i];
    }
    return sum
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


function drawFrame() {
    fill(255); // frame color
    rect(0, 0, width, margin); // top margin
    rect(0, height - margin, width, margin); // bottom margin
    rect(0, 0, margin, height); // left margin
    rect(width - margin, 0, margin, height); // right margin
}

function writeTitle() {
    textFont("Courier New");
    textSize(titleSize);
    textAlign(RIGHT);
    fill(0);
    const serial = "Filaments-" + round(baseHue);
    text(serial, width - margin, height - margin / 2 + titleSize / 4);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    generate();
}
