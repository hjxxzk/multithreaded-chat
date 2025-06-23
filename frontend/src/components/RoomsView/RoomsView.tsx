import {useEffect, useState} from "react";
import type {SocketProps} from "../../App.types.ts";
import {MessageCircleHeart, Plus} from 'lucide-react';
import {useStyles} from "./RoomsView.styles.ts";
import {useNavigate} from "react-router-dom";

const RoomsView = ({socket} : SocketProps) => {

    const [roomsList, setRoomsList] = useState<string[]>([]);
    const styles = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('get_rooms', (data: {rooms: string[]}) => {
            setRoomsList(data.rooms);
            console.log(data.rooms);
        });

        return () => {
            socket.off('get_rooms');
        }
    });

    useEffect(() => {
        socket.emit('get_rooms');
    });

    function enterRoom(index: number) {
        const nickname = localStorage.getItem("nickname");
        localStorage.setItem("roomIndex", JSON.stringify(index));
        if (nickname) {
            socket.emit('join_room', { nickname: nickname, roomIndex: index });
        }
        navigate(`/chat/pokoj${index + 1}`);
    }

    function createRoom() {
        socket.emit('create_room');
    }

    return (
        <div className={styles.roomsView}>
            <button className={styles.addRoomButton} onClick={createRoom}>
                <Plus color="white" size={24}/>
                Utwórz nowy pokój!</button>
            <div className={styles.roomsList}>
                {roomsList.map((room, index) => (
                    <div
                        key={room}
                        className={styles.room}
                        onClick={() => { enterRoom(index);}}>
                        <MessageCircleHeart color="gray" size={24}/>
                        <p>{room}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomsView;
