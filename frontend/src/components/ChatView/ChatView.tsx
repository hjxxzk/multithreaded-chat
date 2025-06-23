import {useStyles} from "./ChatView.styles.ts";
import UserList from "../UserList/UserList.tsx";
import Chat from "../Chat/Chat.tsx";
import type {SocketProps} from "../../App.types.ts";

function ChatView({socket} : SocketProps) {
    const styles = useStyles();

    return (
        <div className={styles.mainScreen}>
            <div className={styles.sidebar}>
                <UserList socket={socket} />
            </div>

            <div className={styles.chat}>
                <Chat socket={socket} />
            </div>
        </div>
    );
}

export default ChatView;
