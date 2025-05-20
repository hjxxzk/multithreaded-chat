"""Server module for a simple Flask web application."""

from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    """Returns Hello World."""
    return "<p>Hello, World!</p>"
