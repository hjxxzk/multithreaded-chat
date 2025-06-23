import { useState, useEffect } from "react";
import NicknamePopup from "../NicknamePopup/NicknamePopup.tsx";
import {useStyles} from "./WelcomeUser.styles.ts";
import {useNavigate} from "react-router-dom";
import type {SocketProps} from "../../App.types.ts";


function WelcomeUser({ socket }: SocketProps) {
    const styles = useStyles();
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(true);
    const [popupClosing, setPopupClosing] = useState(false);

    const [showWelcome, setShowWelcome] = useState(false);
    const [welcomeClosing, setWelcomeClosing] = useState(false);

    function handleClick(nick: string) {
        if (nick.trim() !== '') {
            socket.emit('set_nickname', { nickname: nick });
            console.log(nick)
        } else {
            alert("Nic nie wpisałeś/aś - XD");
        }
    }

    useEffect(() => {
        socket.on('nickname_error', (data: { error: string })  => {
            alert(data.error);
        });

        socket.on('nickname_set', (data: { nickname: string }) => {
            console.log(`Nickname ustawiony: ${data.nickname}`);
            localStorage.setItem("nickname", data.nickname);
            welcomeUser();
        });

        return () => {
            socket.off('nickname_error');
            socket.off('nickname_set');
        };
    });

    function welcomeUser() {
        setPopupClosing(true);
        setTimeout(() => {
            setShowPopup(false);
            setShowWelcome(true);
            goToChatView();
        }, 500);
    }

    function goToChatView() {
        setTimeout(() => {
            navigate('/rooms');
        }, 2500);
    }

    useEffect(() => {
        if (showWelcome) {
            const timerOne = setTimeout(() => setWelcomeClosing(true), 1000);
            const timerTwo = setTimeout(() => setShowWelcome(false), 1300);
            return () => {
                clearTimeout(timerOne);
                clearTimeout(timerTwo);
            };
        }
    }, [showWelcome]);

    return (
        <div className={styles.nicknamePopupContainer}>
            {showPopup && (
                <div className={`${styles.popupAnimation} ${popupClosing ? 'opacity-0' : 'opacity-100'}`}>
                    <NicknamePopup handleClick={handleClick} />
                </div>
            )}

            {showWelcome && (
                <div className={`${styles.nicknameConfirmation}
          ${welcomeClosing ? 'opacity-0' : 'opacity-100'}`}
                >
                    Twój nickname: {localStorage.getItem("nickname")}!
                </div>
            )}

            {(!showWelcome && !showPopup) && (
                <div className={styles.welcome}>
                    Witaj!
                </div>
            )}
        </div>
    );
}

export default WelcomeUser;