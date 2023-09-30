const angleIncrement = 0.01;
const noiseIncrement = 0.015;
const reductionFactor = 0.95;
const numColors = 50;
const margin = 50;
const titleSize = margin / 4;
const maxAmplitude = 100;


let amplitude = maxAmplitude;
let colors = new Array();


function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSL);
    noStroke();

    initialize();
    drawFilaments();
}

function mousePressed() {
    initialize();
    drawFilaments();
}

function initialize() {
    // Generate color scheme based on a random hue
    amplitude = maxAmplitude;
    colors = new Array();
    baseHue = random(0, 360);
    background(color(baseHue, 15, 15));
    for (i = 0; i < numColors; i++) {
        colors.push(color(baseHue, map(i, 0, numColors - 1, 20, 80), map(i, 0, numColors - 1, 20, 75)))
    }
    fill(colors[0]);

    x = 0;
    y = -maxAmplitude;
    angle = random(0, PI);
    lines = 0;
    columns = 0;
    noiseOffset = 0;

}

function drawFilaments() {
    // don't worry about it, there's a return statement in there !
    // noprotect
    while (true) {
        let radius = noise(noiseOffset) * amplitude
        circle(x, y, radius);

        x += (sin(angle) * 0.2 + sin(angle / 2) * 0.1 + sin(angle / 3) * 0.5 + sin(angle / 4) * 0.2) * 2
        y += 1
        noiseOffset += noiseIncrement;
        angle += angleIncrement;

        if (y > height + maxAmplitude / 2) {
            columns++;
            y = -maxAmplitude / 2;
            x = columns * maxAmplitude;
            if (x > width) {
                lines++;
                if (lines >= colors.length) {
                    noLoop();
                    return;
                }
                fill(colors[lines]);
                x = lines * random(maxAmplitude / 2, maxAmplitude);
                columns = 0;
                //angle = 0;
                amplitude *= reductionFactor;
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    initialize();
    drawFilaments();
}
