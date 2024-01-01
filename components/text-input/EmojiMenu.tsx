import { useRef, useEffect, useState } from "react";
import emojis from "./emojis.json";

type Emoji = {
    u: string; // unicode
    e: string; // emoji
    n: string; // name
}

type EmojiMenuParams = { 
    closeMenu: () => void,
    addEmoji: (emoji: string) => void,
    filter: string,
}

type EmojiButtonParams = {
    emoji: Emoji,
    addEmoji: (emoji: string) => void,
    isSelected: boolean,
}

const EmojiButton = ({ emoji, addEmoji, isSelected }: EmojiButtonParams) => {
    const className = isSelected ? "selected emoji-button" : "emoji-button";

    return (
        <div className={className}>
            {/* <label>{emoji.n}</label> */}
            <button onClick={() => addEmoji(emoji.e)}>
                {emoji.e}
            </button>
        </div>
    );
}


const EmojiMenu = ({ closeMenu, addEmoji, filter }: EmojiMenuParams) => {
    const ref = useRef<any>(null);
    const [selectedEmoji, setSelectedEmoji] = useState<number | null>(0);
    
    useEffect(() => {
        function handleClickOutside(event: { target: any; }) {
            if (ref.current && !ref.current.contains(event.target)) {
                closeMenu();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, closeMenu]);

    return (
        <>
            <style>{`
                .emoji-menu {
                    position: absolute;
                    padding: 10px;
                    border: 1px solid white;
                    background-color: gray;
                    width: 280px;
                    scrollbar-width: thin;
                }

                .emoji-menu .emoji-list {
                    scrollbar-width: thin;
                    scrollbar-color: blue orange;
                    height: 280px;
                    overflow-x: hidden;
                    overflow-y: scroll;
                    display: flex;
                    flex-wrap: wrap;
                }

                .emoji-menu .emoji-list::-webkit-scrollbar {
                    width: 10px;
                }
                
                .emoji-menu .emoji-list::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                .emoji-menu .emoji-list::-webkit-scrollbar-thumb {
                    background-color: black;
                    border-radius: 20px;
                    border: 3px solid grey;
                }

                .emoji-menu .emoji-button {
                    flex-basis: 16.6%;
                    position: relative;
                }

                .emoji-menu .emoji-button.selected {
                    background-color: blue;
                    border: 2px solid white;
                }

                .emoji-menu .emoji-button button {
                    background-color: transparent;
                    border: 0px;
                    margin: 0px;
                    padding: 0px;
                    font-size: 1.8rem;
                    cursor: pointer;
                }

                .emoji-label {
                    flex-basis: 100%;
                    text-align: left;
                    font-size: 1rem;
                    text-align: center;
                    margin-bottom: 10px;
                }
            `}</style>
            <div ref={ref} className={'emoji-menu'}>
                <div className="emoji-label">{filter}</div>
                <div className="emoji-list">
                    {emojis.map((emoji, index) => (
                        <EmojiButton key={index} emoji={emoji} isSelected={selectedEmoji ? selectedEmoji === index : false} addEmoji={addEmoji} />
                    ))}
                </div>
            </div>
        </>
    );
}

export { EmojiMenu };