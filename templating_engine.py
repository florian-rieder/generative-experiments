"""
    Static site generator
    ---------------------
    Renders index.html upon modifications to either templates or data
    files.

    This file was built using GPT 3.5:
    https://chat.openai.com/share/7db97f52-17e8-44a1-ad75-ec364a2c9915
"""

import time
import json

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from jinja2 import Environment, FileSystemLoader


DATA_PATH = 'data/data.json'

# Create a Jinja2 environment
env = Environment(loader=FileSystemLoader('templates'))


def main():
    event_handler = FileChangeHandler()
    observer = Observer()
    observer.schedule(event_handler, path='.', recursive=True)
    observer.start()

    # Compile once on startup
    compile()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()


def compile():
    data = load_data_from_json(DATA_PATH)
    render_and_save(data)
    print("Compilation and saving complete.")


def render_and_save(data):
    """Render and save the rendered HTML"""
    # Load the index template
    index_template = env.get_template('base.html')
    # Render the index template with data
    rendered_html = index_template.render(item_list=data)

    # Save the rendered HTML to the root directory as index.html
    with open('index.html', 'w') as f:
        f.write(rendered_html)


def load_data_from_json(json_file):
    """Load data from JSON file"""
    with open(json_file, 'r') as f:
        data = json.load(f)
    return data


class FileChangeHandler(FileSystemEventHandler):
    """Watchdog event handler"""

    def on_modified(self, event):
        if event.src_path.endswith('base.html') or event.src_path.endswith('data.json'):
            print("HTML or JSON file modified. Compiling and saving...")
            compile()


if __name__ == "__main__":
    main()
