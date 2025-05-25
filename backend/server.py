"""Server module for a simple Flask web application."""

from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
users = []

@socketio.on("get_users")
def get_users(data):
    """Return users list."""
    nickname = data.get("nickname")
    users_without_nickname = [user for user in users if user != nickname]
    print(f"Użytkownik {nickname} poprosił o listę użytkowników.")
    emit('return_users', {'users': users_without_nickname})


@socketio.on('set_nickname')
def handle_user_join(data):
    """Set nickname if it is not already taken."""
    nickname = data.get('nickname')

    if nickname in users:
        emit('nickname_error', {'error': 'Nickname już zajęty!'})
        return

    users.append(nickname)
    print(f"Użytkownik dołączył i ustawił swój nickname: {nickname}")
    emit('nickname_set', {'nickname': nickname})


if __name__ == "__main__":
    socketio.run(app, host="localhost", port=8080)
