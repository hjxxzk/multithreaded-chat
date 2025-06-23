import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomeUser from "./components/WelcomeUser/WelcomeUser.tsx";
import ChatView from "./components/ChatView/ChatView.tsx";
import io from 'socket.io-client';
import RoomsView from "./components/RoomsView/RoomsView.tsx";

function App() {
    const socket = io('http://localhost:5000');

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomeUser socket={socket} />} />
                <Route path="/rooms" element={<RoomsView socket={socket} />} />
                <Route path="/chat/:room_number" element={<ChatView socket={socket} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;