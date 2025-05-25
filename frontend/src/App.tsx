import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomeUser from "./components/WelcomeUser/WelcomeUser.tsx";
import io from 'socket.io-client';
import ChatView from "./components/ChatView/ChatView.tsx";

const socket = io('http://localhost:5000');

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomeUser socket={socket} />} />
                <Route path="/chat" element={<ChatView socket={socket} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;