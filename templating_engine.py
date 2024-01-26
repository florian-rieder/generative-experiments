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
import os
import traceback

from jinja2 import Environment, FileSystemLoader
import markdown2
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Path where the metadata about the list of artworks can be found
DATA_PATH = 'data/data.json'

# Folders to monitor for changes
MONITORED_DIRS = [
    '/data/',
    '/templates/',
    '/sketches/'
]

# Create a Jinja2 environment
env = Environment(loader=FileSystemLoader('templates'))


def main():
    event_handler = FileChangeHandler()
    observer = Observer()
    observer.schedule(event_handler, path='.', recursive=True)
    observer.start()

    # Compile once on startup
    print('Startup compile...')
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
    print("Files compiled.")


def render_and_save(data):
    """Render and save the rendered HTML"""
    # Load the index template
    index_template = env.get_template('base.html')

    # Iterate through each item in data
    for item in data:
        # Grab the path of this item's desription file
        description_path = f"sketches/{item['slug']}/description.md"

        # Convert Markdown to HTML
        html_content = convert_markdown_to_html(description_path)

        # Inject HTML content into the 'description_html' field of the item
        item['description'] = html_content

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


def convert_markdown_to_html(markdown_file):
    """Convert Markdown to HTML"""
    if not os.path.exists(markdown_file):
        return 'Pas de description'

    with open(markdown_file, 'r', encoding='utf-8') as file:
        markdown_content = file.read()

    # Use markdown2 library for conversion
    html_content = markdown2.markdown(markdown_content)
    return html_content


class FileChangeHandler(FileSystemEventHandler):
    """Watchdog event handler"""

    def on_modified(self, event):
        if any(event.src_path.startswith(os.getcwd()+x) for x in MONITORED_DIRS):
            print(
                f'File changed: {event.src_path}\n'
                'Compiling and saving...')
            try:
                compile()
            except Exception:
                traceback.print_exc()
                print('Compilation aborted.')


if __name__ == "__main__":
    main()
