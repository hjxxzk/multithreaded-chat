import {useEffect, useState} from "react";
import {useStyles} from "./Chat.styles.tsx";
import {Send} from 'lucide-react'
import logo from '/src/assets/logo.png'
import {useParams} from "react-router-dom";
import type {SocketProps} from "../../App.types.ts";

function Chat({socket} : SocketProps) {
    const styles = useStyles();
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<{ nickname: string, message: string }[]>([]);
    const { threadName } = useParams();
    const nickname = localStorage.getItem("nickname");
    const recipient = localStorage.getItem("recipient");

    useEffect(() => {

        socket.on("chat_started", (data) => {
            setChatHistory(data.messages);
        });

        socket.on("new_message", (message) => {
            setChatHistory((prev) => [...prev, message]);
        });

        return () => {
            socket.off("chat_started");
            socket.off("new_message");
        };
    }, [socket]);

    function handleSend() {
        socket.emit("send_message", {
            from: nickname,
            to: recipient,
            message: message,
        });

        setMessage("");
    }

    return (
        <>
            <img src={logo} alt="logo" className={styles.logo}></img>
            <div className="w-3/5 bg-pink-200 p-4 flex flex-col justify-between h-10/12 rounded-4xl mb-15">
                <div className={styles.blueBorder}>
                        <div className={styles.innerContainer}>
                        </div>
                </div>
                <div className={styles.enterTextField}>
                <input
                    className={styles.input}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />
                    <Send color="white" size={30} onClick={handleSend}></Send>
                </div>
            </div>
        </>
    );
}

export default Chat;