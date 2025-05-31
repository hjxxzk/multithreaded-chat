import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomeUser from "./components/WelcomeUser/WelcomeUser.tsx";
import ChatView from "./components/ChatView/ChatView.tsx";
import io from 'socket.io-client';

function App() {
    const socket = io('http://localhost:5000');

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomeUser socket={socket} />} />
                <Route path="/chat" element={<ChatView socket={socket} />} />
                <Route path="/chat/:thread_name" element={<ChatView socket={socket} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;