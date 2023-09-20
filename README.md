# Experiments in Generative Art
Artworks made during the Generative Art course given by Isaac Pante at UNIL during the spring semester 2023.

[Visit the website](https://florian-rieder.github.io/generative-experiments/)

## Series

### 1. Sinescapes
For this series of p5.js works, I used trigonometric functions, mainly sines, to generate various "sinescapes", in the spirit of Charles Csuri, and many other artists who used such functions to generate organic landscapes.
I also make use of Perlin noise to add touches of organic chaos to my sketches.

## Website
### Libraries
This site uses the `p5.js` library to generate artworks. The styling uses SCSS and the layout uses Pure CSS.

## Installation

To set up the development environment for this website, follow these steps:

### Editor Setup
For a smoother development workflow, it's recommended to use [Visual Studio Code (VS Code)](https://code.visualstudio.com/) with the following extensions:

- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer): This extension enables live reloading of your web page when changes are made, making development more efficient.
- [Live SASS compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass): This extension compiles SCSS files in real-time, simplifying the management of the styles.

### Python Environment Setup
This website utilizes a small templating system built with Python. To set up the Python environment, follow these steps:

Create a virtual environment by running the following command in your project's root directory:

```shell
python -m venv venv
```

Activate the virtual environment based on your operating system:

For Unix-based systems (Linux or macOS):

```shell
source venv/bin/activate
```
For Windows:

```shell
venv\Scripts\activate
```

Install the required Python packages using pip:

```shell
pip install watchdog jinja2
```

Finally, start the templating engine to render the website's index.html file and listen for further modifications:

```shell
python templating_engine.py
```

With these steps completed, you'll have the necessary development environment set up to work on this website efficiently. You can now make changes to the code and see the live updates in the browser.