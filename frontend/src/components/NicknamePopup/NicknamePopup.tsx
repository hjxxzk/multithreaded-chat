import React, {useState} from 'react';
import {useStyles} from "./NicknamePopup.styles.ts";

interface NicknamePopupProps {
    handleClick: (nick: string) => void;
}

const NicknamePopup: React.FC<NicknamePopupProps> = ({ handleClick }) => {
    const styles = useStyles();
    const [nickname, setNickname] = useState('');

    return (
        <div className={styles.outerContainer}>
            <div className={styles.blueBorder}>
                <div className={styles.innerContainer}>
                    <h2 className={styles.welcome}>✨ Witaj! ✨</h2>
                    <h3 className={styles.text}>Podaj swój nick:</h3>
                    <input className={styles.input} value={nickname} onChange={(nick) => setNickname(nick.target.value)} />
                    <button className={styles.button} onClick={() => handleClick(nickname)}>
                    Potwierdź
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NicknamePopup;