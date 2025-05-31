import threading
import queue
from flask import Flask
from flask_socketio import SocketIO, emit, join_room

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

users = []
message_queues = {}
threads = {}

def get_thread_name(userOne, userTwo):
    return "-".join(sorted([userOne, userTwo]))

class ChatThread(threading.Thread):
    def __init__(self, thread_name):
        super().__init__(daemon=True)
        self.thread_name = thread_name
        self.queue = queue.Queue()
        message_queues[thread_name] = self.queue

    def run(self):
        while True:
            msg = self.queue.get()
            if msg is None:
                break
            socketio.emit("new_message", msg, room=self.thread_name)
            print(f"[{self.thread_name}] {msg['nickname']}: {msg['message']}")

@socketio.on("get_users")
def get_users(data):
    nickname = data.get("nickname")
    users_without_nickname = [user for user in users if user != nickname]
    emit('return_users', {'users': users_without_nickname})

@socketio.on("set_nickname")
def handle_user_join(data):
    nickname = data.get("nickname")
    if nickname in users:
        emit('nickname_error', {'error': 'Nickname już zajęty!'})
        return
    users.append(nickname)
    emit('nickname_set', {'nickname': nickname})

@socketio.on("start_private_chat")
def start_private_chat(data):
    sender = data.get("from")
    recipient = data.get("to")
    thread_name = get_thread_name(sender, recipient)
    join_room(thread_name)

    if thread_name not in threads:
        thread = ChatThread(thread_name)
        threads[thread_name] = thread
        thread.start()
        print(f"Utworzono nowy wątek dla czatu: {thread_name}")

    emit("chat_started", {'thread_name': thread_name }, room=thread_name)

@socketio.on("send_message")
def send_message(data):
    sender = data.get("from")
    recipient = data.get("to")
    message = data.get("message")
    thread_name = get_thread_name(sender, recipient)

    join_room(thread_name)
    message = {'nickname': sender, 'message': message}
    message_queues[thread_name].put(message)

if __name__ == "__main__":
    socketio.run(app, host="localhost", port=8080, debug=True)
