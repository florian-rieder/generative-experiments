const numLayers = 6;
const maxAngleIncrement = 0.001;
const minSpacing = 4;
const maxSpacing = 16;

let angles;
let rotationSpeeds;
let bufferSize;
let spacings;

function setup() {

    createCanvas(windowWidth, windowHeight);
    bufferSize = getBufferSize();

    // we use buffers so as to not need to recalculate the layers, which 
    // don't change frame to frame, saving a lot on performance.
    buffers = new Array(numLayers).fill().map(() => createGraphics(bufferSize.width, bufferSize.height));
    angles = new Array(numLayers).fill().map(() => random(0, PI));
    rotationSpeeds = new Array(numLayers).fill().map(() => random(0.0001, maxAngleIncrement));
    spacings = new Array(numLayers).fill().map(() => round(random(minSpacing, maxSpacing)))

    for (let i = 0; i < numLayers; i++) {
        fillBuffer(i);
    }
}

function draw() {
    background(0);
    for (let i = 0; i < angles.length; i++) {
        let sign = i % 2 == 0 ? -1 : 1; // rotate in an alternating way
        let angle = (angles[i] + rotationSpeeds[i] * sign) % TWO_PI;
        angles[i] = angle;

        push();
        translate(width / 2, height / 2);
        rotate(angle);
        image(buffers[i], -bufferSize.width / 2, -bufferSize.height / 2);
        pop();
    }
}

function fillBuffer(bufferIndex) {
    buffer = buffers[bufferIndex]
    // Create the pattern on one layer
    buffer.stroke(255);
    for (let x = 0; x < bufferSize.width; x += spacings[bufferIndex]) {
        buffer.line(x, 0, x, bufferSize.height);
    }
}

function getBufferSize() {
    // By taking a square with sides of the length of the screen's
    // diagonal, we ensure that the screen is always inscribed in the
    // buffer, regardless of its rotation.
    const diagonal = sqrt(width * width + height * height);
    return { width: diagonal, height: diagonal };
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // Resize all the buffers
    bufferSize = getBufferSize();
    for (let i = 0; i < numLayers; i++) {
        buffers[i].width = bufferSize.width;
        buffers[i].height = bufferSize.height;
        buffers[i].pixelDensity(pixelDensity()); // prevents density from changing
        buffers[i].background(0, 0, 0, 0);
        fillBuffer(i);
    }
}
