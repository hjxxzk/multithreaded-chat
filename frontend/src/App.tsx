import { useState, useEffect } from "react";
import NicknamePopup from "./components/NicknamePopup/NicknamePopup.tsx";

function App() {
    const [nickname, setNickname] = useState('');

    const [showPopup, setShowPopup] = useState(true);
    const [popupClosing, setPopupClosing] = useState(false);

    const [showWelcome, setShowWelcome] = useState(false);
    const [welcomeClosing, setWelcomeClosing] = useState(false);

    function handleClick(nick: string) {
        if (nick.trim() !== '') {
            setNickname(nick);
            setPopupClosing(true);
            setTimeout(() => {
                setShowPopup(false);
                setShowWelcome(true);
            }, 300);
        } else {
            alert("Nic nie wpisałeś/aś - XD");
        }
    }

    useEffect(() => {
        if (showWelcome) {
            const timer1 = setTimeout(() => setWelcomeClosing(true), 1000);
            const timer2 = setTimeout(() => setShowWelcome(false), 1300);
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
    }, [showWelcome]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-pink-100 bg-opacity-30">
            {showPopup && (
                <div className={`transition-opacity duration-300 ${popupClosing ? 'opacity-0' : 'opacity-100'}`}>
                    <NicknamePopup handleClick={handleClick} />
                </div>
            )}

            {showWelcome && (
                <div className={`text-xl font-semibold transition-opacity duration-300
          ${welcomeClosing ? 'opacity-0' : 'opacity-100'}`}
                >
                    Witaj, {nickname}!
                </div>
            )}

            {(!showWelcome && !showPopup) && (
                <div className="text-2xl font-bold text-red-600">
                    Welcome!
                </div>
            )}
        </div>
    );
}

export default App;
