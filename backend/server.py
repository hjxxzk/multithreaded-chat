"""
Chat server using Flask and Socket.IO.
"""
import threading
from flask import Flask, request
from flask_socketio import SocketIO, emit, join_room, leave_room

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

users = []
room_users = {}
rooms = []
message_queues = {}
threads = {}
chat_history = {}


class ChatThread(threading.Thread):
    """
    Thread that handles broadcasting messages to a specific chat room,
    with manual synchronization.
    """
    def __init__(self, thread_name, socket: SocketIO):
        super().__init__(daemon=True)
        self.thread_name = thread_name
        self.socketio = socket

        self.buffer = []
        self.lock = threading.Lock()
        self.condition = threading.Condition(self.lock)

    def put_message(self, message):
        """
        Adds a new message to the buffer and notifies the thread that a message is available.
        """
        with self.condition:
            self.buffer.append(message)
            self.condition.notify()

    def run(self):
        """
        Main loop of the chat thread.
        Waits for messages and emits them to all clients in the room.
        """
        while True:
            with self.condition:
                while not self.buffer:
                    self.condition.wait()

                msg = self.buffer.pop(0)

            self.socketio.emit("new_message", msg, to=self.thread_name)
            print(f"[{self.thread_name}] {msg['nickname']}: {msg['message']}")


@socketio.on("send_message")
def handle_send_message(data):
    """
    Processes and dispatches a message sent by a user.
    """
    room_index = int(data.get("roomIndex"))
    room_name = f"Pokój nr {room_index + 1}"
    nickname = data.get("nickname")
    message = data.get("message")

    message_data = {
        "nickname": nickname,
        "message": message
    }

    if room_name not in chat_history:
        chat_history[room_name] = []
    chat_history[room_name].append(message_data)

    if room_name in threads:
        threads[room_name].put_message(message_data)
    else:
        print(f"Error: Thread not found for room {room_name}")


@socketio.on("get_rooms")
def get_rooms():
    """
    Sends the list of all existing chat rooms.
    """
    emit("get_rooms", {'rooms': rooms})


@socketio.on("get_users")
def get_users(data):
    """
    Sends the list of users in a specific room.
    """
    room_index = int(data.get('room_index'))
    room_name = rooms[room_index]
    emit("get_users", {'users': room_users.get(room_name, [])})


@socketio.on("create_room")
def create_room():
    """
    Creates a new chat room and starts its message thread.
    """
    room = "Pokój nr " + str(len(rooms) + 1)
    rooms.append(room)
    print(f"Created new room: {room}")

    if room not in threads:
        thread = ChatThread(room, socketio)
        threads[room] = thread
        thread.start()
        print(f"Started thread for room: {room}")

    if room not in chat_history:
        chat_history[room] = []

    if room not in room_users:
        room_users[room] = []

    emit("get_rooms", {'rooms': rooms}, broadcast=True)


@socketio.on("join_room")
def handle_join_room(data):
    """
    Adds a user to a room and notifies others in that room.
    """
    nickname = data.get("nickname")
    index = int(data.get("roomIndex"))
    room_name = f"Pokój nr {index + 1}"
    join_room(room_name)

    if nickname not in room_users[room_name]:
        room_users[room_name].append(nickname)

    print(f"{nickname} joined {room_name}")
    emit("get_users", {'users': room_users[room_name]}, to=room_name)


@socketio.on("get_chat_history")
def get_chat_history(data):
    """
    Sends the chat history of a specific room to the user.
    """
    room_index = int(data.get("roomIndex"))
    room_name = f"Pokój nr {room_index + 1}"
    history = chat_history.get(room_name, [])
    print("User requested chat history")
    emit("chat_history", {'history': history}, room=request.sid)


@socketio.on("set_nickname")
def handle_user_join(data):
    """
    Registers a user's nickname and checks for duplicates.
    """
    nickname = data.get("nickname")
    if nickname in users:
        emit('nickname_error', {'error': 'Nickname is already taken!'})
        return
    users.append(nickname)
    print(f"User joined: {nickname}")
    emit('nickname_set', {'nickname': nickname})


@socketio.on("leave_room")
def handle_leave_room(data):
    """
    Removes a user from a room and updates the user list.
    """
    nickname = data.get("nickname")
    index = int(data.get("roomIndex"))
    room_name = f"Pokój nr {index + 1}"

    if room_name in room_users and nickname in room_users[room_name]:
        room_users[room_name].remove(nickname)

    leave_room(room_name)
    print(f"{nickname} left {room_name}")
    emit("get_users", {'users': room_users[room_name]}, to=room_name)


if __name__ == "__main__":
    socketio.run(app, host="localhost", port=8080, debug=True)
