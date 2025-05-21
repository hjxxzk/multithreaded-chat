"""Server module for a simple Flask web application."""

from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def hello_world():
    """Returns Hello World."""
    return "<p>Hello, World!</p>"

if __name__ == "__main__":
    socketio.run(app, host="localhost", port=8080)
