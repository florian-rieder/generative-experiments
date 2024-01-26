# Experiments in Generative Art
Artworks made during the Generative Art course given by Isaac Pante at UNIL during the spring semester 2023.

<img src="https://github.com/florian-rieder/generative-experiments/assets/48287183/02b89c07-0b79-4d84-bf32-432409a4a049" width=100%>

[Visit the website](https://florian-rieder.github.io/generative-experiments/)


## Series

### 1. Hommage to Georg Nees
For this serie of p5.js works, I was inspired to try and recreate some of Georg Nees most famous artworks. I selected *Schotter*, *Untitled (Werkstatt Edition Kroll)*, and *Untitled (Bild 13)*, for their elegance and exploration of the theme of chaos and order, a theme strongly present in Nees' body of work. *Bild 13* was especially tricky to recreate, due to its extensive use of trigonometry.

### 2. Simple geometries
In this serie, I use and combine simple geometric shapes to produce intricate patterns. *Motherboard* explores creative rectangle packing using a tricky maximal rectangle algorithm, while *Moiré* explores Moiré patterns using simple rotating hashes to create complex wavy patterns. Finally, *Lignes* uses random lines in a grid, rotated in increments of 45°, to create grid-like symbols.

### 3. Sinescapes
In this serie, I used trigonometric functions, mainly sines, to generate various "sinescapes" in the spirit of - notably Charles Csuri - many artists who used such functions to generate organic landscapes.
In some of the artworks, I also make use of Perlin noise to add touches of organic chaos.


## Website
### Design Concept: Swiss Design Meets Digital Media
The inspiration behind this website draws from the timeless principles of Swiss design, offering a refined and understated canvas reminiscent of the "white cube" often found in museography—a term denoting a neutral and unobtrusive gallery space. Purposefully selecting this minimalistic backdrop serves to highlight the vivid and geometric generative artworks within a neutral environment, directing focus solely on the artistry. The goal here is to seamlessly blend the classic sophistication of Swiss design with the lively expressiveness inherent in generative art and web design, resulting in an enticing and contemporary online gallery experience.

### Libraries
This site uses the `p5.js` library to generate artworks. The styling uses SCSS and the layout uses [Pure CSS](https://purecss.io/).

A small templating system built with Python is also used to facilitate development. It makes use of `jinja2`, `watchdog`, and `markdown2`.


## Installation
To set up the development environment for this website, follow these steps:

### Editor Setup
For a smoother development workflow, it's recommended to use [Visual Studio Code (VS Code)](https://code.visualstudio.com/) with the following extensions:

- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer): This extension enables live reloading of your web page when changes are made, making development more efficient.
- [Live SASS compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass): This extension compiles SCSS files in real-time, simplifying the management of the styles.

### Python Environment Setup
To set up the Python environment, follow these steps:

#### Create a virtual environment
Create the virtual environment by running the following command in your project's root directory:

```shell
python -m venv venv
```

Activate the virtual environment based on your operating system:

##### Unix-like systems (Linux or macOS):

```shell
source venv/bin/activate
```
##### Windows:

```shell
venv\Scripts\activate
```

#### Install the python dependencies
Install the required Python packages using pip:
```shell
pip install -r requirements.txt
```

#### Start the templating engine
Finally, start the templating engine to render the website's `index.html` file and listen for further modifications:

```shell
python templating_engine.py
```

With these steps completed, you'll have the necessary development environment set up to work on this website efficiently. You can now make changes to the code and see the live updates in the browser.