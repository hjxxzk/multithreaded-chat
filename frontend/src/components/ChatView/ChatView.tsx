import { useState } from "react";
import { Socket } from "socket.io-client";
import UserList from "../UserList/UserList.tsx";
import {useStyles} from "./ChatView.styles.ts";

function ChatView({ socket }: { socket: Socket }) {
    const [isSideBarVisible, setIsSideBarVisible] = useState(false);
    const styles = useStyles();

    return (
        <div className={styles.mainScreen}>
            <div
                className={styles.sideBar}
                onMouseEnter={() => setIsSideBarVisible(true)}
                onMouseLeave={() => setIsSideBarVisible(false)}
                style={{ cursor: "pointer" }}
            ></div>
            <div
                onMouseEnter={() => setIsSideBarVisible(true)}
                onMouseLeave={() => setIsSideBarVisible(false)}
                className={`${styles.sideBarContainer} ${isSideBarVisible ? styles.animationStart : styles.animationEnd}
        `}
            >
                <UserList socket={socket} />
            </div>

            <div className={styles.chat}>
            </div>
        </div>
    );
}

export default ChatView;
