import { useState } from "react";
import {useStyles} from "./ChatView.styles.ts";
import UserList from "../UserList/UserList.tsx";
import Chat from "../Chat/Chat.tsx";
import type {SocketProps} from "../../App.types.ts";

function ChatView({socket} : SocketProps) {
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
                <Chat socket={socket}></Chat>
            </div>
        </div>
    );
}

export default ChatView;
