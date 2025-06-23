import {useEffect, useState, useRef} from "react";
import {useStyles} from "./Chat.styles.tsx";
import {Send, Heart} from 'lucide-react'
import logo from '/src/assets/logo.png'
import type {SocketProps} from "../../App.types.ts";

function Chat({socket}: SocketProps) {
    const styles = useStyles();
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<{ nickname: string, message: string }[]>([]);
    const nickname = localStorage.getItem("nickname");
    const roomIndex = localStorage.getItem("roomIndex");
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleNewMessage = (msg: { nickname: string, message: string }) => {
            setChatHistory(prev => [...prev, msg]);
            console.log(msg);
        };
        socket.on("chat_history", (data: { history: { nickname: string; message: string }[] }) => {
            setChatHistory(data.history);
        });

        socket.on("new_message", handleNewMessage);

        socket.emit("get_chat_history", {roomIndex: Number(roomIndex)});

        return () => {
            socket.off("new_message", handleNewMessage);
            socket.off("chat_history");
        };
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);



    function handleSend() {
        socket.emit("send_message", {
            roomIndex: roomIndex,
            nickname: nickname,
            message: message
        });
        setMessage("");
    }

    function amISender(sender: string) {
        return nickname === sender;
    }

    return (
        <>
            <img src={logo} alt="logo" className={styles.logo}></img>
            <div className={styles.outerContainer}>
                <div className={styles.blueBorder}>
                    <div className={styles.innerContainer}>
                        {chatHistory.map((message, index) => (
                            <div
                                key={index}
                                className={amISender(message.nickname) ? styles.rightContainer : styles.leftContainer}>
                                {!amISender(message.nickname) && <Heart color="#fbcfe8" size={24} />}
                                <div className={amISender(message.nickname) ? styles.senderMessage : styles.recipientMessage}>
                                    <strong>{message.nickname}:</strong><br />
                                    {message.message}
                                </div>
                                {amISender(message.nickname) && <Heart color="#f472b6" size={24}  />}
                            </div>
                        ))}
                        <div ref={chatEndRef} />
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